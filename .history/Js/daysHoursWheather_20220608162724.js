import WEATHER_OPEN_KEY from "./apikeys.js";
//Time settings
const timeE1 = document.getElementById("time");
const dateE1 = document.getElementById("date");
const currentWeatherItemsE1 = document.getElementById("current-weather-items");
const currentTemp = document.getElementById("current-temp");
const currentPlaces = document.getElementById("place-container");
const weatherForecastE1 = document.getElementById("weather-forecast-days");
const weatherForecastE2 = document.getElementById("weather-forecast-hours");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function set2(num) {
  let ret;
  if (num < 10) {
    ret = "0" + num;
  } else {
    ret = num;
  }
  return ret;
}

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12Format = hour >= 13 ? hour % 12 : hour;
  const minutes = set2(time.getMinutes());
  const ampm = hour >= 12 ? "PM" : "AM";

  timeE1.innerHTML =
    hoursIn12Format + ":" + minutes + " " + `<span id="am-pm">${ampm}</span>`;

  dateE1.innerHTML = days[day] + "/" + date + "/" + months[month];
}, 1000);

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

// let selecteddayshours;
// function hoursDays() {
//   navigator.geolocation.getCurrentPosition((success) => {
//     console.log(success);
//     let { latitude, longitude } = success.coords;

//     fetch(
//       `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${WEATHER_OPEN_KEY}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         selecteddayshours = data;
//         showLocationData(data);
//       });
//   });
// }

// hoursDays();

function showWheatherData(data) {
  let otherDays = "";

  data.list.forEach((day, idx) => {
    const dayDate = day.dt * 1000;
    if (idx == 0) {
    } else {
      otherDays += `
      <div class="weather-forecast-items">
      <div class="day">${moment(dayDate).format("dddd")}</div>
      <img
        src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
        alt="weather icon"
        class="weather-icon"
        />
        <div class="temp">Night - ${day.main.temp}&#176; C</div>
        </div>
        `;
    }
  });

  weatherForecastE1.innerHTML = otherDays;

  const hoursData = data.hourly;
  console.log("hours data", hoursData);
  const newArray = [];
  newArray.push(
    hoursData[2],
    hoursData[5],
    hoursData[8],
    hoursData[11],
    hoursData[14],
    hoursData[17],
    hoursData[20],
    hoursData[23]
  );
  for (let i = 0; i < newArray.length; i++) {
    console.log("", newArray[i].weather[0]);
    const hoursCard = document.createElement("div");
    hoursCard.innerHTML = `
    <div class=".hours_box">
      <img
        src="http://openweathermap.org/img/wn/${newArray[i].weather[0].icon}@2x.png"
        alt="weather icon"
        class="weather-icon"
      />
      <div class="temp">Temperature - ${newArray[i].temp}&#176C</div>
    </div>
    `;
    weatherForecastE2.appendChild(hoursCard);
  }
}

currentLocation();
