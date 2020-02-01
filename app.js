// api key : a70238d9b9a0b059a30d04828b67a9d7
//https://samples.openweathermap.org/data/2.5/weather?
//lat=35
//&lon=139
//&appid=b6907d289e10d714a6e88b30761fae22

const apiKey = "a70238d9b9a0b059a30d04828b67a9d7";
let latitude;
let longitude;
const notification = document.getElementsByClassName("notification")[0];

function getLocation() {
  //console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    notification.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function kelvinToCelsius(temp) {
  return temp - 273.15;
}

function onSuccess(position) {
  console.log(position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const weatherPromise = fetch(
    "https://api.openweathermap.org/data/2.5/weather?" +
      "lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey
  );
  weather
    .then((response) => response.json())
    .then((weather) => {
      //console.log(weather);
      //console.log(weather.weather[0].icon);
      //console.log(parseInt(weather.main.temp - 273.15));
      //console.log(weather.weather[0].main);
      //console.log(weather.name);

      const location = weather.name;
      const loacationHtmlElement = document.getElementsByClassName("location")[0];
      loacationHtmlElement.innerHTML = "<p>" + location + "</p>";
      const temp = kelvinToCelsius(weather.main.temp).toFixed(1);
      const tempHtmlElement = document.getElementsByClassName("temperature-value")[0];
      tempHtmlElement.innerHTML = "<p>" + temp + "°<span>C</span></p>";
      const icon = weather.weather[0].icon;
      const iconHtmlElement = document.getElementsByClassName("weather-icon")[0];
      iconHtmlElement.innerHTML = "<img src='icons/" + icon + ".png' alt=''></img>";
      const weatherDescription = weather.weather[0].main;
      const weatherDescriptionHtmlElement = document.getElementsByClassName(
        "temperature-description"
      )[0];
      weatherDescriptionHtmlElement.innerHTML = "<p>" + weatherDescription + "</p>";
    });
}
//console.log("info", weather);
//console.log(position);
//latitude=position.coords.

function onError(error) {
  console.error(error);
  //notification[0].innerHTML = error.message;
  const p = document.createElement("p");
  p.innerHTML = error.message;
  notification.style.display = "block";
  notification.appendChild(p);
}
getLocation();
