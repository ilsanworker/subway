document.addEventListener('DOMContentLoaded', () => {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '';
  const BASE_SW = isLocal ? 'http://swopenapi.seoul.go.kr/api/subway' : '/api/sw';
  
  const searchBtn = document.getElementById('searchBtn');
  const stationInput = document.getElementById('stationInput');
  const arrivalContainer = document.getElementById('arrivalLine2');
  const apiKey = document.getElementById('apiKey').value || 'sample';

  // 초기 렌더링 (강남)
  fetchArrivalData('강남');

  searchBtn.addEventListener('click', () => {
    const station = stationInput.value.trim();
    if(station) {
      document.getElementById('sheetStationName').textContent = station + '역';
      fetchArrivalData(station);
    }
  });
  
  stationInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') searchBtn.click();
  });

  async function fetchArrivalData(stationName) {
    arrivalContainer.innerHTML = `<div class="loading-text">데이터를 불러오는 중입니다...</div>`;
    
    try {
      const url = `${BASE_SW}/${apiKey}/json/realtimeStationArrival/0/10/${encodeURIComponent(stationName)}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data.realtimeArrivalList) {
        arrivalContainer.innerHTML = `<div class="loading-text">현재 대기중인 열차가 없습니다.</div>`;
        return;
      }

      // 2호선(ID: 1002) 데이터만 필터링 (다중 노선 확장 가능)
      const line2Trains = data.realtimeArrivalList.filter(t => t.subwayId === '1002');
      
      // 내선, 외선 분류
      const upTrains = line2Trains.filter(t => t.updnLine === '내선' || t.updnLine === '상행').slice(0, 2);
      const downTrains = line2Trains.filter(t => t.updnLine === '외선' || t.updnLine === '하행').slice(0, 2);

      let html = '';
      
      if (upTrains.length > 0) html += createArrivalRow(upTrains, '내선순환');
      if (downTrains.length > 0) html += createArrivalRow(downTrains, '외선순환');

      if(html === '') html = `<div class="loading-text">현재 2호선 대기 열차가 없습니다.</div>`;
      
      arrivalContainer.innerHTML = html;

    } catch (error) {
      arrivalContainer.innerHTML = `<div class="loading-text" style="color:#ff3b30">오류가 발생했습니다.</div>`;
    }
  }

  function createArrivalRow(trains, directionName) {
    const first = trains[0];
    const second = trains[1];

    // 도착 메시지 파싱 및 스타일링 (이미지 UI 반영)
    // arvlMsg2 예시: "강남 도착", "5분 후", "[3]번째 전역" 등
    let mainStatus = first.arvlMsg2;
    let isSoon = mainStatus.includes('도착') || mainStatus.includes('진입');
    let statusClass = isSoon ? 'status-green' : '';
    
    if(isSoon && !mainStatus.includes('분')) {
      mainStatus = `곧 도착 <span style="font-size:16px;">(${mainStatus})</span>`;
    } else {
      mainStatus = mainStatus.replace('후', '후 도착');
    }

    // 다음 열차 텍스트 구성
    let nextTrainText = '-';
    if(second) {
      if(second.barvlDt !== "0") {
        nextTrainText = `${Math.floor(parseInt(second.barvlDt) / 60)}분 ${parseInt(second.barvlDt) % 60}초 후`;
      } else {
        nextTrainText = second.arvlMsg2;
      }
    }

    // 모의 지연 상태 뱃지 (API가 미제공하므로 메시지에 따라 분기 처리)
    let badgeHtml = `<div class="badge-status badge-normal">정시 운행</div>`;
    if(first.arvlMsg2.includes('지연') || first.arvlMsg2.includes('서행')) {
       badgeHtml = `<div class="badge-status badge-warning">+1분 서행</div>`;
    }

    return `
      <div class="arrival-row">
        <div class="arr-main">
          <div class="arr-dir"><span class="density-dot green"></span> ${directionName} (${first.bstatnNm} 방면)</div>
          <div class="arr-status ${statusClass}">${mainStatus}</div>
          <div class="arr-desc">열차번호 ${first.btrainNo}호 · ${first.arvlMsg3}</div>
        </div>
        <div class="arr-side">
          ${badgeHtml}
          <div class="arr-next">다음 열차</div>
          <div class="arr-next-time">${nextTrainText}</div>
        </div>
      </div>
    `;
  }
});
