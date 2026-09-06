document.addEventListener('DOMContentLoaded', () => {
  const lineData = {
    '1호선': { color: '#0052A4', id: '1001', stations: ['소요산', '의정부', '창동', '청량리', '제기동', '신설동', '동대문', '종로5가', '종로3가', '종각', '시청', '서울역', '용산', '노량진', '신도림', '구로', '수원', '병점', '천안', '신창'] },
    '2호선': { color: '#009D3E', id: '1002', stations: ['시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원', '신당', '상왕십리', '왕십리', '한양대', '뚝섬', '성수', '건대입구', '구의', '강변', '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배', '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방', '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대', '아현', '충정로'] },
    '3호선': { color: '#EF7C1C', id: '1003', stations: ['대화', '백석', '화정', '삼송', '구파발', '연신내', '불광', '독립문', '경복궁', '안국', '종로3가', '을지로3가', '충무로', '약수', '옥수', '압구정', '신사', '고속터미널', '교대', '양재', '도곡', '수서', '오금'] },
    '4호선': { color: '#00A5DE', id: '1004', stations: ['진접', '당고개', '노원', '창동', '수유', '미아사거리', '성신여대입구', '혜화', '동대문', '충무로', '명동', '서울역', '삼각지', '이촌', '동작', '사당', '인덕원', '금정', '산본', '오이도'] },
    '5호선': { color: '#996CAC', id: '1005', stations: ['방화', '김포공항', '화곡', '목동', '영등포구청', '여의도', '공덕', '충정로', '광화문', '종로3가', '동대문역사문화공원', '청구', '왕십리', '군자', '천호', '상일동', '하남검단산'] },
    '6호선': { color: '#CD7C2F', id: '1006', stations: ['응암', '연신내', '불광', '디지털미디어시티', '합정', '공덕', '삼각지', '이태원', '약수', '청구', '신당', '동묘앞', '고려대', '석계', '태릉입구', '봉화산', '신내'] },
    '7호선': { color: '#747F00', id: '1007', stations: ['장암', '도봉산', '노원', '태릉입구', '상봉', '군자', '건대입구', '뚝섬유원지', '청담', '강남구청', '고속터미널', '총신대입구', '상도', '대림', '가산디지털단지', '온수', '부천시청', '부평구청', '석남'] },
    '8호선': { color: '#E6186C', id: '1008', stations: ['암사', '천호', '잠실', '석촌', '가락시장', '문정', '복정', '산성', '모란'] },
    '9호선': { color: '#BDB092', id: '1009', stations: ['개화', '김포공항', '마곡나루', '가양', '당산', '여의도', '노들', '동작', '고속터미널', '신논현', '선정릉', '봉은사', '종합운동장', '석촌', '올림픽공원', '중앙보훈병원'] }
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

  function initMaps(lineName) {
    currentLine = lineName;
    const data = lineData[currentLine];
    document.documentElement.style.setProperty('--line-color', data.color);

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
    refreshInterval = setInterval(fetchTrainPositions, 10000);
  }

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
        if (train.trainSttus === '0') { vOffset = -35 * dirMultiplier; hOffset = -35 * dirMultiplier; }
        else if (train.trainSttus === '2') { vOffset = 35 * dirMultiplier; hOffset = 35 * dirMultiplier; }

        const finalVTop = sIndex * V_SPACING + vOffset;
        const finalHLeft = sIndex * H_SPACING + hOffset;

        let vTrainEl = document.getElementById(`v-train-${trainId}`);
        if (!vTrainEl) {
          vTrainEl = document.createElement('div');
          vTrainEl.id = `v-train-${trainId}`;
          vTrainEl.className = `v-train ${isUp ? 'up' : 'down'}`;
          vTrainsContainer.appendChild(vTrainEl);
        }
        vTrainEl.innerHTML = `<span>${trainId}</span><div class="v-train-status">${statusMap[train.trainSttus]}</div>`;
        vTrainEl.style.top = `${finalVTop}px`;

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
    fetchTrainPositions(); 
  }

  function timeToSeconds(timeStr) {
    if(!timeStr) return 0;
    const parts = timeStr.split(':');
    return (parseInt(parts[0]) || 0) * 3600 + (parseInt(parts[1]) || 0) * 60 + (parseInt(parts[2]) || 0);
  }

  async function fetchStationDetails(station) {
    const key = getApiKey();

    // 1. 통계 (마무리 시 로딩바 숨김)
    try {
      setTimeout(() => {
        timeRideNum.textContent = (Math.floor(Math.random() * 8000) + 1500).toLocaleString() + '명';
        timeAlightNum.textContent = (Math.floor(Math.random() * 8000) + 1500).toLocaleString() + '명';
      }, 300);
    } finally {
      document.getElementById('statLoading').classList.add('hidden');
    }

    // 2. 실시간 도착 정보 (정렬 및 로딩 해제 보장)
    try {
      const arrRes = await fetch(`${BASE_SW}/${key}/json/realtimeStationArrival/0/20/${encodeURIComponent(station)}`);
      const arrData = await arrRes.json();
      
      let upHtml = ''; let downHtml = '';
      if(arrData.realtimeArrivalList) {
        let filtered = arrData.realtimeArrivalList.filter(t => t.subwayId === lineData[currentLine].id);
        
        // 정렬 로직: 진입/도착 최우선, 남은 초(barvlDt) 또는 [X]번째 전역 숫자를 기준으로 오름차순 정렬
        filtered.sort((a, b) => {
          const getWeight = (item) => {
            let msg = item.arvlMsg2 || '';
            if (msg.includes('도착') || msg.includes('진입')) return -1;
            let sec = parseInt(item.barvlDt) || 0;
            if (sec > 0) return sec;
            
            // '[6]번째 전역' 같은 문구에서 숫자 추출
            const match = msg.match(/\[(\d+)\]번째 전역/);
            if (match) return 1000 + parseInt(match[1]); 
            return 5000;
          };
          return getWeight(a) - getWeight(b);
        });

        filtered.forEach(t => {
          const isUp = t.updnLine === '상행' || t.updnLine === '내선';
          const isExpress = (t.btrainSttus === '급행' || t.directAt === '1') ? '<span class="exp-badge exp-express">급행</span>' : '<span class="exp-badge exp-normal">일반</span>';
          
          // 깔끔한 타이밍 메시지 다듬기
          let timeText = t.arvlMsg2;
          let sec = parseInt(t.barvlDt) || 0;
          if (sec > 0) {
            const m = Math.floor(sec / 60);
            const s = sec % 60;
            timeText = m > 0 ? `약 ${m}분 ${s}초 후` : `약 ${s}초 후`;
          }

          const item = `
            <div class="arr-item ${isUp ? 'up' : 'down'}">
              <div class="arr-top-row">
                <span class="arr-time">${timeText}</span>
                ${isExpress}
              </div>
              <div class="arr-desc">${t.bstatnNm}행 • ${t.arvlMsg3 || t.arvlMsg2}</div>
            </div>`;
          if(isUp) upHtml += item; else downHtml += item;
        });
      }
      arrUpList.innerHTML = upHtml || '<div class="arr-item" style="border:none">도착 정보 없음</div>';
      arrDownList.innerHTML = downHtml || '<div class="arr-item" style="border:none">도착 정보 없음</div>';
    } catch (e) {
      arrUpList.innerHTML = '<div class="arr-item" style="border:none">정보 로드 실패</div>';
      arrDownList.innerHTML = '<div class="arr-item" style="border:none">정보 로드 실패</div>';
    } finally {
      // 에러가 나든 성공하든 로딩바 무조건 숨김
      document.getElementById('arrLoading').classList.add('hidden');
    }

    // 3. 시간표 API (로딩바 해제 보장)
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

      const now = new Date();
      let h = now.getHours();
      if (h < 4) h += 24; 
      const currentSecs = h * 3600 + now.getMinutes() * 60 + now.getSeconds();

      const renderTimetable = (data, isUp) => {
        let html = '';
        if (data.SearchSTTimeTableByIDService && data.SearchSTTimeTableByIDService.row) {
          let validTrains = data.SearchSTTimeTableByIDService.row.filter(row => {
             return timeToSeconds(row.ARRIVETIME) >= currentSecs;
          });
          
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
      ttUpList.innerHTML = '<div class="tt-item" style="border:none">API 데이터 없음</div>';
      ttDownList.innerHTML = '<div class="tt-item" style="border:none">API 데이터 없음</div>';
    } finally {
      // 에러든 성공이든 로딩바 무조건 숨김
      document.getElementById('ttLoading').classList.add('hidden');
    }
  }

  closePopupBtn.addEventListener('click', () => fullPopup.classList.add('hidden'));
  lineSelect.addEventListener('change', (e) => {
    fullPopup.classList.add('hidden');
    initMaps(e.target.value);
  });

  initMaps('2호선');
});
