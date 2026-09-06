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


  /* =========================================================
     기본 설정
  ========================================================= */

  const getApiKey = () => {
    const input = document.getElementById('apiKeyInput');

    return (
      input?.value?.trim() ||
      'sample'
    );
  };


  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '';


  /*
   * Netlify 배포
   *
   * /api/sw/*   → swopenapi.seoul.go.kr/api/subway/:splat
   * /api/open/* → openapi.seoul.go.kr:8088/:splat
   */

  const BASE_SW = isLocal
    ? 'http://swopenapi.seoul.go.kr/api/subway'
    : '/api/sw';

  const BASE_OPEN = isLocal
    ? 'http://openapi.seoul.go.kr:8088'
    : '/api/open';


  let currentLine = '2호선';
  let currentStation = '';

  let refreshInterval = null;
  let popupRefreshTimer = null;

  /*
   * 현재 fetch 요청 세대 번호
   *
   * 노선을 빠르게 바꾸면 이전 API 요청이 늦게 도착해서
   * 새 노선 화면에 옛날 데이터를 뿌리는 문제가 생길 수 있다.
   */
  let requestGeneration = 0;

  /*
   * 팝업 요청 번호
   *
   * 팝업을 닫은 뒤 이전 요청이 도착해 DOM을 수정하는 문제 방지
   */
  let popupGeneration = 0;


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
     유틸
  ========================================================= */

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }


  function safeDomId(value) {
    return String(value ?? '')
      .replace(/[^a-zA-Z0-9_-]/g, '_');
  }


  function normalizeStationName(name) {
    if (!name) return '';

    return String(name)
      .trim()
      .replace(/\s+/g, '')
      .replace(/역$/, '')
      .replace(/\([^)]*\)/g, '');
  }


  function getStationIndex(stations, apiStationName) {
    const target =
      normalizeStationName(apiStationName);

    if (!target) return -1;


    /*
     * 1차: 완전 일치
     */
    let index = stations.findIndex(
      station =>
        normalizeStationName(station) === target
    );

    if (index !== -1) {
      return index;
    }


    /*
     * 2차: 포함 관계
     */
    index = stations.findIndex(station => {
      const stationName =
        normalizeStationName(station);

      return (
        stationName.includes(target) ||
        target.includes(stationName)
      );
    });


    return index;
  }


  function getWeekTag() {
    const day = new Date().getDay();

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


  function timeToSeconds(timeStr) {
    if (!timeStr) return 0;

    const parts =
      String(timeStr).split(':');

    let hour =
      parseInt(parts[0], 10) || 0;

    const minute =
      parseInt(parts[1], 10) || 0;

    const second =
      parseInt(parts[2], 10) || 0;

    /*
     * 서울 지하철 시간표는
     * 새벽 1~3시를 25~27시로 표시하는 경우가 있다.
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


  function getStatusText(status) {
    const map = {
      '0': '진입',
      '1': '도착',
      '2': '출발',
      '3': '전역출발'
    };

    return map[String(status)] || '운행중';
  }


  function isUpDirection(value) {
    /*
     * 실시간 위치 API
     *
     * 0 = 상행/내선
     * 1 = 하행/외선
     */
    return String(value) === '0';
  }


  function getTrainKey(train, line) {
    /*
     * trainNo만 쓰면 번호 형식이 다른 열차가 충돌할 수 있다.
     *
     * line ID + 방향 + trainNo까지 묶어서
     * DOM에서 유일한 ID를 만든다.
     */
    const lineId =
      String(train.subwayId || line.id);

    const trainNo =
      String(train.trainNo || '').trim();

    const direction =
      String(train.updnLine ?? '');

    return `${lineId}-${direction}-${trainNo}`;
  }


  /* =========================================================
     지도 초기화
  ========================================================= */

  function initMaps(lineName) {

    /*
     * 기존 interval 제거
     */
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }


    /*
     * 진행 중인 이전 요청 무효화
     */
    requestGeneration++;


    currentLine = lineName;

    const data =
      lineData[currentLine];

    if (!data) return;


    document.documentElement.style.setProperty(
      '--line-color',
      data.color
    );


    /*
     * 세로 지도
     */

    vStationNodes.innerHTML = '';
    vTrainsContainer.innerHTML = '';

    vMapContainer.style.height =
      `${Math.max(
        1,
        data.stations.length - 1
      ) * V_SPACING + 60}px`;


    data.stations.forEach((station, idx) => {

      const node =
        document.createElement('div');

      node.className =
        'v-station-node';

      node.style.top =
        `${idx * V_SPACING}px`;

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
    });


    /*
     * 가로 지도
     */

    hStationNodes.innerHTML = '';
    hTrainsContainer.innerHTML = '';

    hTrackWrapper.style.width =
      `${Math.max(
        1,
        data.stations.length - 1
      ) * H_SPACING + 60}px`;


    data.stations.forEach((station, idx) => {

      const node =
        document.createElement('div');

      node.className =
        'h-station-node';

      node.style.left =
        `${idx * H_SPACING}px`;

      node.innerHTML = `
        <div class="h-station-name">
          ${escapeHtml(station)}
        </div>
      `;

      hStationNodes.appendChild(node);
    });


    /*
     * 즉시 한 번 실행
     */
    fetchTrainPositions();


    /*
     * 10초마다 실시간 위치 갱신
     */
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

    const lineAtRequest =
      currentLine;

    const generationAtRequest =
      requestGeneration;

    const line =
      lineData[lineAtRequest];

    if (!line) return;


    try {

      const url =
        `${BASE_SW}/${getApiKey()}/json/` +
        `realtimePosition/0/100/` +
        `${encodeURIComponent(lineAtRequest)}`;


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
       * 노선을 변경했다면
       * 이 응답은 폐기
       */
      if (
        lineAtRequest !== currentLine ||
        generationAtRequest !== requestGeneration
      ) {
        return;
      }


      /*
       * 서울 API 자체 오류
       */
      if (
        data.RESULT &&
        data.RESULT.CODE &&
        data.RESULT.CODE !== 'INFO-000'
      ) {

        console.warn(
          '실시간 위치 API 오류:',
          data.RESULT.CODE,
          data.RESULT.MESSAGE
        );

        return;
      }


      const trains =
        Array.isArray(data.realtimePositionList)
          ? data.realtimePositionList
          : [];


      const stations =
        line.stations;


      const activeTrainKeys =
        new Set();


      trains.forEach(train => {

        /*
         * subwayId가 존재한다면
         * 현재 노선과 반드시 비교
         */
        if (
          train.subwayId &&
          String(train.subwayId) !== String(line.id)
        ) {
          return;
        }


        const trainNo =
          String(train.trainNo || '').trim();


        if (!trainNo) {
          return;
        }


        const stationIndex =
          getStationIndex(
            stations,
            train.statnNm
          );


        /*
         * API에서 존재하지 않는 역 이름
         */
        if (stationIndex === -1) {

          console.warn(
            `[${lineAtRequest}] 역 매칭 실패:`,
            train.statnNm,
            train
          );

          return;
        }


        const isUp =
          isUpDirection(train.updnLine);


        const directionMultiplier =
          isUp ? 1 : -1;


        const status =
          String(train.trainSttus ?? '');


        let offset = 0;


        /*
         * 진입
         */
        if (status === '0') {
          offset =
            -35 * directionMultiplier;
        }

        /*
         * 도착
         */
        else if (status === '1') {
          offset = 0;
        }

        /*
         * 출발
         */
        else if (status === '2') {
          offset =
            35 * directionMultiplier;
        }

        /*
         * 전역출발
         */
        else if (status === '3') {
          offset =
            -35 * directionMultiplier;
        }


        const finalVTop =
          stationIndex * V_SPACING + offset;


        const finalHLeft =
          stationIndex * H_SPACING + offset;


        /*
         * 중요:
         *
         * trainNo만 ID로 사용하지 않음.
         *
         * 예:
         * K2254
         * 8254
         *
         * 서로 다른 열차가 같은 DOM을 공유하지 않도록 한다.
         */
        const trainKey =
          getTrainKey(train, line);


        activeTrainKeys.add(trainKey);


        const safeKey =
          safeDomId(trainKey);


        /* =========================
           세로 열차
        ========================= */

        let vTrainEl =
          document.getElementById(
            `v-train-${safeKey}`
          );


        if (!vTrainEl) {

          vTrainEl =
            document.createElement('div');

          vTrainEl.id =
            `v-train-${safeKey}`;

          vTrainsContainer.appendChild(
            vTrainEl
          );
        }


        vTrainEl.className =
          `v-train ${isUp ? 'up' : 'down'}`;


        vTrainEl.innerHTML = `
          <span>
            ${escapeHtml(trainNo)}
          </span>

          <div class="v-train-status">
            ${escapeHtml(
              getStatusText(status)
            )}
          </div>
        `;


        vTrainEl.style.top =
          `${finalVTop}px`;


        /* =========================
           가로 열차
        ========================= */

        let hTrainEl =
          document.getElementById(
            `h-train-${safeKey}`
          );


        if (!hTrainEl) {

          hTrainEl =
            document.createElement('div');

          hTrainEl.id =
            `h-train-${safeKey}`;

          hTrainsContainer.appendChild(
            hTrainEl
          );
        }


        hTrainEl.className =
          `h-train ${isUp ? 'up' : 'down'}`;


        hTrainEl.innerHTML = `
          <span>
            ${escapeHtml(trainNo)}
          </span>

          <div class="h-train-status">
            ${escapeHtml(
              getStatusText(status)
            )}
          </div>
        `;


        hTrainEl.style.left =
          `${finalHLeft}px`;
      });


      /*
       * API에서 사라진 열차 제거
       */

      Array.from(
        vTrainsContainer.children
      ).forEach(child => {

        const key =
          child.id.replace(
            'v-train-',
            ''
          );


        if (
          !activeTrainKeys.has(
            key
          )
        ) {
          child.remove();
        }
      });


      Array.from(
        hTrainsContainer.children
      ).forEach(child => {

        const key =
          child.id.replace(
            'h-train-',
            ''
          );


        if (
          !activeTrainKeys.has(
            key
          )
        ) {
          child.remove();
        }
      });

    } catch (error) {

      /*
       * 사용자 화면에는 오류를 크게 표시하지 않고
       * console에서 확인할 수 있도록 한다.
       */
      console.error(
        `[${lineAtRequest}] 실시간 열차 위치 조회 실패:`,
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


    popupGeneration++;

    const currentPopupGeneration =
      popupGeneration;


    fullPopup.classList.remove(
      'hidden'
    );


    pName.textContent =
      `${station}역`;


    pBadge.textContent =
      currentLine;


    /*
     * 로딩 표시
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
     * 기존 팝업 interval 제거
     */
    if (popupRefreshTimer) {

      clearInterval(
        popupRefreshTimer
      );

      popupRefreshTimer = null;
    }


    /*
     * 최초 데이터 로드
     */
    fetchStationDetails(
      station,
      false,
      currentPopupGeneration
    );


    /*
     * 열차 위치도 즉시 갱신
     */
    fetchTrainPositions();


    /*
     * 팝업 실시간 정보 5초 갱신
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


        /*
         * 다른 역을 열었으면
         * 이전 interval이 건드리지 못하게 함
         */
        if (
          currentPopupGeneration !==
          popupGeneration
        ) {
          return;
        }


        fetchStationDetails(
          station,
          true,
          currentPopupGeneration
        );

      }, 5000);
  }


  /* =========================================================
     실시간 도착 정보
  ========================================================= */

  async function fetchArrivalInfo(
    station,
    key,
    line,
    popupRequestGeneration
  ) {

    const arrRes =
      await fetch(
        `${BASE_SW}/${key}/json/` +
        `realtimeStationArrival/0/30/` +
        `${encodeURIComponent(station)}`,
        {
          cache: 'no-store'
        }
      );


    if (!arrRes.ok) {
      throw new Error(
        `Arrival HTTP ${arrRes.status}`
      );
    }


    const arrData =
      await arrRes.json();


    /*
     * 현재 팝업 요청이 아니면 폐기
     */
    if (
      popupRequestGeneration !==
      popupGeneration
    ) {
      return;
    }


    if (
      arrData.RESULT &&
      arrData.RESULT.CODE &&
      arrData.RESULT.CODE !== 'INFO-000'
    ) {

      throw new Error(
        `${arrData.RESULT.CODE}: ${
          arrData.RESULT.MESSAGE || ''
        }`
      );
    }


    const arrivalList =
      Array.isArray(
        arrData.realtimeArrivalList
      )
        ? arrData.realtimeArrivalList
        : [];


    /*
     * 중요:
     *
     * 기존 코드에서는 노선 필터가 실패하면
     * 전체 데이터를 다시 사용했음.
     *
     * 그러면 환승역에서 다른 노선 열차가 섞일 수 있다.
     *
     * 이제는 반드시 현재 노선만 사용한다.
     */
    const targetLineId =
      String(line.id);


    const filtered =
      arrivalList.filter(train => {

        return (
          String(train.subwayId || '') ===
          targetLineId
        );
      });


    /*
     * 만약 subwayId가 없는 특수 API 응답이라면
     * 현재 노선 이름으로 한 번 더 판단
     */
    let usableList =
      filtered;


    if (
      usableList.length === 0 &&
      arrivalList.length > 0
    ) {

      const lineName =
        currentLine;


      const alternative =
        arrivalList.filter(train => {

          const trainLine =
            String(
              train.trainLineNm || ''
            );

          const recptn =
            String(
              train.recptnDt || ''
            );


          return (
            trainLine.includes(lineName) ||
            recptn.includes(lineName)
          );
        });


      /*
       * 확실하게 현재 노선이라고 판단할 수 있는
       * 데이터가 있을 때만 사용
       */
      if (alternative.length > 0) {
        usableList =
          alternative;
      }
    }


    /*
     * 도착 우선 정렬
     */
    usableList.sort((a, b) => {

      const getPriority =
        train => {

          const msg =
            String(
              train.arvlMsg2 || ''
            );


          if (
            msg.includes('도착') ||
            msg.includes('진입')
          ) {
            return 0;
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
            return sec + 10;
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
        getPriority(a) -
        getPriority(b)
      );
    });


    let upHtml = '';
    let downHtml = '';


    usableList.forEach(train => {

      /*
       * 상행 / 내선
       */
      const direction =
        String(
          train.updnLine || ''
        );


      const isUp =
        direction === '상행' ||
        direction === '내선' ||
        direction === '0';


      /*
       * 급행 / 특급
       */
      let expressClass =
        'exp-normal';

      let expressText =
        '일반';


      const btrainStatus =
        String(
          train.btrainSttus || ''
        );


      const directAt =
        String(
          train.directAt || ''
        );


      const flFlag =
        String(
          train.FL_FLAG || ''
        );


      if (
        btrainStatus === '급행' ||
        directAt === '1' ||
        flFlag === '급행'
      ) {

        expressClass =
          'exp-express';

        expressText =
          '급행';

      } else if (
        btrainStatus === '특급' ||
        directAt === '7' ||
        flFlag === '특급'
      ) {

        expressClass =
          'exp-special';

        expressText =
          '특급';
      }


      /*
       * 도착 시간
       */
      const rawMsg =
        String(
          train.arvlMsg2 || ''
        );


      let timeText =
        rawMsg || '운행중';


      /*
       * [3]번째 전역
       */
      let stationCountText =
        '';


      const match =
        rawMsg.match(
          /\[(\d+)\]번째 전역/
        );


      if (match) {

        stationCountText =
          `${match[1]}번째 전역 전`;
      }


      /*
       * barvlDt가 실제로 존재하면
       * 초 단위로 표시
       */
      const sec =
        parseInt(
          train.barvlDt,
          10
        );


      if (
        Number.isFinite(sec) &&
        sec > 0
      ) {

        const m =
          Math.floor(
            sec / 60
          );

        const s =
          sec % 60;


        timeText =
          m > 0
            ? `약 ${m}분 ${s}초 후`
            : `약 ${s}초 후`;

      } else if (
        rawMsg.includes('진입') ||
        rawMsg.includes('도착') ||
        rawMsg.includes('출발')
      ) {

        timeText =
          rawMsg;

      } else if (
        stationCountText
      ) {

        timeText =
          stationCountText;
      }


      const destination =
        escapeHtml(
          train.bstatnNm ||
          '방면'
        );


      const currentLocation =
        escapeHtml(
          train.arvlMsg3 ||
          '운행중'
        );


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
              stationCountText
                ? ` • ${escapeHtml(
                    stationCountText
                  )}`
                : ''
            }
            (현재: ${currentLocation})
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
          style="border:none; text-align:center;"
        >
          도착 대기 중인 열차 없음
        </div>
      `;


    arrDownList.innerHTML =
      downHtml ||
      `
        <div
          class="arr-item"
          style="border:none; text-align:center;"
        >
          도착 대기 중인 열차 없음
        </div>
      `;
  }


  /* =========================================================
     이용객 통계
  ========================================================= */

  async function fetchStatistics() {

    /*
     * 기존 코드의 랜덤 숫자는
     * 실제 통계 API가 아니기 때문에 일단 유지하지 않는다.
     *
     * 실제 API가 연결될 때까지 '-' 표시.
     */

    timeRideNum.textContent =
      '-';

    timeAlightNum.textContent =
      '-';
  }


  /* =========================================================
     시간표 역 코드 찾기
  ========================================================= */

  async function findStationCode(
    station,
    key,
    line,
    popupRequestGeneration
  ) {

    const url =
      `${BASE_OPEN}/${key}/json/` +
      `SearchInfoBySubwayNameService/1/50/` +
      `${encodeURIComponent(station)}`;


    const res =
      await fetch(url, {
        cache: 'no-store'
      });


    if (!res.ok) {
      throw new Error(
        `StationInfo HTTP ${res.status}`
      );
    }


    const data =
      await res.json();


    if (
      popupRequestGeneration !==
      popupGeneration
    ) {
      return null;
    }


    if (
      data.RESULT &&
      data.RESULT.CODE &&
      data.RESULT.CODE !== 'INFO-000'
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


    if (rows.length === 0) {
      return null;
    }


    const targetLineId =
      String(line.id);


    /*
     * 1순위: 정확한 subway ID
     */
    let row =
      rows.find(r =>
        String(r.LINE_NUM || '') ===
        targetLineId
      );


    /*
     * 2순위: 노선 번호
     */
    if (!row) {

      const lineNumber =
        currentLine.replace(
          '호선',
          ''
        );


      row =
        rows.find(r => {

          const lineNum =
            String(
              r.LINE_NUM || ''
            );


          return (
            lineNum === lineNumber ||
            lineNum === `${lineNumber}호선` ||
            lineNum.includes(
              lineNumber
            )
          );
        });
    }


    /*
     * GTX-A
     */
    if (
      !row &&
      currentLine === 'GTX-A'
    ) {

      row =
        rows.find(r => {

          const value =
            JSON.stringify(r);

          return (
            value.includes('GTX-A') ||
            value.includes('1032')
          );
        });
    }


    /*
     * 그래도 없으면
     * 환승역에서 잘못된 노선 코드가 선택될 수 있으므로
     * 첫 번째 데이터를 무작정 사용하지 않는다.
     */
    return row
      ? row.STATION_CD
      : null;
  }


  /* =========================================================
     시간표 조회
  ========================================================= */

  async function fetchTimetable(
    station,
    key,
    line,
    popupRequestGeneration
  ) {

    const weekInfo =
      getWeekTag();


    ttDateType.textContent =
      weekInfo.name;


    const stationCd =
      await findStationCode(
        station,
        key,
        line,
        popupRequestGeneration
      );


    if (!stationCd) {

      ttUpList.innerHTML =
        `
          <div
            class="tt-item"
            style="border:none; text-align:center;"
          >
            시간표 역 정보를 찾을 수 없음
          </div>
        `;


      ttDownList.innerHTML =
        `
          <div
            class="tt-item"
            style="border:none; text-align:center;"
          >
            시간표 역 정보를 찾을 수 없음
          </div>
        `;


      return;
    }


    /*
     * 상행
     */
    const upUrl =
      `${BASE_OPEN}/${key}/json/` +
      `SearchSTTimeTableByIDService/1/500/` +
      `${encodeURIComponent(stationCd)}/` +
      `${weekInfo.tag}/1/`;


    /*
     * 하행
     */
    const downUrl =
      `${BASE_OPEN}/${key}/json/` +
      `SearchSTTimeTableByIDService/1/500/` +
      `${encodeURIComponent(stationCd)}/` +
      `${weekInfo.tag}/2/`;


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
        'Timetable HTTP error'
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
      popupRequestGeneration !==
      popupGeneration
    ) {
      return;
    }


    const upService =
      upData.SearchSTTimeTableByIDService;


    const downService =
      downData.SearchSTTimeTableByIDService;


    const upRows =
      upService &&
      Array.isArray(upService.row)
        ? upService.row
        : [];


    const downRows =
      downService &&
      Array.isArray(downService.row)
        ? downService.row
        : [];


    const currentSecs =
      getCurrentScheduleSeconds();


    const renderTimetable =
      (rows, isUp) => {

        /*
         * 시간표 시간 추출
         */
        const validTrains =
          rows
            .filter(row => {

              const time =
                row.ARRIVETIME ||
                row.ARRIVAL_TIME ||
                row.DEPTIME ||
                '';


              return (
                timeToSeconds(time) >=
                currentSecs
              );
            })
            .sort((a, b) => {

              const aTime =
                a.ARRIVETIME ||
                a.ARRIVAL_TIME ||
                a.DEPTIME ||
                '';


              const bTime =
                b.ARRIVETIME ||
                b.ARRIVAL_TIME ||
                b.DEPTIME ||
                '';


              return (
                timeToSeconds(aTime) -
                timeToSeconds(bTime)
              );
            })
            .slice(0, 10);


        if (
          validTrains.length === 0
        ) {

          return `
            <div
              class="tt-item"
              style="border:none; text-align:center;"
            >
              금일 운행 종료
            </div>
          `;
        }


        let html = '';


        validTrains.forEach(row => {

          const rawTime =
            row.ARRIVETIME ||
            row.ARRIVAL_TIME ||
            row.DEPTIME ||
            '';


          const displayTime =
            String(rawTime)
              .substring(0, 5);


          let expClass =
            'exp-normal';

          let expText =
            '일반';


          const expressYn =
            String(
              row.EXPRESS_YN ||
              ''
            );


          const flFlag =
            String(
              row.FL_FLAG ||
              ''
            );


          if (
            expressYn === 'G' ||
            expressYn === 'D' ||
            expressYn === 'E' ||
            flFlag === '급행'
          ) {

            expClass =
              'exp-express';

            expText =
              '급행';

          } else if (
            expressYn === 'S' ||
            flFlag === '특급'
          ) {

            expClass =
              'exp-special';

            expText =
              '특급';
          }


          const destination =
            escapeHtml(
              row.SUBWAYENAME ||
              row.SUBWAYENAM ||
              row.BSTATN_NM ||
              '방면'
            );


          html += `
            <div
              class="tt-item ${
                isUp
                  ? 'up'
                  : 'down'
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
                ${destination}행
              </div>

            </div>
          `;
        });


        return html;
      };


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
     역 상세정보
  ========================================================= */

  async function fetchStationDetails(
    station,
    isSilent = false,
    popupRequestGeneration = popupGeneration
  ) {

    const key =
      getApiKey();


    const line =
      lineData[currentLine];


    if (!line) return;


    /*
     * 현재 팝업인지 확인
     */
    if (
      popupRequestGeneration !==
      popupGeneration
    ) {
      return;
    }


    if (!isSilent) {

      document
        .getElementById('arrLoading')
        ?.classList.remove(
          'hidden'
        );

      document
        .getElementById('statLoading')
        ?.classList.remove(
          'hidden'
        );

      document
        .getElementById('ttLoading')
        ?.classList.remove(
          'hidden'
        );
    }


    /*
     * =====================================================
     * 1. 실시간 도착정보
     * =====================================================
     */

    try {

      await fetchArrivalInfo(
        station,
        key,
        line,
        popupRequestGeneration
      );

    } catch (error) {

      console.error(
        '실시간 도착정보 오류:',
        error
      );


      if (
        popupRequestGeneration ===
        popupGeneration
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

    } finally {

      if (
        popupRequestGeneration ===
        popupGeneration
      ) {

        document
          .getElementById(
            'arrLoading'
          )
          ?.classList.add(
            'hidden'
          );
      }
    }


    /*
     * =====================================================
     * 2. 통계
     * =====================================================
     */

    try {

      await fetchStatistics();

    } catch (error) {

      console.error(
        '통계 조회 오류:',
        error
      );

    } finally {

      if (
        popupRequestGeneration ===
        popupGeneration
      ) {

        document
          .getElementById(
            'statLoading'
          )
          ?.classList.add(
            'hidden'
          );
      }
    }


    /*
     * =====================================================
     * 3. 시간표
     * =====================================================
     */

    try {

      await fetchTimetable(
        station,
        key,
        line,
        popupRequestGeneration
      );

    } catch (error) {

      console.error(
        '시간표 조회 오류:',
        error
      );


      if (
        popupRequestGeneration ===
        popupGeneration
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

    } finally {

      if (
        popupRequestGeneration ===
        popupGeneration
      ) {

        document
          .getElementById(
            'ttLoading'
          )
          ?.classList.add(
            'hidden'
          );
      }
    }
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


      /*
       * 현재 팝업 요청 무효화
       */
      popupGeneration++;


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

      /*
       * 팝업 닫기
       */
      fullPopup.classList.add(
        'hidden'
      );


      /*
       * 팝업 요청 무효화
       */
      popupGeneration++;


      if (popupRefreshTimer) {

        clearInterval(
          popupRefreshTimer
        );

        popupRefreshTimer = null;
      }


      /*
       * 지도 초기화
       */
      initMaps(
        event.target.value
      );
    }
  );


  /* =========================================================
     최초 실행
  ========================================================= */

  initMaps('2호선');

});
