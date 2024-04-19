'use strict';

const apiKey = '38bb6cf3f6789fcce9dfdb3e18290408';
const getData = `https://api.openweathermap.org/data/2.5/weather?q=`;

const getCity = document.querySelector('.city span');
const getIcon = document.querySelector('.icon');
const getDescription = document.querySelector('.description');
const getTemperature = document.querySelector('.temp span');
const getHumidity = document.querySelector('.humidity span');
const getWind = document.querySelector('.wind span');
const getWeather = document.querySelector('.weather');

const searchInput = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

const error = document.querySelector('.error-weather');

async function getWeatherData(getCity) {
	try {
		const response = await fetch(getData + getCity + `&units=metric&appid=${apiKey}`);

		if (!response.ok) {
			handleWeatherError();
			return;
		}
		clearWeatherError();

		const data = await response.json();

		displayWeather(data);
	} catch (error) {
		console.error(error);
	}
}

function displayWeather(data) {
	const { name } = data;
	const { description, icon } = data.weather[0];
	const { temp, humidity } = data.main;
	const { speed } = data.wind;

	getCity.textContent = name;
	getIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
	getDescription.textContent = description;
	getTemperature.textContent = Math.round(temp);
	getHumidity.textContent = humidity
	getWind.textContent = speed.toFixed(1);

	removeClassWeather();
}

function removeClassWeather() {
	getWeather.classList.remove('loading');
}

function handleWeatherError() {
	error.classList.add('error');
	getWeather.classList.add('error');
}

function clearWeatherError() {
	error.classList.remove('error');
	getWeather.classList.remove('error');
}

searchButton.addEventListener('click', () => {
	getWeatherData(searchInput.value);
	searchInput.value = '';
});

searchInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		getWeatherData(searchInput.value);
		searchInput.value = '';
	}
});