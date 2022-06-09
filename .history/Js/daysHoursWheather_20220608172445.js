import WEATHER_OPEN_KEY from "./apikeys.js";
//Time settings
const weatherForecastE1 = document.getElementById("weather-forecast-days");
const weatherForecastE2 = document.getElementById("weather-forecast-hours");

function set2(num) {
  let ret;
  if (num < 10) {
    ret = "0" + num;
  } else {
    ret = num;
  }
  return ret;
}

// setInterval(() => {
//   const time = new Date();
//   const month = time.getMonth();
//   const date = time.getDate();
//   const day = time.getDay();
//   const hour = time.getHours();
//   const hoursIn12Format = hour >= 13 ? hour % 12 : hour;
//   const minutes = set2(time.getMinutes());
//   const ampm = hour >= 12 ? "PM" : "AM";

//   timeE1.innerHTML =
//     hoursIn12Format + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`;

//   dateE1.innerHTML = days[day] + "/" + date + "/" + months[month];
// }, 1000);

getWheatherData();

let selectedLocation;
function getWheatherData() {
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

function showWheatherData(data) {
  const newDaysArray = [];
  const daysWheatherData = data.list;
  newDaysArray.push(
    daysWheatherData[0],
    daysWheatherData[7],
    daysWheatherData[15],
    daysWheatherData[23],
    daysWheatherData[31]
  );

  for (let i = 0; i < newDaysArray.length; i++) {
    const daysCard = document.createElement("div");
    daysCard.innerHTML = `
    <div class=".hours_box">
    <div class="day">${moment(newDaysArray[i].dt * 1000).format("ddd")}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          newDaysArray[i].weather[0].icon
        }@2x.png"
        alt="weather icon"
        class="weather-icon"
      />
      <div class="temp">${newDaysArray[i].main.temp}&#176C</div>
    </div>
    `;
    weatherForecastE1.appendChild(daysCard);
  }

  const hoursData = data.list;
  for (let i = 0; i < 8; i++) {
    const hoursCard = document.createElement("div");
    hoursCard.innerHTML = `
    <div class=".hours_box">
      <img
        src="http://openweathermap.org/img/wn/${hoursData[i].weather[0].icon}@2x.png"
        alt="weather icon"
        class="weather-icon"
      />
      <div class="temp">Temperature - ${hoursData[i].main.temp}&#176C</div>
    </div>
    `;
    weatherForecastE2.appendChild(hoursCard);
  }
}
