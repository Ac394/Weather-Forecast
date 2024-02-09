import weatherAPIKey from "./apiConfig";
import updateUI from "./uiModule";
import { forecastData, getWeather } from "./weatherModule";

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

export { hideAutoComplete, createAutoComplete, getAutoComplete };
