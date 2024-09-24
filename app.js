const API_KEY = "dfe6d3139462f94d2f67e8cd2d0f14b9";

document.getElementById('city-input').addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    fetchWeather();
  }
});

async function fetchWeather() {
  const city = getCityInput();

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  try {
    const data = await getWeatherData(city);
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function getCityInput() {
  const cityInput = document.getElementById('city-input');
  return cityInput.value.trim();
}

async function getWeatherData(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) throw new Error('City not found');
  return response.json();
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weather-info');
  const cityName = document.getElementById('city-name');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const feelsLike = document.getElementById('feels-like');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('wind-speed');
  const pressure = document.getElementById('pressure');
  const weatherIcon = document.getElementById('weather-icon');

  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed} m/s`;
  pressure.textContent = `${data.main.pressure} hPa`;

  weatherIcon.textContent = getWeatherIcon(data.weather[0].main);
  weatherIcon.className = 'weather-icon ' + getWeatherAnimationClass(data.weather[0].main);

  weatherInfo.style.display = 'block';
}

function getWeatherIcon(condition) {
  const icons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Snow: '❄️',
    Default: '🌈',
  };
  return icons[condition] || icons.Default;
}

function getWeatherAnimationClass(condition) {
  const animations = {
    Clear: 'spin',
    Clouds: 'bounce',
    Rain: 'bounce',
    Snow: 'fall',
  };
  return animations[condition] || '';
}
