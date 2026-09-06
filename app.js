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

  const getApiKey = () => document.getElementById('apiKeyInput').value.trim() || 'sample';
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
  const BASE_SW = isLocal ? 'http://swopenapi.seoul.go.kr/api/subway' : '/api/sw';
  const BASE_OPEN = isLocal ? 'http://openapi.seoul.go.kr:8088' : '/api/open';

  let currentLine = '2호선';
  let refreshInterval = null;
  const V_SPACING = 110;
  const H_SPACING = 120;

  // DOM
  const lineSelect = document.getElementById('lineSelect');
  const fullPopup = document.getElementById('fullPopup');
  const closePopupBtn = document.getElementById('closePopup');
  
  const vMapContainer = document.getElementById('vMapContainer');
  const vStationNodes = document.getElementById('vStationNodes');
  const vTrainsContainer = document.getElementById('vTrainsContainer');
  
  const hTrackWrapper = document.getElementById('hTrackWrapper');
  const hStationNodes = document.getElementById('hStationNodes');
  const hTrainsContainer = document.getElementById('hTrainsContainer');
  
  const pName = document.getElementById('panelStationName');
  const pBadge = document.getElementById('panelLineBadge');
  
  const timeRideNum = document.getElementById('timeRideNum');
  const timeAlightNum = document.getElementById('timeAlightNum');
  const arrUpList = document.getElementById('arrUpList');
  const arrDownList = document.getElementById('arrDownList');
  const ttUpList = document.getElementById('ttUpList');
  const ttDownList = document.getElementById('ttDownList');
  const ttDateType = document.getElementById('ttDateType');

  function getWeekTag() {
    const day = new Date().getDay();
    if (day === 6) return { tag: '2', name: '토요일 기준' };
    if (day === 0) return { tag: '3', name: '휴일(일요일) 기준' };
    return { tag: '1', name: '평일 기준' };
  }

  // 실시간 지도 그리기
  function initMaps(lineName) {
    currentLine = lineName;
    const data = lineData[currentLine];
    document.documentElement.style.setProperty('--line-color', data.color);

    // 1. 세로 지도
    vStationNodes.innerHTML = '';
    vTrainsContainer.innerHTML = '';
    vMapContainer.style.height = `${(data.stations.length - 1) * V_SPACING + 60}px`;

    data.stations.forEach((station, idx) => {
      const node = document.createElement('div');
      node.className = 'v-station-node';
      node.style.top = `${idx * V_SPACING}px`;
      node.innerHTML = `<div class="v-station-name">${station}</div>`;
      node.addEventListener('click', () => openFullPopup(station));
      vStationNodes.appendChild(node);
    });

    // 2. 팝업용 가로 지도
    hStationNodes.innerHTML = '';
    hTrainsContainer.innerHTML = '';
    hTrackWrapper.style.width = `${(data.stations.length - 1) * H_SPACING + 60}px`;

    data.stations.forEach((station, idx) => {
      const node = document.createElement('div');
      node.className = 'h-station-node';
      node.style.left = `${idx * H_SPACING}px`;
      node.innerHTML = `<div class="h-station-name">${station}</div>`;
      hStationNodes.appendChild(node);
    });

    fetchTrainPositions();
    if(refreshInterval) clearInterval(refreshInterval);
    // 10초마다 위치 자동 갱신
    refreshInterval = setInterval(fetchTrainPositions, 10000);
  }

  // ★ 실시간 위치 업데이트 및 열차 표시
  async function fetchTrainPositions() {
    try {
      const res = await fetch(`${BASE_SW}/${getApiKey()}/json/realtimePosition/0/100/${encodeURIComponent(currentLine)}`);
      const data = await res.json();
      if (!data.realtimePositionList) return;

      const activeTrains = new Set();
      const stations = lineData[currentLine].stations;
      const statusMap = {'0': '진입', '1': '도착', '2': '출발'};

      data.realtimePositionList.forEach(train => {
        const trainId = train.trainNo;
        activeTrains.add(trainId);
        
        const sIndex = stations.indexOf(train.statnNm);
        if (sIndex === -1) return; 

        const isUp = train.updnLine === '0'; 
        const dirMultiplier = isUp ? 1 : -1;
        
        let vOffset = 0; let hOffset = 0;

        // 진입/출발 시 픽셀 보정 (상하행 반대로 이동하므로 dirMultiplier 적용)
        if (train.trainSttus === '0') { vOffset = -35 * dirMultiplier; hOffset = -35 * dirMultiplier; }
        else if (train.trainSttus === '2') { vOffset = 35 * dirMultiplier; hOffset = 35 * dirMultiplier; }

        const finalVTop = sIndex * V_SPACING + vOffset;
        const finalHLeft = sIndex * H_SPACING + hOffset;

        // 세로 지도에 열차 반영
        let vTrainEl = document.getElementById(`v-train-${trainId}`);
        if (!vTrainEl) {
          vTrainEl = document.createElement('div');
          vTrainEl.id = `v-train-${trainId}`;
          vTrainEl.className = `v-train ${isUp ? 'up' : 'down'}`;
          vTrainsContainer.appendChild(vTrainEl);
        }
        vTrainEl.innerHTML = `<span>${trainId}</span><div class="v-train-status">${statusMap[train.trainSttus]}</div>`;
        vTrainEl.style.top = `${finalVTop}px`;

        // 가로 지도에 열차 반영 (팝업 켰을 때 보임)
        let hTrainEl = document.getElementById(`h-train-${trainId}`);
        if (!hTrainEl) {
          hTrainEl = document.createElement('div');
          hTrainEl.id = `h-train-${trainId}`;
          hTrainEl.className = `h-train ${isUp ? 'up' : 'down'}`;
          hTrainsContainer.appendChild(hTrainEl);
        }
        hTrainEl.innerHTML = `<span>${trainId}</span><div class="h-train-status">${statusMap[train.trainSttus]}</div>`;
        hTrainEl.style.left = `${finalHLeft}px`;
      });

      // 지도에 없는(운행 종료) 열차 삭제
      Array.from(vTrainsContainer.children).forEach(child => {
        const id = child.id.replace('v-train-', '');
        if (!activeTrains.has(id)) child.remove();
      });
      Array.from(hTrainsContainer.children).forEach(child => {
        const id = child.id.replace('h-train-', '');
        if (!activeTrains.has(id)) child.remove();
      });

    } catch (e) {}
  }

  function openFullPopup(station) {
    fullPopup.classList.remove('hidden');
    pName.textContent = station + '역';
    pBadge.textContent = currentLine;
    
    document.getElementById('arrLoading').classList.remove('hidden');
    document.getElementById('statLoading').classList.remove('hidden');
    document.getElementById('ttLoading').classList.remove('hidden');
    timeRideNum.textContent = '-'; timeAlightNum.textContent = '-';
    arrUpList.innerHTML = ''; arrDownList.innerHTML = '';
    ttUpList.innerHTML = ''; ttDownList.innerHTML = '';

    fetchStationDetails(station);
    // 팝업 열 때 즉시 한번 더 위치 갱신해서 싱크 맞춤
    fetchTrainPositions(); 
  }

  // ★ 시간문자열을 초(second)로 변환하는 안전한 함수
  function timeToSeconds(timeStr) {
    if(!timeStr) return 0;
    const parts = timeStr.split(':');
    return (parseInt(parts[0]) || 0) * 3600 + (parseInt(parts[1]) || 0) * 60 + (parseInt(parts[2]) || 0);
  }

  async function fetchStationDetails(station) {
    const key = getApiKey();

    // 1. 통계 (모의값)
    setTimeout(() => {
      timeRideNum.textContent = (Math.floor(Math.random() * 8000) + 1500).toLocaleString() + '명';
      timeAlightNum.textContent = (Math.floor(Math.random() * 8000) + 1500).toLocaleString() + '명';
      document.getElementById('statLoading').classList.add('hidden');
    }, 300);

    // 2. 실시간 도착 정보 (도착 빠른 순으로 정렬)
    try {
      const arrRes = await fetch(`${BASE_SW}/${key}/json/realtimeStationArrival/0/20/${encodeURIComponent(station)}`);
      const arrData = await arrRes.json();
      document.getElementById('arrLoading').classList.add('hidden');
      
      let upHtml = ''; let downHtml = '';
      if(arrData.realtimeArrivalList) {
        let filtered = arrData.realtimeArrivalList.filter(t => t.subwayId === lineData[currentLine].id);
        
        // 정렬: 진입/도착/초 단위 임박을 최상단으로
        filtered.sort((a, b) => {
          let timeA = parseInt(a.barvlDt) || 9999;
          let timeB = parseInt(b.barvlDt) || 9999;
          if (timeA === 0 && (a.arvlMsg2.includes("도착") || a.arvlMsg2.includes("진입"))) timeA = -1;
          if (timeB === 0 && (b.arvlMsg2.includes("도착") || b.arvlMsg2.includes("진입"))) timeB = -1;
          return timeA - timeB;
        });

        filtered.forEach(t => {
          const isUp = t.updnLine === '상행' || t.updnLine === '내선';
          const isExpress = (t.btrainSttus === '급행' || t.directAt === '1') ? '<span class="exp-badge exp-express">급행</span>' : '<span class="exp-badge exp-normal">일반</span>';
          const item = `
            <div class="arr-item ${isUp ? 'up' : 'down'}">
              <div class="arr-top-row">
                <span class="arr-time">${t.arvlMsg2}</span>
                ${isExpress}
              </div>
              <div class="arr-desc">${t.bstatnNm}행 • ${t.arvlMsg3}</div>
            </div>`;
          if(isUp) upHtml += item; else downHtml += item;
        });
      }
      arrUpList.innerHTML = upHtml || '<div class="arr-item" style="border:none">도착 정보 없음</div>';
      arrDownList.innerHTML = downHtml || '<div class="arr-item" style="border:none">도착 정보 없음</div>';
    } catch (e) { document.getElementById('arrLoading').classList.add('hidden'); }

    // 3. OA-22750 지하철역 시간표 (현재 시간 이후 필터링 완벽 적용)
    try {
      const infoRes = await fetch(`${BASE_OPEN}/${key}/json/SearchInfoBySubwayNameService/1/10/${encodeURIComponent(station)}`);
      const infoData = await infoRes.json();
      let stationCd = null;
      if (infoData.SearchInfoBySubwayNameService && infoData.SearchInfoBySubwayNameService.row) {
        const targetLineId = lineData[currentLine].id;
        const row = infoData.SearchInfoBySubwayNameService.row.find(r => r.LINE_NUM === targetLineId || r.LINE_NUM.includes(currentLine.replace('호선','')));
        stationCd = row ? row.STATION_CD : infoData.SearchInfoBySubwayNameService.row[0].STATION_CD;
      }
      if (!stationCd) throw new Error("역 코드 없음");

      const weekInfo = getWeekTag();
      ttDateType.textContent = weekInfo.name;

      const upRes = await fetch(`${BASE_OPEN}/${key}/json/SearchSTTimeTableByIDService/1/500/${stationCd}/${weekInfo.tag}/1/`);
      const upData = await upRes.json();
      const downRes = await fetch(`${BASE_OPEN}/${key}/json/SearchSTTimeTableByIDService/1/500/${stationCd}/${weekInfo.tag}/2/`);
      const downData = await downRes.json();

      document.getElementById('ttLoading').classList.add('hidden');

      // ★ 현재 시간을 초(Second)로 계산 (새벽 시간 처리 포함)
      const now = new Date();
      let h = now.getHours();
      if (h < 4) h += 24; // 새벽 0~3시는 24~27시로 취급
      const currentSecs = h * 3600 + now.getMinutes() * 60 + now.getSeconds();

      const renderTimetable = (data, isUp) => {
        let html = '';
        if (data.SearchSTTimeTableByIDService && data.SearchSTTimeTableByIDService.row) {
          
          // 초 단위 변환을 통한 확실한 필터링
          let validTrains = data.SearchSTTimeTableByIDService.row.filter(row => {
             return timeToSeconds(row.ARRIVETIME) >= currentSecs;
          });
          
          // 빠른 시간 순으로 정렬 후 상위 10개만 추출
          validTrains.sort((a, b) => timeToSeconds(a.ARRIVETIME) - timeToSeconds(b.ARRIVETIME));
          validTrains = validTrains.slice(0, 10);

          if(validTrains.length === 0) return '<div class="tt-item" style="border:none; text-align:center;">금일 운행 종료</div>';

          validTrains.forEach(row => {
            let expClass = 'exp-normal'; let expText = '일반';
            if (row.EXPRESS_YN === 'G' || row.EXPRESS_YN === 'D' || row.EXPRESS_YN === 'E' || row.FL_FLAG === '급행') {
              expClass = 'exp-express'; expText = '급행';
            } else if (row.EXPRESS_YN === 'S' || row.FL_FLAG === '특급') {
              expClass = 'exp-special'; expText = '특급';
            }

            const displayTime = row.ARRIVETIME.substring(0, 5); 
            html += `
              <div class="tt-item ${isUp ? 'up' : 'down'}">
                <div class="arr-top-row">
                  <span style="font-weight:bold; font-size:14px;">${displayTime}</span>
                  <span class="exp-badge ${expClass}">${expText}</span>
                </div>
                <div class="arr-desc">${row.SUBWAYENAME}행</div>
              </div>
            `;
          });
        }
        return html || '<div class="tt-item" style="border:none; text-align:center;">시간표 없음</div>';
      };

      ttUpList.innerHTML = renderTimetable(upData, true);
      ttDownList.innerHTML = renderTimetable(downData, false);

    } catch (e) {
      document.getElementById('ttLoading').classList.add('hidden');
      ttUpList.innerHTML = '<div class="tt-item" style="border:none">API 데이터 없음</div>';
      ttDownList.innerHTML = '<div class="tt-item" style="border:none">API 데이터 없음</div>';
    }
  }

  closePopupBtn.addEventListener('click', () => fullPopup.classList.add('hidden'));
  lineSelect.addEventListener('change', (e) => {
    fullPopup.classList.add('hidden');
    initMaps(e.target.value);
  });

  initMaps('2호선');
});
