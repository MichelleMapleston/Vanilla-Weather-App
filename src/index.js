function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
  console.log(response.data);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitAction);
search("Adelaide");

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheitTemp);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsiusTemp);

let celsiusTemperature = null;
