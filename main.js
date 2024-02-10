/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiConfig.js":
/*!**************************!*\
  !*** ./src/apiConfig.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const weatherAPIKey = "45169731569b40d4aeb220416243001";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weatherAPIKey);

/***/ }),

/***/ "./src/suggestionsModule.js":
/*!**********************************!*\
  !*** ./src/suggestionsModule.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSuggestions: () => (/* binding */ createSuggestions),
/* harmony export */   getSuggestions: () => (/* binding */ getSuggestions),
/* harmony export */   hideSuggestions: () => (/* binding */ hideSuggestions)
/* harmony export */ });
/* harmony import */ var _apiConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiConfig */ "./src/apiConfig.js");
/* harmony import */ var _weatherModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weatherModule */ "./src/weatherModule.js");


const elContainer = document.querySelector(".autocomplete");

// Function to hide autocomplete suggestions
const hideSuggestions = () => {
  elContainer.style.display = "none";
};

// Function to create autocomplete suggestions
const createSuggestions = data => {
  elContainer.textContent = "";
  if (data.length) {
    elContainer.style.display = "flex";
    data.forEach(city => {
      const cityEl = document.createElement("button");
      const countryEl = document.createElement("span");
      cityEl.textContent = city.name;
      countryEl.textContent = `, ${city.region}, ${city.country}`;
      cityEl.addEventListener("click", () => {
        (0,_weatherModule__WEBPACK_IMPORTED_MODULE_1__.getWeather)(`id:${city.id}`);
        hideSuggestions();
      });

      // Event listener to handle keyboard navigation
      cityEl.addEventListener("keyup", e => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (cityEl.nextElementSibling) {
            cityEl.nextElementSibling.focus();
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (cityEl.previousElementSibling) {
            cityEl.previousElementSibling.focus();
          }
        }
      });
      cityEl.append(countryEl);
      elContainer.append(cityEl);
    });
  } else {
    hideSuggestions();
  }
};
const getSuggestions = async location => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"]}&q=${location}`, {
      mode: "cors"
    });
    const suggestionData = await response.json();
    createSuggestions(suggestionData);
  } catch (error) {
    console.log(error);
  }
};

// Event listener to the search input element to handle keyboard navigation to the first and last suggestion
const search = document.querySelector(".search-bar");
search.addEventListener("keyup", e => {
  const autocompleteBtns = document.querySelectorAll(".autocomplete > button");
  if (e.key === "ArrowDown") {
    e.preventDefault();
    autocompleteBtns[0].focus();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    autocompleteBtns[autocompleteBtns.length - 1].focus();
  }
});


/***/ }),

/***/ "./src/uiModule.js":
/*!*************************!*\
  !*** ./src/uiModule.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _weatherModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherModule */ "./src/weatherModule.js");


// Function to get day name from date
const getDayName = date => new Date(date).toLocaleDateString("en-US", {
  weekday: "long"
});

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
  currIcn.src = (0,_weatherModule__WEBPACK_IMPORTED_MODULE_0__.getWeatherIcon)(data.current.condition.text, data.current.is_day);
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
  todayIcn.src = (0,_weatherModule__WEBPACK_IMPORTED_MODULE_0__.getWeatherIcon)(data.forecast.forecastday[0].day.condition.text);

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
    timeIcn[i].src = (0,_weatherModule__WEBPACK_IMPORTED_MODULE_0__.getWeatherIcon)(data.forecast.forecastday[0].hour[timeSlots[i]].condition.text, data.forecast.forecastday[0].hour[timeSlots[i]].is_day);
    const timeCond = document.querySelectorAll(".time-condition");
    timeCond[i].textContent = data.forecast.forecastday[0].hour[i].condition.text;
    const tempHour = document.querySelectorAll(".hour-temp");
    tempHour[i].textContent = `${data.forecast.forecastday[0].hour[timeSlots[i]][`temp_${scale}`]}°`;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateUI);

