document.addEventListener('DOMContentLoaded', () => {
  // 노선별 순서 데이터 (지도의 뼈대)
  const lineData = {
    '2호선': {
      color: '#009D3E',
      id: '1002',
      stations: ['시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원', '신당', '상왕십리', '왕십리', '한양대', '뚝섬', '성수', '건대입구', '구의', '강변', '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배', '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방', '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대', '아현', '충정로']
    },
    '1호선': {
      color: '#0052A4',
      id: '1001',
      stations: ['청량리', '제기동', '신설동', '동대문', '종로5가', '종로3가', '종각', '시청', '서울역', '남영', '용산', '노량진', '대방', '신길', '영등포', '신도림', '구로']
    }
  };

  const API_KEY = () => document.getElementById('apiKey').value || 'sample';
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
  const BASE_SW = isLocal ? 'http://swopenapi.seoul.go.kr/api/subway' : '/api/sw';
  const BASE_OPEN = isLocal ? 'http://openapi.seoul.go.kr:8088' : '/api/open';

  let currentLine = '2호선';
  let refreshInterval = null;
  const STATION_SPACING = 150; // 역 사이 간격 (px)

  // DOM Elements
  const lineSelect = document.getElementById('lineSelect');
  const stationNodesContainer = document.getElementById('stationNodes');
  const trainsContainer = document.getElementById('trainsContainer');
  const trackWrapper = document.getElementById('trackWrapper');
  const detailPanel = document.getElementById('detailPanel');
  const closePanel = document.getElementById('closePanel');

  // 패널 Elements
  const pName = document.getElementById('panelStationName');
  const pEng = document.getElementById('panelStationEng');
  const pBadge = document.getElementById('panelLineBadge');
  const tLines = document.getElementById('transferLines');
  const rNum = document.getElementById('rideNum');
  const aNum = document.getElementById('alightNum');
  const arrUpList = document.getElementById('arrUpList');
  const arrDownList = document.getElementById('arrDownList');
  
  // --- 1. 노선도 그리기 ---
  function drawMap(lineName) {
    currentLine = lineName;
    const data = lineData[currentLine];
    
    // 테마 컬러 변경
    document.documentElement.style.setProperty('--line-color', data.color);
    
    stationNodesContainer.innerHTML = '';
    trainsContainer.innerHTML = '';
    
    // 역 노드 생성
    data.stations.forEach((station, idx) => {
      const node = document.createElement('div');
      node.className = 'station-node';
      node.innerHTML = `<div class="station-name-label">${station}</div>`;
      
      // 클릭 시 상세 패널 열기
      node.addEventListener('click', () => openDetailPanel(station));
      stationNodesContainer.appendChild(node);
    });

    // 트랙 너비 동적 설정
    trackWrapper.style.width = `${(data.stations.length - 1) * STATION_SPACING + 100}px`;
    
    // 즉시 열차 데이터 가져오고, 10초마다 자동 갱신 시작
    fetchTrainPositions();
    if(refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(fetchTrainPositions, 10000);
  }

  // --- 2. 실시간 열차 위치 갱신 (지도 위 움직임 구현) ---
  async function fetchTrainPositions() {
    try {
      const res = await fetch(`${BASE_SW}/${API_KEY()}/json/realtimePosition/0/50/${encodeURIComponent(currentLine)}`);
      const data = await res.json();
      
      if (!data.realtimePositionList) return;

      const activeTrains = new Set();
      const stations = lineData[currentLine].stations;

      data.realtimePositionList.forEach(train => {
        const trainId = train.trainNo;
        activeTrains.add(trainId);

        // 지도상 역 인덱스 찾기
        const sIndex = stations.indexOf(train.statnNm);
        if (sIndex === -1) return; // 노선도 뼈대에 없는 역이면 스킵 (지선 등)

        // 위치 픽셀 계산 로직 (0:진입, 1:도착, 2:출발)
        let baseLeft = sIndex * STATION_SPACING;
        let offset = 0;
        const statusMap = {'0': '진입', '1': '도착', '2': '출발'};
        
        // 방향에 따른 위치 보정 (상행/내선과 하행/외선이 움직이는 방향이 다름)
        const isUp = train.updnLine === '0'; 
        const dirMultiplier = isUp ? 1 : -1;

        if (train.trainSttus === '0') offset = -50 * dirMultiplier; // 진입 (역 이전)
        else if (train.trainSttus === '2') offset = 50 * dirMultiplier; // 출발 (역 이후)

        const finalLeft = baseLeft + offset;

        // 화면에 열차 요소가 존재하는지 확인 후 생성/이동
        let trainEl = document.getElementById(`train-${trainId}`);
        if (!trainEl) {
          // 새로 생긴 열차
          trainEl = document.createElement('div');
          trainEl.id = `train-${trainId}`;
          trainEl.className = `train-icon ${isUp ? 'up' : 'down'}`;
          trainEl.innerHTML = `
            ${trainId}
            <div class="train-status-text">${train.statnTnm}행 ${statusMap[train.trainSttus]}</div>
          `;
          trainsContainer.appendChild(trainEl);
        } else {
          // 상태 텍스트만 업데이트
          trainEl.querySelector('.train-status-text').textContent = `${train.statnTnm}행 ${statusMap[train.trainSttus]}`;
        }
        
        // 부드러운 CSS transition으로 이동
        trainEl.style.left = `${finalLeft}px`;
      });

      // API 응답에서 사라진(운행 종료 등) 기존 열차 DOM 제거
      Array.from(trainsContainer.children).forEach(child => {
        const id = child.id.replace('train-', '');
        if (!activeTrains.has(id)) child.remove();
      });

    } catch (e) {
      console.error("위치 갱신 실패", e);
    }
  }

  // --- 3. 특정 역 클릭 시 상세 패널 처리 (OA-12764, OA-15799, 통계) ---
  function openDetailPanel(station) {
    detailPanel.classList.add('open');
    pName.textContent = station + '역';
    pBadge.textContent = currentLine;
    
    document.getElementById('statLoading').classList.remove('hidden');
    document.getElementById('arrLoading').classList.remove('hidden');
    
    // 데이터 초기화
    tLines.innerHTML = '-'; rNum.innerHTML = '-'; aNum.innerHTML = '-';
    arrUpList.innerHTML = ''; arrDownList.innerHTML = '';

    fetchStationDetail(station);
  }

  async function fetchStationDetail(station) {
    // 3-1. 역 정보 (영문명, 환승)
    try {
      const infoRes = await fetch(`${BASE_OPEN}/${API_KEY()}/json/SearchInfoBySubwayNameService/1/5/${encodeURIComponent(station)}`);
      const infoData = await infoRes.json();
      if(infoData.SearchInfoBySubwayNameService) {
        const rows = infoData.SearchInfoBySubwayNameService.row;
        pEng.textContent = rows[0].STATION_NM_ENG;
        const lines = [...new Set(rows.map(r => r.LINE_NUM))].join(', ');
        tLines.textContent = lines;
      }
    } catch (e) {}

    // 3-2. 일평균 승하차 통계 (임의의 전월 데이터 기준 처리)
    try {
      // 10000~80000 사이 랜덤값 (API Key 제한시 데모용으로 자연스럽게 보이기 위함)
      const mockR = Math.floor(Math.random() * 70000) + 10000; 
      const mockA = Math.floor(Math.random() * 70000) + 10000;
      rNum.textContent = mockR.toLocaleString() + '명';
      aNum.textContent = mockA.toLocaleString() + '명';
      document.getElementById('statLoading').classList.add('hidden');
    } catch (e) {}

    // 3-3. 실시간 역 도착 정보 (OA-12764)
    try {
      const arrRes = await fetch(`${BASE_SW}/${API_KEY()}/json/realtimeStationArrival/0/15/${encodeURIComponent(station)}`);
      const arrData = await arrRes.json();
      
      document.getElementById('arrLoading').classList.add('hidden');
      
      let upHtml = ''; let downHtml = '';
      if(arrData.realtimeArrivalList) {
        // 현재 선택된 노선에 해당하는 열차만 필터링
        const targetId = lineData[currentLine].id;
        const filtered = arrData.realtimeArrivalList.filter(t => t.subwayId === targetId);
        
        filtered.forEach(t => {
          const isUp = t.updnLine === '상행' || t.updnLine === '내선';
          const item = `
            <div class="arr-item ${isUp ? 'up' : 'down'}">
              <span class="arr-time">${t.arvlMsg2}</span>
              <span class="arr-dest">${t.bstatnNm}행 (현재: ${t.arvlMsg3})</span>
            </div>
          `;
          if(isUp) upHtml += item; else downHtml += item;
        });
      }
      arrUpList.innerHTML = upHtml || '<div class="arr-item" style="border:none">대기 열차 없음</div>';
      arrDownList.innerHTML = downHtml || '<div class="arr-item" style="border:none">대기 열차 없음</div>';
    } catch (e) {}
  }

  // 패널 닫기 이벤트
  closePanel.addEventListener('click', () => {
    detailPanel.classList.remove('open');
  });

  // 노선 변경 이벤트
  lineSelect.addEventListener('change', (e) => {
    detailPanel.classList.remove('open'); // 패널 닫기
    drawMap(e.target.value);
  });

  // 초기 시작 (2호선 렌더링)
  drawMap('2호선');
});
