document.addEventListener('DOMContentLoaded', () => {
  // 1호선 ~ 9호선 전체 주요 노선 데이터 구축
  const lineData = {
    '1호선': {
      color: '#0052A4', id: '1001',
      stations: ['소요산', '동두천', '보산', '동두천중앙', '지행', '덕정', '덕계', '양주', '녹양', '가능', '의정부', '회룡', '망월사', '도봉산', '도봉', '방학', '창동', '월계', '석계', '신이문', '외대앞', '회기', '청량리', '제기동', '신설동', '동대문', '종로5가', '종로3가', '종각', '시청', '서울역', '남영', '용산', '노량진', '대방', '신길', '영등포', '신도림', '구로', '가산디지털단지', '독산', '금천구청', '석수', '관악', '안양', '명학', '군포', '당정', '의왕', '성균관대', '화서', '수원', '세류', '병점', '서동탄', '세마', '오산대', '오산', '진위', '송탄', '서정리', '지제', '평택', '성환', '직산', '두정', '천안', '봉명', '쌍용', '아산', '배방', '온양온천', '신창']
    },
    '2호선': {
      color: '#009D3E', id: '1002',
      stations: ['시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원', '신당', '상왕십리', '왕십리', '한양대', '뚝섬', '성수', '건대입구', '구의', '강변', '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배', '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방', '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대', '아현', '충정로']
    },
    '3호선': {
      color: '#EF7C1C', id: '1003',
      stations: ['대화', '주엽', '정발산', '마두', '백석', '대곡', '화정', '원당', '원흥', '삼송', '지축', '구파발', '연신내', '불광', '녹번', '홍제', '무악재', '독립문', '경복궁', '안국', '종로3가', '을지로3가', '충무로', '동대입구', '약수', '금호', '옥수', '압구정', '신사', '잠원', '고속터미널', '교대', '남부터미널', '양재', '매봉', '도곡', '대치', '학여울', '대청', '일원', '수서', '가락시장', '경찰병원', '오금']
    },
    '4호선': {
      color: '#00A5DE', id: '1004',
      stations: ['진접', '오남', '풍양', '별내별가람', '당고개', '상계', '노원', '창동', '쌍문', '수유', '미아', '미아사거리', '길음', '성신여대입구', '한성대입구', '혜화', '동대문', '동대문역사문화공원', '충무로', '명동', '회현', '서울역', '삼각지', '신용산', '이촌', '동작', '총신대입구', '사당', '남태령', '선바위', '대공원', '과천', '정부과천청사', '인덕원', '평촌', '범계', '금정', '산본', '수리산', '대야미', '반월', '상록수', '한대앞', '중앙', '고잔', '초지', '안산', '신길온천', '정왕', '오이도']
    },
    '5호선': {
      color: '#996CAC', id: '1005',
      stations: ['방화', '개화산', '김포공항', '송정', '마곡', '발산', '우장산', '화곡', '신정', '목동', '오목교', '양평', '영등포구청', '영등포시장', '신길', '여의도', '여의나루', '마포', '공덕', '애오개', '충정로', '서대문', '광화문', '종로3가', '을지로4가', '동대문역사문화공원', '청구', '신금호', '행당', '왕십리', '마장', '답십리', '장한평', '군자', '아차산', '광나루', '천호', '강동', '길동', '굽은다리', '명일', '고덕', '상일동', '강일', '미사', '하남풍산', '하남시청', '하남검단산']
    },
    '6호선': {
      color: '#CD7C2F', id: '1006',
      stations: ['응암', '구산', '연신내', '독바위', '불광', '역촌', '새절', '증산', '디지털미디어시티', '월드컵경기장', '마포구청', '망원', '합정', '상수', '광흥창', '대흥', '공덕', '효창공원앞', '삼각지', '녹사평', '이태원', '한강진', '버티고개', '약수', '청구', '신당', '동묘앞', '창신', '보문', '안암', '고려대', '월곡', '상월곡', '돌곶이', '석계', '태릉입구', '화랑대', '봉화산', '신내']
    },
    '7호선': {
      color: '#747F00', id: '1007',
      stations: ['장암', '도봉산', '수락산', '마들', '노원', '중계', '하계', '공릉', '태릉입구', '먹골', '중화', '상봉', '면목', '사가정', '용마산', '중곡', '군자', '어린이대공원', '건대입구', '뚝섬유원지', '청담', '강남구청', '학동', '논현', '반포', '고속터미널', '내방', '사당', '총신대입구', '남성', '상도', '장승배기', '신대방삼거리', '보라매', '풍납', '신풍', '대림', '남구로', '가산디지털단지', '철산', '광명사거리', '천왕', '옥길', '온수', '까치울', '부천종합운동장', '춘의', '신중동', '부천시청', '상동', '삼산체육관', '굴포천', '부평구청', '석남']
    },
    '8호선': {
      color: '#E6186C', id: '1008',
      stations: ['암사', '천호', '강동구청', '몽촌토성', '잠실', '석촌', '송파', '가락시장', '문정', '장지', '복정', '남위례', '산성', '남한산성입구', '단대오거리', '신흥', '수진', '모란']
    },
    '9호선': {
      color: '#BDB092', id: '1009',
      stations: ['개화', '김포공항', '공항시장', '신방화', '마곡나루', '양천향교', '가양', '증미', '등촌', '염창', '신목동', '선유도', '당산', '국회의사당', '여의도', '샛강', '노들', '흑석', '동작', '구반포', '신반포', '고속터미널', '사평', '신논현', '언주', '선정릉', '선릉', '봉은사', '종합운동장', '삼전', '석촌고분', '석촌', '송파나루', '한성백제', '올림픽공원', '둔촌오륜', '중앙보훈병원']
    }
  };

  const API_KEY = () => document.getElementById('apiKey').value || 'sample';
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
  const BASE_SW = isLocal ? 'http://swopenapi.seoul.go.kr/api/subway' : '/api/sw';
  const BASE_OPEN = isLocal ? 'http://openapi.seoul.go.kr:8088' : '/api/open';

  let currentLine = '2호선';
  let refreshInterval = null;
  const STATION_SPACING = 140; 

  const lineSelect = document.getElementById('lineSelect');
  const stationNodesContainer = document.getElementById('stationNodes');
  const trainsContainer = document.getElementById('trainsContainer');
  const trackWrapper = document.getElementById('trackWrapper');
  const detailPanel = document.getElementById('detailPanel');
  const closePanel = document.getElementById('closePanel');

  const pName = document.getElementById('panelStationName');
  const pEng = document.getElementById('panelStationEng');
  const pBadge = document.getElementById('panelLineBadge');
  const tLines = document.getElementById('transferLines');
  const rNum = document.getElementById('rideNum');
  const aNum = document.getElementById('alightNum');
  const arrUpList = document.getElementById('arrUpList');
  const arrDownList = document.getElementById('arrDownList');
  
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
      node.addEventListener('click', () => openDetailPanel(station));
      stationNodesContainer.appendChild(node);
    });

    trackWrapper.style.width = `${(data.stations.length - 1) * STATION_SPACING + 100}px`;
    
    fetchTrainPositions();
    if(refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(fetchTrainPositions, 10000);
  }

  async function fetchTrainPositions() {
    try {
      const res = await fetch(`${BASE_SW}/${API_KEY()}/json/realtimePosition/0/100/${encodeURIComponent(currentLine)}`);
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

        if (train.trainSttus === '0') offset = -45 * dirMultiplier; 
        else if (train.trainSttus === '2') offset = 45 * dirMultiplier; 

        const finalLeft = baseLeft + offset;

        let trainEl = document.getElementById(`train-${trainId}`);
        if (!trainEl) {
          trainEl = document.createElement('div');
          trainEl.id = `train-${trainId}`;
          trainEl.className = `train-icon ${isUp ? 'up' : 'down'}`;
          trainEl.innerHTML = `
            ${trainId}
            <div class="train-status-text">${train.statnTnm}행 ${statusMap[train.trainSttus]}</div>
          `;
          trainsContainer.appendChild(trainEl);
        } else {
          trainEl.querySelector('.train-status-text').textContent = `${train.statnTnm}행 ${statusMap[train.trainSttus]}`;
        }
        
        trainEl.style.left = `${finalLeft}px`;
      });

      Array.from(trainsContainer.children).forEach(child => {
        const id = child.id.replace('train-', '');
        if (!activeTrains.has(id)) child.remove();
      });

    } catch (e) {
      console.error("위치 갱신 실패", e);
    }
  }

  function openDetailPanel(station) {
    detailPanel.classList.add('open');
    pName.textContent = station + '역';
    pBadge.textContent = currentLine;
    
    document.getElementById('statLoading').classList.remove('hidden');
    document.getElementById('arrLoading').classList.remove('hidden');
    
    tLines.innerHTML = '-'; rNum.innerHTML = '-'; aNum.innerHTML = '-';
    arrUpList.innerHTML = ''; arrDownList.innerHTML = '';

    fetchStationDetail(station);
  }

  async function fetchStationDetail(station) {
    try {
      const infoRes = await fetch(`${BASE_OPEN}/${API_KEY()}/json/SearchInfoBySubwayNameService/1/10/${encodeURIComponent(station)}`);
      const infoData = await infoRes.json();
      if(infoData.SearchInfoBySubwayNameService) {
        const rows = infoData.SearchInfoBySubwayNameService.row;
        pEng.textContent = rows[0].STATION_NM_ENG || '-';
        const lines = [...new Set(rows.map(r => r.LINE_NUM))].join(', ');
        tLines.textContent = lines;
      }
    } catch (e) {
      pEng.textContent = '영문명 정보 없음';
    }

    try {
      const mockR = Math.floor(Math.random() * 60000) + 12000; 
      const mockA = Math.floor(Math.random() * 60000) + 12000;
      rNum.textContent = mockR.toLocaleString() + '명';
      aNum.textContent = mockA.toLocaleString() + '명';
      document.getElementById('statLoading').classList.add('hidden');
    } catch (e) {}

    try {
      const arrRes = await fetch(`${BASE_SW}/${API_KEY()}/json/realtimeStationArrival/0/20/${encodeURIComponent(station)}`);
      const arrData = await arrRes.json();
      
      document.getElementById('arrLoading').classList.add('hidden');
      
      let upHtml = ''; let downHtml = '';
      if(arrData.realtimeArrivalList) {
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
    } catch (e) {
      document.getElementById('arrLoading').classList.add('hidden');
    }
  }

  closePanel.addEventListener('click', () => {
    detailPanel.classList.remove('open');
  });

  lineSelect.addEventListener('change', (e) => {
    detailPanel.classList.remove('open');
    drawMap(e.target.value);
  });

  drawMap('2호선');
});
