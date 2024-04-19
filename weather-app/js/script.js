'use strict';

const APIKEY = '38bb6cf3f6789fcce9dfdb3e18290408'
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const city = document.querySelector('.city');
const temperatureItem = document.querySelector('.temp span');
const humidityItem = document.querySelector('.details__humidity span');
const windItem = document.querySelector('.details__wind span');
const searchInput = document.querySelector('.search-box__input');
const searchButton = document.querySelector('.search-box__button');
const weatherIcon = document.querySelector('.weather-image i');
const weather = document.querySelector('.weather');
const error = document.querySelector('.error');

async function checkWeather(valueCity) {
	try {
		const response = await fetch(apiUrl + valueCity + `&appid=${APIKEY}`);

		if (!response.ok) {
			handleWeatherError();
			return;
		}
		clearWeatherError();

		const data = await response.json();

		appendWeatherInfo(data);
		changeWeatherIcon(data);
	} catch (error) {
		throw new Error(error);
	}
}

function appendWeatherInfo(data) {
	const { name, main: { temp, humidity }, wind: { speed } } = data;

	city.textContent = name;
	temperatureItem.textContent = Math.round(temp);
	humidityItem.textContent = humidity;
	windItem.textContent = Math.round(speed);
}

function changeWeatherIcon(data) {
	const weatherPhenomenon = data.weather[0].main;

	switch (weatherPhenomenon) {
		case "Clear":
		case "Clouds":
			weatherIcon.className = "fa-solid fa-sun";
			break;
		case "Rain":
			weatherIcon.className = "fa-solid fa-cloud-rain";
			break;
		case "Mist":
			weatherIcon.className = "fa-solid fa-cloud-mist";
			break;
		case "Drizzle":
			weatherIcon.className = "fa-solid fa-cloud-drizzle";
			break;
		default:
			break;
	}
}

function handleWeatherError() {
	error.style.display = 'block';
	weather.style.display = 'none';
}

function clearWeatherError() {
	error.style.display = 'none';
	weather.style.display = 'block';
}

searchButton.addEventListener('click', () => {
	checkWeather(searchInput.value);
	searchInput.value = '';
});

searchInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		checkWeather(searchInput.value);
		searchInput.value = '';
	}
});