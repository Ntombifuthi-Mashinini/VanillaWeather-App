const apiKey = "4bf39f80fc9d48003o92t3a6c3d6d47a";
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const response = await axios.get(
      `https://api.shecodes.io/weather/v1/current`,
      {
        params: {
          query: city,
          key: apiKey,
          units: "metric",
        },
      }
    );

    displayWeather(response.data);
  } catch (error) {
    alert("City not found. Please try again.");
  }
});

function displayWeather(data) {
  const roundedTemp = Math.round(data.temperature.current);
  const weatherEmoji = getWeatherEmoji(data.condition.icon);
  const windSpeed = Math.round(data.wind.speed);

  weatherInfo.innerHTML = `
        <h2 class="city-name">${data.city}</h2>
        <p class="weather-description">Description: ${data.condition.description} ${weatherEmoji}</p>
        <p class="temperature">Temperature: ${roundedTemp}°C</p>
        <p class="humidity">Humidity: ${data.temperature.humidity}%</p>
        <p class="wind-speed">Wind Speed: ${windSpeed} m/s</p>
        <img src="${data.condition.icon_url}" alt="Weather Icon" class="weather-icon" />
    `;
  cityInput.value = ""; // Clear input field
}

function getWeatherEmoji(icon) {
  if (icon.includes("clear")) return "☀️";
  if (icon.includes("cloudy")) return "☁️";
  if (icon.includes("rain")) return "🌧️";
  if (icon.includes("snow")) return "❄️";
  if (icon.includes("storm")) return "🌩️";
  return ""; // Default to no emoji
}
