document.addEventListener('DOMContentLoaded', () => {

  const lineData = {
    '1호선': {
      color: '#0052A4',
      id: '1001',
      stations: [
        '연천', '전곡', '청산', '소요산', '동두천', '보산', '동두천중앙',
        '지행', '덕정', '덕계', '양주', '녹양', '가능', '의정부', '회룡',
        '망월사', '도봉산', '도봉', '방학', '창동', '녹천', '월계', '광운대',
        '석계', '신이문', '외대앞', '회기', '청량리', '제기동', '신설동',
        '동대문', '종로5가', '종로3가', '종각', '시청', '서울역', '남영',
        '용산', '노량진', '대방', '신길', '영등포', '신도림', '구로',
        '가산디지털단지', '독산', '금천구청', '광명', '석수', '관악',
        '안양', '명학', '금정', '군포', '당정', '의왕', '성균관대', '화서',
        '수원', '세류', '병점', '서동탄', '세마', '오산대', '오산', '진위',
        '송탄', '서정리', '평택지제', '평택', '성환', '직산', '두정', '천안',
        '봉명', '쌍용', '아산', '탕정', '배방', '온양온천', '신창', '구일',
        '개봉', '오류동', '온수', '역곡', '소사', '부천', '중동', '송내',
        '부개', '부평', '백운', '동암', '간석', '주안', '도화', '제물포',
        '도원', '동인천', '인천'
      ]
    },

    '2호선': {
      color: '#009D3E',
      id: '1002',
      stations: [
        '시청', '을지로입구', '을지로3가', '을지로4가',
        '동대문역사문화공원', '신당', '상왕십리', '왕십리', '한양대', '뚝섬',
        '성수', '건대입구', '구의', '강변', '잠실나루', '잠실', '잠실새내',
        '종합운동장', '삼성', '선릉', '역삼', '강남', '교대', '서초', '방배',
        '사당', '낙성대', '서울대입구', '봉천', '신림', '신대방',
        '구로디지털단지', '대림', '신도림', '문래', '영등포구청', '당산',
        '합정', '홍대입구', '신촌', '이대', '아현', '충정로',
        '용답', '신답', '용두', '신설동', '도림천', '양천구청',
        '신정네거리', '까치산'
      ]
    },

    '3호선': {
      color: '#EF7C1C',
      id: '1003',
      stations: [
        '대화', '주엽', '정발산', '마두', '백석', '대곡', '화정', '원당',
        '원흥', '삼송', '지축', '구파발', '연신내', '불광', '녹번', '홍제',
        '무악재', '독립문', '경복궁', '안국', '종로3가', '을지로3가',
        '충무로', '동대입구', '약수', '금호', '옥수', '압구정', '신사',
        '잠원', '고속터미널', '교대', '남부터미널', '양재', '매봉', '도곡',
        '대치', '학여울', '대청', '일원', '수서', '가락시장', '경찰병원',
        '오금'
      ]
    },

    '4호선': {
      color: '#00A5DE',
      id: '1004',
      stations: [
        '진접', '오남', '별내별가람', '당고개', '상계', '노원', '창동',
        '쌍문', '수유', '미아', '미아사거리', '길음', '성신여대입구',
        '한성대입구', '혜화', '동대문', '동대문역사문화공원', '충무로',
        '명동', '회현', '서울역', '숙대입구', '삼각지', '신용산', '이촌',
        '동작', '총신대입구', '사당', '남태령', '선바위', '경마공원',
        '대공원', '과천', '정부과천청사', '인덕원', '평촌', '범계', '금정',
        '산본', '수리산', '대야미', '반월', '상록수', '한대앞', '중앙',
        '고잔', '초지', '안산', '신길온천', '정왕', '오이도'
      ]
    },

    '5호선': {
      color: '#996CAC',
      id: '1005',
      stations: [
        '방화', '개화산', '김포공항', '송정', '마곡', '발산', '우장산',
        '화곡', '까치산', '신정', '목동', '오목교', '양평', '영등포구청',
        '영등포시장', '신길', '여의도', '여의나루', '마포', '공덕', '애오개',
        '충정로', '서대문', '광화문', '종로3가', '을지로4가',
        '동대문역사문화공원', '청구', '신금호', '행당', '왕십리', '마장',
        '답십리', '장한평', '군자', '아차산', '광나루', '천호', '강동',
        '길동', '굽은다리', '명일', '고덕', '상일동', '강일', '미사',
        '하남풍산', '하남시청', '하남검단산', '둔촌동', '올림픽공원', '방이',
        '오금', '개롱', '거여', '마천'
      ]
    },

    '6호선': {
      color: '#CD7C2F',
      id: '1006',
      stations: [
        '응암', '역촌', '불광', '독바위', '연신내', '구산', '새절', '증산',
        '디지털미디어시티', '월드컵경기장', '마포구청', '망원', '합정', '상수',
        '광흥창', '대흥', '공덕', '효창공원앞', '삼각지', '녹사평', '이태원',
        '한강진', '버티고개', '약수', '청구', '신당', '동묘앞', '창신',
        '보문', '안암', '고려대', '월곡', '상월곡', '돌곶이', '석계',
        '태릉입구', '화랑대', '봉화산', '신내'
      ]
    },

    '7호선': {
      color: '#747F00',
      id: '1007',
      stations: [
        '장암', '도봉산', '수락산', '마들', '노원', '중계', '하계', '공릉',
        '태릉입구', '먹골', '중화', '상봉', '면목', '용마산', '중곡', '군자',
        '어린이대공원', '건대입구', '자양(뚝섬한강공원)', '청담', '강남구청',
        '학동', '논현', '반포', '고속터미널', '내방', '총신대입구', '남성',
        '숭실대입구', '상도', '장승배기', '신대방삼거리', '보라매', '신풍',
        '대림', '남구로', '가산디지털단지', '철산', '광명사거리', '천왕',
        '온수', '까치울', '부천종합운동장', '춘의', '신중동', '부천시청',
        '상동', '삼산체육관', '굴포천', '부평구청', '산곡', '석남'
      ]
    },

    '8호선': {
      color: '#E6186C',
      id: '1008',
      stations: [
        '별내', '다산', '동구릉', '구리', '장자호수공원', '암사역사공원',
        '암사', '천호', '강동구청', '몽촌토성', '잠실', '석촌', '송파',
        '가락시장', '문정', '장지', '복정', '남위례', '산성', '단대오거리',
        '신흥', '수진', '모란'
      ]
    },

    '9호선': {
      color: '#BDB092',
      id: '1009',
      stations: [
        '개화', '김포공항', '공항시장', '신방화', '마곡나루', '양천향교',
        '가양', '증미', '등촌', '염창', '신목동', '선유도', '당산',
        '국회의사당', '여의도', '샛강', '노량진', '노들', '흑석', '동작',
        '구반포', '신반포', '고속터미널', '사평', '신논현', '언주', '선정릉',
        '삼성중앙', '봉은사', '종합운동장', '삼전', '석촌고분', '석촌',
        '송파나루', '한성백제', '올림픽공원', '둔촌오륜', '중앙보훈병원'
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
        '도라산', '임진강', '문산', '파주', '월롱', '금촌', '금릉',
        '운정', '야당', '탄현', '일산', '풍산', '백마', '곡산', '대곡',
        '능곡', '행신', '강매', '화전', '수색', '디지털미디어시티', '가좌',
        '신촌', '서울역', '홍대입구', '서강대', '공덕', '효창공원앞',
        '용산', '이촌', '서빙고', '한남', '옥수', '응봉', '왕십리',
        '청량리', '회기', '중랑', '상봉', '망우', '양원', '구리', '도농',
        '양정', '덕소', '도심', '팔당', '운길산', '양수', '신원', '아신',
        '오빈', '양평', '원덕', '용문', '지평'
      ]
    }
  };

  const getApiKey = () => {
    const input = document.getElementById('apiKeyInput');

    return (
      input?.value?.trim() ||
      'sample'
    );
  };


  /* =========================================================
     API
  ========================================================= */

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


  /* =========================================================
     상태
  ========================================================= */

  let currentLine = '2호선';
  let currentStation = '';

  let refreshInterval = null;
  let popupRefreshTimer = null;

  let mapRequestId = 0;
  let popupRequestId = 0;

  const V_SPACING = 110;
  const H_SPACING = 120;


  /* =========================================================
     DOM
  ========================================================= */

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


  /* =========================================================
     기본 유틸
  ========================================================= */

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }


  function normalizeStationName(name) {
    if (!name) return '';

    return String(name)
      .trim()
      .replace(/\s+/g, '')
      .replace(/역$/, '')
      .replace(/\([^)]*\)/g, '');
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


    index =
      stations.findIndex(station => {

        const value =
          normalizeStationName(station);

        return (
          value.includes(target) ||
          target.includes(value)
        );
      });


    return index;
  }


  function safeId(value) {
    return String(value)
      .replace(/[^a-zA-Z0-9_-]/g, '_');
  }


  /* =========================================================
     요일
  ========================================================= */

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


  /* =========================================================
     시간
  ========================================================= */

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


    /*
     * 지하철 시간표의
     * 01:xx~03:xx를 25:xx~27:xx로 취급
     */
    if (hour < 4) {
      hour += 24;
    }


    return (
      hour * 3600 +
      minute * 60 +
      second
    );
  }


  function getCurrentScheduleSeconds() {

    const now =
      new Date();


    let hour =
      now.getHours();


    if (hour < 4) {
      hour += 24;
    }


    return (
      hour * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds()
    );
  }


  /* =========================================================
     실시간 열차 상태
  ========================================================= */

  function getTrainStatusText(status) {

    const map = {
      '0': '진입',
      '1': '도착',
      '2': '출발',
      '3': '전역출발'
    };


    return (
      map[String(status)] ||
      '운행중'
    );
  }


  function isUpDirection(value) {

    return String(value) === '0';
  }


  /* =========================================================
     지도 초기화
  ========================================================= */

  function initMaps(lineName) {

    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }


    mapRequestId++;


    currentLine =
      lineName;


    const data =
      lineData[currentLine];


    if (!data) return;


    document.documentElement.style.setProperty(
      '--line-color',
      data.color
    );


    /*
     * 세로
     */

    vStationNodes.innerHTML = '';
    vTrainsContainer.innerHTML = '';


    vMapContainer.style.height =
      `${Math.max(
        1,
        data.stations.length - 1
      ) * V_SPACING + 60}px`;


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


    /*
     * 가로
     */

    hStationNodes.innerHTML = '';
    hTrainsContainer.innerHTML = '';


    hTrackWrapper.style.width =
      `${Math.max(
        1,
        data.stations.length - 1
      ) * H_SPACING + 60}px`;


    data.stations.forEach(
      (station, index) => {

        const node =
          document.createElement('div');


        node.className =
          'h-station-node';


        node.style.left =
          `${index * H_SPACING}px`;


        node.innerHTML = `
          <div class="h-station-name">
            ${escapeHtml(station)}
          </div>
        `;


        hStationNodes.appendChild(node);
      }
    );


    fetchTrainPositions();


    refreshInterval =
      setInterval(
        fetchTrainPositions,
        10000
      );
  }


  /* =========================================================
     실시간 열차 위치
  ========================================================= */

  async function fetchTrainPositions() {

    const requestLine =
      currentLine;

    const requestId =
      mapRequestId;


    const line =
      lineData[requestLine];


    if (!line) return;


    try {

      const url =
        `${BASE_SW}/${getApiKey()}/json/` +
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


      /*
       * 노선 변경 후 이전 응답이면 버림
       */
      if (
        requestLine !== currentLine ||
        requestId !== mapRequestId
      ) {
        return;
      }


      if (
        data.RESULT &&
        data.RESULT.CODE &&
        data.RESULT.CODE !== 'INFO-000'
      ) {
        console.warn(
          data.RESULT.CODE,
          data.RESULT.MESSAGE
        );

        return;
      }


      const trains =
        Array.isArray(
          data.realtimePositionList
        )
          ? data.realtimePositionList
          : [];


      const activeKeys =
        new Set();


      trains.forEach(train => {

        /*
         * 현재 노선 ID와 다른 열차 제거
         */
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


        const stationIndex =
          getStationIndex(
            line.stations,
            train.statnNm
          );


        if (stationIndex === -1) {
          return;
        }


        const isUp =
          isUpDirection(
            train.updnLine
          );


        const direction =
          isUp ? 1 : -1;


        const status =
          String(
            train.trainSttus ?? ''
          );


        let offset = 0;


        if (status === '0') {
          offset =
            -35 * direction;
        }

        else if (status === '1') {
          offset = 0;
        }

        else if (status === '2') {
          offset =
            35 * direction;
        }

        else if (status === '3') {
          offset =
            -35 * direction;
        }


        const trainKey =
          `${line.id}-${train.updnLine}-${trainNo}`;


        const domKey =
          safeId(trainKey);


        activeKeys.add(domKey);


        /*
         * 세로
         */

        let vEl =
          document.getElementById(
            `v-train-${domKey}`
          );


        if (!vEl) {

          vEl =
            document.createElement('div');

          vEl.id =
            `v-train-${domKey}`;

          vTrainsContainer.appendChild(vEl);
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
            ${escapeHtml(
              getTrainStatusText(status)
            )}
          </div>
        `;


        vEl.style.top =
          `${
            stationIndex * V_SPACING +
            offset
          }px`;


        /*
         * 가로
         */

        let hEl =
          document.getElementById(
            `h-train-${domKey}`
          );


        if (!hEl) {

          hEl =
            document.createElement('div');

          hEl.id =
            `h-train-${domKey}`;

          hTrainsContainer.appendChild(hEl);
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
            ${escapeHtml(
              getTrainStatusText(status)
            )}
          </div>
        `;


        hEl.style.left =
          `${
            stationIndex * H_SPACING +
            offset
          }px`;
      });


      /*
       * 사라진 열차 삭제
       */

      Array.from(
        vTrainsContainer.children
      ).forEach(el => {

        const key =
          el.id.replace(
            'v-train-',
            ''
          );


        if (!activeKeys.has(key)) {
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


        if (!activeKeys.has(key)) {
          el.remove();
        }
      });

    } catch (error) {

      console.error(
        '실시간 열차 위치 오류:',
        error
      );
    }
  }


  /* =========================================================
     팝업 열기
  ========================================================= */

  function openFullPopup(station) {

    currentStation =
      station;


    popupRequestId++;


    const requestId =
      popupRequestId;


    fullPopup.classList.remove(
      'hidden'
    );


    pName.textContent =
      `${station}역`;


    pBadge.textContent =
      currentLine;


    /*
     * 로딩
     */

    document
      .getElementById('arrLoading')
      ?.classList.remove('hidden');


    document
      .getElementById('statLoading')
      ?.classList.remove('hidden');


    document
      .getElementById('ttLoading')
      ?.classList.remove('hidden');


    timeRideNum.textContent =
      '-';


    timeAlightNum.textContent =
      '-';


    arrUpList.innerHTML = '';
    arrDownList.innerHTML = '';

    ttUpList.innerHTML = '';
    ttDownList.innerHTML = '';


    /*
     * 기존 팝업 타이머 제거
     */

    if (popupRefreshTimer) {

      clearInterval(
        popupRefreshTimer
      );

      popupRefreshTimer = null;
    }


    /*
     * 즉시 조회
     */

    fetchStationDetails(
      station,
      false,
      requestId
    );


    fetchTrainPositions();


    /*
     * 5초마다 실시간 갱신
     */

    popupRefreshTimer =
      setInterval(() => {

        if (
          fullPopup.classList.contains(
            'hidden'
          )
        ) {

          clearInterval(
            popupRefreshTimer
          );

          popupRefreshTimer = null;

          return;
        }


        if (
          requestId !== popupRequestId
        ) {
          return;
        }


        fetchStationDetails(
          station,
          true,
          requestId
        );

      }, 5000);
  }


  /* =========================================================
     실시간 도착정보
  ========================================================= */

  async function fetchArrivalInfo(
    station,
    requestId
  ) {

    const line =
      lineData[currentLine];


    const url =
      `${BASE_SW}/${getApiKey()}/json/` +
      `realtimeStationArrival/0/30/` +
      `${encodeURIComponent(station)}`;


    const res =
      await fetch(url, {
        cache: 'no-store'
      });


    if (!res.ok) {
      throw new Error(
        `Arrival HTTP ${res.status}`
      );
    }


    const data =
      await res.json();


    if (
      requestId !== popupRequestId
    ) {
      return;
    }


    if (
      data.RESULT &&
      data.RESULT.CODE &&
      data.RESULT.CODE !== 'INFO-000'
    ) {
      throw new Error(
        `${data.RESULT.CODE}: ${
          data.RESULT.MESSAGE || ''
        }`
      );
    }


    const list =
      Array.isArray(
        data.realtimeArrivalList
      )
        ? data.realtimeArrivalList
        : [];


    /*
     * 현재 노선만
     *
     * 중요:
     * subwayId가 일치하지 않으면
     * 환승역에서 다른 노선 데이터를 섞지 않는다.
     */

    const targetId =
      String(line.id);


    const filtered =
      list.filter(train =>
        String(
          train.subwayId || ''
        ) === targetId
      );


    /*
     * 도착순 정렬
     */

    filtered.sort((a, b) => {

      function weight(train) {

        const msg =
          String(
            train.arvlMsg2 || ''
          );


        if (
          msg.includes('도착')
        ) {
          return 0;
        }


        if (
          msg.includes('진입')
        ) {
          return 1;
        }


        const sec =
          parseInt(
            train.barvlDt,
            10
          );


        if (
          Number.isFinite(sec) &&
          sec >= 0
        ) {
          return 10 + sec;
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
      }


      return (
        weight(a) -
        weight(b)
      );
    });


    let upHtml = '';
    let downHtml = '';


    filtered.forEach(train => {

      const isUp =
        train.updnLine === '상행' ||
        train.updnLine === '내선' ||
        String(train.updnLine) === '0';


      /*
       * =====================================================
       * 몇 번째 전역
       * =====================================================
       */

      const rawMsg2 =
        String(
          train.arvlMsg2 || ''
        );


      let stationCount =
        '';


      const stationMatch =
        rawMsg2.match(
          /\[(\d+)\]번째 전역/
        );


      if (stationMatch) {

        stationCount =
          `${stationMatch[1]}번째 전역 전`;
      }


      /*
       * =====================================================
       * 도착 예정 시간
       * =====================================================
       */

      const barvlDt =
        parseInt(
          train.barvlDt,
          10
        );


      let timeText =
        rawMsg2 || '운행중';


      if (
        Number.isFinite(barvlDt) &&
        barvlDt > 0
      ) {

        const min =
          Math.floor(
            barvlDt / 60
          );


        const sec =
          barvlDt % 60;


        timeText =
          min > 0
            ? `약 ${min}분 ${sec}초 후`
            : `약 ${sec}초 후`;
      }


      /*
       * =====================================================
       * 현재 위치 + 상태
       * =====================================================
       */

      const currentLocation =
        String(
          train.arvlMsg3 ||
          train.statnNm ||
          '운행중'
        );


      /*
       * 실시간 도착 API에는
       * trainSttus가 없는 경우가 많아서
       * arvlMsg2를 이용해 상태를 추정한다.
       */

      let statusText =
        '운행중';


      if (
        rawMsg2.includes('진입')
      ) {

        statusText =
          '진입';

      } else if (
        rawMsg2.includes('도착')
      ) {

        statusText =
          '도착';

      } else if (
        rawMsg2.includes('출발')
      ) {

        statusText =
          '출발';

      } else if (
        rawMsg2.includes('전역출발')
      ) {

        statusText =
          '전역출발';
      }


      /*
       * 만약 arvlMsg2에 상태가 없으면
       * trainSttus가 있는 경우 사용
       */

      if (
        statusText === '운행중' &&
        train.trainSttus !== undefined
      ) {

        statusText =
          getTrainStatusText(
            train.trainSttus
          );
      }


      /*
       * =====================================================
       * 급행
       * =====================================================
       */

      let expressClass =
        'exp-normal';

      let expressText =
        '일반';


      if (
        train.btrainSttus === '급행' ||
        String(train.directAt) === '1'
      ) {

        expressClass =
          'exp-express';

        expressText =
          '급행';

      } else if (
        train.btrainSttus === '특급' ||
        String(train.directAt) === '7'
      ) {

        expressClass =
          'exp-special';

        expressText =
          '특급';
      }


      /*
       * =====================================================
       * 행선지
       * =====================================================
       */

      const destination =
        escapeHtml(
          train.bstatnNm ||
          train.statnTnm ||
          '방면'
        );


      /*
       * =====================================================
       * 현재 위치 표시
       *
       * 현재: 신촌 (도착)
       * 현재: 홍대입구 (진입)
       *
       * 이렇게 표시
       * =====================================================
       */

      const currentText =
        `현재: ${currentLocation} (${statusText})`;


      const item = `
        <div class="arr-item ${
          isUp ? 'up' : 'down'
        }">

          <div class="arr-top-row">

            <span class="arr-time">
              ${escapeHtml(timeText)}
            </span>

            <span class="exp-badge ${
              expressClass
            }">
              ${expressText}
            </span>

          </div>

          <div class="arr-desc">

            ${destination}행

            ${
              stationCount
                ? ` • ${escapeHtml(
                    stationCount
                  )}`
                : ''
            }

            <br>

            ${escapeHtml(
              currentText
            )}

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
  }


  /* =========================================================
     역 코드 찾기
  ========================================================= */

  async function findStationCode(
    station,
    requestId
  ) {

    const url =
      `${BASE_OPEN}/${getApiKey()}/json/` +
      `SearchInfoBySubwayNameService/1/50/` +
      `${encodeURIComponent(station)}`;


    const res =
      await fetch(url, {
        cache: 'no-store'
      });


    if (!res.ok) {
      throw new Error(
        `Station Search HTTP ${res.status}`
      );
    }


    const data =
      await res.json();


    if (
      requestId !== popupRequestId
    ) {
      return null;
    }


    const service =
      data.SearchInfoBySubwayNameService;


    const rows =
      service &&
      Array.isArray(service.row)
        ? service.row
        : [];


    if (
      rows.length === 0
    ) {
      return null;
    }


    const line =
      lineData[currentLine];


    /*
     * 서울 API SearchInfoBySubwayNameService의
     * LINE_NUM은 1002가 아니라
     * "02호선" 같은 형태로 오는 경우가 있다.
     *
     * 그래서 subwayId와 직접 비교하지 않는다.
     */

    let targetRows =
      [];


    if (currentLine === 'GTX-A') {

      targetRows =
        rows.filter(row => {

          const value =
            JSON.stringify(row);


          return (
            value.includes('GTX-A') ||
            value.includes('1032')
          );
        });

    } else {

      const lineNumber =
        currentLine.replace(
          '호선',
          ''
        );


      const padded =
        lineNumber.padStart(
          2,
          '0'
        );


      targetRows =
        rows.filter(row => {

          const lineNum =
            String(
              row.LINE_NUM || ''
            ).trim();


          return (
            lineNum === `${padded}호선` ||
            lineNum === `${lineNumber}호선` ||
            lineNum === lineNumber ||
            lineNum.includes(
              `${padded}호선`
            )
          );
        });
    }


    /*
     * 일치하는 노선이 있다면
     * 그 노선의 역 코드만 사용
     */

    if (
      targetRows.length > 0
    ) {

      return (
        targetRows[0].STATION_CD ||
        null
      );
    }


    /*
     * 혹시 LINE_NUM 형식이 예상과 다른 경우
     * 노선명을 JSON 전체에서 확인
     */

    const fallback =
      rows.find(row => {

        const text =
          JSON.stringify(row);


        return text.includes(
          currentLine
        );
      });


    if (fallback) {

      return (
        fallback.STATION_CD ||
        null
      );
    }


    /*
     * 마지막 fallback
     *
     * 단, 환승역에서 다른 노선을 잘못 잡을 수 있으므로
     * 현재 노선이 1개만 존재할 때만 사용
     */

    if (
      rows.length === 1
    ) {

      return (
        rows[0].STATION_CD ||
        null
      );
    }


    return null;
  }


  /* =========================================================
     시간표
  ========================================================= */

  async function fetchTimetable(
    station,
    requestId
  ) {

    const week =
      getWeekTag();


    ttDateType.textContent =
      week.name;


    const stationCd =
      await findStationCode(
        station,
        requestId
      );


    if (
      requestId !== popupRequestId
    ) {
      return;
    }


    if (!stationCd) {

      ttUpList.innerHTML =
        `
          <div
            class="tt-item"
            style="
              border:none;
              text-align:center;
            "
          >
            시간표 정보를 찾을 수 없음
          </div>
        `;


      ttDownList.innerHTML =
        `
          <div
            class="tt-item"
            style="
              border:none;
              text-align:center;
            "
          >
            시간표 정보를 찾을 수 없음
          </div>
        `;


      return;
    }


    const key =
      getApiKey();


    /*
     * 상행 / 내선
     */

    const upUrl =
      `${BASE_OPEN}/${key}/json/` +
      `SearchSTTimeTableByIDService/1/500/` +
      `${encodeURIComponent(stationCd)}/` +
      `${week.tag}/1/`;


    /*
     * 하행 / 외선
     */

    const downUrl =
      `${BASE_OPEN}/${key}/json/` +
      `SearchSTTimeTableByIDService/1/500/` +
      `${encodeURIComponent(stationCd)}/` +
      `${week.tag}/2/`;


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


    if (
      !upRes.ok ||
      !downRes.ok
    ) {
      throw new Error(
        '시간표 API HTTP 오류'
      );
    }


    const [
      upData,
      downData
    ] = await Promise.all([
      upRes.json(),
      downRes.json()
    ]);


    if (
      requestId !== popupRequestId
    ) {
      return;
    }


    const upRows =
      Array.isArray(
        upData
          ?.SearchSTTimeTableByIDService
          ?.row
      )
        ? upData.SearchSTTimeTableByIDService.row
        : [];


    const downRows =
      Array.isArray(
        downData
          ?.SearchSTTimeTableByIDService
          ?.row
      )
        ? downData.SearchSTTimeTableByIDService.row
        : [];


    const nowSeconds =
      getCurrentScheduleSeconds();


    function renderTimetable(
      rows,
      isUp
    ) {

      const valid =
        rows
          .filter(row => {

            const time =
              row.ARRIVETIME ||
              row.LEFTTIME ||
              '';


            if (!time) {
              return false;
            }


            return (
              timeToSeconds(time) >=
              nowSeconds
            );
          })
          .sort((a, b) => {

            const aTime =
              a.ARRIVETIME ||
              a.LEFTTIME ||
              '';


            const bTime =
              b.ARRIVETIME ||
              b.LEFTTIME ||
              '';


            return (
              timeToSeconds(aTime) -
              timeToSeconds(bTime)
            );
          })
          .slice(0, 10);


      if (
        valid.length === 0
      ) {

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


      let html = '';


      valid.forEach(row => {

        const rawTime =
          row.ARRIVETIME ||
          row.LEFTTIME ||
          '';


        const displayTime =
          String(rawTime)
            .substring(0, 5);


        let expClass =
          'exp-normal';

        let expText =
          '일반';


        const express =
          String(
            row.EXPRESS_YN || ''
          );


        const flag =
          String(
            row.FL_FLAG || ''
          );


        if (
          express === 'G' ||
          express === 'D' ||
          express === 'E' ||
          flag === '급행'
        ) {

          expClass =
            'exp-express';

          expText =
            '급행';

        } else if (
          express === 'S' ||
          flag === '특급'
        ) {

          expClass =
            'exp-special';

          expText =
            '특급';
        }


        const destination =
          row.SUBWAYENAME ||
          row.SUBWAYSNAME ||
          row.DESTSTATION ||
          '방면';


        html += `
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
                ${escapeHtml(
                  displayTime
                )}
              </span>

              <span
                class="exp-badge ${
                  expClass
                }"
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
      });


      return html;
    }


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
  }


  /* =========================================================
     승하차 통계
  ========================================================= */

  function formatNumber(value) {

    const number =
      Number(value);


    if (
      !Number.isFinite(number)
    ) {
      return '-';
    }


    return Math.round(
      number
    ).toLocaleString();
  }


  function getDateString(date) {

    const y =
      date.getFullYear();


    const m =
      String(
        date.getMonth() + 1
      ).padStart(2, '0');


    const d =
      String(
        date.getDate()
      ).padStart(2, '0');


    return `${y}${m}${d}`;
  }


  async function fetchStatistics(
    station,
    requestId
  ) {

    /*
     * CardSubwayStatsNew는 일별 확정 승하차 데이터다.
     *
     * 당일 실시간 통계가 아니라
     * 최근 제공된 날짜의 데이터다.
     *
     * 따라서 오늘 → 어제 → 그제 ...
     * 순서로 최대 7일을 찾아본다.
     */

    const line =
      lineData[currentLine];


    const key =
      getApiKey();


    const targetStation =
      normalizeStationName(
        station
      );


    const targetLine =
      currentLine === 'GTX-A'
        ? 'GTX-A'
        : currentLine;


    let result = null;


    for (
      let offset = 1;
      offset <= 7;
      offset++
    ) {

      if (
        requestId !== popupRequestId
      ) {
        return;
      }


      const date =
        new Date();


      date.setDate(
        date.getDate() -
        offset
      );


      const dateString =
        getDateString(date);


      try {

        const url =
          `${BASE_OPEN}/${key}/json/` +
          `CardSubwayStatsNew/1/1000/` +
          `${dateString}`;


        const res =
          await fetch(url, {
            cache: 'no-store'
          });


        if (!res.ok) {
          continue;
        }


        const data =
          await res.json();


        const service =
          data.CardSubwayStatsNew;


        const rows =
          service &&
          Array.isArray(service.row)
            ? service.row
            : [];


        /*
         * 노선 + 역명으로 찾는다.
         */

        const matches =
          rows.filter(row => {

            const rowStation =
              normalizeStationName(
                row.SUB_STA_NM
              );


            const rowLine =
              String(
                row.LINE_NUM || ''
              );


            const sameStation =
              rowStation ===
                targetStation ||
              rowStation.includes(
                targetStation
              ) ||
              targetStation.includes(
                rowStation
              );


            let sameLine = false;


            if (
              targetLine === 'GTX-A'
            ) {

              sameLine =
                rowLine.includes(
                  'GTX-A'
                );

            } else {

              const lineNumber =
                targetLine.replace(
                  '호선',
                  ''
                );


              sameLine =
                rowLine ===
                  targetLine ||
                rowLine.includes(
                  `${lineNumber}호선`
                ) ||
                rowLine ===
                  lineNumber;
            }


            return (
              sameStation &&
              sameLine
            );
          });


        if (
          matches.length > 0
        ) {

          result =
            matches[0];

          break;
        }

      } catch (error) {

        console.warn(
          '통계 날짜 조회 실패:',
          dateString,
          error
        );
      }
    }


    if (
      requestId !== popupRequestId
    ) {
      return;
    }


    if (!result) {

      timeRideNum.textContent =
        '-';


      timeAlightNum.textContent =
        '-';


      return;
    }


    timeRideNum.textContent =
      `${formatNumber(
        result.RIDE_PASGR_NUM
      )}명`;


    timeAlightNum.textContent =
      `${formatNumber(
        result.ALIGHT_PASGR_NUM
      )}명`;
  }


  /* =========================================================
     전체 역 상세정보
  ========================================================= */

  async function fetchStationDetails(
    station,
    isSilent = false,
    requestId = popupRequestId
  ) {

    const tasks = [];


    /*
     * 실시간 도착
     */

    tasks.push(
      fetchArrivalInfo(
        station,
        requestId
      )
        .catch(error => {

          console.error(
            '도착정보 오류:',
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
                  정보 로드 실패
                </div>
              `;


            arrDownList.innerHTML =
              `
                <div
                  class="arr-item"
                  style="border:none"
                >
                  정보 로드 실패
                </div>
              `;
          }
        })
        .finally(() => {

          if (
            requestId === popupRequestId
          ) {

            document
              .getElementById(
                'arrLoading'
              )
              ?.classList.add(
                'hidden'
              );
          }
        })
    );


    /*
     * 통계
     */

    tasks.push(
      fetchStatistics(
        station,
        requestId
      )
        .catch(error => {

          console.error(
            '통계 오류:',
            error
          );

          if (
            requestId === popupRequestId
          ) {

            timeRideNum.textContent =
              '-';

            timeAlightNum.textContent =
              '-';
          }
        })
        .finally(() => {

          if (
            requestId === popupRequestId
          ) {

            document
              .getElementById(
                'statLoading'
              )
              ?.classList.add(
                'hidden'
              );
          }
        })
    );


    /*
     * 시간표
     */

    tasks.push(
      fetchTimetable(
        station,
        requestId
      )
        .catch(error => {

          console.error(
            '시간표 오류:',
            error
          );


          if (
            requestId === popupRequestId
          ) {

            ttUpList.innerHTML =
              `
                <div
                  class="tt-item"
                  style="border:none"
                >
                  시간표 조회 불가
                </div>
              `;


            ttDownList.innerHTML =
              `
                <div
                  class="tt-item"
                  style="border:none"
                >
                  시간표 조회 불가
                </div>
              `;
          }
        })
        .finally(() => {

          if (
            requestId === popupRequestId
          ) {

            document
              .getElementById(
                'ttLoading'
              )
              ?.classList.add(
                'hidden'
              );
          }
        })
    );


    await Promise.allSettled(
      tasks
    );
  }


  /* =========================================================
     팝업 닫기
  ========================================================= */

  closePopupBtn.addEventListener(
    'click',
    () => {

      fullPopup.classList.add(
        'hidden'
      );


      popupRequestId++;


      if (popupRefreshTimer) {

        clearInterval(
          popupRefreshTimer
        );

        popupRefreshTimer = null;
      }
    }
  );


  /* =========================================================
     노선 변경
  ========================================================= */

  lineSelect.addEventListener(
    'change',
    event => {

      fullPopup.classList.add(
        'hidden'
      );


      popupRequestId++;


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


  /* =========================================================
     시작
  ========================================================= */

  initMaps('2호선');

});
