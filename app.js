document.addEventListener('DOMContentLoaded', () => {
  // --- 1. 노선도 데이터 (예시로 1호선 일부, 2호선 전체) ---
  const stationData = {
    '1': {
      name: '1호선',
      stations: ['서울', '시청', '종각', '종로3가', '종로5가', '동대문', '신설동', '제기동', '청량리']
    },
    '2': {
      name: '2호선',
      stations: [
        '시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원', '신당', 
        '상왕십리', '왕십리', '한양대', '뚝섬', '성수', '건대입구', '구의', '강변', 
        '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', 
        '교대', '서초', '방배', '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방', 
        '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', 
        '신촌', '이대', '아현', '충정로'
      ]
    }
  };

  const lineSelect = document.getElementById('lineSelect');
  const routeMap = document.getElementById('routeMap');
  
  // 모달 관련 DOM
  const modal = document.getElementById('stationModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalStationName = document.getElementById('modalStationName');
  const modalLineBadge = document.getElementById('modalLineBadge');
  const loading = document.getElementById('loading');
  const arrivalInfo = document.getElementById('arrivalInfo');
  const listUp = document.getElementById('listUp');
  const listDown = document.getElementById('listDown');

  // --- 2. 초기 노선도 렌더링 ---
  renderMap('2');

  lineSelect.addEventListener('change', (e) => {
    renderMap(e.target.value);
  });

  function renderMap(lineCode) {
    routeMap.innerHTML = '';
    routeMap.setAttribute('data-line', lineCode);
    
    const stations = stationData[lineCode].stations;
    
    stations.forEach(station => {
      const li = document.createElement('li');
      li.className = 'station-node';
      li.innerHTML = `<div class="station-name">${station}역</div>`;
      
      // 역 클릭 이벤트 설정
      li.addEventListener('click', () => {
        openModal(station, lineCode);
      });
      
      routeMap.appendChild(li);
    });
  }

  // --- 3. 모달 열기 및 실시간 데이터 가져오기 ---
  async function openModal(stationName, lineCode) {
    modal.classList.remove('hidden');
    modalStationName.textContent = `${stationName}역`;
    modalLineBadge.textContent = stationData[lineCode].name;
    modalLineBadge.className = `line-badge line-${lineCode}`;
    
    // UI 초기화
    listUp.innerHTML = ''; listDown.innerHTML = '';
    arrivalInfo.classList.add('hidden');
    loading.classList.remove('hidden');

    const apiKey = document.getElementById('apiKey').value.trim() || 'sample';
    
    try {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
      const baseUrl = isLocalhost ? 'http://swopenapi.seoul.go.kr/api/subway' : '/api';
      
      // 실시간 '도착' 정보 API 호출 (OA-12764)
      const url = `${baseUrl}/${apiKey}/json/realtimeStationArrival/0/15/${encodeURIComponent(stationName)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      loading.classList.add('hidden');
      arrivalInfo.classList.remove('hidden');

      if (!data.realtimeArrivalList) {
        listUp.innerHTML = `<p style="color:#888;">도착 예정인 열차가 없습니다.</p>`;
        listDown.innerHTML = `<p style="color:#888;">도착 예정인 열차가 없습니다.</p>`;
        return;
      }

      // 현재 선택된 노선의 열차만 필터링 (환승역의 경우 다른 노선 열차도 오기 때문)
      let targetSubwayId = lineCode === '1' ? '1001' : '1002';
      const filteredTrains = data.realtimeArrivalList.filter(train => train.subwayId === targetSubwayId);

      renderArrivals(filteredTrains);

    } catch (error) {
      console.error(error);
      loading.classList.add('hidden');
      arrivalInfo.classList.remove('hidden');
      listUp.innerHTML = `<p style="color:red;">정보를 불러오지 못했습니다.</p>`;
    }
  }

  // --- 4. 가져온 데이터 화면에 표시 ---
  function renderArrivals(trains) {
    let upHtml = '';
    let downHtml = '';

    trains.forEach(train => {
      // arvlMsg2: "5분 후", "[3]번째 전역", "강남 도착" 등
      // bstatnNm: "성수", "신도림" (종착역)
      // arvlMsg3: "서초", "교대" (현재 열차가 있는 역)
      // barvlDt: 도착 예상 초 (0이면 표시 안함)

      let etaText = train.arvlMsg2;
      // 도착까지 남은 시간이 초 단위(barvlDt)로 있을 경우 보기 좋게 분 단위 추가
      if (train.barvlDt !== "0") {
        const minutes = Math.floor(parseInt(train.barvlDt) / 60);
        etaText = `약 ${minutes}분 후 도착 (${train.arvlMsg2})`;
      }

      const itemHtml = `
        <div class="train-item">
          <div class="train-title">
            <span>${train.bstatnNm}행 열차</span>
            <span class="train-time">${etaText}</span>
          </div>
          <div class="train-desc">
            현재 위치: ${train.arvlMsg3}역 부근
          </div>
        </div>
      `;

      // updnLine: 상행/우측(0), 하행/좌측(1)
      if (train.updnLine === '상행' || train.updnLine === '내선') {
        upHtml += itemHtml;
      } else {
        downHtml += itemHtml;
      }
    });

    listUp.innerHTML = upHtml || '<p style="color:#888; font-size:13px;">상행/내선 대기열차가 없습니다.</p>';
    listDown.innerHTML = downHtml || '<p style="color:#888; font-size:13px;">하행/외선 대기열차가 없습니다.</p>';
  }

  // 모달 닫기 이벤트
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // 모달 바깥 영역 클릭 시 닫기
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
});
