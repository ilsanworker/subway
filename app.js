document.addEventListener('DOMContentLoaded', () => {
  // 서울 지하철 전체 주요 노선 및 전 역 데이터 세트 구축
  const masterSubwayData = {
    '2호선': [
      '시청', '을지로입구', '을지로3가', '을지로4가', '동대문역사문화공원', '신당', 
      '상왕십리', '왕십리', '한양대', '뚝섬', '성수', '건대입구', '구의', '강변', 
      '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성', '선릉', '역삼', '강남', 
      '교대', '서초', '방배', '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방', 
      '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산', '합정', '홍대입구', 
      '신촌', '이대', '아현', '충정로'
    ],
    '1호선': [
      '소요산', '동두천', '덕정', '의정부', '창동', '광운대', '청량리', '제기동', 
      '신설동', '동대문', '종로5가', '종로3가', '종각', '시청', '서울역', '남영', 
      '용산', '노량진', '신도림', '구로', '가산디지털단지', '석수', '안양', '수원', '천안'
    ],
    '3호선': [
      '대화', '주엽', '정발산', '백석', '대곡', '구파발', '연신내', '불광', '경복궁', 
      '안국', '종로3가', '을지로3가', '충무로', '동대입구', '약수', '옥수', '압구정', 
      '신사', '고속터미널', '교대', '남부터미널', '양재', '매봉', '도곡', '수서'
    ],
    '4호선': [
      '진접', '오남', '당고개', '상계', '노원', '창동', '미아', '성신여대입구', 
      '동대문', '동대문역사문화공원', '충무로', '명동', '서울역', '삼각지', '이촌', 
      '동작', '총신대입구', '사당', '과천', '인덕원', '평촌', '금정', '상록수', '안산', '오이도'
    ],
    '9호선': [
      '개화', '김포공항', '마곡나루', '가양', '염창', '당산', '여의도', '노량진', 
      '동작', '고속터미널', '신반포', '사평', '신논현', '언주', '선정릉', '삼성중앙', 
      '봉은사', '종합운동장', '석촌', '올림픽공원', '중앙보훈병원'
    ],
    '신분당선': [
      '신사', '논현', '신논현', '강남', '양재', '양재시민의숲', '청계산입구', 
      '판교', '정자', '미금', '동천', '수지구청', '성복', '상현', '광교중앙', '광교'
    ]
  };

  let activeLine = '2호선';
  let selectedStation = '강남역';
  const trackContainer = document.getElementById('stationsTrack');
  const trainsLayer = document.getElementById('trainsLayer');
  
  // 1. 노선 칩 클릭 이벤트 설정
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      chips.forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      const line = e.target.getAttribute('data-line');
      if (line === 'ALL') {
        loadLineMap('2호선'); // 전체 선택시 대표 2호선 로드
      } else {
        loadLineMap(line);
      }
    });
  });

  // 2. 지도 노선 렌더링 함수 (전체 역 구현)
  function loadLineMap(lineName) {
    activeLine = lineName;
    const stations = masterSubwayData[lineName] || masterSubwayData['2호선'];
    
    trackContainer.innerHTML = '';
    stations.forEach((stName, idx) => {
      const node = document.createElement('div');
      node.className = `station-node-item ${stName === '강남' ? 'active-node' : ''}`;
      node.innerHTML = `<div class="station-node-label">${stName}</div>`;
      
      node.addEventListener('click', () => {
        document.querySelectorAll('.station-node-item').forEach(n => n.classList.remove('active-node'));
        node.classList.add('active-node');
        selectStation(stName + '역');
      });
      
      trackContainer.appendChild(node);
    });

    // 트랙 너비 동적 조정
    document.querySelector('.track-line-bg').style.width = `${stations.length * 120}px`;
    trackContainer.style.width = `${stations.length * 120}px`;
    trainsLayer.style.width = `${stations.length * 120}px`;

    spawnMockTrains(stations);
  }

  // 3. 지도 위 실시간 열차 텔레메트리 마커 생성
  function spawnMockTrains(stations) {
    trainsLayer.innerHTML = '';
    // 무작위로 몇 개의 열차 배치
    [2, 5, 12, 18].forEach((idx, i) => {
      if (idx < stations.length) {
        const trainEl = document.createElement('div');
        trainEl.className = `map-train-badge ${i % 2 === 0 ? 'red' : ''}`;
        trainEl.style.left = `${idx * 120 + 40}px`;
        trainEl.innerHTML = `<span>🚆</span> 23${i}0호`;
        trainsLayer.appendChild(trainEl);
      }
    });
  }

  // 4. 역 선택 시 하단 바텀 시트 정보 갱신
  function selectStation(fullName) {
    selectedStation = fullName;
    const nameWithoutSuffix = fullName.replace('역', '');
    
    document.getElementById('sheetStationName').textContent = fullName;
    document.getElementById('sheetStationEng').textContent = `${nameWithoutSuffix} · Station`;
    
    // 무작위 혼잡도 연출 시뮬레이션
    const randomCong = Math.floor(Math.random() * 40) + 45;
    document.getElementById('sheetCongestion').textContent = `보통 (${randomCong}%)`;
  }

  // 5. 실시간 시계 타이머
  setInterval(() => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const teleTimeEl = document.getElementById('teleTime');
    if (teleTimeEl) teleTimeEl.textContent = timeStr;
  }, 1000);

  // 6. 탭 전환 로직
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab === 'arrival') document.getElementById('tabArrival').classList.add('active');
      if (targetTab === 'congestion') document.getElementById('tabCongestion').classList.add('active');
      if (targetTab === 'timetable') document.getElementById('tabTimetable').classList.add('active');
      if (targetTab === 'facility') document.getElementById('tabFacility').classList.add('active');
    });
  });

  // 7. 검색바 이벤트 연동
  const globalSearchInput = document.getElementById('globalSearchInput');
  globalSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = globalSearchInput.value.trim().replace('역', '');
      // 전체 노선 데이터에서 역 검색
      for (const [line, stations] of Object.entries(masterSubwayData)) {
        if (stations.includes(query)) {
          loadLineMap(line);
          selectStation(query + '역');
          alert(`"${query}역"을 찾아 해당 노선(${line}) 지도로 이동합니다.`);
          return;
        }
      }
      alert('일치하는 역을 찾지 못했습니다. 올바른 역명을 입력해주세요.');
    }
  });

  // 초기 실행 (2호선 전체 역 로드)
  loadLineMap('2호선');
});
