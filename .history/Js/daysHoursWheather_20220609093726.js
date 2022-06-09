import WEATHER_OPEN_KEY from "./apikeys.js";
// import getAPI from "./getAPIInformation.js";

const weatherForecastE1 = document.getElementById("weather-forecast-days");
const weatherForecastE2 = document.getElementById("wheather-tbody");

function getWheatherData() {
  let selectedLocation;
  navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${WEATHER_OPEN_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        selectedLocation = data;
        showWheatherData(data);
      });
  });
}
getWheatherData();

function showWheatherData(data) {
  const newDaysArray = [];
  const daysWheatherData = data.list;
  newDaysArray.push(
    daysWheatherData[5],
    daysWheatherData[13],
    daysWheatherData[21],
    daysWheatherData[29],
    daysWheatherData[37]
  );

  for (let i = 0; i < newDaysArray.length; i++) {
    const daysCard = document.createElement("div");

    let temp = newDaysArray[i].main.temp;
    let newTemp = Math.trunc(temp);
    let tempFeels = newDaysArray[i].main.feels_like;
    let newTempFeels = Math.trunc(tempFeels);
    let pop = Math.floor(newDaysArray[i].pop * 100);

    daysCard.classList.add("days_box");
    daysCard.innerHTML = `
    <div class="days_day">${moment(newDaysArray[i].dt * 1000).format(
      "ddd"
    )}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          newDaysArray[i].weather[0].icon
        }@2x.png"
        alt="weather icon"
        class="days_weather-icon"
      />
      <div class="days_temp">${newTemp}&#176</div>
      <div class="days_feels">Feels like</div>
      <div class="days_temp_feels">${newTempFeels}&#176</div>
      
      <div class="days_pop"><span class="iconify days_pop_icon" data-icon="bi:cloud-rain-heavy" style="color: white; font-size: 17px;"></span> ${pop}%</div>

    `;
    weatherForecastE1.appendChild(daysCard);
  }

  const hoursData = data.list;
  for (let i = 0; i < 8; i++) {
    const hoursCard = document.createElement("tr");
    hoursCard.classList.add("hours_box");

    let tempHours = hoursData[i].main.temp;
    let newTempHours = Math.trunc(tempHours);
    let tempFeelsHours = hoursData[i].main.feels_like;
    let newTempFeelsHours = Math.trunc(tempFeelsHours);
    let popHours = Math.floor(hoursData[i].pop * 100);
    let date = hoursData[i].dt_txt;
    let newDate = date.slice("5");
    let newDateEnd = newDate.slice("0", "-3");
    let changeDate = newDateEnd.replace("-", "/");
    let dateFinal = changeDate.slice("0", "-5");
    let timeFinal = changeDate.slice("5");

    hoursCard.innerHTML = `
    <td class="hours_date">${dateFinal}</td>
    <td class="hours_time">${timeFinal}</td>
    <td><img
    src="http://openweathermap.org/img/wn/${hoursData[i].weather[0].icon}@2x.png"
    alt="weather icon"
    class="hours_weather-icon"
  /></td>
   <td class="hours_temp">${newTempHours}&#176</td>
   <td class="hours_feels">Feels like</td>
   <td class="hours_temp_feels">${newTempFeelsHours}&#176</td>
   <td class="hours_pop"><span class="iconify days_pop_icon" data-icon="bi:cloud-rain-heavy" style="color: white; font-size: 17px;"></span>${popHours}%</td>
    `;
    weatherForecastE2.appendChild(hoursCard);
  }
}

// <div class="hours_date_time">
//     <div class="hours_date">${dateFinal}</div>
//     <div class="hours_time">${timeFinal}</div>
//     </div>
//       <img
//         src="http://openweathermap.org/img/wn/${hoursData[i].weather[0].icon}@2x.png"
//         alt="weather icon"
//         class="hours_weather-icon"
//       />
//       <div class="hours_temp">${newTempHours}&#176</div>
//       <div class="hours_feels">Feels like</div>
//       <div class="hours_temp_feels">${newTempFeelsHours}&#176</div>
//       <div class="hours_pop"><span class="iconify days_pop_icon" data-icon="bi:cloud-rain-heavy" style="color: white; font-size: 17px;"></span>${popHours}%</div>
