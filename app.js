const cities = [];

cities.push({
  name: "Barcelona",
  latitude: 41.41,
  longitude: 2.19,
});
cities.push({
  name: "Tokyo",
  latitude: 35.65,
  longitude: 139.74,
});
cities.push({
  name: "Tallinn",
  latitude: 59.43,
  longitude: 24.75,
});
cities.push({
  name: "London",
  latitude: 51.5,
  longitude: 0.12,
});

const apikey = "a75595ec0a1e42379ec6d18c703db66a";
let latitude;
let longitude;
const notification = document.getElementsByClassName("notification")[0];

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(render, onError);
  } else {
    notification.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function render(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  const get = fetch(
    "https://api.weatherbit.io/v2.0/current?" +
      "lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&key=" +
      apikey
  );
  get
    .then((response) => response.json())
    .then((get) => {
      const location = get.data[0].city_name;
      const loacationHtmlElement = document.getElementsByClassName(
        "location"
      )[0];
      loacationHtmlElement.innerHTML = "<p>" + location + "</p>";
      const temp = get.data[0].temp.toFixed(1);
      const tempHtmlElement = document.getElementsByClassName(
        "temperature-value"
      )[0];
      tempHtmlElement.innerHTML = "<p>" + temp + "°<span>C</span></p>";
      const icon = get.data[0].weather.icon;
      const iconHtmlElement = document.getElementsByClassName(
        "weather-icon"
      )[0];
      iconHtmlElement.innerHTML =
        "<img src='icons/" + icon + ".png' alt=''></img>";
      const weatherDescription = get.data[0].weather.description;
      const weatherDescriptionHtmlElement = document.getElementsByClassName(
        "temperature-description"
      )[0];
      weatherDescriptionHtmlElement.innerHTML =
        "<p>" + weatherDescription + "</p>";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function onError(error) {
  console.error(error);
  const p = document.createElement("p");
  p.innerHTML = error.message;
  notification.style.display = "block";
  notification.appendChild(p);
}
getLocation();

function getWeather() {
  let userCity = document.getElementById("userCity").value;
  const getCity = fetch(
    "https://api.weatherbit.io/v2.0/current?" +
      "city=" +
      userCity +
      "&key=" +
      apikey
  );
  getCity
    .then((response) => response.json())
    .then((get) => {
      const location = get.data[0].city_name;
      const loacationHtmlElement = document.getElementsByClassName(
        "location"
      )[0];
      loacationHtmlElement.innerHTML = "<p>" + location + "</p>";
      const temp = get.data[0].temp.toFixed(1);
      const tempHtmlElement = document.getElementsByClassName(
        "temperature-value"
      )[0];
      tempHtmlElement.innerHTML = "<p>" + temp + "°<span>C</span></p>";
      const icon = get.data[0].weather.icon;
      const iconHtmlElement = document.getElementsByClassName(
        "weather-icon"
      )[0];
      iconHtmlElement.innerHTML =
        "<img src='icons/" + icon + ".png' alt=''></img>";
      const weatherDescription = get.data[0].weather.description;
      const weatherDescriptionHtmlElement = document.getElementsByClassName(
        "temperature-description"
      )[0];
      weatherDescriptionHtmlElement.innerHTML =
        "<p>" + weatherDescription + "</p>";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const favCities = (latitude, longitude) => {
  fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${apikey}`
  )
    .then((response) => response.json())
    .then((weather) => responseBody(weather));
};

for (let i = 0; i < cities.length; i++) {
  favCities(cities[i].latitude, cities[i].longitude);
}

const responseBody = (get) => {
  let favCity = document.getElementById("favCities");
  let container = document.createElement("div");

  container.className = "cityContainer";
  favCity.appendChild(container);

  let title = document.createElement("div");
  title.className = "city-title";
  let p = document.createElement("p");
  p.innerHTML = get.data[0].city_name;
  title.appendChild(p);
  container.appendChild(title);

  let notif = document.createElement("div");
  container.appendChild(notif);
  let weatherContainer = document.createElement("div");
  weatherContainer.className = "city-container";
  container.appendChild(weatherContainer);

  let weatherIcon = document.createElement("div");
  weatherIcon.className = "city-icon";
  let icon = document.createElement("img");
  icon.src = "icons/" + get.data[0].weather.icon + ".png";
  weatherIcon.appendChild(icon);
  weatherContainer.appendChild(weatherIcon);

  let temp = document.createElement("div");
  temp.className = "temperature-city";
  let par = document.createElement("p");
  par.innerHTML = get.data[0].temp.toFixed(1);
  temp.appendChild(par);
  weatherContainer.appendChild(temp);

  let description = document.createElement("div");
  description.className = "temperature-description";
  let descPar = document.createElement("p");
  descPar.innerHTML = get.data[0].weather.description;
  description.appendChild(descPar);
  weatherContainer.appendChild(description);

  let location = document.createElement("div");
  location.className = "location";
  let locPar = document.createElement("p");
  locPar.innerHTML = get.data[0].city_name;
  location.appendChild(locPar);
  weatherContainer.appendChild(location);
};

let button = document.getElementById("get");
button.addEventListener("click", getWeather);
