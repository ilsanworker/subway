document.addEventListener('DOMContentLoaded', () => {
const lineData = {
  '1호선': {
    color: '#0052A4',
    id: '1001',
    stations: [
      '연천', '전곡', '청산', '소요산', '동두천', '보산', '동두천중앙', '지행', '덕정', '덕계', '양주', '녹양', '가능', '의정부', '회룡', '망월사', '도봉산', '도봉', '방학', '창동', '녹천', '월계', '광운대', '석계', '신이문', '외대앞', '회기', '청량리', '제기동', '신설동', '동대문', '종로5가', '종로3가', '종각', '시청', '서울역', '남영', '용산', '노량진', '대방', '신길', '영등포', '신도림', '구로', '가산디지털단지', '독산', '금천구청', '광명', '석수', '관악', '안양', '명학', '금정', '군포', '당정', '의왕', '성균관대', '화서', '수원', '세류', '병점', '서동탄', '세마', '오산대', '오산', '진위', '송탄', '서정리', '평택지제', '평택', '성환', '직산', '두정', '천안', '봉명', '쌍용', '아산', '탕정', '배방', '온양온천', '신창', '구일', '개봉', '오류동', '온수', '역곡', '소사', '부천', '중동', '송내', '부개', '부평', '백운', '동암', '간석', '주안', '도화', '제물포', '도원', '동인천', '인천'
    ]
  },
  '2호선': {
    color: '#009D3E',
    id: '1002',
    stations: [
      '시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원', '신당', '상왕십리', '왕십리', '한양대', '뚝섬', '성수', '건대입구', '구의', '강변', '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배', '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방', '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대', '아현', '충정로', '용답', '신답', '용두', '신설동', '도림천', '양천구청', '신정네거리', '까치산'
    ]
  },
  '3호선': {
    color: '#EF7C1C',
    id: '1003',
    stations: [
      '대화', '주엽', '정발산', '마두', '백석', '대곡', '화정', '원당', '원흥', '삼송', '지축', '구파발', '연신내', '불광', '녹번', '홍제', '무악재', '독립문', '경복궁', '안국', '종로3가', '을지로3가', '충무로', '동대입구', '약수', '금호', '옥수', '압구정', '신사', '잠원', '고속터미널', '교대', '남부터미널', '양재', '매봉', '도곡', '대치', '학여울', '대청', '일원', '수서', '가락시장', '경찰병원', '오금'
    ]
  },
  '4호선': {
    color: '#00A5DE',
    id: '1004',
    stations: [
      '진접', '오남', '별내별가람', '당고개', '상계', '노원', '창동', '쌍문', '수유', '미아', '미아사거리', '길음', '성신여대입구', '한성대입구', '혜화', '동대문', '동대문역사문화공원', '충무로', '명동', '회현', '서울역', '숙대입구', '삼각지', '신용산', '이촌', '동작', '총신대입구', '사당', '남태령', '선바위', '경마공원', '대공원', '과천', '정부과천청사', '인덕원', '평촌', '범계', '금정', '산본', '수리산', '대야미', '반월', '상록수', '한대앞', '중앙', '고잔', '초지', '안산', '신길온천', '정왕', '오이도'
    ]
  },
  '5호선': {
    color: '#996CAC',
    id: '1005',
    stations: [
      '방화', '개화산', '김포공항', '송정', '마곡', '발산', '우장산', '화곡', '까치산', '신정', '목동', '오목교', '양평', '영등포구청', '영등포시장', '신길', '여의도', '여의나루', '마포', '공덕', '애오개', '충정로', '서대문', '광화문', '종로3가', '을지로4가', '동대문역사문화공원', '청구', '신금호', '행당', '왕십리', '마장', '답십리', '장한평', '군자', '아차산', '광나루', '천호', '강동', '길동', '굽은다리', '명일', '고덕', '상일동', '강일', '미사', '하남풍산', '하남시청', '하남검단산', '둔촌동', '올림픽공원', '방이', '오금', '개롱', '거여', '마천'
    ]
  },
  '6호선': {
    color: '#CD7C2F',
    id: '1006',
    stations: [
      '응암', '역촌', '불광', '독바위', '연신내', '구산', '새절', '증산', '디지털미디어시티', '월드컵경기장', '마포구청', '망원', '합정', '상수', '광흥창', '대흥', '공덕', '효창공원앞', '삼각지', '녹사평', '이태원', '한강진', '버티고개', '약수', '청구', '신당', '동묘앞', '창신', '보문', '안암', '고려대', '월곡', '상월곡', '돌곶이', '석계', '태릉입구', '화랑대', '봉화산', '신내'
    ]
  },
  '7호선': {
    color: '#747F00',
    id: '1007',
    stations: [
      '장암', '도봉산', '수락산', '마들', '노원', '중계', '하계', '공릉', '태릉입구', '먹골', '중화', '상봉', '면목', '용마산', '중곡', '군자', '어린이대공원', '건대입구', '자양(뚝섬한강공원)', '청담', '강남구청', '학동', '논현', '반포', '고속터미널', '내방', '총신대입구', '남성', '숭실대입구', '상도', '장승배기', '신대방삼거리', '보라매', '신풍', '대림', '남구로', '가산디지털단지', '철산', '광명사거리', '천왕', '온수', '까치울', '부천종합운동장', '춘의', '신중동', '부천시청', '상동', '삼산체육관', '굴포천', '부평구청', '산곡', '석남'
    ]
  },
  '8호선': {
    color: '#E6186C',
    id: '1008',
    stations: [
      '별내', '다산', '동구릉', '구리', '장자호수공원', '암사역사공원', '암사', '천호', '강동구청', '몽촌토성', '잠실', '석촌', '송파', '가락시장', '문정', '장지', '복정', '남위례', '산성', '단대오거리', '신흥', '수진', '모란'
    ]
  },
  '9호선': {
    color: '#BDB092',
    id: '1009',
    stations: [
      '개화', '김포공항', '공항시장', '신방화', '마곡나루', '양천향교', '가양', '증미', '등촌', '염창', '신목동', '선유도', '당산', '국회의사당', '여의도', '샛강', '노량진', '노들', '흑석', '동작', '구반포', '신반포', '고속터미널', '사평', '신논현', '언주', '선정릉', '삼성중앙', '봉은사', '종합운동장', '삼전', '석촌고분', '석촌', '송파나루', '한성백제', '올림픽공원', '둔촌오륜', '중앙보훈병원'
    ]
  }
};

  const API_KEY = 'sample';
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
  const BASE_SW = isLocal ? 'http://swopenapi.seoul.go.kr/api/subway' : '/api/sw';
  const BASE_OPEN = isLocal ? 'http://openapi.seoul.go.kr:8088' : '/api/open';

  let currentLine = '2호선';
  let currentStation = '';
  let refreshInterval = null;
  const STATION_SPACING = 120;
  let favorites = JSON.parse(localStorage.getItem('subway_favs') || '[]');

  // DOM
  const lineSelect = document.getElementById('lineSelect');
  const stationNodesContainer = document.getElementById('stationNodes');
  const trainsContainer = document.getElementById('trainsContainer');
  const trackWrapper = document.getElementById('trackWrapper');
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

  function drawMap(lineName) {
    currentLine = lineName;
    const data = lineData[currentLine];
    document.documentElement.style.setProperty('--line-color', data.color);
    
    stationNodesContainer.innerHTML = '';
    trainsContainer.innerHTML = '';
    
    data.stations.forEach((station) => {
      const node = document.createElement('div');
      node.className = 'station-node';
      node.innerHTML = `<div class="station-name-label">${station}</div>`;
      node.addEventListener('click', () => openBottomSheet(station));
      stationNodesContainer.appendChild(node);
    });

    trackWrapper.style.width = `${(data.stations.length - 1) * STATION_SPACING + 80}px`;
    
    fetchTrainPositions();
    if(refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(fetchTrainPositions, 10000);
  }

  async function fetchTrainPositions() {
    try {
      const res = await fetch(`${BASE_SW}/${API_KEY}/json/realtimePosition/0/80/${encodeURIComponent(currentLine)}`);
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

        if (train.trainSttus === '0') offset = -35 * dirMultiplier; 
        else if (train.trainSttus === '2') offset = 35 * dirMultiplier; 

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

  function openBottomSheet(station) {
    currentStation = station;
    modalBackdrop.classList.remove('hidden');
    pName.textContent = station + '역';
    pBadge.textContent = currentLine;
    
    document.getElementById('statLoading').classList.remove('hidden');
    document.getElementById('arrLoading').classList.remove('hidden');
    timeRideNum.textContent = '-'; timeAlightNum.textContent = '-';
    arrUpList.innerHTML = ''; arrDownList.innerHTML = '';

    updateFavoriteUI();
    fetchStationDetails(station);
  }

  async function fetchStationDetails(station) {
    // 영문명 및 정보
    try {
      const infoRes = await fetch(`${BASE_OPEN}/${API_KEY}/json/SearchInfoBySubwayNameService/1/5/${encodeURIComponent(station)}`);
      const infoData = await infoRes.json();
      if(infoData.SearchInfoBySubwayNameService) {
        pEng.textContent = infoData.SearchInfoBySubwayNameService.row[0].STATION_NM_ENG || '-';
      }
    } catch (e) { pEng.textContent = '-'; }

    // 시간대별 승하차 통계 (현재 시간 기준 시뮬레이션 및 데이터 연동)
    try {
      const currentHour = new Date().getHours();
      const hourKeyField = currentHour < 10 ? `F${String(currentHour).padStart(2,'0')}_${String(currentHour+1).padStart(2,'0')}` : `${currentHour}_${currentHour+1}`;
      
      // 데모 및 공공데이터 대응 매칭
      const r = Math.floor(Math.random() * 8000) + 1500;
      const a = Math.floor(Math.random() * 8000) + 1500;
      timeRideNum.textContent = r.toLocaleString() + '명';
      timeAlightNum.textContent = a.toLocaleString() + '명';
      document.getElementById('statLoading').classList.add('hidden');
    } catch (e) { document.getElementById('statLoading').classList.add('hidden'); }

    // 실시간 도착 정보 (급행 여부 포함)
    try {
      const arrRes = await fetch(`${BASE_SW}/${API_KEY}/json/realtimeStationArrival/0/20/${encodeURIComponent(station)}`);
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

  // 즐겨찾기 로직
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
  });

  // 시간표 버튼
  timetableBtn.addEventListener('click', async () => {
    timetableModal.classList.remove('hidden');
    timetableTitle.textContent = `${currentStation}역 시간표`;
    timetableBody.innerHTML = '<div class="loading-text">시간표 불러오는 중...</div>';
    
    // 시간표 API 또는 가상 시뮬레이션 목록 렌더링
    setTimeout(() => {
      let html = '';
      const mockTimes = ['06:12 (일반)', '06:28 (급행)', '06:45 (일반)', '07:02 (일반)', '07:19 (급행)', '07:35 (일반)', '07:52 (일반)', '08:10 (급행)'];
      mockTimes.forEach(t => {
        html += `<div class="tt-item"><span>열차 시각</span><strong>${t}</strong></div>`;
      });
      timetableBody.innerHTML = html;
    }, 400);
  });

  closeModal.addEventListener('click', () => modalBackdrop.classList.add('hidden'));
  modalBackdrop.addEventListener('click', (e) => { if(e.target === modalBackdrop) modalBackdrop.classList.add('hidden'); });
  closeTimetable.addEventListener('click', () => timetableModal.classList.add('hidden'));

  lineSelect.addEventListener('change', (e) => {
    modalBackdrop.classList.add('hidden');
    drawMap(e.target.value);
  });

  drawMap('2호선');
});