/***/ }),

/***/ "./src/weatherModule.js":
/*!******************************!*\
  !*** ./src/weatherModule.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forecastData: () => (/* binding */ forecastData),
/* harmony export */   getTempScale: () => (/* binding */ getTempScale),
/* harmony export */   getWeather: () => (/* binding */ getWeather),
/* harmony export */   getWeatherIcon: () => (/* binding */ getWeatherIcon)
/* harmony export */ });
/* harmony import */ var _apiConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiConfig */ "./src/apiConfig.js");
/* harmony import */ var _uiModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiModule */ "./src/uiModule.js");


let forecastData;
const scaleCheckbox = document.querySelector(".checkbox");

// Function to get temperature scale based on checkbox state
const getTempScale = () => scaleCheckbox.checked ? "c" : "f";

// Keywords associated with weather conditions
const weatherKeywords = {
  clear: ["sunny", "clear"],
  thunder: ["thunder", "thundery"],
  cloudy: ["cloudy", "overcast", "mist", "fog"],
  rain: ["rain", "sleet", "drizzle"],
  snow: ["snow", "ice", "blizzard"]
};

// Function to find weather condition based on keywords
const findWeatherCondition = weatherText => {
  let weatherForecast;
  Object.keys(weatherKeywords).some(weatherCondition => {
    weatherKeywords[weatherCondition].some(keyword => {
      if (weatherText.toLowerCase().split(" ").includes(keyword)) {
        weatherForecast = weatherCondition;
      }
    });
  });
  return weatherForecast;
};

// Function to get weather icon based on condition and time
const getWeatherIcon = function (weatherText) {
  let isDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
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
const getWeather = async location => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"]}&q=${location}&days=3`, {
      mode: "cors"
    });
    forecastData = await response.json();
    (0,_uiModule__WEBPACK_IMPORTED_MODULE_1__["default"])(forecastData, getTempScale());
  } catch (error) {
    console.log(error);
  }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _suggestionsModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./suggestionsModule */ "./src/suggestionsModule.js");
/* harmony import */ var _uiModule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uiModule */ "./src/uiModule.js");
/* harmony import */ var _weatherModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weatherModule */ "./src/weatherModule.js");




// Initialize weather forecast with IP Geolocation
(0,_weatherModule__WEBPACK_IMPORTED_MODULE_2__.getWeather)("auto:ip");

