// ============================================================
// Seoul Subway Radar
// app.js
// ============================================================


// ============================================================
// 1. API 설정
// ============================================================

// 실제 API 키를 입력하세요.
// 보안을 위해 배포 시에는 Netlify Function 환경변수를 사용하는 것을 권장합니다.
const MY_API_KEY = '486c77684e696733';

// HTML의 API 키 입력창을 사용할 경우를 대비한 함수
function getApiKey() {
  const input = document.getElementById('apiKeyInput');

  // 입력창에 실제 키가 들어 있으면 그것을 사용
  if (input && input.value && input.value !== 'sample') {
    return input.value.trim();
  }

  // 그렇지 않으면 상단 키 사용
  return MY_API_KEY;
}


// ============================================================
// 2. 페이지 로드
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================
  // 노선 데이터
  // ==========================================================

  const lineData = {

    '1호선': {
      color: '#0052A4',
      id: '1001',
      stations: [
        '연천', '전곡', '청산', '소요산', '동두천', '보산',
        '동두천중앙', '지행', '덕정', '덕계', '양주', '녹양',
        '가능', '의정부', '회룡', '망월사', '도봉산', '도봉',
        '방학', '창동', '녹천', '월계', '광운대', '석계',
        '신이문', '외대앞', '회기', '청량리', '제기동', '신설동',
        '동대문', '종로5가', '종로3가', '종각', '시청', '서울역',
        '남영', '용산', '노량진', '대방', '신길', '영등포',
        '신도림', '구로', '가산디지털단지', '독산', '금천구청',
        '광명', '석수', '관악', '안양', '명학', '금정', '군포',
        '당정', '의왕', '성균관대', '화서', '수원', '세류',
        '병점', '서동탄', '세마', '오산대', '오산', '진위',
        '송탄', '서정리', '평택지제', '평택', '성환', '직산',
        '두정', '천안', '봉명', '쌍용', '아산', '탕정', '배방',
        '온양온천', '신창', '구일', '개봉', '오류동', '온수',
        '역곡', '소사', '부천', '중동', '송내', '부개', '부평',
        '백운', '동암', '간석', '주안', '도화', '제물포', '도원',
        '동인천', '인천'
      ]
    },

    '2호선': {
      color: '#009D3E',
      id: '1002',
      stations: [
        '시청', '을지로입구', '을지로3가', '을지로4가',
        '동대문역사문화공원', '신당', '상왕십리', '왕십리',
        '한양대', '뚝섬', '성수', '건대입구', '구의', '강변',
        '잠실나루', '잠실', '잠실새내', '종합운동장', '삼성',
        '선릉', '역삼', '강남', '교대', '서초', '방배', '사당',
        '낙성대', '서울대입구', '봉천', '신림', '신대방',
        '구로디지털단지', '대림', '신도림', '문래',
        '영등포구청', '당산', '합정', '홍대입구', '신촌', '이대',
        '아현', '충정로', '용답', '신답', '용두', '신설동',
        '도림천', '양천구청', '신정네거리', '까치산'
      ]
    },

    '3호선': {
      color: '#EF7C1C',
      id: '1003',
      stations: [
        '대화', '주엽', '정발산', '마두', '백석', '대곡', '화정',
        '원당', '원흥', '삼송', '지축', '구파발', '연신내',
        '불광', '녹번', '홍제', '무악재', '독립문', '경복궁',
        '안국', '종로3가', '을지로3가', '충무로', '동대입구',
        '약수', '금호', '옥수', '압구정', '신사', '잠원',
        '고속터미널', '교대', '남부터미널', '양재', '매봉',
        '도곡', '대치', '학여울', '대청', '일원', '수서',
        '가락시장', '경찰병원', '오금'
      ]
    },

    '4호선': {
      color: '#00A5DE',
      id: '1004',
      stations: [
        '진접', '오남', '별내별가람', '당고개', '상계', '노원',
        '창동', '쌍문', '수유', '미아', '미아사거리', '길음',
        '성신여대입구', '한성대입구', '혜화', '동대문',
        '동대문역사문화공원', '충무로', '명동', '회현', '서울역',
        '숙대입구', '삼각지', '신용산', '이촌', '동작',
        '총신대입구', '사당', '남태령', '선바위', '경마공원',
        '대공원', '과천', '정부과천청사', '인덕원', '평촌',
        '범계', '금정', '산본', '수리산', '대야미', '반월',
        '상록수', '한대앞', '중앙', '고잔', '초지', '안산',
        '신길온천', '정왕', '오이도'
      ]
    },

    '5호선': {
      color: '#996CAC',
      id: '1005',
      stations: [
        '방화', '개화산', '김포공항', '송정', '마곡', '발산',
        '우장산', '화곡', '까치산', '신정', '목동', '오목교',
        '양평', '영등포구청', '영등포시장', '신길', '여의도',
        '여의나루', '마포', '공덕', '애오개', '충정로', '서대문',
        '광화문', '종로3가', '을지로4가', '동대문역사문화공원',
        '청구', '신금호', '행당', '왕십리', '마장', '답십리',
        '장한평', '군자', '아차산', '광나루', '천호', '강동',
        '길동', '굽은다리', '명일', '고덕', '상일동', '강일',
        '미사', '하남풍산', '하남시청', '하남검단산', '둔촌동',
        '올림픽공원', '방이', '오금', '개롱', '거여', '마천'
      ]
    },

    '6호선': {
      color: '#CD7C2F',
      id: '1006',
      stations: [
        '응암', '역촌', '불광', '독바위', '연신내', '구산',
        '새절', '증산', '디지털미디어시티', '월드컵경기장',
        '마포구청', '망원', '합정', '상수', '광흥창', '대흥',
        '공덕', '효창공원앞', '삼각지', '녹사평', '이태원',
        '한강진', '버티고개', '약수', '청구', '신당', '동묘앞',
        '창신', '보문', '안암', '고려대', '월곡', '상월곡',
        '돌곶이', '석계', '태릉입구', '화랑대', '봉화산', '신내'
      ]
    },

    '7호선': {
      color: '#747F00',
      id: '1007',
      stations: [
        '장암', '도봉산', '수락산', '마들', '노원', '중계',
        '하계', '공릉', '태릉입구', '먹골', '중화', '상봉',
        '면목', '용마산', '중곡', '군자', '어린이대공원',
        '건대입구', '자양(뚝섬한강공원)', '청담', '강남구청',
        '학동', '논현', '반포', '고속터미널', '내방',
        '총신대입구', '남성', '숭실대입구', '상도', '장승배기',
        '신대방삼거리', '보라매', '신풍', '대림', '남구로',
        '가산디지털단지', '철산', '광명사거리', '천왕', '온수',
        '까치울', '부천종합운동장', '춘의', '신중동', '부천시청',
        '상동', '삼산체육관', '굴포천', '부평구청', '산곡', '석남'
      ]
    },

    '8호선': {
      color: '#E6186C',
      id: '1008',
      stations: [
        '별내', '다산', '동구릉', '구리', '장자호수공원',
        '암사역사공원', '암사', '천호', '강동구청', '몽촌토성',
        '잠실', '석촌', '송파', '가락시장', '문정', '장지',
        '복정', '남위례', '산성', '단대오거리', '신흥', '수진',
        '모란'
      ]
    },

    '9호선': {
      color: '#BDB092',
      id: '1009',
      stations: [
        '개화', '김포공항', '공항시장', '신방화', '마곡나루',
        '양천향교', '가양', '증미', '등촌', '염창', '신목동',
        '선유도', '당산', '국회의사당', '여의도', '샛강',
        '노량진', '노들', '흑석', '동작', '구반포', '신반포',
        '고속터미널', '사평', '신논현', '언주', '선정릉',
        '삼성중앙', '봉은사', '종합운동장', '삼전', '석촌고분',
        '석촌', '송파나루', '한성백제', '올림픽공원', '둔촌오륜',
        '중앙보훈병원'
      ]
    },

    'GTX-A': {
      color: '#905A89',
      id: '1032',
      stations: [
        '운정중앙', '킨텍스', '대곡', '연신내', '서울역',
        '수서', '성남', '구성', '동탄'
      ]
    },

    '경의중앙선': {
      color: '#77C4A3',
      id: '1063',
      stations: [
        '도라산', '임진강', '문산', '파주', '월롱', '금촌',
        '금릉', '운정', '야당', '탄현', '일산', '풍산', '백마',
        '곡산', '대곡', '능곡', '행신', '강매', '화전', '수색',
        '디지털미디어시티', '가좌', '신촌', '서울역', '홍대입구',
        '서강대', '공덕', '효창공원앞', '용산', '이촌', '서빙고',
        '한남', '옥수', '응봉', '왕십리', '청량리', '회기',
        '중랑', '상봉', '망우', '양원', '구리', '도농', '양정',
        '덕소', '도심', '팔당', '운길산', '양수', '신원', '아신',
        '오빈', '양평', '원덕', '용문', '지평'
      ]
    }
  };


  // ==========================================================
  // 3. API 주소
  // ==========================================================

  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '';

  const BASE_SW = isLocal
    ? 'http://swopenapi.seoul.go.kr/api/subway'
    : '/api/sw';

  const BASE_OPEN = isLocal
    ? 'http://openapi.seoul.go.kr:8088'
    : '/api/open';


  // ==========================================================
  // 4. 상태
  // ==========================================================

  let currentLine = '2호선';
  let currentStation = '';

  let refreshInterval = null;
  let popupRefreshTimer = null;

  let mapRequestId = 0;
  let popupRequestId = 0;

  let currentPopupStations = [];

  const V_SPACING = 110;
  const H_SPACING = 120;


  // ==========================================================
  // 5. DOM
  // ==========================================================

  const lineSelect =
    document.getElementById('lineSelect');

  const fullPopup =
    document.getElementById('fullPopup');

  const closePopupBtn =
    document.getElementById('closePopup');

  const vMapContainer =
    document.getElementById('vMapContainer');

  const vStationNodes =
    document.getElementById('vStationNodes');

  const vTrainsContainer =
    document.getElementById('vTrainsContainer');

  const hTrackWrapper =
    document.getElementById('hTrackWrapper');

  const hStationNodes =
    document.getElementById('hStationNodes');

  const hTrainsContainer =
    document.getElementById('hTrainsContainer');

  const pName =
    document.getElementById('panelStationName');

  const pBadge =
    document.getElementById('panelLineBadge');

  const timeRideNum =
    document.getElementById('timeRideNum');

  const timeAlightNum =
    document.getElementById('timeAlightNum');

  const arrUpList =
    document.getElementById('arrUpList');

  const arrDownList =
    document.getElementById('arrDownList');

  const ttUpList =
    document.getElementById('ttUpList');

  const ttDownList =
    document.getElementById('ttDownList');

  const ttDateType =
    document.getElementById('ttDateType');


  // ==========================================================
  // 6. 공통 유틸리티
  // ==========================================================

  function escapeHtml(value) {
    return String(value ?? '').replace(
      /[&<>"']/g,
      char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      })[char]
    );
  }


  function normalizeStationName(name) {
    return String(name || '')
      .trim()
      .replace(/\s+/g, '')
      .replace(/\([^)]*\)/g, '')
      .replace(/역$/, '');
  }


  function getStationIndex(stations, name) {
    const target =
      normalizeStationName(name);

    if (!target) return -1;

    let index =
      stations.findIndex(
        station =>
          normalizeStationName(station) === target
      );

    if (index !== -1) {
      return index;
    }

    return stations.findIndex(station => {
      const normalized =
        normalizeStationName(station);

      return (
        normalized.includes(target) ||
        target.includes(normalized)
      );
    });
  }


  function getWeekTag() {
    const day =
      new Date().getDay();

    if (day === 6) {
      return {
        tag: '2',
        name: '토요일 기준'
      };
    }

    if (day === 0) {
      return {
        tag: '3',
        name: '휴일(일요일) 기준'
      };
    }

    return {
      tag: '1',
      name: '평일 기준'
    };
  }


  function timeToSeconds(time) {
    if (!time) return 0;

    const parts =
      String(time).split(':');

    let hour =
      parseInt(parts[0], 10) || 0;

    const minute =
      parseInt(parts[1], 10) || 0;

    const second =
      parseInt(parts[2], 10) || 0;

    // 지하철 시간표의 00~03시는
    // 전날 심야 운행으로 취급
    if (hour < 4) {
      hour += 24;
    }

    return (
      hour * 3600 +
      minute * 60 +
      second
    );
  }


  function getTrainStatusText(status) {
    return {
      '0': '진입',
      '1': '도착',
      '2': '출발',
      '3': '전역출발'
    }[String(status)] || '운행중';
  }


  function getCurrentTimeSeconds() {
    const now = new Date();

    let hour = now.getHours();

    if (hour < 4) {
      hour += 24;
    }

    return (
      hour * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds()
    );
  }


  // ==========================================================
  // 7. 지도 초기화
  // ==========================================================

  function initMaps(lineName) {

    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }

    mapRequestId++;

    currentLine = lineName;

    const data =
      lineData[currentLine];

    if (!data) return;

    document.documentElement.style.setProperty(
      '--line-color',
      data.color
    );

    vStationNodes.innerHTML = '';
    vTrainsContainer.innerHTML = '';

    hStationNodes.innerHTML = '';
    hTrainsContainer.innerHTML = '';

    vMapContainer.style.height =
      `${Math.max(
        1,
        data.stations.length - 1
      ) * V_SPACING + 60}px`;


    // 역 생성
    data.stations.forEach(
      (station, index) => {

        const node =
          document.createElement('div');

        node.className =
          'v-station-node';

        node.style.top =
          `${index * V_SPACING}px`;

        node.innerHTML = `
          <div class="v-station-name">
            ${escapeHtml(station)}
          </div>
        `;

        node.addEventListener(
          'click',
          () => openFullPopup(station)
        );

        vStationNodes.appendChild(node);
      }
    );


    // 첫 데이터 호출
    fetchTrainPositions();

    // 10초마다 갱신
    refreshInterval =
      setInterval(
        fetchTrainPositions,
        10000
      );
  }


  // ==========================================================
  // 8. 역 상세 팝업
  // ==========================================================

  function openFullPopup(station) {

    currentStation = station;

    popupRequestId++;

    const requestId =
      popupRequestId;

    fullPopup.classList.remove('hidden');

    pName.textContent =
      `${station}역`;

    pBadge.textContent =
      currentLine;


    // 로딩 상태
    [
      'arrLoading',
      'statLoading',
      'ttLoading'
    ].forEach(id => {
      document
        .getElementById(id)
        ?.classList.remove('hidden');
    });


    timeRideNum.textContent = '-';
    timeAlightNum.textContent = '-';

    arrUpList.innerHTML = '';
    arrDownList.innerHTML = '';

    ttUpList.innerHTML = '';
    ttDownList.innerHTML = '';


    // ----------------------------------------------------------
    // 가로 지도
    // ----------------------------------------------------------

    const stations =
      lineData[currentLine].stations;

    const centerIdx =
      getStationIndex(
        stations,
        station
      );

    if (centerIdx !== -1) {

      const startIdx =
        Math.max(
          0,
          centerIdx - 3
        );

      const endIdx =
        Math.min(
          stations.length - 1,
          centerIdx + 3
        );

      currentPopupStations =
        stations.slice(
          startIdx,
          endIdx + 1
        );


      hStationNodes.innerHTML = '';
      hTrainsContainer.innerHTML = '';


      hTrackWrapper.style.width =
        `${Math.max(
          1,
          currentPopupStations.length - 1
        ) * H_SPACING + 60}px`;


      currentPopupStations.forEach(
        (stn, index) => {

          const node =
            document.createElement('div');

          node.className =
            'h-station-node';

          node.style.left =
            `${index * H_SPACING}px`;

          const isCurrent =
            normalizeStationName(stn) ===
            normalizeStationName(station);


          node.innerHTML = `
            <div
              class="h-station-name"
              style="${
                isCurrent
                  ? 'color:#fff;font-size:13px;top:-26px;'
                  : ''
              }"
            >
              ${escapeHtml(stn)}
            </div>
          `;

          hStationNodes.appendChild(node);
        }
      );
    }


    // 기존 팝업 타이머 제거
    if (popupRefreshTimer) {
      clearInterval(popupRefreshTimer);
      popupRefreshTimer = null;
    }


    // 최초 데이터
    fetchStationDetails(
      station,
      false,
      requestId
    );

    fetchTrainPositions();


    // 5초마다 상세정보 갱신
    popupRefreshTimer =
      setInterval(() => {

        if (
          fullPopup.classList.contains('hidden') ||
          requestId !== popupRequestId
        ) {
          clearInterval(
            popupRefreshTimer
          );

          popupRefreshTimer = null;

          return;
        }

        fetchStationDetails(
          station,
          true,
          requestId
        );

        fetchTrainPositions();

      }, 5000);
  }


  // ==========================================================
  // 9. 실시간 열차 위치
  // ==========================================================

  async function fetchTrainPositions() {

    const requestLine =
      currentLine;

    const requestId =
      mapRequestId;

    const line =
      lineData[requestLine];

    if (!line) return;


    try {

      const apiKey =
        getApiKey();

      const url =
        `${BASE_SW}/${apiKey}/json/` +
        `realtimePosition/0/100/` +
        `${encodeURIComponent(requestLine)}`;


      const res =
        await fetch(url, {
          cache: 'no-store'
        });


      if (!res.ok) {
        throw new Error(
          `HTTP ${res.status}`
        );
      }


      const data =
        await res.json();


      if (
        requestLine !== currentLine ||
        requestId !== mapRequestId
      ) {
        return;
      }


      const vActiveKeys =
        new Set();

      const hActiveKeys =
        new Set();


      const trains =
        Array.isArray(
          data.realtimePositionList
        )
          ? data.realtimePositionList
          : [];


      trains.forEach(train => {

        // 노선 ID가 존재하는 경우
        if (
          train.subwayId &&
          String(train.subwayId) !==
          String(line.id)
        ) {
          return;
        }


        const trainNo =
          String(
            train.trainNo || ''
          ).trim();

        if (!trainNo) return;


        const isUp =
          String(train.updnLine) === '0';

        const direction =
          isUp ? 1 : -1;


        const status =
          String(
            train.trainSttus ?? ''
          );


        let offset = 0;

        if (
          status === '0' ||
          status === '3'
        ) {
          offset =
            -35 * direction;
        }

        else if (status === '2') {
          offset =
            35 * direction;
        }


        const domKey =
          String(
            `${line.id}-${train.updnLine}-${trainNo}`
          ).replace(
            /[^a-zA-Z0-9_-]/g,
            '_'
          );


        const statusText =
          escapeHtml(
            getTrainStatusText(status)
          );


        // ------------------------------------------------------
        // 세로 지도
        // ------------------------------------------------------

        const vStationIndex =
          getStationIndex(
            line.stations,
            train.statnNm
          );


        if (vStationIndex !== -1) {

          vActiveKeys.add(
            domKey
          );


          let vEl =
            document.getElementById(
              `v-train-${domKey}`
            );


          if (!vEl) {

            vEl =
              document.createElement('div');

            vEl.id =
              `v-train-${domKey}`;

            vTrainsContainer.appendChild(
              vEl
            );
          }


          vEl.className =
            `v-train ${
              isUp ? 'up' : 'down'
            }`;


          vEl.innerHTML = `
            <span>
              ${escapeHtml(trainNo)}
            </span>

            <div class="v-train-status">
              ${statusText}
            </div>
          `;


          vEl.style.top =
            `${
              vStationIndex * V_SPACING +
              offset
            }px`;
        }


        // ------------------------------------------------------
        // 팝업 가로 지도
        // ------------------------------------------------------

        if (
          !fullPopup.classList.contains('hidden') &&
          currentPopupStations.length > 0
        ) {

          const hStationIndex =
            getStationIndex(
              currentPopupStations,
              train.statnNm
            );


          if (hStationIndex !== -1) {

            hActiveKeys.add(
              domKey
            );


            let hEl =
              document.getElementById(
                `h-train-${domKey}`
              );


            if (!hEl) {

              hEl =
                document.createElement('div');

              hEl.id =
                `h-train-${domKey}`;

              hTrainsContainer.appendChild(
                hEl
              );
            }


            hEl.className =
              `h-train ${
                isUp ? 'up' : 'down'
              }`;


            hEl.innerHTML = `
              <span>
                ${escapeHtml(trainNo)}
              </span>

              <div class="h-train-status">
                ${statusText}
              </div>
            `;


            hEl.style.left =
              `${
                hStationIndex * H_SPACING +
                offset
              }px`;
          }
        }

      });


      // --------------------------------------------------------
      // 사라진 열차 제거
      // --------------------------------------------------------

      Array.from(
        vTrainsContainer.children
      ).forEach(el => {

        const key =
          el.id.replace(
            'v-train-',
            ''
          );

        if (!vActiveKeys.has(key)) {
          el.remove();
        }
      });


      Array.from(
        hTrainsContainer.children
      ).forEach(el => {

        const key =
          el.id.replace(
            'h-train-',
            ''
          );

        if (!hActiveKeys.has(key)) {
          el.remove();
        }
      });


    } catch (error) {

      console.error(
        '[실시간 열차 위치 오류]',
        error
      );
    }
  }


  // ==========================================================
  // 10. 실시간 도착 정보
  // ==========================================================

  async function fetchArrivalInfo(
    station,
    requestId
  ) {

    const reqStation =
      normalizeStationName(station);

    const apiKey =
      getApiKey();


    const url =
      `${BASE_SW}/${apiKey}/json/` +
      `realtimeStationArrival/0/30/` +
      `${encodeURIComponent(reqStation)}`;


    try {

      const res =
        await fetch(url, {
          cache: 'no-store'
        });


      if (!res.ok) {
        throw new Error(
          `HTTP ${res.status}`
        );
      }


      const data =
        await res.json();


      if (
        requestId !== popupRequestId
      ) {
        return;
      }


      const list =
        Array.isArray(
          data.realtimeArrivalList
        )
          ? data.realtimeArrivalList
          : [];


      const targetId =
        String(
          lineData[currentLine].id
        );


      let filtered =
        list.filter(
          train =>
            String(
              train.subwayId || ''
            ) === targetId
        );


      // 노선 ID가 API에서 빠지는 경우
      if (filtered.length === 0) {
        filtered = list;
      }


      // --------------------------------------------------------
      // 도착 순서 정렬
      // --------------------------------------------------------

      filtered.sort((a, b) => {

        const getWeight = train => {

          const msg =
            String(
              train.arvlMsg2 || ''
            );


          if (msg.includes('도착')) {
            return 0;
          }


          if (msg.includes('진입')) {
            return 1;
          }


          const seconds =
            parseInt(
              train.barvlDt,
              10
            );


          if (
            Number.isFinite(seconds) &&
            seconds > 0
          ) {
            return 10 + seconds;
          }


          const match =
            msg.match(
              /\[(\d+)\]번째 전역/
            );


          if (match) {
            return (
              1000 +
              parseInt(
                match[1],
                10
              )
            );
          }


          return 5000;
        };


        return (
          getWeight(a) -
          getWeight(b)
        );
      });


      let upHtml = '';
      let downHtml = '';


      filtered.forEach(train => {

        const isUp =
          train.updnLine === '상행' ||
          train.updnLine === '내선' ||
          String(train.updnLine) === '0';


        let stationCount = '';

        let timeText =
          train.arvlMsg2 ||
          '운행중';

        let statusText =
          '운행중';


        const rawMsg =
          String(
            train.arvlMsg2 || ''
          );


        const stationMatch =
          rawMsg.match(
            /\[(\d+)\]번째 전역/
          );


        if (stationMatch) {

          stationCount =
            `${stationMatch[1]}번째 전역 전`;
        }


        // 남은 초
        const seconds =
          parseInt(
            train.barvlDt,
            10
          );


        if (
          Number.isFinite(seconds) &&
          seconds > 0
        ) {

          const minutes =
            Math.floor(
              seconds / 60
            );

          const remainSeconds =
            seconds % 60;


          if (minutes > 0) {

            timeText =
              `약 ${minutes}분 ` +
              `${remainSeconds}초 후`;

          } else {

            timeText =
              `약 ${remainSeconds}초 후`;
          }
        }


        if (rawMsg.includes('진입')) {
          statusText = '진입';
        }

        else if (
          rawMsg.includes('도착')
        ) {
          statusText = '도착';
        }

        else if (
          rawMsg.includes('출발')
        ) {
          statusText = '출발';
        }

        else if (
          train.trainSttus !== undefined
        ) {
          statusText =
            getTrainStatusText(
              train.trainSttus
            );
        }


        // 급행
        const expClass =
          (
            train.btrainSttus === '급행' ||
            String(train.directAt) === '1'
          )
            ? 'exp-express'
            : (
              train.btrainSttus === '특급' ||
              String(train.directAt) === '7'
            )
              ? 'exp-special'
              : 'exp-normal';


        const expText =
          expClass === 'exp-express'
            ? '급행'
            : expClass === 'exp-special'
              ? '특급'
              : '일반';


        const item = `
          <div
            class="arr-item ${
              isUp ? 'up' : 'down'
            }"
          >

            <div class="arr-top-row">

              <span class="arr-time">
                ${escapeHtml(timeText)}
              </span>

              <span
                class="exp-badge ${expClass}"
              >
                ${expText}
              </span>

            </div>

            <div class="arr-desc">

              ${escapeHtml(
                train.bstatnNm ||
                train.statnTnm ||
                '방면'
              )}행

              ${
                stationCount
                  ? `• ${escapeHtml(stationCount)}`
                  : ''
              }

              <br>

              현재:
              ${escapeHtml(
                train.arvlMsg3 ||
                train.statnNm ||
                '운행중'
              )}

              (${escapeHtml(statusText)})

            </div>

          </div>
        `;


        if (isUp) {
          upHtml += item;
        } else {
          downHtml += item;
        }

      });


      arrUpList.innerHTML =
        upHtml ||
        `
          <div
            class="arr-item"
            style="
              border:none;
              text-align:center;
            "
          >
            도착 대기 중인 열차 없음
          </div>
        `;


      arrDownList.innerHTML =
        downHtml ||
        `
          <div
            class="arr-item"
            style="
              border:none;
              text-align:center;
            "
          >
            도착 대기 중인 열차 없음
          </div>
        `;


    } catch (error) {

      console.error(
        '[도착 정보 오류]',
        error
      );


      if (
        requestId === popupRequestId
      ) {

        arrUpList.innerHTML =
          `
            <div
              class="arr-item"
              style="border:none"
            >
              데이터 없음
            </div>
          `;


        arrDownList.innerHTML =
          `
            <div
              class="arr-item"
              style="border:none"
            >
              데이터 없음
            </div>
          `;
      }

    } finally {

      if (
        requestId === popupRequestId
      ) {

        document
          .getElementById('arrLoading')
          ?.classList.add('hidden');
      }
    }
  }


  // ==========================================================
  // 11. 승하차 통계
  // ==========================================================

  async function fetchStatistics(
    station,
    requestId
  ) {

    try {

      const date =
        new Date();

      // 3일 전
      date.setDate(
        date.getDate() - 3
      );


      const dateString =
        `${date.getFullYear()}` +
        `${String(
          date.getMonth() + 1
        ).padStart(2, '0')}` +
        `${String(
          date.getDate()
        ).padStart(2, '0')}`;


      const apiKey =
        getApiKey();


      const url =
        `${BASE_OPEN}/${apiKey}/json/` +
        `CardSubwayStatsNew/1/1000/` +
        `${dateString}`;


      const res =
        await fetch(url, {
          cache: 'no-store'
        });


      if (!res.ok) {
        throw new Error(
          `HTTP ${res.status}`
        );
      }


      const data =
        await res.json();


      if (
        requestId !== popupRequestId
      ) {
        return;
      }


      const rows =
        data
          .CardSubwayStatsNew
          ?.row || [];


      const targetStation =
        normalizeStationName(
          station
        );


      const match =
        rows.find(row =>
          normalizeStationName(
            row.SUB_STA_NM
          ) === targetStation
        );


      if (!match) {
        throw new Error(
          '승하차 통계 데이터 없음'
        );
      }


      timeRideNum.textContent =
        `${Number(
          match.RIDE_PASGR_NUM
        ).toLocaleString()}명`;


      timeAlightNum.textContent =
        `${Number(
          match.ALIGHT_PASGR_NUM
        ).toLocaleString()}명`;


    } catch (error) {

      console.error(
        '[승하차 통계 오류]',
        error
      );


      if (
        requestId === popupRequestId
      ) {

        timeRideNum.textContent =
          '데이터 없음';

        timeAlightNum.textContent =
          '데이터 없음';
      }

    } finally {

      if (
        requestId === popupRequestId
      ) {

        document
          .getElementById('statLoading')
          ?.classList.add('hidden');
      }
    }
  }


  // ==========================================================
  // 12. 역 코드 검색
  // ==========================================================

  async function findStationCode(
    station,
    requestId
  ) {

    const reqStation =
      normalizeStationName(station);

    const apiKey =
      getApiKey();


    const url =
      `${BASE_OPEN}/${apiKey}/json/` +
      `SearchInfoBySubwayNameService/1/100/` +
      `${encodeURIComponent(reqStation)}`;


    console.log(
      '[시간표] 역 검색:',
      reqStation
    );


    const res =
      await fetch(url, {
        cache: 'no-store'
      });


    if (!res.ok) {
      throw new Error(
        `역 검색 HTTP ${res.status}`
      );
    }


    const data =
      await res.json();


    console.log(
      '[시간표] 역 검색 응답:',
      data
    );


    if (
      requestId !== popupRequestId
    ) {
      return null;
    }


    const rows =
      data
        .SearchInfoBySubwayNameService
        ?.row || [];


    if (!rows.length) {
      throw new Error(
        '해당 역의 역 코드 검색 결과가 없습니다.'
      );
    }


    const lineName =
      currentLine;


    const lineId =
      String(
        lineData[lineName]?.id || ''
      );


    const lineNumber =
      lineName
        .replace('호선', '')
        .trim();


    // ----------------------------------------------------------
    // 가장 정확한 매칭
    // ----------------------------------------------------------

    let match =
      rows.find(row =>
        String(
          row.LINE_NUM || ''
        ).trim() === lineName
      );


    // LINE_NUM이 "2호선(순환)" 같은 경우
    if (!match) {

      match =
        rows.find(row => {

          const value =
            String(
              row.LINE_NUM || ''
            );

          return value.includes(
            lineName
          );
        });
    }


    // ----------------------------------------------------------
    // 숫자 노선
    // ----------------------------------------------------------

    if (!match && /^[1-9]$/.test(lineNumber)) {

      match =
        rows.find(row => {

          const value =
            String(
              row.LINE_NUM || ''
            );


          return (
            value === lineNumber ||
            value === `${lineNumber}호선` ||
            value.includes(
              `${lineNumber}호선`
            )
          );
        });
    }


    // ----------------------------------------------------------
    // 역 ID를 이용한 보조 매칭
    // ----------------------------------------------------------

    if (!match && lineId) {

      match =
        rows.find(row =>
          String(
            row.SUBWAY_ID || ''
          ) === lineId
        );
    }


    // ----------------------------------------------------------
    // GTX-A
    // ----------------------------------------------------------

    if (!match && lineName === 'GTX-A') {

      match =
        rows.find(row => {

          const value =
            String(
              row.LINE_NUM || ''
            ).toUpperCase();

          return (
            value.includes('GTX') ||
            value.includes('A')
          );
        });
    }


    // ----------------------------------------------------------
    // 경의중앙선
    // ----------------------------------------------------------

    if (
      !match &&
      lineName === '경의중앙선'
    ) {

      match =
        rows.find(row => {

          const value =
            String(
              row.LINE_NUM || ''
            );

          return (
            value.includes('경의') ||
            value.includes('중앙')
          );
        });
    }


    // ----------------------------------------------------------
    // 최후 fallback
    // ----------------------------------------------------------

    if (!match) {

      console.warn(
        '[시간표] 노선 매칭 실패. 첫 번째 결과 사용:',
        rows[0]
      );

      match = rows[0];
    }


    const stationCd =
      match.STATION_CD;


    if (!stationCd) {
      throw new Error(
        'STATION_CD를 찾을 수 없습니다.'
      );
    }


    console.log(
      '[시간표] 선택된 역:',
      station,
      '| 노선:',
      currentLine,
      '| STATION_CD:',
      stationCd,
      '| LINE_NUM:',
      match.LINE_NUM
    );


    return stationCd;
  }


  // ==========================================================
  // 13. 시간표 API 호출
  // ==========================================================

  async function fetchTimetable(
    station,
    requestId
  ) {

    const week =
      getWeekTag();


    ttDateType.textContent =
      week.name;


    let stationCd = null;


    // ----------------------------------------------------------
    // 역 코드 가져오기
    // ----------------------------------------------------------

    try {

      stationCd =
        await findStationCode(
          station,
          requestId
        );

    } catch (error) {

      console.error(
        '[시간표] 역 코드 검색 실패:',
        error
      );

      if (
        requestId === popupRequestId
      ) {

        ttUpList.innerHTML = `
          <div
            class="tt-item"
            style="
              border:none;
              text-align:center;
            "
          >
            역 코드 데이터를 가져올 수 없습니다.
          </div>
        `;

        ttDownList.innerHTML = `
          <div
            class="tt-item"
            style="
              border:none;
              text-align:center;
            "
          >
            역 코드 데이터를 가져올 수 없습니다.
          </div>
        `;
      }

      return;
    }


    if (
      !stationCd ||
      requestId !== popupRequestId
    ) {
      return;
    }


    let upRows = [];
    let downRows = [];


    // ----------------------------------------------------------
    // 상행 / 하행 시간표
    // ----------------------------------------------------------

    try {

      const apiKey =
        getApiKey();


      const upUrl =
        `${BASE_OPEN}/${apiKey}/json/` +
        `SearchSTTimeTableByIDService/1/500/` +
        `${stationCd}/${week.tag}/1/`;


      const downUrl =
        `${BASE_OPEN}/${apiKey}/json/` +
        `SearchSTTimeTableByIDService/1/500/` +
        `${stationCd}/${week.tag}/2/`;


      console.log(
        '[시간표] 상행 요청:',
        upUrl
      );

      console.log(
        '[시간표] 하행 요청:',
        downUrl
      );


      const [
        upRes,
        downRes
      ] = await Promise.all([

        fetch(upUrl, {
          cache: 'no-store'
        }),

        fetch(downUrl, {
          cache: 'no-store'
        })

      ]);


      if (!upRes.ok) {

        console.error(
          '[시간표] 상행 HTTP:',
          upRes.status
        );
      }


      if (!downRes.ok) {

        console.error(
          '[시간표] 하행 HTTP:',
          downRes.status
        );
      }


      const upData =
        await upRes.json();

      const downData =
        await downRes.json();


      console.log(
        '[시간표] 상행 응답:',
        upData
      );

      console.log(
        '[시간표] 하행 응답:',
        downData
      );


      upRows =
        upData
          .SearchSTTimeTableByIDService
          ?.row || [];


      downRows =
        downData
          .SearchSTTimeTableByIDService
          ?.row || [];


    } catch (error) {

      console.error(
        '[시간표] API 호출 실패:',
        error
      );
    }


    if (
      requestId !== popupRequestId
    ) {
      return;
    }


    // ========================================================
    // 시간표 렌더링
    // ========================================================

    function renderTimetable(
      rows,
      isUp
    ) {

      if (!Array.isArray(rows) ||
          rows.length === 0) {

        return `
          <div
            class="tt-item"
            style="
              border:none;
              text-align:center;
            "
          >
            시간표 데이터 없음
          </div>
        `;
      }


      const nowSeconds =
        getCurrentTimeSeconds();


      // ------------------------------------------------------
      // 시간 필드 추출
      // ------------------------------------------------------

      function getRowTime(row) {

        return (
          row.ARRIVETIME ||
          row.LEFTTIME ||
          row.DEPTIME ||
          row.ARRIVE_TIME ||
          row.LEFT_TIME ||
          ''
        );
      }


      // ------------------------------------------------------
      // 현재 이후 열차만 추출
      // ------------------------------------------------------

      let validRows =
        rows
          .filter(row => {

            const time =
              getRowTime(row);

            if (!time) {
              return false;
            }

            return (
              timeToSeconds(time) >=
              nowSeconds
            );
          })
          .sort((a, b) => {

            return (
              timeToSeconds(
                getRowTime(a)
              ) -
              timeToSeconds(
                getRowTime(b)
              )
            );

          })
          .slice(0, 10);


      // ------------------------------------------------------
      // 현재 이후 열차가 없다면
      // ------------------------------------------------------

      if (!validRows.length) {

        return `
          <div
            class="tt-item"
            style="
              border:none;
              text-align:center;
            "
          >
            금일 운행 종료
          </div>
        `;
      }


      // ------------------------------------------------------
      // HTML 생성
      // ------------------------------------------------------

      return validRows
        .map(row => {

          const rawTime =
            getRowTime(row);


          const timeStr =
            String(rawTime)
              .substring(0, 5);


          // 급행
          const isExpress =
            row.EXPRESS_YN === 'G' ||
            row.EXPRESS_YN === 'D' ||
            row.EXPRESS_YN === 'E' ||
            row.FL_FLAG === '급행';


          // 특급
          const isSpecial =
            row.EXPRESS_YN === 'S' ||
            row.FL_FLAG === '특급';


          const expClass =
            isExpress
              ? 'exp-express'
              : isSpecial
                ? 'exp-special'
                : 'exp-normal';


          const expText =
            isExpress
              ? '급행'
              : isSpecial
                ? '특급'
                : '일반';


          const destination =
            row.SUBWAYENAME ||
            row.SUBWAYSNAME ||
            row.DESTSTATION ||
            row.DEST_STATION ||
            row.TRAIN_NO ||
            row.TRAINNO ||
            '방면';


          return `
            <div
              class="tt-item ${
                isUp ? 'up' : 'down'
              }"
            >

              <div class="arr-top-row">

                <span
                  style="
                    font-weight:bold;
                    font-size:14px;
                  "
                >
                  ${escapeHtml(timeStr)}
                </span>

                <span
                  class="exp-badge ${expClass}"
                >
                  ${expText}
                </span>

              </div>

              <div class="arr-desc">
                ${escapeHtml(
                  destination
                )}행
              </div>

            </div>
          `;
        })
        .join('');
    }


    // ========================================================
    // 화면 출력
    // ========================================================

    ttUpList.innerHTML =
      renderTimetable(
        upRows,
        true
      );


    ttDownList.innerHTML =
      renderTimetable(
        downRows,
        false
      );


    // 로딩 제거
    document
      .getElementById('ttLoading')
      ?.classList.add('hidden');
  }


  // ==========================================================
  // 14. 통합 상세정보
  // ==========================================================

  function fetchStationDetails(
    station,
    isSilent = false,
    requestId = popupRequestId
  ) {

    if (!isSilent) {

      [
        'arrLoading',
        'statLoading',
        'ttLoading'
      ].forEach(id => {

        document
          .getElementById(id)
          ?.classList.remove(
            'hidden'
          );
      });
    }


    fetchArrivalInfo(
      station,
      requestId
    );


    fetchStatistics(
      station,
      requestId
    );


    fetchTimetable(
      station,
      requestId
    );
  }


  // ==========================================================
  // 15. 팝업 닫기
  // ==========================================================

  closePopupBtn.addEventListener(
    'click',
    () => {

      fullPopup.classList.add(
        'hidden'
      );

      popupRequestId++;

      currentPopupStations = [];

      hStationNodes.innerHTML = '';
      hTrainsContainer.innerHTML = '';


      if (popupRefreshTimer) {

        clearInterval(
          popupRefreshTimer
        );

        popupRefreshTimer = null;
      }
    }
  );


  // ==========================================================
  // 16. 노선 변경
  // ==========================================================

  lineSelect.addEventListener(
    'change',
    event => {

      fullPopup.classList.add(
        'hidden'
      );

      popupRequestId++;

      currentPopupStations = [];

      if (popupRefreshTimer) {

        clearInterval(
          popupRefreshTimer
        );

        popupRefreshTimer = null;
      }


      initMaps(
        event.target.value
      );
    }
  );


  // ==========================================================
  // 17. 초기 실행
  // ==========================================================

  initMaps('2호선');

});
