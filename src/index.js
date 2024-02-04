const getDayName = (date) =>
  new Date(date).toLocaleDateString("en-US", { weekday: "long" });

const getForecast = (data) => {
  temp = data.current.temp_c;
};

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
  if (weatherForecast === "clear" && isDay) console.log("SUNNY OK");
  if (weatherForecast === "clear") console.log("CLEAR OK");
  if (weatherForecast === "cloudy" && isDay) console.log("CLOUDY DAY OK");
  if (weatherForecast === "cloudy") console.log("CLOUDY NIGHT OK");
  if (weatherForecast === "rain" && isDay) console.log("RAIN DAY OK");
  if (weatherForecast === "rain") console.log("RAIN NIGHT OK");
  if (weatherForecast === "snow" && isDay) console.log("SNOW DAY OK");
  if (weatherForecast === "snow") console.log("SNOW NIGHT OK");
  if (weatherForecast === "thunder" && isDay) console.log("THUNDER DAY OK");
  if (weatherForecast === "thunder") console.log("THUNDER NIGHT OK");
};

const getWeather = async (location) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=45169731569b40d4aeb220416243001&q=${location}&days=3`,
      { mode: "cors" }
    );
    const forecastData = await response.json();
    console.log(forecastData);
    console.log(forecastData.current.temp_c);
    console.log(getDayName(forecastData.forecast.forecastday[0].date));
    getWeatherIcon(
      forecastData.current.condition.text,
      forecastData.current.is_day
    );
  } catch (error) {
    console.log(error);
  }
};

getWeather("Rome");
