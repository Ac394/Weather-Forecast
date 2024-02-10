import { getAutoComplete, hideAutoComplete } from "./autocompleteModule";
import updateUI from "./uiModule";
import { forecastData, getTempScale, getWeather } from "./weatherModule";

// Initialize weather forecast with IP Geolocation
getWeather("auto:ip");

// Event listeners
const search = document.querySelector(".search-bar");

search.addEventListener("search", () => {
  getWeather(search.value);
});

search.addEventListener("input", () => {
  getAutoComplete(search.value);
});

document
  .querySelector(".checkbox")
  .addEventListener("change", () => updateUI(forecastData, getTempScale()));

window.addEventListener("mousedown", (event) => {
  if (!event.target.closest(".autocomplete")) {
    hideAutoComplete();
  }
});
