document.addEventListener('DOMContentLoaded', () => {
  const fetchBtn = document.getElementById('fetchBtn');
  const resultGrid = document.getElementById('resultGrid');
  const loading = document.getElementById('loading');

  fetchBtn.addEventListener('click', fetchTrainData);

  async function fetchTrainData() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const line = document.getElementById('lineSelect').value;

    if (!apiKey) {
      alert('API 키를 입력해주세요.');
      return;
    }

    // 초기화 및 로딩 표시
    resultGrid.innerHTML = '';
    loading.classList.remove('hidden');

    try {
      // 로컬 개발 환경(localhost)일 경우 직접 호출, Netlify 환경일 경우 프록시(/api) 사용
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
      const baseUrl = isLocalhost 
        ? 'http://swopenapi.seoul.go.kr/api/subway' 
        : '/api';

      // 요청 범위 0 ~ 30 (필요에 따라 조절)
      const url = `${baseUrl}/${apiKey}/json/realtimePosition/0/30/${encodeURIComponent(line)}`;

      const response = await fetch(url);
      const data = await response.json();

      loading.classList.add('hidden');

      if (data.status === 500 || (data.RESULT && data.RESULT.CODE !== 'INFO-000')) {
        resultGrid.innerHTML = `<p style="color: red; text-align: center; grid-column: 1/-1;">데이터를 불러오지 못했습니다. API 키나 노선을 확인해주세요.</p>`;
        return;
      }

      const trainList = data.realtimePositionList;
      
      if (!trainList || trainList.length === 0) {
        resultGrid.innerHTML = `<p style="text-align: center; grid-column: 1/-1;">현재 운행 중인 열차가 없습니다.</p>`;
        return;
      }

      renderTrains(trainList);

    } catch (error) {
      console.error('Fetch Error:', error);
      loading.classList.add('hidden');
      resultGrid.innerHTML = `<p style="color: red; text-align: center; grid-column: 1/-1;">네트워크 오류가 발생했습니다. (Netlify 혼합 콘텐츠 문제일 수 있습니다)</p>`;
    }
  }

  function renderTrains(trainList) {
    const statusMap = {
      '0': '진입',
      '1': '도착',
      '2': '출발'
    };

    const updnMap = {
      '0': '상행/내선',
      '1': '하행/외선'
    };

    trainList.forEach(train => {
      const card = document.createElement('div');
      card.className = `train-card ${train.updnLine === '1' ? 'down' : 'up'}`;

      const trainStatus = statusMap[train.trainSttus] || '운행중';
      const direction = updnMap[train.updnLine] || '알 수 없음';
      const isExpress = train.directAt === '1' ? '(급행)' : '';

      card.innerHTML = `
        <div class="status-badge">${direction} ${isExpress}</div>
        <div class="statn-nm">${train.statnNm}역 <span style="font-size: 14px; font-weight:normal; color: var(--text-secondary)">${trainStatus}</span></div>
        <div class="train-info">
          <span>열차번호: ${train.trainNo}</span>
          <span>종착: ${train.statnTnm}</span>
        </div>
      `;
      resultGrid.appendChild(card);
    });
  }
});
