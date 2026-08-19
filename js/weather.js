/* ============================================================
   WEATHER.JS — Live Weather Widget via Open-Meteo
   ============================================================ */

(function () {
  'use strict';

  // Popular travel destinations with coordinates
  const destinations = [
    { name: 'Dubai, UAE', lat: 25.2048, lon: 55.2708, emoji: '🇦🇪' },
    { name: 'Bali, Indonesia', lat: -8.3405, lon: 115.0920, emoji: '🇮🇩' },
    { name: 'Paris, France', lat: 48.8566, lon: 2.3522, emoji: '🇫🇷' },
    { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503, emoji: '🇯🇵' },
    { name: 'Maldives', lat: 3.2028, lon: 73.2207, emoji: '🇲🇻' },
    { name: 'New York, USA', lat: 40.7128, lon: -74.0060, emoji: '🇺🇸' },
  ];

  const weatherCodes = {
    0: { label: 'Clear Sky', icon: '☀️' },
    1: { label: 'Mainly Clear', icon: '🌤️' },
    2: { label: 'Partly Cloudy', icon: '⛅' },
    3: { label: 'Overcast', icon: '☁️' },
    45: { label: 'Foggy', icon: '🌫️' },
    48: { label: 'Icy Fog', icon: '🌫️' },
    51: { label: 'Light Drizzle', icon: '🌦️' },
    53: { label: 'Drizzle', icon: '🌦️' },
    55: { label: 'Heavy Drizzle', icon: '🌧️' },
    61: { label: 'Light Rain', icon: '🌧️' },
    63: { label: 'Rain', icon: '🌧️' },
    65: { label: 'Heavy Rain', icon: '⛈️' },
    71: { label: 'Light Snow', icon: '🌨️' },
    73: { label: 'Snow', icon: '❄️' },
    75: { label: 'Heavy Snow', icon: '❄️' },
    80: { label: 'Rain Showers', icon: '🌦️' },
    81: { label: 'Showers', icon: '🌧️' },
    82: { label: 'Heavy Showers', icon: '⛈️' },
    95: { label: 'Thunderstorm', icon: '⛈️' },
    99: { label: 'Severe Thunder', icon: '🌩️' },
  };

  let currentDestIndex = 0;
  let weatherData = {};
  let rotateTimer = null;

  async function fetchWeather(dest) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh&temperature_unit=celsius`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();
      return data.current;
    } catch (err) {
      console.warn('Weather fetch failed:', err.message);
      return null;
    }
  }

  function renderWeather(dest, current) {
    const widget = document.querySelector('.weather-card');
    if (!widget) return;

    const code = current?.weather_code ?? 0;
    const info = weatherCodes[code] || weatherCodes[0];
    const temp = Math.round(current?.temperature_2m ?? 28);
    const humidity = Math.round(current?.relative_humidity_2m ?? 65);
    const wind = Math.round(current?.wind_speed_10m ?? 12);

    widget.innerHTML = `
      <div class="weather-location">${dest.emoji} ${dest.name}</div>
      <div class="weather-main">
        <div class="weather-icon">${info.icon}</div>
        <div>
          <div class="weather-temp">${temp}°C</div>
          <div class="weather-desc">${info.label}</div>
        </div>
      </div>
      <div class="weather-extras">
        <div class="weather-extra-item">
          <i>💧</i> ${humidity}%
        </div>
        <div class="weather-extra-item">
          <i>💨</i> ${wind} km/h
        </div>
      </div>
    `;
  }

  function showLoadingWeather() {
    const widget = document.querySelector('.weather-card');
    if (!widget) return;
    widget.innerHTML = `
      <div class="weather-location">🌍 Fetching weather...</div>
      <div class="weather-main">
        <div class="weather-icon">🌤️</div>
        <div>
          <div class="weather-temp">--°C</div>
          <div class="weather-desc">Loading...</div>
        </div>
      </div>
    `;
  }

  async function loadAndRender(index) {
    const dest = destinations[index];
    showLoadingWeather();

    if (!weatherData[dest.name]) {
      const current = await fetchWeather(dest);
      weatherData[dest.name] = current;
    }

    renderWeather(dest, weatherData[dest.name]);
  }

  function startRotation() {
    clearInterval(rotateTimer);
    rotateTimer = setInterval(() => {
      currentDestIndex = (currentDestIndex + 1) % destinations.length;
      loadAndRender(currentDestIndex);
    }, 8000);
  }

  // Click to cycle destinations
  document.addEventListener('DOMContentLoaded', () => {
    const widget = document.querySelector('.weather-widget');
    if (!widget) return;

    loadAndRender(0);
    startRotation();

    widget.addEventListener('click', () => {
      currentDestIndex = (currentDestIndex + 1) % destinations.length;
      loadAndRender(currentDestIndex);
      startRotation(); // Reset timer
    });

    widget.title = 'Click to see weather at another destination';
    widget.style.cursor = 'pointer';
  });

})();
