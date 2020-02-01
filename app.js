// api key : a70238d9b9a0b059a30d04828b67a9d7
//https://samples.openweathermap.org/data/2.5/weather?
//lat=35
//&lon=139
//&appid=b6907d289e10d714a6e88b30761fae22

const apikey = "a70238d9b9a0b059a30d04828b67a9d7";

let longitude;
let temperatureValue = document.querySelector('.temperature-value p');
const notification = document.getElementsByClassName('notification')[0];
let weatherIcon = document.querySelector('.weather-icon');
let locationElement = document.querySelector('.location p');
let temperatureDescription = document.querySelector('.temperature-description p');

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}
}

function onSuccess(position) {
	//console.log(position);
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;

	const weather = fetch(
		'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + apikey
	);

	weather
		.then(response => response.json())
		.then(weatherInfo => {
			//console.log(temperatureValue);
			temperatureValue.innerHTML = `${parseInt(weatherInfo.main.temp - 273.15)} °<span>C</span>`;

			//console.log(`<img src="icons/${weatherInfo.weather[0].icon}.png"`);
			weatherIcon.innerHTML = `<img src="icons/${weatherInfo.weather[0].icon}.png"/>`;

			//console.log(weatherInfo.name);
			//console.log(locationElement)
			locationElement.innerHTML = `${weatherInfo.name + ' ' + weatherInfo.sys.country}`;

			temperatureDescription.innerHTML = `${weatherInfo.weather[0].description}`;
			//console.log(weatherInfo.weather[0].main);

			//console.log(parseInt(weatherInfo.main.temp - 273.15));
			console.log(`Thanks to check my code '-'`);
		});
}

function onError(error) {
	//console.log('NO no no ', error);

	//notification[0].innerText.message;
	const p = document.createElement('p');
	p.innerHTML = error.message;

	notification.style.display = 'block';

	notification.appendChild(p);
}

getLocation();

