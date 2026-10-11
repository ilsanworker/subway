/*
 * crowding.js
 * 서울교통공사 역별 혼잡도 통계 로더 및 조회 모듈
 *
 * 필요한 파일:
 *   crowding.js
 *   seoul-crowding.csv
 *
 * 선택 파일:
 *   korail-crowding.csv
 *
 * 제공 함수:
 *   estimateTrainCrowding(train)
 *   getCrowdingDataStatus()
 *   getCrowdingStations(lineName)
 *   getStationCrowding(lineName, stationName, options)
 *   debugCrowdingMatch(lineName, stationName)
 *
 * 주의:
 * CSV 통계는 역별·방향별·요일별·시간대별 자료입니다.
 * 특정 열차의 실시간 혼잡도 측정값이 아닙니다.
 */

(() => {
    "use strict";
  
    // 중복 실행 방지
    if (window.__crowdingModuleLoaded) {
      console.warn("[혼잡도] 이미 초기화되었습니다.");
      return;
    }
  
    window.__crowdingModuleLoaded = true;
  
    // ==================================================
    // 1. CSV 파일 경로
    // ==================================================
  
    const scriptURL = document.currentScript?.src
      ? new URL(document.currentScript.src, location.href)
      : new URL(location.href);
  
    const scriptDirectory = new URL(".", scriptURL);
    const pageDirectory = new URL(".", location.href);
    const rootDirectory = new URL("/", location.origin);
  
    const SEOUL_CSV_URLS = [...new Set([
      new URL("seoul-crowding.csv", scriptDirectory).href,
      new URL("seoul-crowding.csv", pageDirectory).href,
      new URL("data/seoul-crowding.csv", pageDirectory).href,
      new URL("assets/seoul-crowding.csv", pageDirectory).href,
      new URL("seoul-crowding.csv", rootDirectory).href
    ])];
  
    const KORAIL_CSV_URLS = [...new Set([
      new URL("korail-crowding.csv", scriptDirectory).href,
      new URL("korail-crowding.csv", pageDirectory).href,
      new URL("data/korail-crowding.csv", pageDirectory).href,
      new URL("assets/korail-crowding.csv", pageDirectory).href,
      new URL("korail-crowding.csv", rootDirectory).href
    ])];
  
    // ==================================================
    // 2. 시간대
    // ==================================================
  
    const TIMES = [
      "5시30분", "6시00분", "6시30분",
      "7시00분", "7시30분", "8시00분",
      "8시30분", "9시00분", "9시30분",
      "10시00분", "10시30분", "11시00분",
      "11시30분", "12시00분", "12시30분",
      "13시00분", "13시30분", "14시00분",
      "14시30분", "15시00분", "15시30분",
      "16시00분", "16시30분", "17시00분",
      "17시30분", "18시00분", "18시30분",
      "19시00분", "19시30분", "20시00분",
      "20시30분", "21시00분", "21시30분",
      "22시00분", "22시30분", "23시00분",
      "23시30분", "00시00분", "00시30분"
    ];
  
    const REQUIRED_COLUMNS = [
      "구분",
      "호선",
      "역명",
      "상하구분"
    ];
  
    // ==================================================
    // 3. 데이터 저장소
    // ==================================================
  
    const crowdingIndex = new Map();
    const stationsByLine = new Map();
  
    let korailRows = [];
    let dataReady = false;
    let loadError = null;
    let loadedURL = null;
    let loadedEncoding = null;
    let rawRowCount = 0;
  
    // ==================================================
    // 4. 문자열 정규화
    // ==================================================
  
    function normalizeText(value) {
      return String(value ?? "")
        .normalize("NFC")
        .replace(/^\uFEFF/, "")
        .trim();
    }
  
    function normalizeColumn(value) {
      return normalizeText(value)
        .replace(/\s+/g, "");
    }
  
    function normalizeLine(value) {
      const raw = normalizeText(value)
        .replace(/\s+/g, "");
  
      // "서울 1호선", "1호선" 등의 표기를 통일
      const match = raw.match(/(\d+)호선/);
  
      if (match) {
        return `${match[1]}호선`;
      }
  
      return raw;
    }
  
    function normalizeStation(value) {
      let station = normalizeText(value);
  
      if (
        !station ||
        /^(현재 정보 없음|정보 없음|알 수 없음|미확인|-|없음)$/i
          .test(station)
      ) {
        return "";
      }
  
      return station
        .replace(/\([^)]*\)/g, "")
        .replace(/（[^）]*）/g, "")
        .replace(/\[[^\]]*\]/g, "")
        .replace(/【[^】]*】/g, "")
        .replace(/[·ㆍ]/g, "")
        .replace(/[\s\u00A0]+/g, "")
        .replace(/역$/, "");
    }
  
    /*
     * 과거 역명 별칭
     *
     * 역명이 변경되었거나 API가 예전 표기를 사용하는 경우
     * 현재 역명으로 변환합니다.
     */
  
    const STATION_ALIASES = new Map([
      ["성내", "잠실나루"],
      ["신천", "잠실새내"],
      ["구로공단", "구로디지털단지"]
    ]);
  
    function canonicalStation(value) {
      const station = normalizeStation(value);
  
      if (!station) {
        return "";
      }
  
      for (const [alias, canonical] of STATION_ALIASES) {
        if (normalizeStation(alias) === station) {
          return normalizeStation(canonical);
        }
      }
  
      return station;
    }
  
    function normalizeDirection(value) {
      const direction = normalizeText(value)
        .replace(/\s+/g, "");
  
      const aliases = {
        "내선순환": "내선",
        "내선": "내선",
        "외선순환": "외선",
        "외선": "외선",
        "상행": "상선",
        "상선": "상선",
        "하행": "하선",
        "하선": "하선"
      };
  
      return aliases[direction] || direction;
    }
  
    function normalizeDay(value) {
      const day = normalizeText(value)
        .replace(/\s+/g, "");
  
      if (
        ["주말", "일요일", "일", "Sunday", "Sun"].includes(day)
      ) {
        return "일요일";
      }
  
      if (
        ["토요일", "토", "Saturday", "Sat"].includes(day)
      ) {
        return "토요일";
      }
  
      if (
        [
          "평일",
          "월요일",
          "화요일",
          "수요일",
          "목요일",
          "금요일",
          "weekday",
          "weekdays"
        ].includes(day)
      ) {
        return "평일";
      }
  
      return day;
    }
  
    // ==================================================
    // 5. 요일과 시간 계산
    // ==================================================
  
    function getDayType(date = new Date()) {
      const day = date.getDay();
  
      if (day === 0) return "일요일";
      if (day === 6) return "토요일";
  
      return "평일";
    }
  
    function currentMinute(date = new Date()) {
      const hour = date.getHours();
      const minute = date.getMinutes();
  
      return hour === 0
        ? 1440 + minute
        : hour * 60 + minute;
    }
  
    function parseTime(label) {
      const match = String(label).match(
        /^(\d{1,2})시(\d{2})분$/
      );
  
      if (!match) {
        return NaN;
      }
  
      const hour = Number(match[1]);
      const minute = Number(match[2]);
  
      return hour === 0
        ? 1440 + minute
        : hour * 60 + minute;
    }
  
    function csvNumber(value) {
      if (
        value == null ||
        String(value).trim() === ""
      ) {
        return null;
      }
  
      const number = Number(
        String(value).replace(/,/g, "").trim()
      );
  
      return Number.isFinite(number)
        ? number
        : null;
    }
  
    // ==================================================
    // 6. CSV 파서
    // ==================================================
  
    function parseCSV(textValue) {
      const source = String(textValue ?? "")
        .replace(/^\uFEFF/, "")
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n");
  
      const matrix = [];
  
      let row = [];
      let cell = "";
      let quoted = false;
  
      for (let i = 0; i < source.length; i++) {
        const ch = source[i];
  
        if (quoted) {
          if (
            ch === '"' &&
            source[i + 1] === '"'
          ) {
            cell += '"';
            i++;
          } else if (ch === '"') {
            quoted = false;
          } else {
            cell += ch;
          }
        } else if (ch === '"') {
          quoted = true;
        } else if (ch === ",") {
          row.push(cell);
          cell = "";
        } else if (ch === "\n") {
          row.push(cell);
  
          if (row.some(value => normalizeText(value) !== "")) {
            matrix.push(row);
          }
  
          row = [];
          cell = "";
        } else {
          cell += ch;
        }
      }
  
      if (cell.length || row.length) {
        row.push(cell);
  
        if (row.some(value => normalizeText(value) !== "")) {
          matrix.push(row);
        }
      }
  
      if (!matrix.length) {
        return {
          headers: [],
          rows: []
        };
      }
  
      const headers = matrix.shift()
        .map(normalizeColumn);
  
      const rows = matrix.map(values => {
        const record = {};
  
        headers.forEach((header, index) => {
          record[header] = values[index] ?? "";
        });
  
        return record;
      });
  
      return {
        headers,
        rows
      };
    }
  
    // ==================================================
    // 7. CSV 인코딩 자동 판별
    // ==================================================
  
    function decodeCSV(buffer, kind = "seoul") {
      const encodings = [
        "utf-8",
        "euc-kr"
      ];
  
      let lastError = null;
      let lastHeaders = [];
  
      for (const encoding of encodings) {
        try {
          const decoded = new TextDecoder(encoding)
            .decode(buffer);
  
          const parsed = parseCSV(decoded);
  
          lastHeaders = parsed.headers;
  
          const expectedColumns = kind === "korail"
            ? [
                "선별",
                "최대혼잡구간",
                "최고",
                "첨두"
              ]
            : REQUIRED_COLUMNS;
  
          const valid = expectedColumns.every(
            column => parsed.headers.includes(column)
          );
  
          if (valid && parsed.rows.length) {
            return {
              ...parsed,
              encoding
            };
          }
  
          lastError = new Error(
            `필수 열 누락 또는 데이터 없음: ${parsed.headers.join(", ")}`
          );
        } catch (error) {
          lastError = error;
        }
      }
  
      throw new Error(
        `CSV를 읽지 못했습니다. ` +
        `오류: ${lastError?.message || "알 수 없는 오류"}; ` +
        `확인한 열: ${lastHeaders.join(", ")}`
      );
    }
  
    // ==================================================
    // 8. 데이터 색인 생성
    // ==================================================
  
    function makeKey(day, line, station, direction) {
      return `${day}|${line}|${station}|${direction}`;
    }
  
    function addStation(line, station) {
      if (!stationsByLine.has(line)) {
        stationsByLine.set(line, new Set());
      }
  
      stationsByLine.get(line).add(station);
    }
  
    function addSeoulRows(rows) {
      const grouped = new Map();
  
      rawRowCount = rows.length;
  
      for (const row of rows) {
        const day = normalizeDay(row["구분"]);
        const line = normalizeLine(row["호선"]);
        const station = canonicalStation(row["역명"]);
        const direction = normalizeDirection(row["상하구분"]);
  
        if (!day || !line || !station || !direction) {
          continue;
        }
  
        addStation(line, station);
  
        const values = TIMES.map(time =>
          csvNumber(row[normalizeColumn(time)])
        );
  
        const key = makeKey(
          day,
          line,
          station,
          direction
        );
  
        if (!grouped.has(key)) {
          grouped.set(key, []);
        }
  
        grouped.get(key).push(values);
      }
  
      crowdingIndex.clear();
  
      for (const [key, duplicateRows] of grouped) {
        const merged = TIMES.map((_, index) => {
          const available = duplicateRows
            .map(row => row[index])
            .filter(value =>
              value !== null &&
              Number.isFinite(value)
            );
  
          if (!available.length) {
            return null;
          }
  
          /*
           * 중복 행 처리:
           * 0과 양수가 섞여 있으면 양수 평균
           * 전부 0이면 0 유지
           */
  
          const nonZero = available.filter(
            value => value !== 0
          );
  
          const selected = nonZero.length
            ? nonZero
            : available;
  
          const average = selected.reduce(
            (sum, value) => sum + value,
            0
          ) / selected.length;
  
          return Math.round(average * 10) / 10;
        });
  
        crowdingIndex.set(key, merged);
      }
    }
  
    // ==================================================
    // 9. CSV 로드
    // ==================================================
  
    async function fetchFirstCSV(
      urls,
      required = true,
      kind = "seoul"
    ) {
      let lastError = null;
  
      for (const url of urls) {
        try {
          const response = await fetch(url, {
            cache: "no-store"
          });
  
          if (!response.ok) {
            lastError = new Error(
              `HTTP ${response.status}: ${url}`
            );
  
            continue;
          }
  
          const buffer = await response.arrayBuffer();
          const decoded = decodeCSV(buffer, kind);
  
          return {
            ...decoded,
            url
          };
        } catch (error) {
          lastError = error;
        }
      }
  
      if (!required) {
        return null;
      }
  
      throw lastError || new Error(
        "CSV 파일을 찾을 수 없습니다."
      );
    }
  
    async function loadCrowdingData() {
      try {
        const seoul = await fetchFirstCSV(
          SEOUL_CSV_URLS,
          true,
          "seoul"
        );
  
        addSeoulRows(seoul.rows);
  
        loadedURL = seoul.url;
        loadedEncoding = seoul.encoding;
  
        // 한국철도공사 CSV는 선택 파일입니다.
        // 없더라도 서울교통공사 통계 조회는 작동합니다.
  
        const korail = await fetchFirstCSV(
          KORAIL_CSV_URLS,
          false,
          "korail"
        );
  
        korailRows = korail
          ? korail.rows
          : [];
  
        if (korail) {
          console.info(
            `[혼잡도] 한국철도공사 참고 자료 ${korail.rows.length}행 로드 완료`
          );
        }
  
        if (!crowdingIndex.size) {
          throw new Error(
            "CSV를 읽었지만 혼잡도 색인이 비어 있습니다."
          );
        }
  
        dataReady = true;
        loadError = null;
  
        const status = window.getCrowdingDataStatus();
  
        console.info(
          "[혼잡도] 데이터 로드 완료",
          status
        );
  
        window.dispatchEvent(
          new CustomEvent("crowdingdataready", {
            detail: status
          })
        );
      } catch (error) {
        dataReady = false;
        loadError = error;
  
        console.error(
          "[혼잡도] CSV 로드 실패",
          error
        );
  
        window.dispatchEvent(
          new CustomEvent("crowdingdataerror", {
            detail: String(error)
          })
        );
      }
    }
  
    // ==================================================
    // 10. 시간대 보간
    // ==================================================
  
    function interpolate(values, minute) {
      if (!values) {
        return null;
      }
  
      const first = parseTime(TIMES[0]);
      const last = parseTime(TIMES[TIMES.length - 1]);
  
      if (minute < first || minute > last) {
        return null;
      }
  
      for (let i = 0; i < TIMES.length - 1; i++) {
        const t1 = parseTime(TIMES[i]);
        const t2 = parseTime(TIMES[i + 1]);
  
        if (minute < t1 || minute > t2) {
          continue;
        }
  
        const a = values[i];
        const b = values[i + 1];
  
        if (a == null && b == null) return null;
        if (a == null) return b;
        if (b == null) return a;
  
        const ratio = (minute - t1) / (t2 - t1);
  
        return Math.round(
          (a + (b - a) * ratio) * 10
        ) / 10;
      }
  
      return null;
    }
  
    // ==================================================
    // 11. 역명 매칭
    // ==================================================
  
    function resolveStation(line, requestedName) {
      const requested = canonicalStation(requestedName);
      const available = stationsByLine.get(line);
  
      if (!requested) {
        return {
          station: null,
          method: "empty",
          candidates: []
        };
      }
  
      if (!available?.size) {
        return {
          station: null,
          method: "line-not-in-dataset",
          candidates: []
        };
      }
  
      // 1순위: 정확히 일치
      if (available.has(requested)) {
        return {
          station: requested,
          method: "exact",
          candidates: [requested]
        };
      }
  
      // 2순위: 별칭으로 일치
      const aliasMatches = [...available].filter(
        station => canonicalStation(station) === requested
      );
  
      if (aliasMatches.length === 1) {
        return {
          station: aliasMatches[0],
          method: "alias",
          candidates: aliasMatches
        };
      }
  
      // 3순위: 접두어 일치
      // 후보가 하나일 때만 매칭하여 오매칭을 방지합니다.
  
      const prefixMatches = [...available].filter(
        station =>
          station.startsWith(requested) ||
          requested.startsWith(station)
      );
  
      if (prefixMatches.length === 1) {
        return {
          station: prefixMatches[0],
          method: "prefix",
          candidates: prefixMatches
        };
      }
  
      return {
        station: null,
        method: "station-not-in-dataset",
        candidates: prefixMatches.slice(0, 5)
      };
    }
  
    // ==================================================
    // 12. 열차 방향 처리
    // ==================================================
  
    function getDirectionCandidates(line, train) {
      const explicit = normalizeDirection(
        train?.directionName ??
        train?.direction ??
        train?.updnLineName ??
        ""
      );
  
      if (
        ["내선", "외선", "상선", "하선"].includes(explicit)
      ) {
        return [explicit];
      }
  
      /*
       * 기존 HTML의 열차 객체:
       * isUp = true 또는 false
       *
       * 2호선 CSV: 내선 / 외선
       * 그 외 지원 노선: 상선 / 하선
       */
  
      if (typeof train?.isUp === "boolean") {
        if (line === "2호선") {
          return [train.isUp ? "내선" : "외선"];
        }
  
        return [train.isUp ? "상선" : "하선"];
      }
  
      // 방향을 모르면 양방향 평균을 사용합니다.
      return line === "2호선"
        ? ["내선", "외선"]
        : ["상선", "하선"];
    }
  
    // ==================================================
    // 13. 혼잡도 계산
    // ==================================================
  
    function scoreForStation(
      line,
      station,
      day,
      minute,
      directions
    ) {
      const selected = [];
  
      for (const direction of directions) {
        const values = crowdingIndex.get(
          makeKey(day, line, station, direction)
        );
  
        const score = interpolate(values, minute);
  
        if (
          score !== null &&
          Number.isFinite(score)
        ) {
          selected.push(score);
        }
      }
  
      /*
       * 선택한 방향의 값이 없을 때만
       * 같은 역의 반대 방향 통계를 보조 조회합니다.
       */
  
      if (!selected.length && directions.length === 1) {
        const allDirections = line === "2호선"
          ? ["내선", "외선"]
          : ["상선", "하선"];
  
        for (const direction of allDirections) {
          if (directions.includes(direction)) {
            continue;
          }
  
          const values = crowdingIndex.get(
            makeKey(day, line, station, direction)
          );
  
          const score = interpolate(values, minute);
  
          if (
            score !== null &&
            Number.isFinite(score)
          ) {
            selected.push(score);
          }
        }
      }
  
      if (!selected.length) {
        return null;
      }
  
      const average = selected.reduce(
        (sum, value) => sum + value,
        0
      ) / selected.length;
  
      return Math.round(average * 10) / 10;
    }
  
    function crowdingLabel(score) {
      if (score < 40) return "여유";
      if (score < 80) return "보통";
      if (score < 100) return "혼잡";
  
      return "매우 혼잡";
    }
  
    // ==================================================
    // 14. 한국철도공사 참고 정보
    // ==================================================
  
    function korailReferenceForLine(line) {
      const related = {
        "1호선": [
          "경부(장항)선",
          "경인선",
          "경원선"
        ],
        "3호선": ["일산선"],
        "4호선": ["안산(과천)선"],
        "경의중앙선": ["경의선", "중앙선"],
        "수인분당선": ["분당선", "수인선"]
      }[line] || [];
  
      const matches = korailRows.filter(
        row => related.includes(
          normalizeText(row["선별"])
        )
      );
  
      if (!matches.length) {
        return null;
      }
  
      matches.sort((a, b) =>
        (csvNumber(b["최고"]) ?? -Infinity) -
        (csvNumber(a["최고"]) ?? -Infinity)
      );
  
      const row = matches[0];
  
      return {
        route: normalizeText(row["선별"]),
        section: normalizeText(row["최대혼잡구간"]),
        max: csvNumber(row["최고"]),
        peak: csvNumber(row["첨두"]),
        year: 2018
      };
    }
  
    // ==================================================
    // 15. 통계 미제공 결과
    // ==================================================
  
    function notAvailableResult(
      line,
      station,
      day,
      direction,
      resolution
    ) {
      const lineMissing =
        resolution.method === "line-not-in-dataset";
  
      const source = lineMissing
        ? `${line || "해당 노선"}은 서울교통공사 혼잡도 데이터에 포함되어 있지 않습니다.`
        : `${line} ${station || "역명 미확인"}역은 현재 서울교통공사 역별 통계 데이터가 없습니다.`;
  
      const result = {
        score: null,
        label: lineMissing
          ? "노선 통계 미제공"
          : "통계 미제공 역",
        source,
        line,
        station,
        day,
        direction,
        matchMethod: resolution.method,
        candidates: resolution.candidates || []
      };
  
      /*
       * 한국철도공사의 2018년 노선별 참고값은
       * 역별 혼잡도 점수로 사용하지 않습니다.
       */
  
      const reference = korailReferenceForLine(line);
  
      if (reference) {
        result.korailReference = {
          ...reference,
          note: "2018년 노선별 참고 자료이며 해당 역의 현재 혼잡도가 아닙니다."
        };
      }
  
      return result;
    }
  
    // ==================================================
    // 16. 기존 HTML 호환 함수
    // ==================================================
  
    window.estimateTrainCrowding = function estimateTrainCrowding(train) {
      if (!dataReady) {
        return {
          score: null,
          label: loadError
            ? "자료 로드 실패"
            : "자료 불러오는 중",
          source: loadError
            ? loadError.message
            : "혼잡도 CSV 로딩 중"
        };
      }
  
      if (!train || typeof train !== "object") {
        return {
          score: null,
          label: "열차 정보 없음",
          source: "열차 데이터가 전달되지 않았습니다."
        };
      }
  
      const lineRaw =
        train.lineName ??
        train.line ??
        train.subwayLine ??
        "";
  
      const line = normalizeLine(lineRaw);
  
      const stationRaw = [
        train.station,
        train.statnNm,
        train.stationName,
        train.stationNm,
        train.currentStation
      ].find(value => normalizeStation(value)) ?? "";
  
      const station = canonicalStation(stationRaw);
  
      const now = new Date();
      const day = getDayType(now);
      const minute = currentMinute(now);
  
      const directions = getDirectionCandidates(
        line,
        train
      );
  
      if (!line) {
        return {
          score: null,
          label: "노선 정보 없음",
          source: "열차 객체에서 노선명을 찾지 못했습니다."
        };
      }
  
      if (!station) {
        return {
          score: null,
          label: "역명 확인 필요",
          source: "열차 객체에서 유효한 역명을 찾지 못했습니다.",
          line
        };
      }
  
      const resolution = resolveStation(
        line,
        station
      );
  
      console.debug("[혼잡도 역명 매칭]", {
        line,
        originalStation: stationRaw,
        normalizedStation: station,
        resolvedStation: resolution.station,
        method: resolution.method,
        candidates: resolution.candidates
      });
  
      if (!resolution.station) {
        return notAvailableResult(
          line,
          station,
          day,
          directions.join("/"),
          resolution
        );
      }
  
      const score = scoreForStation(
        line,
        resolution.station,
        day,
        minute,
        directions
      );
  
      if (
        score === null ||
        !Number.isFinite(score)
      ) {
        return {
          score: null,
          label: "시간대 통계 없음",
          source:
            `${line} ${resolution.station}역의 ` +
            `${day} ${directions.join("/")} ` +
            `${minute}분 통계값이 없습니다.`,
          line,
          station: resolution.station,
          day,
          direction: directions.join("/"),
          matchMethod: resolution.method
        };
      }
  
      return {
        score,
        label: crowdingLabel(score),
        source:
          `서울교통공사 역·요일·시간대별 통계 ` +
          `(${directions.join("/")})`,
        line,
        station: resolution.station,
        day,
        direction: directions.join("/"),
        matchMethod: resolution.method
      };
    };
  
    // ==================================================
    // 17. 역별 혼잡도 직접 조회
    // ==================================================
  
    window.getStationCrowding = function getStationCrowding(
      lineName,
      stationName,
      options = {}
    ) {
      if (!dataReady) {
        return {
          score: null,
          label: loadError
            ? "자료 로드 실패"
            : "자료 불러오는 중",
          error: loadError?.message ?? null
        };
      }
  
      const line = normalizeLine(lineName);
  
      const date = options.date instanceof Date
        ? options.date
        : new Date();
  
      const day = normalizeDay(
        options.day || getDayType(date)
      );
  
      const minute =
        options.minute !== undefined &&
        Number.isFinite(Number(options.minute))
          ? Number(options.minute)
          : currentMinute(date);
  
      const station = canonicalStation(stationName);
  
      const directions = options.direction
        ? [normalizeDirection(options.direction)]
        : line === "2호선"
          ? ["내선", "외선"]
          : ["상선", "하선"];
  
      const resolution = resolveStation(
        line,
        station
      );
  
      if (!resolution.station) {
        return notAvailableResult(
          line,
          station,
          day,
          directions.join("/"),
          resolution
        );
      }
  
      const score = scoreForStation(
        line,
        resolution.station,
        day,
        minute,
        directions
      );
  
      if (
        score === null ||
        !Number.isFinite(score)
      ) {
        return {
          score: null,
          label: "시간대 통계 없음",
          source:
            `${line} ${resolution.station}역의 ` +
            "해당 요일·시간대 통계가 없습니다.",
          line,
          station: resolution.station,
          day,
          direction: directions.join("/"),
          matchMethod: resolution.method
        };
      }
  
      return {
        score,
        label: crowdingLabel(score),
        source: "서울교통공사 역별 시간대 통계",
        line,
        station: resolution.station,
        day,
        minute,
        direction: directions.join("/"),
        matchMethod: resolution.method
      };
    };
  
    // ==================================================
    // 18. 노선별 역 목록
    // ==================================================
  
    window.getCrowdingStations = function getCrowdingStations(lineName) {
      const line = normalizeLine(lineName);
  
      return [
        ...(stationsByLine.get(line) || [])
      ].sort((a, b) => a.localeCompare(b, "ko"));
    };
  
    // ==================================================
    // 19. 데이터 상태
    // ==================================================
  
    window.getCrowdingDataStatus = function getCrowdingDataStatus() {
      return {
        ready: dataReady,
        error: loadError
          ? String(loadError.message || loadError)
          : null,
        loadedURL,
        encoding: loadedEncoding,
        rawRows: rawRowCount,
        records: crowdingIndex.size,
        lines: [...stationsByLine.keys()]
          .sort((a, b) => a.localeCompare(b, "ko")),
        stationsByLine: Object.fromEntries(
          [...stationsByLine.entries()].map(
            ([line, stations]) => [
              line,
              stations.size
            ]
          )
        ),
        korailReferenceLoaded: korailRows.length > 0,
        note:
          "CSV 통계는 역별 시간대 평균이며 " +
          "열차별 실시간 혼잡도가 아닙니다."
      };
    };
  
    // ==================================================
    // 20. 역명 매칭 디버깅
    // ==================================================
  
    window.debugCrowdingMatch = function debugCrowdingMatch(
      lineName,
      stationName
    ) {
      const line = normalizeLine(lineName);
  
      const resolution = resolveStation(
        line,
        stationName
      );
  
      return {
        line,
        requestedStation: stationName,
        normalizedStation: canonicalStation(stationName),
        resolvedStation: resolution.station,
        method: resolution.method,
        candidates: resolution.candidates,
        availableStations: window.getCrowdingStations(line)
      };
    };
  
    // ==================================================
    // 21. 초기화
    // ==================================================
  
    loadCrowdingData();
  
  })();
