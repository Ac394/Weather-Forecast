import weatherAPIKey from "./apiConfig";
import updateUI from "./uiModule";

let forecastData;
const scaleCheckbox = document.querySelector(".checkbox");

// Function to get temperature scale based on checkbox state
const getTempScale = () => (scaleCheckbox.checked ? "c" : "f");

// Keywords associated with weather conditions
const weatherKeywords = {
  clear: ["sunny", "clear"],
  thunder: ["thunder", "thundery"],
  cloudy: ["cloudy", "overcast", "mist", "fog"],
  rain: ["rain", "sleet", "drizzle"],
  snow: ["snow", "ice", "blizzard"],
};

// Function to find weather condition based on keywords
const findWeatherCondition = (weatherText) => {
  let weatherForecast;
  Object.keys(weatherKeywords).some((weatherCondition) => {
    weatherKeywords[weatherCondition].some((keyword) => {
      if (weatherText.toLowerCase().split(" ").includes(keyword)) {
        weatherForecast = weatherCondition;
      }
    });
  });
  return weatherForecast;
};

// Function to get weather icon based on condition and time
const getWeatherIcon = (weatherText, isDay = 1) => {
  const weatherForecast = findWeatherCondition(weatherText);
  if (weatherForecast === "clear" && isDay) return "./assets/img/sun.png";
  if (weatherForecast === "clear") return "./assets/img/clear.png";
  if (weatherForecast === "cloudy" && isDay) return "./assets/img/clouds.png";
  if (weatherForecast === "cloudy") return "./assets/img/clouds_night.png";
  if (weatherForecast === "rain" && isDay) return "./assets/img/rain.png";
  if (weatherForecast === "rain") return "./assets/img/rain_night.png";
  if (weatherForecast === "snow" && isDay) return "./assets/img/snow.png";
  if (weatherForecast === "snow") return "./assets/img/snow_night.png";
  if (weatherForecast === "thunder" && isDay) return "./assets/img/storm.png";
  if (weatherForecast === "thunder") return "./assets/img/storm_night.png";
};

const getWeather = async (location) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${weatherAPIKey}&q=${location}&days=3`,
      { mode: "cors" }
    );
    forecastData = await response.json();
    updateUI(forecastData, getTempScale());
  } catch (error) {
    console.log(error);
  }
};

export { getTempScale, getWeatherIcon, getWeather, forecastData };
