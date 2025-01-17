const apiKey = "4bf39f80fc9d48003o92t3a6c3d6d47a"; // SheCodes API key
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherInfo = document.getElementById("weather-info");

// Event listener for the search form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    // Axios call to SheCodes Weather API
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

    // Extract data and display it
    displayWeather(response.data);
  } catch (error) {
    alert("City not found. Please try again.");
  }
});

// Function to display weather information
function displayWeather(data) {
  const roundedTemp = Math.round(data.temperature.current); // Rounded temperature
  const weatherEmoji = getWeatherEmoji(data.condition.icon); // Generate emoji based on icon
  const windSpeed = Math.round(data.wind.speed); // Rounded wind speed

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

// Function to generate weather emoji based on icon description
function getWeatherEmoji(icon) {
  if (icon.includes("clear")) return "☀️";
  if (icon.includes("cloudy")) return "☁️";
  if (icon.includes("rain")) return "🌧️";
  if (icon.includes("snow")) return "❄️";
  if (icon.includes("storm")) return "🌩️";
  return ""; // Default to no emoji
}
