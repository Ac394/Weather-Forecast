const getDayName = (date) =>
  new Date(date).toLocaleDateString("en-US", { weekday: "long" });

const weatherKeywords = {
  clear: ["sunny", "clear"],
  thunder: ["thunder", "thundery"],
  cloudy: ["cloudy", "overcast", "mist", "fog"],
  rain: ["rain", "sleet", "drizzle"],
  snow: ["snow", "ice", "blizzard"],
};

// const findWeatherCondition = (weatherText) => {
//   Object.values(weatherKeywords).forEach((weatherCondition) => {
//     weatherCondition.some((keyword) => {
//       if (weatherText.toLowerCase().split(" ").includes(keyword)) {
//         console.log(weatherCondition);
//         return weatherCondition;
//       }
//     });
//   });
// };

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

const getWeatherIcon = (weatherText, isDay) => {
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

const updateUI = (data, scale) => {
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
};

const getWeather = async (location) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=45169731569b40d4aeb220416243001&q=${location}&days=3`,
      { mode: "cors" }
    );
    const forecastData = await response.json();
    updateUI(forecastData, "c");
    console.log(forecastData);
    // console.log(forecastData.current.temp_c);
    // console.log(getDayName(forecastData.forecast.forecastday[0].date));
    // getWeatherIcon(
    //   forecastData.current.condition.text,
    //   forecastData.current.is_day
    // );
  } catch (error) {
    console.log(error);
  }
};

getWeather("Rome");

const search = document.querySelector(".search-bar");
search.onsearch = () => {
  getWeather(search.value);
};
