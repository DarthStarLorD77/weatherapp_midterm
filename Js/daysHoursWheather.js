const weatherForecastE1 = document.getElementById("weather-forecast-days");
const weatherForecastE2 = document.getElementById("weather-forecast-hours");

function showWheatherData(data) {
  let dateObject = {};

  data.list.forEach((forecastObj) => {
    let date = forecastObj.dt_txt.slice(0, 10);
    let time = forecastObj.dt_txt.slice(10);
    forecastObj.dt_date = date;
    forecastObj.dt_time = time;
    delete data.list;
    data.newlist = forecastObj;

    let propertyName = forecastObj.dt_date;

    if (dateObject[propertyName]) {
      dateObject[propertyName].push(forecastObj);
    } else {
      dateObject[propertyName] = [];
      dateObject[propertyName].push(forecastObj);
    }
  });

  let daysNewArray = Object.keys(dateObject);
  daysNewArray.forEach((day) => {
    const dayData = dateObject[day][0];
    const daysCard = document.createElement("div");
    daysCard.classList.add("days_card");
    let temp = dayData.main.temp;
    let newTemp = Math.trunc(temp);
    let tempFeels = dayData.main.feels_like;
    let newTempFeels = Math.trunc(tempFeels);
    let pop = Math.floor(dayData.pop * 100);
    daysCard.innerHTML = `
    <div class="days_day">${moment(dayData.dt * 1000).format("ddd")}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            dayData.weather[0].icon
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
  });

  let hoursNewData = dateObject[daysNewArray[0]];
  console.log("hoursDAta", hoursNewData);

  hoursNewData.forEach((hour) => {
    const hoursCard = document.createElement("div");
    hoursCard.classList.add("hours_box");

    let tempHours = hour.main.temp;
    let newTempHours = Math.trunc(tempHours);
    let tempFeelsHours = hour.main.feels_like;
    let newTempFeelsHours = Math.trunc(tempFeelsHours);
    let popHours = Math.floor(hour.pop * 100);
    let date = hour.dt_date;
    let time = hour.dt_time;
    hoursCard.innerHTML = `
    <div class="hours_date_box">
    <div class="hours_date">${date}</div>
    <div class="hours_time">${time}</div>
    </div>
    <div><img
    src="http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png"
    alt="weather icon"
    class="hours_weather-icon"
  /></div>
   <div class="hours_temp">${newTempHours}&#176</div>
   <div class="hours_feels_box">
   <div class="hours_feels">Feels like</div>
   <div class="hours_temp_feels">${newTempFeelsHours}&#176</div>
   </div>
   <div class="hours_pop"><span class="iconify days_pop_icon" data-icon="bi:cloud-rain-heavy" style="color: white; font-size: 17px;"></span>${popHours}%</div>
    `;
    weatherForecastE2.appendChild(hoursCard);
  });

  // }
}

export default showWheatherData;
