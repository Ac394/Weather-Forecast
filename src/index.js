let forecastData;
const scaleCheckbox = document.querySelector(".checkbox");
const weatherAPIKey = "45169731569b40d4aeb220416243001";

// Function to get day name from date

const getDayName = (date) =>
  new Date(date).toLocaleDateString("en-US", { weekday: "long" });

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

// Function to update UI with weather data
const updateUI = (data, scale) => {
  // Current weather
  const city = document.querySelector(".city");
  city.textContent = data.location.name;

  const currCondition = document.querySelector(".current-condition");
  currCondition.textContent = data.current.condition.text;

  const currTemp = document.querySelector(".current-temperature");
  currTemp.textContent = `${data.current[`temp_${scale}`]}°`;

  const currIcn = document.querySelector(".current-icon");
  currIcn.src = getWeatherIcon(
    data.current.condition.text,
    data.current.is_day
  );

  const feel = document.querySelector(".feel");
  feel.textContent = `${data.current[`feelslike_${scale}`]}°`;

  const rainChance = document.querySelector(".chance");
  rainChance.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;

  const wind = document.querySelector(".wind");
  wind.textContent = `${data.current.wind_kph} km/h`;

  const uv = document.querySelector(".uv");
  uv.textContent = data.current.uv;

  const humidity = document.querySelector(".humidity");
  humidity.textContent = `${data.current.humidity}%`;

  const pressure = document.querySelector(".pressure");
  pressure.textContent = `${data.current.pressure_mb} hPa`;

  const sunset = document.querySelector(".sunset");
  sunset.textContent = data.forecast.forecastday[0].astro.sunset;

  const visibility = document.querySelector(".visibility");
  visibility.textContent = `${data.current.vis_km} km`;

  // Today's weather
  const todayIcn = document.querySelector(".first-icon");
  todayIcn.src = getWeatherIcon(
    data.forecast.forecastday[0].day.condition.text
  );

  // Week's weather
  const dayWeekName = document.querySelectorAll(".day-name");
  dayWeekName.forEach((e, i) => {
    e.textContent = getDayName(data.forecast.forecastday[i + 1].date);
  });

  const maxTempWeek = document.querySelectorAll(".weeK-max-temp");
  maxTempWeek.forEach((e, i) => {
    e.textContent = data.forecast.forecastday[i].day[`maxtemp_${scale}`];
  });

  const minTempWeek = document.querySelectorAll(".week-min-temp");
  minTempWeek.forEach((e, i) => {
    e.textContent = `/${data.forecast.forecastday[i].day[`mintemp_${scale}`]}°`;
  });

  // Hourly weather
  for (let i = 0; i < 6; i += 1) {
    const timeIcn = document.querySelectorAll(".time-icon");
    const timeSlots = [6, 9, 12, 15, 18, 21];

    timeIcn[i].src = getWeatherIcon(
      data.forecast.forecastday[0].hour[timeSlots[i]].condition.text,
      data.forecast.forecastday[0].hour[timeSlots[i]].is_day
    );

    const timeCond = document.querySelectorAll(".time-condition");
    timeCond[i].textContent =
      data.forecast.forecastday[0].hour[i].condition.text;

    const tempHour = document.querySelectorAll(".hour-temp");
    tempHour[i].textContent = `${
      data.forecast.forecastday[0].hour[timeSlots[i]][`temp_${scale}`]
    }°`;
  }
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

// Function to hide autocomplete suggestions
const hideAutoComplete = () => {
  const elContainer = document.querySelector(".autocomplete");
  elContainer.style.display = "none";
};

// Function to create autocomplete suggestions
const createAutoComplete = (data) => {
  const elContainer = document.querySelector(".autocomplete");
  elContainer.textContent = "";
  if (data.length) {
    elContainer.style.display = "flex";
    data.forEach((city) => {
      const cityEl = document.createElement("button");
      const countryEl = document.createElement("span");

      cityEl.textContent = city.name;
      countryEl.textContent = `, ${city.region}, ${city.country}`;

      cityEl.addEventListener("click", () => {
        getWeather(`id:${city.id}`);
        hideAutoComplete();
      });

      cityEl.append(countryEl);
      elContainer.append(cityEl);
    });
  } else {
    hideAutoComplete();
  }
};

const getAutoComplete = async (location) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${weatherAPIKey}&q=${location}`,
      { mode: "cors" }
    );
    const suggestionData = await response.json();
    createAutoComplete(suggestionData);
  } catch (error) {
    console.log(error);
  }
};

getWeather("Rome");

const search = document.querySelector(".search-bar");
search.onsearch = () => {
  getWeather(search.value);
};

// Event listeners
search.addEventListener("input", () => {
  getAutoComplete(search.value);
});

scaleCheckbox.addEventListener("change", () =>
  updateUI(forecastData, getTempScale())
);

window.addEventListener("mousedown", (event) => {
  if (!event.target.closest(".autocomplete")) {
    hideAutoComplete();
  }
});