// Event listeners
const search = document.querySelector(".search-bar");
search.addEventListener("search", () => {
  (0,_weatherModule__WEBPACK_IMPORTED_MODULE_2__.getWeather)(search.value);
});
search.addEventListener("input", () => {
  (0,_suggestionsModule__WEBPACK_IMPORTED_MODULE_0__.getSuggestions)(search.value);
});
document.querySelector(".checkbox").addEventListener("change", () => (0,_uiModule__WEBPACK_IMPORTED_MODULE_1__["default"])(_weatherModule__WEBPACK_IMPORTED_MODULE_2__.forecastData, (0,_weatherModule__WEBPACK_IMPORTED_MODULE_2__.getTempScale)()));
window.addEventListener("mousedown", event => {
  if (!event.target.closest(".autocomplete")) {
    (0,_suggestionsModule__WEBPACK_IMPORTED_MODULE_0__.hideSuggestions)();
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFekU7QUFDQW5DLDBEQUFVLENBQUMsU0FBUyxDQUFDOztBQUVyQjtBQUNBLE1BQU1zQyxNQUFNLEdBQUdwQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7QUFFcERtQyxNQUFNLENBQUNuQixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTTtFQUN0Q25CLDBEQUFVLENBQUNzQyxNQUFNLENBQUNxRSxLQUFLLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUZyRSxNQUFNLENBQUNuQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUNyQ1Msa0VBQWMsQ0FBQ1UsTUFBTSxDQUFDcUUsS0FBSyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUVGekcsUUFBUSxDQUNMQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQzFCZ0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE1BQU00QixxREFBUSxDQUFDb0Msd0RBQVksRUFBRUUsNERBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzRXVCLE1BQU0sQ0FBQ3pGLGdCQUFnQixDQUFDLFdBQVcsRUFBRzBGLEtBQUssSUFBSztFQUM5QyxJQUFJLENBQUNBLEtBQUssQ0FBQ0MsTUFBTSxDQUFDQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7SUFDMUMzRyxtRUFBZSxDQUFDLENBQUM7RUFDbkI7QUFDRixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3ZzY29kZS1lc2xpbnQtdGVtcGxhdGUvLi9zcmMvYXBpQ29uZmlnLmpzIiwid2VicGFjazovL3ZzY29kZS1lc2xpbnQtdGVtcGxhdGUvLi9zcmMvc3VnZ2VzdGlvbnNNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vdnNjb2RlLWVzbGludC10ZW1wbGF0ZS8uL3NyYy91aU1vZHVsZS5qcyIsIndlYnBhY2s6Ly92c2NvZGUtZXNsaW50LXRlbXBsYXRlLy4vc3JjL3dlYXRoZXJNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vdnNjb2RlLWVzbGludC10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92c2NvZGUtZXNsaW50LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92c2NvZGUtZXNsaW50LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdnNjb2RlLWVzbGludC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZzY29kZS1lc2xpbnQtdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2VhdGhlckFQSUtleSA9IFwiNDUxNjk3MzE1NjliNDBkNGFlYjIyMDQxNjI0MzAwMVwiO1xuXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVyQVBJS2V5O1xuIiwiaW1wb3J0IHdlYXRoZXJBUElLZXkgZnJvbSBcIi4vYXBpQ29uZmlnXCI7XG5pbXBvcnQgeyBnZXRXZWF0aGVyIH0gZnJvbSBcIi4vd2VhdGhlck1vZHVsZVwiO1xuXG5jb25zdCBlbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0b2NvbXBsZXRlXCIpO1xuXG4vLyBGdW5jdGlvbiB0byBoaWRlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uc1xuY29uc3QgaGlkZVN1Z2dlc3Rpb25zID0gKCkgPT4ge1xuICBlbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59O1xuXG4vLyBGdW5jdGlvbiB0byBjcmVhdGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb25zXG5jb25zdCBjcmVhdGVTdWdnZXN0aW9ucyA9IChkYXRhKSA9PiB7XG4gIGVsQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgZWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGRhdGEuZm9yRWFjaCgoY2l0eSkgPT4ge1xuICAgICAgY29uc3QgY2l0eUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNvbnN0IGNvdW50cnlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICBjaXR5RWwudGV4dENvbnRlbnQgPSBjaXR5Lm5hbWU7XG4gICAgICBjb3VudHJ5RWwudGV4dENvbnRlbnQgPSBgLCAke2NpdHkucmVnaW9ufSwgJHtjaXR5LmNvdW50cnl9YDtcblxuICAgICAgY2l0eUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGdldFdlYXRoZXIoYGlkOiR7Y2l0eS5pZH1gKTtcbiAgICAgICAgaGlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gaGFuZGxlIGtleWJvYXJkIG5hdmlnYXRpb25cbiAgICAgIGNpdHlFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChjaXR5RWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICBjaXR5RWwubmV4dEVsZW1lbnRTaWJsaW5nLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoY2l0eUVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgIGNpdHlFbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY2l0eUVsLmFwcGVuZChjb3VudHJ5RWwpO1xuICAgICAgZWxDb250YWluZXIuYXBwZW5kKGNpdHlFbCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaGlkZVN1Z2dlc3Rpb25zKCk7XG4gIH1cbn07XG5cbmNvbnN0IGdldFN1Z2dlc3Rpb25zID0gYXN5bmMgKGxvY2F0aW9uKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9zZWFyY2guanNvbj9rZXk9JHt3ZWF0aGVyQVBJS2V5fSZxPSR7bG9jYXRpb259YCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICk7XG4gICAgY29uc3Qgc3VnZ2VzdGlvbkRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY3JlYXRlU3VnZ2VzdGlvbnMoc3VnZ2VzdGlvbkRhdGEpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcblxuLy8gRXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNlYXJjaCBpbnB1dCBlbGVtZW50IHRvIGhhbmRsZSBrZXlib2FyZCBuYXZpZ2F0aW9uIHRvIHRoZSBmaXJzdCBhbmQgbGFzdCBzdWdnZXN0aW9uXG5jb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1iYXJcIik7XG5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gIGNvbnN0IGF1dG9jb21wbGV0ZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF1dG9jb21wbGV0ZSA+IGJ1dHRvblwiKTtcbiAgaWYgKGUua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGF1dG9jb21wbGV0ZUJ0bnNbMF0uZm9jdXMoKTtcbiAgfSBlbHNlIGlmIChlLmtleSA9PT0gXCJBcnJvd1VwXCIpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYXV0b2NvbXBsZXRlQnRuc1thdXRvY29tcGxldGVCdG5zLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgeyBoaWRlU3VnZ2VzdGlvbnMsIGNyZWF0ZVN1Z2dlc3Rpb25zLCBnZXRTdWdnZXN0aW9ucyB9O1xuIiwiaW1wb3J0IHsgZ2V0V2VhdGhlckljb24gfSBmcm9tIFwiLi93ZWF0aGVyTW9kdWxlXCI7XG5cbi8vIEZ1bmN0aW9uIHRvIGdldCBkYXkgbmFtZSBmcm9tIGRhdGVcbmNvbnN0IGdldERheU5hbWUgPSAoZGF0ZSkgPT5cbiAgbmV3IERhdGUoZGF0ZSkudG9Mb2NhbGVEYXRlU3RyaW5nKFwiZW4tVVNcIiwgeyB3ZWVrZGF5OiBcImxvbmdcIiB9KTtcblxuLy8gRnVuY3Rpb24gdG8gdXBkYXRlIFVJIHdpdGggd2VhdGhlciBkYXRhXG5jb25zdCB1cGRhdGVVSSA9IChkYXRhLCBzY2FsZSkgPT4ge1xuICAvLyBDdXJyZW50IHdlYXRoZXJcbiAgY29uc3QgY2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2l0eVwiKTtcbiAgY2l0eS50ZXh0Q29udGVudCA9IGRhdGEubG9jYXRpb24ubmFtZTtcblxuICBjb25zdCBjdXJyQ29uZGl0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LWNvbmRpdGlvblwiKTtcbiAgY3VyckNvbmRpdGlvbi50ZXh0Q29udGVudCA9IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dDtcblxuICBjb25zdCBjdXJyVGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10ZW1wZXJhdHVyZVwiKTtcbiAgY3VyclRlbXAudGV4dENvbnRlbnQgPSBgJHtkYXRhLmN1cnJlbnRbYHRlbXBfJHtzY2FsZX1gXX3CsGA7XG5cbiAgY29uc3QgY3VyckljbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC1pY29uXCIpO1xuICBjdXJySWNuLnNyYyA9IGdldFdlYXRoZXJJY29uKFxuICAgIGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCxcbiAgICBkYXRhLmN1cnJlbnQuaXNfZGF5XG4gICk7XG5cbiAgY29uc3QgZmVlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmVlbFwiKTtcbiAgZmVlbC50ZXh0Q29udGVudCA9IGAke2RhdGEuY3VycmVudFtgZmVlbHNsaWtlXyR7c2NhbGV9YF19wrBgO1xuXG4gIGNvbnN0IHJhaW5DaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoYW5jZVwiKTtcbiAgcmFpbkNoYW5jZS50ZXh0Q29udGVudCA9IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgO1xuXG4gIGNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmRcIik7XG4gIHdpbmQudGV4dENvbnRlbnQgPSBgJHtkYXRhLmN1cnJlbnQud2luZF9rcGh9IGttL2hgO1xuXG4gIGNvbnN0IHV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51dlwiKTtcbiAgdXYudGV4dENvbnRlbnQgPSBkYXRhLmN1cnJlbnQudXY7XG5cbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmh1bWlkaXR5XCIpO1xuICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke2RhdGEuY3VycmVudC5odW1pZGl0eX0lYDtcblxuICBjb25zdCBwcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlc3N1cmVcIik7XG4gIHByZXNzdXJlLnRleHRDb250ZW50ID0gYCR7ZGF0YS5jdXJyZW50LnByZXNzdXJlX21ifSBoUGFgO1xuXG4gIGNvbnN0IHN1bnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3Vuc2V0XCIpO1xuICBzdW5zZXQudGV4dENvbnRlbnQgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldDtcblxuICBjb25zdCB2aXNpYmlsaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aXNpYmlsaXR5XCIpO1xuICB2aXNpYmlsaXR5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jdXJyZW50LnZpc19rbX0ga21gO1xuXG4gIC8vIFRvZGF5J3Mgd2VhdGhlclxuICBjb25zdCB0b2RheUljbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmlyc3QtaWNvblwiKTtcbiAgdG9kYXlJY24uc3JjID0gZ2V0V2VhdGhlckljb24oXG4gICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuY29uZGl0aW9uLnRleHRcbiAgKTtcblxuICAvLyBXZWVrJ3Mgd2VhdGhlclxuICBjb25zdCBkYXlXZWVrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZGF5LW5hbWVcIik7XG4gIGRheVdlZWtOYW1lLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICBlLnRleHRDb250ZW50ID0gZ2V0RGF5TmFtZShkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2kgKyAxXS5kYXRlKTtcbiAgfSk7XG5cbiAgY29uc3QgbWF4VGVtcFdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndlZUstbWF4LXRlbXBcIik7XG4gIG1heFRlbXBXZWVrLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICBlLnRleHRDb250ZW50ID0gZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXlbYG1heHRlbXBfJHtzY2FsZX1gXTtcbiAgfSk7XG5cbiAgY29uc3QgbWluVGVtcFdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLndlZWstbWluLXRlbXBcIik7XG4gIG1pblRlbXBXZWVrLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICBlLnRleHRDb250ZW50ID0gYC8ke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaV0uZGF5W2BtaW50ZW1wXyR7c2NhbGV9YF19wrBgO1xuICB9KTtcblxuICAvLyBIb3VybHkgd2VhdGhlclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkgKz0gMSkge1xuICAgIGNvbnN0IHRpbWVJY24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRpbWUtaWNvblwiKTtcbiAgICBjb25zdCB0aW1lU2xvdHMgPSBbNiwgOSwgMTIsIDE1LCAxOCwgMjFdO1xuXG4gICAgdGltZUljbltpXS5zcmMgPSBnZXRXZWF0aGVySWNvbihcbiAgICAgIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clt0aW1lU2xvdHNbaV1dLmNvbmRpdGlvbi50ZXh0LFxuICAgICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW3RpbWVTbG90c1tpXV0uaXNfZGF5XG4gICAgKTtcblxuICAgIGNvbnN0IHRpbWVDb25kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50aW1lLWNvbmRpdGlvblwiKTtcbiAgICB0aW1lQ29uZFtpXS50ZXh0Q29udGVudCA9XG4gICAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbaV0uY29uZGl0aW9uLnRleHQ7XG5cbiAgICBjb25zdCB0ZW1wSG91ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG91ci10ZW1wXCIpO1xuICAgIHRlbXBIb3VyW2ldLnRleHRDb250ZW50ID0gYCR7XG4gICAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbdGltZVNsb3RzW2ldXVtgdGVtcF8ke3NjYWxlfWBdXG4gICAgfcKwYDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlVUk7XG4iLCJpbXBvcnQgd2VhdGhlckFQSUtleSBmcm9tIFwiLi9hcGlDb25maWdcIjtcbmltcG9ydCB1cGRhdGVVSSBmcm9tIFwiLi91aU1vZHVsZVwiO1xuXG5sZXQgZm9yZWNhc3REYXRhO1xuY29uc3Qgc2NhbGVDaGVja2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hlY2tib3hcIik7XG5cbi8vIEZ1bmN0aW9uIHRvIGdldCB0ZW1wZXJhdHVyZSBzY2FsZSBiYXNlZCBvbiBjaGVja2JveCBzdGF0ZVxuY29uc3QgZ2V0VGVtcFNjYWxlID0gKCkgPT4gKHNjYWxlQ2hlY2tib3guY2hlY2tlZCA/IFwiY1wiIDogXCJmXCIpO1xuXG4vLyBLZXl3b3JkcyBhc3NvY2lhdGVkIHdpdGggd2VhdGhlciBjb25kaXRpb25zXG5jb25zdCB3ZWF0aGVyS2V5d29yZHMgPSB7XG4gIGNsZWFyOiBbXCJzdW5ueVwiLCBcImNsZWFyXCJdLFxuICB0aHVuZGVyOiBbXCJ0aHVuZGVyXCIsIFwidGh1bmRlcnlcIl0sXG4gIGNsb3VkeTogW1wiY2xvdWR5XCIsIFwib3ZlcmNhc3RcIiwgXCJtaXN0XCIsIFwiZm9nXCJdLFxuICByYWluOiBbXCJyYWluXCIsIFwic2xlZXRcIiwgXCJkcml6emxlXCJdLFxuICBzbm93OiBbXCJzbm93XCIsIFwiaWNlXCIsIFwiYmxpenphcmRcIl0sXG59O1xuXG4vLyBGdW5jdGlvbiB0byBmaW5kIHdlYXRoZXIgY29uZGl0aW9uIGJhc2VkIG9uIGtleXdvcmRzXG5jb25zdCBmaW5kV2VhdGhlckNvbmRpdGlvbiA9ICh3ZWF0aGVyVGV4dCkgPT4ge1xuICBsZXQgd2VhdGhlckZvcmVjYXN0O1xuICBPYmplY3Qua2V5cyh3ZWF0aGVyS2V5d29yZHMpLnNvbWUoKHdlYXRoZXJDb25kaXRpb24pID0+IHtcbiAgICB3ZWF0aGVyS2V5d29yZHNbd2VhdGhlckNvbmRpdGlvbl0uc29tZSgoa2V5d29yZCkgPT4ge1xuICAgICAgaWYgKHdlYXRoZXJUZXh0LnRvTG93ZXJDYXNlKCkuc3BsaXQoXCIgXCIpLmluY2x1ZGVzKGtleXdvcmQpKSB7XG4gICAgICAgIHdlYXRoZXJGb3JlY2FzdCA9IHdlYXRoZXJDb25kaXRpb247XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gd2VhdGhlckZvcmVjYXN0O1xufTtcblxuLy8gRnVuY3Rpb24gdG8gZ2V0IHdlYXRoZXIgaWNvbiBiYXNlZCBvbiBjb25kaXRpb24gYW5kIHRpbWVcbmNvbnN0IGdldFdlYXRoZXJJY29uID0gKHdlYXRoZXJUZXh0LCBpc0RheSA9IDEpID0+IHtcbiAgY29uc3Qgd2VhdGhlckZvcmVjYXN0ID0gZmluZFdlYXRoZXJDb25kaXRpb24od2VhdGhlclRleHQpO1xuICBpZiAod2VhdGhlckZvcmVjYXN0ID09PSBcImNsZWFyXCIgJiYgaXNEYXkpIHJldHVybiBcIi4vYXNzZXRzL2ltZy9zdW4ucG5nXCI7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwiY2xlYXJcIikgcmV0dXJuIFwiLi9hc3NldHMvaW1nL2NsZWFyLnBuZ1wiO1xuICBpZiAod2VhdGhlckZvcmVjYXN0ID09PSBcImNsb3VkeVwiICYmIGlzRGF5KSByZXR1cm4gXCIuL2Fzc2V0cy9pbWcvY2xvdWRzLnBuZ1wiO1xuICBpZiAod2VhdGhlckZvcmVjYXN0ID09PSBcImNsb3VkeVwiKSByZXR1cm4gXCIuL2Fzc2V0cy9pbWcvY2xvdWRzX25pZ2h0LnBuZ1wiO1xuICBpZiAod2VhdGhlckZvcmVjYXN0ID09PSBcInJhaW5cIiAmJiBpc0RheSkgcmV0dXJuIFwiLi9hc3NldHMvaW1nL3JhaW4ucG5nXCI7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwicmFpblwiKSByZXR1cm4gXCIuL2Fzc2V0cy9pbWcvcmFpbl9uaWdodC5wbmdcIjtcbiAgaWYgKHdlYXRoZXJGb3JlY2FzdCA9PT0gXCJzbm93XCIgJiYgaXNEYXkpIHJldHVybiBcIi4vYXNzZXRzL2ltZy9zbm93LnBuZ1wiO1xuICBpZiAod2VhdGhlckZvcmVjYXN0ID09PSBcInNub3dcIikgcmV0dXJuIFwiLi9hc3NldHMvaW1nL3Nub3dfbmlnaHQucG5nXCI7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwidGh1bmRlclwiICYmIGlzRGF5KSByZXR1cm4gXCIuL2Fzc2V0cy9pbWcvc3Rvcm0ucG5nXCI7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwidGh1bmRlclwiKSByZXR1cm4gXCIuL2Fzc2V0cy9pbWcvc3Rvcm1fbmlnaHQucG5nXCI7XG59O1xuXG5jb25zdCBnZXRXZWF0aGVyID0gYXN5bmMgKGxvY2F0aW9uKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke3dlYXRoZXJBUElLZXl9JnE9JHtsb2NhdGlvbn0mZGF5cz0zYCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICk7XG4gICAgZm9yZWNhc3REYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHVwZGF0ZVVJKGZvcmVjYXN0RGF0YSwgZ2V0VGVtcFNjYWxlKCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcblxuZXhwb3J0IHsgZ2V0VGVtcFNjYWxlLCBnZXRXZWF0aGVySWNvbiwgZ2V0V2VhdGhlciwgZm9yZWNhc3REYXRhIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdldFN1Z2dlc3Rpb25zLCBoaWRlU3VnZ2VzdGlvbnMgfSBmcm9tIFwiLi9zdWdnZXN0aW9uc01vZHVsZVwiO1xuaW1wb3J0IHVwZGF0ZVVJIGZyb20gXCIuL3VpTW9kdWxlXCI7XG5pbXBvcnQgeyBmb3JlY2FzdERhdGEsIGdldFRlbXBTY2FsZSwgZ2V0V2VhdGhlciB9IGZyb20gXCIuL3dlYXRoZXJNb2R1bGVcIjtcblxuLy8gSW5pdGlhbGl6ZSB3ZWF0aGVyIGZvcmVjYXN0IHdpdGggSVAgR2VvbG9jYXRpb25cbmdldFdlYXRoZXIoXCJhdXRvOmlwXCIpO1xuXG4vLyBFdmVudCBsaXN0ZW5lcnNcbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJhclwiKTtcblxuc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJzZWFyY2hcIiwgKCkgPT4ge1xuICBnZXRXZWF0aGVyKHNlYXJjaC52YWx1ZSk7XG59KTtcblxuc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gIGdldFN1Z2dlc3Rpb25zKHNlYXJjaC52YWx1ZSk7XG59KTtcblxuZG9jdW1lbnRcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIuY2hlY2tib3hcIilcbiAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4gdXBkYXRlVUkoZm9yZWNhc3REYXRhLCBnZXRUZW1wU2NhbGUoKSkpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZXZlbnQpID0+IHtcbiAgaWYgKCFldmVudC50YXJnZXQuY2xvc2VzdChcIi5hdXRvY29tcGxldGVcIikpIHtcbiAgICBoaWRlU3VnZ2VzdGlvbnMoKTtcbiAgfVxufSk7XG4iXSwibmFtZXMiOlsid2VhdGhlckFQSUtleSIsImdldFdlYXRoZXIiLCJlbENvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhpZGVTdWdnZXN0aW9ucyIsInN0eWxlIiwiZGlzcGxheSIsImNyZWF0ZVN1Z2dlc3Rpb25zIiwiZGF0YSIsInRleHRDb250ZW50IiwibGVuZ3RoIiwiZm9yRWFjaCIsImNpdHkiLCJjaXR5RWwiLCJjcmVhdGVFbGVtZW50IiwiY291bnRyeUVsIiwibmFtZSIsInJlZ2lvbiIsImNvdW50cnkiLCJhZGRFdmVudExpc3RlbmVyIiwiaWQiLCJlIiwia2V5IiwicHJldmVudERlZmF1bHQiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJmb2N1cyIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJhcHBlbmQiLCJnZXRTdWdnZXN0aW9ucyIsImxvY2F0aW9uIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1vZGUiLCJzdWdnZXN0aW9uRGF0YSIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzZWFyY2giLCJhdXRvY29tcGxldGVCdG5zIiwicXVlcnlTZWxlY3RvckFsbCIsImdldFdlYXRoZXJJY29uIiwiZ2V0RGF5TmFtZSIsImRhdGUiLCJEYXRlIiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwid2Vla2RheSIsInVwZGF0ZVVJIiwic2NhbGUiLCJjdXJyQ29uZGl0aW9uIiwiY3VycmVudCIsImNvbmRpdGlvbiIsInRleHQiLCJjdXJyVGVtcCIsImN1cnJJY24iLCJzcmMiLCJpc19kYXkiLCJmZWVsIiwicmFpbkNoYW5jZSIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJkYXkiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsIndpbmQiLCJ3aW5kX2twaCIsInV2IiwiaHVtaWRpdHkiLCJwcmVzc3VyZSIsInByZXNzdXJlX21iIiwic3Vuc2V0IiwiYXN0cm8iLCJ2aXNpYmlsaXR5IiwidmlzX2ttIiwidG9kYXlJY24iLCJkYXlXZWVrTmFtZSIsImkiLCJtYXhUZW1wV2VlayIsIm1pblRlbXBXZWVrIiwidGltZUljbiIsInRpbWVTbG90cyIsImhvdXIiLCJ0aW1lQ29uZCIsInRlbXBIb3VyIiwiZm9yZWNhc3REYXRhIiwic2NhbGVDaGVja2JveCIsImdldFRlbXBTY2FsZSIsImNoZWNrZWQiLCJ3ZWF0aGVyS2V5d29yZHMiLCJjbGVhciIsInRodW5kZXIiLCJjbG91ZHkiLCJyYWluIiwic25vdyIsImZpbmRXZWF0aGVyQ29uZGl0aW9uIiwid2VhdGhlclRleHQiLCJ3ZWF0aGVyRm9yZWNhc3QiLCJPYmplY3QiLCJrZXlzIiwic29tZSIsIndlYXRoZXJDb25kaXRpb24iLCJrZXl3b3JkIiwidG9Mb3dlckNhc2UiLCJzcGxpdCIsImluY2x1ZGVzIiwiaXNEYXkiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJ2YWx1ZSIsIndpbmRvdyIsImV2ZW50IiwidGFyZ2V0IiwiY2xvc2VzdCJdLCJzb3VyY2VSb290IjoiIn0=