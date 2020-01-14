// api key : a70238d9b9a0b059a30d04828b67a9d7
//https://samples.openweathermap.org/data/2.5/weather?
//lat=35
//&lon=139
//&appid=b6907d289e10d714a6e88b30761fae22

const apiKey = "a70238d9b9a0b059a30d04828b67a9d7";
let latitude;
let longitude;
const notification = document.getElementsByClassName("notification")[0];

getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
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
  weatherPromise.then(res =>
    res.json().then(json => {
      console.log(json);
      console.log(json.weather[0].main);
      console.log(json.weather[0].name);
      console.log(parseInt(json.main.temp - 273.15));

      console.log(json.weather[0].icon);
    })
  );
}

function onError(error) {
  console.error("No no no", error);

  const p = document.createElement("p");
  p.innerHTML = error.message;
  notification.style.display = "block";
  notification.appendChild(p);
}

getLocation();
