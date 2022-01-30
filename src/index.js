function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//display forecast timestamp in days
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//retrieves the 7 day forecast data based on GPS coords from current city data
function getForecastData(coords) {
  let apiKey = "d9d69bcfd71a3f130af2081484a0b61a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//display data based on search value
function displayCurrentData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  feelsElement.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecastData(response.data.coord);
}

//search using the form input value
function search(city) {
  let apiKey = "d9d69bcfd71a3f130af2081484a0b61a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentData);
}

//submit action - getting the value
function submitAction(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

//displays fahrenheit temp
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrenheitTemp;
}

//displays celsius temp
function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = Math.round(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemp;
}

//display forecast data
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                <div class="forecast-day">${formatForecastDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  id="forecast-image"
                  width="50px"
                />
                <div class="forecast-temperatures">
                  <span class="forecast-maximum">${Math.round(
                    forecastDay.temp.max
                  )}°C</span>
                  <span class="forecast-minimum">${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitAction);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheitTemp);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsiusTemp);

let celsiusTemperature = null;

search("Parramatta");

what3words.api
  .convertToCoordinates("filled.count.soap")
  .then(function (response) {
    console.log("[convertToCoordinates]", response);
  });
