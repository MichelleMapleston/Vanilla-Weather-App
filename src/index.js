function displayCurrentData(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  //let humidityElement = document.querySelector("#humidity");
  //let windElement = document.querySelector("#wind");
  //let precipitationElement = document.querySelector("#precipitation");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  //humidityElement.innerHTML =
  //windElement.innerHTML
  //precipitationElement.innerHTML
  console.log(response.data);
}

let apiKey = "d9d69bcfd71a3f130af2081484a0b61a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentData);
