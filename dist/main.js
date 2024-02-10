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
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"]}&q=${location}`, {
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
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${_apiConfig__WEBPACK_IMPORTED_MODULE_0__["default"]}&q=${location}&days=3`, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFekU7QUFDQW5DLDBEQUFVLENBQUMsU0FBUyxDQUFDOztBQUVyQjtBQUNBLE1BQU1zQyxNQUFNLEdBQUdwQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7QUFFcERtQyxNQUFNLENBQUNuQixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTTtFQUN0Q25CLDBEQUFVLENBQUNzQyxNQUFNLENBQUNxRSxLQUFLLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBRUZyRSxNQUFNLENBQUNuQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtFQUNyQ1Msa0VBQWMsQ0FBQ1UsTUFBTSxDQUFDcUUsS0FBSyxDQUFDO0FBQzlCLENBQUMsQ0FBQztBQUVGekcsUUFBUSxDQUNMQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQzFCZ0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLE1BQU00QixxREFBUSxDQUFDb0Msd0RBQVksRUFBRUUsNERBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzRXVCLE1BQU0sQ0FBQ3pGLGdCQUFnQixDQUFDLFdBQVcsRUFBRzBGLEtBQUssSUFBSztFQUM5QyxJQUFJLENBQUNBLEtBQUssQ0FBQ0MsTUFBTSxDQUFDQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7SUFDMUMzRyxtRUFBZSxDQUFDLENBQUM7RUFDbkI7QUFDRixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3ZzY29kZS1lc2xpbnQtdGVtcGxhdGUvLi9zcmMvYXBpQ29uZmlnLmpzIiwid2VicGFjazovL3ZzY29kZS1lc2xpbnQtdGVtcGxhdGUvLi9zcmMvc3VnZ2VzdGlvbnNNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vdnNjb2RlLWVzbGludC10ZW1wbGF0ZS8uL3NyYy91aU1vZHVsZS5qcyIsIndlYnBhY2s6Ly92c2NvZGUtZXNsaW50LXRlbXBsYXRlLy4vc3JjL3dlYXRoZXJNb2R1bGUuanMiLCJ3ZWJwYWNrOi8vdnNjb2RlLWVzbGludC10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92c2NvZGUtZXNsaW50LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92c2NvZGUtZXNsaW50LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdnNjb2RlLWVzbGludC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZzY29kZS1lc2xpbnQtdGVtcGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3Qgd2VhdGhlckFQSUtleSA9IFwiNDUxNjk3MzE1NjliNDBkNGFlYjIyMDQxNjI0MzAwMVwiO1xuXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVyQVBJS2V5O1xuIiwiaW1wb3J0IHdlYXRoZXJBUElLZXkgZnJvbSBcIi4vYXBpQ29uZmlnXCI7XG5pbXBvcnQgeyBnZXRXZWF0aGVyIH0gZnJvbSBcIi4vd2VhdGhlck1vZHVsZVwiO1xuXG5jb25zdCBlbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0b2NvbXBsZXRlXCIpO1xuXG4vLyBGdW5jdGlvbiB0byBoaWRlIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uc1xuY29uc3QgaGlkZVN1Z2dlc3Rpb25zID0gKCkgPT4ge1xuICBlbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59O1xuXG4vLyBGdW5jdGlvbiB0byBjcmVhdGUgYXV0b2NvbXBsZXRlIHN1Z2dlc3Rpb25zXG5jb25zdCBjcmVhdGVTdWdnZXN0aW9ucyA9IChkYXRhKSA9PiB7XG4gIGVsQ29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgZWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGRhdGEuZm9yRWFjaCgoY2l0eSkgPT4ge1xuICAgICAgY29uc3QgY2l0eUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGNvbnN0IGNvdW50cnlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICBjaXR5RWwudGV4dENvbnRlbnQgPSBjaXR5Lm5hbWU7XG4gICAgICBjb3VudHJ5RWwudGV4dENvbnRlbnQgPSBgLCAke2NpdHkucmVnaW9ufSwgJHtjaXR5LmNvdW50cnl9YDtcblxuICAgICAgY2l0eUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGdldFdlYXRoZXIoYGlkOiR7Y2l0eS5pZH1gKTtcbiAgICAgICAgaGlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgICB9KTtcblxuICAgICAgLy8gRXZlbnQgbGlzdGVuZXIgdG8gaGFuZGxlIGtleWJvYXJkIG5hdmlnYXRpb25cbiAgICAgIGNpdHlFbC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5ID09PSBcIkFycm93RG93blwiKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlmIChjaXR5RWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICBjaXR5RWwubmV4dEVsZW1lbnRTaWJsaW5nLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBpZiAoY2l0eUVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgIGNpdHlFbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY2l0eUVsLmFwcGVuZChjb3VudHJ5RWwpO1xuICAgICAgZWxDb250YWluZXIuYXBwZW5kKGNpdHlFbCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaGlkZVN1Z2dlc3Rpb25zKCk7XG4gIH1cbn07XG5cbmNvbnN0IGdldFN1Z2dlc3Rpb25zID0gYXN5bmMgKGxvY2F0aW9uKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL3NlYXJjaC5qc29uP2tleT0ke3dlYXRoZXJBUElLZXl9JnE9JHtsb2NhdGlvbn1gLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcbiAgICBjb25zdCBzdWdnZXN0aW9uRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjcmVhdGVTdWdnZXN0aW9ucyhzdWdnZXN0aW9uRGF0YSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59O1xuXG4vLyBFdmVudCBsaXN0ZW5lciB0byB0aGUgc2VhcmNoIGlucHV0IGVsZW1lbnQgdG8gaGFuZGxlIGtleWJvYXJkIG5hdmlnYXRpb24gdG8gdGhlIGZpcnN0IGFuZCBsYXN0IHN1Z2dlc3Rpb25cbmNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLWJhclwiKTtcbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgY29uc3QgYXV0b2NvbXBsZXRlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXV0b2NvbXBsZXRlID4gYnV0dG9uXCIpO1xuICBpZiAoZS5rZXkgPT09IFwiQXJyb3dEb3duXCIpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYXV0b2NvbXBsZXRlQnRuc1swXS5mb2N1cygpO1xuICB9IGVsc2UgaWYgKGUua2V5ID09PSBcIkFycm93VXBcIikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhdXRvY29tcGxldGVCdG5zW2F1dG9jb21wbGV0ZUJ0bnMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgfVxufSk7XG5cbmV4cG9ydCB7IGhpZGVTdWdnZXN0aW9ucywgY3JlYXRlU3VnZ2VzdGlvbnMsIGdldFN1Z2dlc3Rpb25zIH07XG4iLCJpbXBvcnQgeyBnZXRXZWF0aGVySWNvbiB9IGZyb20gXCIuL3dlYXRoZXJNb2R1bGVcIjtcblxuLy8gRnVuY3Rpb24gdG8gZ2V0IGRheSBuYW1lIGZyb20gZGF0ZVxuY29uc3QgZ2V0RGF5TmFtZSA9IChkYXRlKSA9PlxuICBuZXcgRGF0ZShkYXRlKS50b0xvY2FsZURhdGVTdHJpbmcoXCJlbi1VU1wiLCB7IHdlZWtkYXk6IFwibG9uZ1wiIH0pO1xuXG4vLyBGdW5jdGlvbiB0byB1cGRhdGUgVUkgd2l0aCB3ZWF0aGVyIGRhdGFcbmNvbnN0IHVwZGF0ZVVJID0gKGRhdGEsIHNjYWxlKSA9PiB7XG4gIC8vIEN1cnJlbnQgd2VhdGhlclxuICBjb25zdCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5XCIpO1xuICBjaXR5LnRleHRDb250ZW50ID0gZGF0YS5sb2NhdGlvbi5uYW1lO1xuXG4gIGNvbnN0IGN1cnJDb25kaXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtY29uZGl0aW9uXCIpO1xuICBjdXJyQ29uZGl0aW9uLnRleHRDb250ZW50ID0gZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0O1xuXG4gIGNvbnN0IGN1cnJUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXRlbXBlcmF0dXJlXCIpO1xuICBjdXJyVGVtcC50ZXh0Q29udGVudCA9IGAke2RhdGEuY3VycmVudFtgdGVtcF8ke3NjYWxlfWBdfcKwYDtcblxuICBjb25zdCBjdXJySWNuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LWljb25cIik7XG4gIGN1cnJJY24uc3JjID0gZ2V0V2VhdGhlckljb24oXG4gICAgZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0LFxuICAgIGRhdGEuY3VycmVudC5pc19kYXlcbiAgKTtcblxuICBjb25zdCBmZWVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVsXCIpO1xuICBmZWVsLnRleHRDb250ZW50ID0gYCR7ZGF0YS5jdXJyZW50W2BmZWVsc2xpa2VfJHtzY2FsZX1gXX3CsGA7XG5cbiAgY29uc3QgcmFpbkNoYW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hhbmNlXCIpO1xuICByYWluQ2hhbmNlLnRleHRDb250ZW50ID0gYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWA7XG5cbiAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2luZFwiKTtcbiAgd2luZC50ZXh0Q29udGVudCA9IGAke2RhdGEuY3VycmVudC53aW5kX2twaH0ga20vaGA7XG5cbiAgY29uc3QgdXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnV2XCIpO1xuICB1di50ZXh0Q29udGVudCA9IGRhdGEuY3VycmVudC51djtcblxuICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtaWRpdHlcIik7XG4gIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYCR7ZGF0YS5jdXJyZW50Lmh1bWlkaXR5fSVgO1xuXG4gIGNvbnN0IHByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVzc3VyZVwiKTtcbiAgcHJlc3N1cmUudGV4dENvbnRlbnQgPSBgJHtkYXRhLmN1cnJlbnQucHJlc3N1cmVfbWJ9IGhQYWA7XG5cbiAgY29uc3Qgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5zZXRcIik7XG4gIHN1bnNldC50ZXh0Q29udGVudCA9IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0O1xuXG4gIGNvbnN0IHZpc2liaWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpc2liaWxpdHlcIik7XG4gIHZpc2liaWxpdHkudGV4dENvbnRlbnQgPSBgJHtkYXRhLmN1cnJlbnQudmlzX2ttfSBrbWA7XG5cbiAgLy8gVG9kYXkncyB3ZWF0aGVyXG4gIGNvbnN0IHRvZGF5SWNuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maXJzdC1pY29uXCIpO1xuICB0b2RheUljbi5zcmMgPSBnZXRXZWF0aGVySWNvbihcbiAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5jb25kaXRpb24udGV4dFxuICApO1xuXG4gIC8vIFdlZWsncyB3ZWF0aGVyXG4gIGNvbnN0IGRheVdlZWtOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kYXktbmFtZVwiKTtcbiAgZGF5V2Vla05hbWUuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgIGUudGV4dENvbnRlbnQgPSBnZXREYXlOYW1lKGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbaSArIDFdLmRhdGUpO1xuICB9KTtcblxuICBjb25zdCBtYXhUZW1wV2VlayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2VlSy1tYXgtdGVtcFwiKTtcbiAgbWF4VGVtcFdlZWsuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgIGUudGV4dENvbnRlbnQgPSBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5W2ldLmRheVtgbWF4dGVtcF8ke3NjYWxlfWBdO1xuICB9KTtcblxuICBjb25zdCBtaW5UZW1wV2VlayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2Vlay1taW4tdGVtcFwiKTtcbiAgbWluVGVtcFdlZWsuZm9yRWFjaCgoZSwgaSkgPT4ge1xuICAgIGUudGV4dENvbnRlbnQgPSBgLyR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVtpXS5kYXlbYG1pbnRlbXBfJHtzY2FsZX1gXX3CsGA7XG4gIH0pO1xuXG4gIC8vIEhvdXJseSB3ZWF0aGVyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSArPSAxKSB7XG4gICAgY29uc3QgdGltZUljbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGltZS1pY29uXCIpO1xuICAgIGNvbnN0IHRpbWVTbG90cyA9IFs2LCA5LCAxMiwgMTUsIDE4LCAyMV07XG5cbiAgICB0aW1lSWNuW2ldLnNyYyA9IGdldFdlYXRoZXJJY29uKFxuICAgICAgZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyW3RpbWVTbG90c1tpXV0uY29uZGl0aW9uLnRleHQsXG4gICAgICBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbdGltZVNsb3RzW2ldXS5pc19kYXlcbiAgICApO1xuXG4gICAgY29uc3QgdGltZUNvbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRpbWUtY29uZGl0aW9uXCIpO1xuICAgIHRpbWVDb25kW2ldLnRleHRDb250ZW50ID1cbiAgICAgIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cltpXS5jb25kaXRpb24udGV4dDtcblxuICAgIGNvbnN0IHRlbXBIb3VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3VyLXRlbXBcIik7XG4gICAgdGVtcEhvdXJbaV0udGV4dENvbnRlbnQgPSBgJHtcbiAgICAgIGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clt0aW1lU2xvdHNbaV1dW2B0ZW1wXyR7c2NhbGV9YF1cbiAgICB9wrBgO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVVSTtcbiIsImltcG9ydCB3ZWF0aGVyQVBJS2V5IGZyb20gXCIuL2FwaUNvbmZpZ1wiO1xuaW1wb3J0IHVwZGF0ZVVJIGZyb20gXCIuL3VpTW9kdWxlXCI7XG5cbmxldCBmb3JlY2FzdERhdGE7XG5jb25zdCBzY2FsZUNoZWNrYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGVja2JveFwiKTtcblxuLy8gRnVuY3Rpb24gdG8gZ2V0IHRlbXBlcmF0dXJlIHNjYWxlIGJhc2VkIG9uIGNoZWNrYm94IHN0YXRlXG5jb25zdCBnZXRUZW1wU2NhbGUgPSAoKSA9PiAoc2NhbGVDaGVja2JveC5jaGVja2VkID8gXCJjXCIgOiBcImZcIik7XG5cbi8vIEtleXdvcmRzIGFzc29jaWF0ZWQgd2l0aCB3ZWF0aGVyIGNvbmRpdGlvbnNcbmNvbnN0IHdlYXRoZXJLZXl3b3JkcyA9IHtcbiAgY2xlYXI6IFtcInN1bm55XCIsIFwiY2xlYXJcIl0sXG4gIHRodW5kZXI6IFtcInRodW5kZXJcIiwgXCJ0aHVuZGVyeVwiXSxcbiAgY2xvdWR5OiBbXCJjbG91ZHlcIiwgXCJvdmVyY2FzdFwiLCBcIm1pc3RcIiwgXCJmb2dcIl0sXG4gIHJhaW46IFtcInJhaW5cIiwgXCJzbGVldFwiLCBcImRyaXp6bGVcIl0sXG4gIHNub3c6IFtcInNub3dcIiwgXCJpY2VcIiwgXCJibGl6emFyZFwiXSxcbn07XG5cbi8vIEZ1bmN0aW9uIHRvIGZpbmQgd2VhdGhlciBjb25kaXRpb24gYmFzZWQgb24ga2V5d29yZHNcbmNvbnN0IGZpbmRXZWF0aGVyQ29uZGl0aW9uID0gKHdlYXRoZXJUZXh0KSA9PiB7XG4gIGxldCB3ZWF0aGVyRm9yZWNhc3Q7XG4gIE9iamVjdC5rZXlzKHdlYXRoZXJLZXl3b3Jkcykuc29tZSgod2VhdGhlckNvbmRpdGlvbikgPT4ge1xuICAgIHdlYXRoZXJLZXl3b3Jkc1t3ZWF0aGVyQ29uZGl0aW9uXS5zb21lKChrZXl3b3JkKSA9PiB7XG4gICAgICBpZiAod2VhdGhlclRleHQudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIikuaW5jbHVkZXMoa2V5d29yZCkpIHtcbiAgICAgICAgd2VhdGhlckZvcmVjYXN0ID0gd2VhdGhlckNvbmRpdGlvbjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB3ZWF0aGVyRm9yZWNhc3Q7XG59O1xuXG4vLyBGdW5jdGlvbiB0byBnZXQgd2VhdGhlciBpY29uIGJhc2VkIG9uIGNvbmRpdGlvbiBhbmQgdGltZVxuY29uc3QgZ2V0V2VhdGhlckljb24gPSAod2VhdGhlclRleHQsIGlzRGF5ID0gMSkgPT4ge1xuICBjb25zdCB3ZWF0aGVyRm9yZWNhc3QgPSBmaW5kV2VhdGhlckNvbmRpdGlvbih3ZWF0aGVyVGV4dCk7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwiY2xlYXJcIiAmJiBpc0RheSkgcmV0dXJuIFwiLi9hc3NldHMvaW1nL3N1bi5wbmdcIjtcbiAgaWYgKHdlYXRoZXJGb3JlY2FzdCA9PT0gXCJjbGVhclwiKSByZXR1cm4gXCIuL2Fzc2V0cy9pbWcvY2xlYXIucG5nXCI7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwiY2xvdWR5XCIgJiYgaXNEYXkpIHJldHVybiBcIi4vYXNzZXRzL2ltZy9jbG91ZHMucG5nXCI7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwiY2xvdWR5XCIpIHJldHVybiBcIi4vYXNzZXRzL2ltZy9jbG91ZHNfbmlnaHQucG5nXCI7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwicmFpblwiICYmIGlzRGF5KSByZXR1cm4gXCIuL2Fzc2V0cy9pbWcvcmFpbi5wbmdcIjtcbiAgaWYgKHdlYXRoZXJGb3JlY2FzdCA9PT0gXCJyYWluXCIpIHJldHVybiBcIi4vYXNzZXRzL2ltZy9yYWluX25pZ2h0LnBuZ1wiO1xuICBpZiAod2VhdGhlckZvcmVjYXN0ID09PSBcInNub3dcIiAmJiBpc0RheSkgcmV0dXJuIFwiLi9hc3NldHMvaW1nL3Nub3cucG5nXCI7XG4gIGlmICh3ZWF0aGVyRm9yZWNhc3QgPT09IFwic25vd1wiKSByZXR1cm4gXCIuL2Fzc2V0cy9pbWcvc25vd19uaWdodC5wbmdcIjtcbiAgaWYgKHdlYXRoZXJGb3JlY2FzdCA9PT0gXCJ0aHVuZGVyXCIgJiYgaXNEYXkpIHJldHVybiBcIi4vYXNzZXRzL2ltZy9zdG9ybS5wbmdcIjtcbiAgaWYgKHdlYXRoZXJGb3JlY2FzdCA9PT0gXCJ0aHVuZGVyXCIpIHJldHVybiBcIi4vYXNzZXRzL2ltZy9zdG9ybV9uaWdodC5wbmdcIjtcbn07XG5cbmNvbnN0IGdldFdlYXRoZXIgPSBhc3luYyAobG9jYXRpb24pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHA6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHt3ZWF0aGVyQVBJS2V5fSZxPSR7bG9jYXRpb259JmRheXM9M2AsXG4gICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICApO1xuICAgIGZvcmVjYXN0RGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICB1cGRhdGVVSShmb3JlY2FzdERhdGEsIGdldFRlbXBTY2FsZSgpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn07XG5cbmV4cG9ydCB7IGdldFRlbXBTY2FsZSwgZ2V0V2VhdGhlckljb24sIGdldFdlYXRoZXIsIGZvcmVjYXN0RGF0YSB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRTdWdnZXN0aW9ucywgaGlkZVN1Z2dlc3Rpb25zIH0gZnJvbSBcIi4vc3VnZ2VzdGlvbnNNb2R1bGVcIjtcbmltcG9ydCB1cGRhdGVVSSBmcm9tIFwiLi91aU1vZHVsZVwiO1xuaW1wb3J0IHsgZm9yZWNhc3REYXRhLCBnZXRUZW1wU2NhbGUsIGdldFdlYXRoZXIgfSBmcm9tIFwiLi93ZWF0aGVyTW9kdWxlXCI7XG5cbi8vIEluaXRpYWxpemUgd2VhdGhlciBmb3JlY2FzdCB3aXRoIElQIEdlb2xvY2F0aW9uXG5nZXRXZWF0aGVyKFwiYXV0bzppcFwiKTtcblxuLy8gRXZlbnQgbGlzdGVuZXJzXG5jb25zdCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlYXJjaC1iYXJcIik7XG5cbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwic2VhcmNoXCIsICgpID0+IHtcbiAgZ2V0V2VhdGhlcihzZWFyY2gudmFsdWUpO1xufSk7XG5cbnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICBnZXRTdWdnZXN0aW9ucyhzZWFyY2gudmFsdWUpO1xufSk7XG5cbmRvY3VtZW50XG4gIC5xdWVyeVNlbGVjdG9yKFwiLmNoZWNrYm94XCIpXG4gIC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHVwZGF0ZVVJKGZvcmVjYXN0RGF0YSwgZ2V0VGVtcFNjYWxlKCkpKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gIGlmICghZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuYXV0b2NvbXBsZXRlXCIpKSB7XG4gICAgaGlkZVN1Z2dlc3Rpb25zKCk7XG4gIH1cbn0pO1xuIl0sIm5hbWVzIjpbIndlYXRoZXJBUElLZXkiLCJnZXRXZWF0aGVyIiwiZWxDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoaWRlU3VnZ2VzdGlvbnMiLCJzdHlsZSIsImRpc3BsYXkiLCJjcmVhdGVTdWdnZXN0aW9ucyIsImRhdGEiLCJ0ZXh0Q29udGVudCIsImxlbmd0aCIsImZvckVhY2giLCJjaXR5IiwiY2l0eUVsIiwiY3JlYXRlRWxlbWVudCIsImNvdW50cnlFbCIsIm5hbWUiLCJyZWdpb24iLCJjb3VudHJ5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImlkIiwiZSIsImtleSIsInByZXZlbnREZWZhdWx0IiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZm9jdXMiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiYXBwZW5kIiwiZ2V0U3VnZ2VzdGlvbnMiLCJsb2NhdGlvbiIsInJlc3BvbnNlIiwiZmV0Y2giLCJtb2RlIiwic3VnZ2VzdGlvbkRhdGEiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwic2VhcmNoIiwiYXV0b2NvbXBsZXRlQnRucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRXZWF0aGVySWNvbiIsImdldERheU5hbWUiLCJkYXRlIiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsIndlZWtkYXkiLCJ1cGRhdGVVSSIsInNjYWxlIiwiY3VyckNvbmRpdGlvbiIsImN1cnJlbnQiLCJjb25kaXRpb24iLCJ0ZXh0IiwiY3VyclRlbXAiLCJjdXJySWNuIiwic3JjIiwiaXNfZGF5IiwiZmVlbCIsInJhaW5DaGFuY2UiLCJmb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiZGF5IiwiZGFpbHlfY2hhbmNlX29mX3JhaW4iLCJ3aW5kIiwid2luZF9rcGgiLCJ1diIsImh1bWlkaXR5IiwicHJlc3N1cmUiLCJwcmVzc3VyZV9tYiIsInN1bnNldCIsImFzdHJvIiwidmlzaWJpbGl0eSIsInZpc19rbSIsInRvZGF5SWNuIiwiZGF5V2Vla05hbWUiLCJpIiwibWF4VGVtcFdlZWsiLCJtaW5UZW1wV2VlayIsInRpbWVJY24iLCJ0aW1lU2xvdHMiLCJob3VyIiwidGltZUNvbmQiLCJ0ZW1wSG91ciIsImZvcmVjYXN0RGF0YSIsInNjYWxlQ2hlY2tib3giLCJnZXRUZW1wU2NhbGUiLCJjaGVja2VkIiwid2VhdGhlcktleXdvcmRzIiwiY2xlYXIiLCJ0aHVuZGVyIiwiY2xvdWR5IiwicmFpbiIsInNub3ciLCJmaW5kV2VhdGhlckNvbmRpdGlvbiIsIndlYXRoZXJUZXh0Iiwid2VhdGhlckZvcmVjYXN0IiwiT2JqZWN0Iiwia2V5cyIsInNvbWUiLCJ3ZWF0aGVyQ29uZGl0aW9uIiwia2V5d29yZCIsInRvTG93ZXJDYXNlIiwic3BsaXQiLCJpbmNsdWRlcyIsImlzRGF5IiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwidmFsdWUiLCJ3aW5kb3ciLCJldmVudCIsInRhcmdldCIsImNsb3Nlc3QiXSwic291cmNlUm9vdCI6IiJ9