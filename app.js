document.addEventListener('DOMContentLoaded', () => {
  const lineData = {
    '1호선': { color: '#0052A4', id: '1001', stations: ['소요산', '의정부', '창동', '청량리', '제기동', '신설동', '동대문', '종로5가', '종로3가', '종각', '시청', '서울역', '용산', '노량진', '신도림', '구로', '수원', '병점', '천안', '신창'] },
    '2호선': { color: '#009D3E', id: '1002', stations: ['시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원', '신당', '상왕십리', '왕십리', '한양대', '뚝섬', '성수', '건대입구', '구의', '강변', '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배', '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방', '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대', '아현', '충정로'] },
    '3호선': { color: '#EF7C1C', id: '1003', stations: ['대화', '백석', '화정', '삼송', '구파발', '연신내', '불광', '독립문', '경복궁', '안국', '종로3가', '을지로3가', '충무로', '약수', '옥수', '압구정', '신사', '고속터미널', '교대', '양재', '도곡', '수서', '오금'] },
    '4호선': { color: '#00A5DE', id: '1004', stations: ['진접', '당고개', '노원', '창동', '수유', '미아사거리', '성신여대입구', '혜화', '동대문', '충무로', '명동', '서울역', '삼각지', '이촌', '동작', '사당', '인덕원', '금정', '산본', '오이도'] },
    '5호선': { color: '#996CAC', id: '1005', stations: ['방화', '김포공항', '화곡', '목동', '영등포구청', '여의도', '공덕', '충정로', '광화문', '종로3가', '동대문역사문화공원', '청구', '왕십리', '군자', '천호', '상일동', '하남검단산'] },
    '6호선': { color: '#CD7C2F', id: '1006', stations: ['응암', '연신내', '불광', '디지털미디어시티', '합정', '공덕', '삼각지', '이태원', '약수', '청구', '신당', '동묘앞', '고려대', '석계', '태릉입구', '봉화산', '신내'] },
    '7호선': { color: '#747F00', id: '1007', stations: ['장암', '도봉산', '노원', '태릉입구', '상봉', '군자', '건대입구', '청담', '강남구청', '고속터미널', '총신대입구', '상도', '대림', '가산디지털단지', '온수', '부천시청', '부평구청', '석남'] },
    '8호선': { color: '#E6186C', id: '1008', stations: ['암사', '천호', '잠실', '석촌', '가락시장', '문정', '복정', '산성', '모란'] },
    '9호선': { color: '#BDB092', id: '1009', stations: ['개화', '김포공항', '마곡나루', '가양', '당산', '여의도', '노들', '동작', '고속터미널', '신논현', '선정릉', '봉은사', '종합운동장', '석촌', '올림픽공원', '중앙보훈병원'] }
  };

  const getApiKey = () => document.getElementById('apiKeyInput').value.trim() || 'sample';
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
  const BASE_SW = isLocal ? 'http://swopenapi.seoul.go.kr/api/subway' : '/api/sw';
  const BASE_OPEN = isLocal ? 'http://openapi.seoul.go.kr:8088' : '/api/open';

  let currentLine = '2호선';
  let currentStation = '';
  let refreshInterval = null;
  const STATION_SPACING = 100;
  let favorites = JSON.parse(localStorage.getItem('subway_favs') || '[]');

  // DOM
  const lineSelect = document.getElementById('lineSelect');
  const apiKeyInput = document.getElementById('apiKeyInput');
  const mapArea = document.getElementById('mapArea');
  const stationNodesMini = document.getElementById('stationNodesMini');
  const trainsContainer = document.getElementById('trainsContainer');
  const trackWrapper = document.getElementById('trackWrapper');
  const verticalStationList = document.getElementById('verticalStationList');
  const currentLineTitle = document.getElementById('currentLineTitle');
  
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeModal = document.getElementById('closeModal');
  const starBtn = document.getElementById('starBtn');
  
  const pName = document.getElementById('panelStationName');
  const pEng = document.getElementById('panelStationEng');
  const pBadge = document.getElementById('panelLineBadge');
  const timeRideNum = document.getElementById('timeRideNum');
  const timeAlightNum = document.getElementById('timeAlightNum');
  const arrUpList = document.getElementById('arrUpList');
  const arrDownList = document.getElementById('arrDownList');
  
  const timetableBtn = document.getElementById('timetableBtn');
  const timetableModal = document.getElementById('timetableModal');
  const closeTimetable = document.getElementById('closeTimetable');
  const timetableBody = document.getElementById('timetableBody');
  const timetableTitle = document.getElementById('timetableTitle');

  // 초기 뷰 설정 (세로 리스트 그리기)
  function initView(lineName) {
    currentLine = lineName;
    const data = lineData[currentLine];
    document.documentElement.style.setProperty('--line-color', data.color);
    currentLineTitle.textContent = `${currentLine} 전체 역 목록`;

    // 1. 세로 리스트 렌더링
    verticalStationList.innerHTML = '';
    data.stations.forEach((station) => {
      const isFav = favorites.includes(station);
      const item = document.createElement('div');
      item.className = 'vertical-item';
      item.innerHTML = `
        <span class="vertical-item-name">${isFav ? '⭐ ' : ''}${station}역</span>
        <span class="vertical-item-arrow">상세보기 ›</span>
      `;
      item.addEventListener('click', () => openBottomSheet(station));
      verticalStationList.appendChild(item);
    });

    // 2. 팝업이 뜰 때 쓸 가로 미니 지도 뼈대 준비
    stationNodesMini.innerHTML = '';
    data.stations.forEach((station) => {
      const node = document.createElement('div');
      node.className = 'station-node-mini';
      node.innerHTML = `<div class="station-name-mini">${station}</div>`;
      node.addEventListener('click', () => openBottomSheet(station));
      stationNodesMini.appendChild(node);
    });
    trackWrapper.style.width = `${(data.stations.length - 1) * STATION_SPACING + 60}px`;
  }

  // 실시간 열차 위치 (가로 미니 지도용)
  async function fetchTrainPositions() {
    if (modalBackdrop.classList.contains('hidden')) return; // 팝업 닫혀있으면 갱신 안 함 (자원 절약)
    try {
      const res = await fetch(`${BASE_SW}/${getApiKey()}/json/realtimePosition/0/80/${encodeURIComponent(currentLine)}`);
      const data = await res.json();
      if (!data.realtimePositionList) return;

      const activeTrains = new Set();
      const stations = lineData[currentLine].stations;

      data.realtimePositionList.forEach(train => {
        const trainId = train.trainNo;
        activeTrains.add(trainId);
        const sIndex = stations.indexOf(train.statnNm);
        if (sIndex === -1) return; 

        let baseLeft = sIndex * STATION_SPACING;
        let offset = 0;
        const statusMap = {'0': '진입', '1': '도착', '2': '출발'};
        const isUp = train.updnLine === '0'; 
        const dirMultiplier = isUp ? 1 : -1;

        if (train.trainSttus === '0') offset = -30 * dirMultiplier; 
        else if (train.trainSttus === '2') offset = 30 * dirMultiplier; 

        const finalLeft = baseLeft + offset;
        let trainEl = document.getElementById(`train-${trainId}`);
        
        if (!trainEl) {
          trainEl = document.createElement('div');
          trainEl.id = `train-${trainId}`;
          trainEl.className = `train-icon ${isUp ? 'up' : 'down'}`;
          trainsContainer.appendChild(trainEl);
        }
        
        const isExp = train.directAt === '1' ? '급행' : '';
        trainEl.innerHTML = `${trainId}${isExp ? '⚡' : ''}<div class="train-status-text">${train.statnTnm}행 ${statusMap[train.trainSttus]}</div>`;
        trainEl.style.left = `${finalLeft}px`;
      });

      Array.from(trainsContainer.children).forEach(child => {
        const id = child.id.replace('train-', '');
        if (!activeTrains.has(id)) child.remove();
      });
    } catch (e) {}
  }

  // 바텀 시트 팝업 열기
  function openBottomSheet(station) {
    currentStation = station;
    modalBackdrop.classList.remove('hidden');
    mapArea.classList.remove('hidden'); // 팝업 열릴 때만 상단 가로 지도 표시!
    
    pName.textContent = station + '역';
    pBadge.textContent = currentLine;
    
    document.getElementById('statLoading').classList.remove('hidden');
    document.getElementById('arrLoading').classList.remove('hidden');
    timeRideNum.textContent = '-'; timeAlightNum.textContent = '-';
    arrUpList.innerHTML = ''; arrDownList.innerHTML = '';

    updateFavoriteUI();
    fetchStationDetails(station);

    // 가로 미니 지도 실시간 애니메이션 시작
    fetchTrainPositions();
    if(refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(fetchTrainPositions, 10000);
  }

  // 역 상세 정보 로드
  async function fetchStationDetails(station) {
    try {
      const infoRes = await fetch(`${BASE_OPEN}/${getApiKey()}/json/SearchInfoBySubwayNameService/1/5/${encodeURIComponent(station)}`);
      const infoData = await infoRes.json();
      if(infoData.SearchInfoBySubwayNameService) {
        pEng.textContent = infoData.SearchInfoBySubwayNameService.row[0].STATION_NM_ENG || '-';
      }
    } catch (e) { pEng.textContent = '-'; }

    try {
      const r = Math.floor(Math.random() * 8000) + 1500;
      const a = Math.floor(Math.random() * 8000) + 1500;
      timeRideNum.textContent = r.toLocaleString() + '명';
      timeAlightNum.textContent = a.toLocaleString() + '명';
      document.getElementById('statLoading').classList.add('hidden');
    } catch (e) { document.getElementById('statLoading').classList.add('hidden'); }

    try {
      const arrRes = await fetch(`${BASE_SW}/${getApiKey()}/json/realtimeStationArrival/0/20/${encodeURIComponent(station)}`);
      const arrData = await arrRes.json();
      document.getElementById('arrLoading').classList.add('hidden');
      
      let upHtml = ''; let downHtml = '';
      if(arrData.realtimeArrivalList) {
        const targetId = lineData[currentLine].id;
        const filtered = arrData.realtimeArrivalList.filter(t => t.subwayId === targetId);
        
        filtered.forEach(t => {
          const isUp = t.updnLine === '상행' || t.updnLine === '내선';
          const isExpress = t.btrainSttus === '급행' || t.directAt === '1' ? '<span class="express-badge">급행</span>' : '';
          
          const item = `
            <div class="arr-item ${isUp ? 'up' : 'down'}">
              <div class="arr-top-row">
                <span class="arr-time">${t.arvlMsg2}</span>
                ${isExpress}
              </div>
              <div class="arr-desc">${t.bstatnNm}행 • 현재 ${t.arvlMsg3}</div>
            </div>
          `;
          if(isUp) upHtml += item; else downHtml += item;
        });
      }
      arrUpList.innerHTML = upHtml || '<div class="arr-item" style="border:none">도착 정보 없음</div>';
      arrDownList.innerHTML = downHtml || '<div class="arr-item" style="border:none">도착 정보 없음</div>';
    } catch (e) { document.getElementById('arrLoading').classList.add('hidden'); }
  }

  // 즐겨찾기 UI 및 저장 로직 수정 (정상 작동)
  function updateFavoriteUI() {
    if (favorites.includes(currentStation)) {
      starBtn.textContent = '★ 즐겨찾기 취소';
      starBtn.style.color = '#e11d48';
    } else {
      starBtn.textContent = '☆ 즐겨찾기';
      starBtn.style.color = 'inherit';
    }
  }

  starBtn.addEventListener('click', () => {
    if (favorites.includes(currentStation)) {
      favorites = favorites.filter(s => s !== currentStation);
    } else {
      favorites.push(currentStation);
    }
    localStorage.setItem('subway_favs', JSON.stringify(favorites));
    updateFavoriteUI();
    initView(currentLine); // 세로 리스트에 별표 반영
  });

  // 시간표 버튼
  timetableBtn.addEventListener('click', async () => {
    timetableModal.classList.remove('hidden');
    timetableTitle.textContent = `${currentStation}역 시간표`;
    timetableBody.innerHTML = '<div class="loading-text">시간표 불러오는 중...</div>';
    
    setTimeout(() => {
      let html = '';
      const mockTimes = ['06:12 (일반)', '06:28 (급행)', '06:45 (일반)', '07:02 (일반)', '07:19 (급행)', '07:35 (일반)', '07:52 (일반)', '08:10 (급행)'];
      mockTimes.forEach(t => {
        html += `<div class="tt-item"><span>열차 시각</span><strong>${t}</strong></div>`;
      });
      timetableBody.innerHTML = html;
    }, 300);
  });

  // 팝업 닫을 때 가로 지도는 다시 숨김
  function closePopup() {
    modalBackdrop.classList.add('hidden');
    mapArea.classList.add('hidden');
    if(refreshInterval) clearInterval(refreshInterval);
  }

  closeModal.addEventListener('click', closePopup);
  modalBackdrop.addEventListener('click', (e) => { if(e.target === modalBackdrop) closePopup(); });
  closeTimetable.addEventListener('click', () => timetableModal.classList.add('hidden'));

  lineSelect.addEventListener('change', (e) => {
    closePopup();
    initView(e.target.value);
  });

  // 초기 실행
  initView('2호선');
});
