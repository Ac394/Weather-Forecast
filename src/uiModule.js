import { getWeatherIcon } from "./weatherModule";

// Function to get day name from date
const getDayName = (date) =>
  new Date(date).toLocaleDateString("en-US", { weekday: "long" });

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

export default updateUI;
