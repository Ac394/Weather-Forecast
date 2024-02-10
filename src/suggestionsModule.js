import weatherAPIKey from "./apiConfig";
import { getWeather } from "./weatherModule";

const elContainer = document.querySelector(".autocomplete");

// Function to hide autocomplete suggestions
const hideSuggestions = () => {
  elContainer.style.display = "none";
};

// Function to create autocomplete suggestions
const createSuggestions = (data) => {
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
        hideSuggestions();
      });

      // Event listener to handle keyboard navigation
      cityEl.addEventListener("keyup", (e) => {
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

const getSuggestions = async (location) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${weatherAPIKey}&q=${location}`,
      { mode: "cors" }
    );
    const suggestionData = await response.json();
    createSuggestions(suggestionData);
  } catch (error) {
    console.log(error);
  }
};

// Event listener to the search input element to handle keyboard navigation to the first and last suggestion
const search = document.querySelector(".search-bar");
search.addEventListener("keyup", (e) => {
  const autocompleteBtns = document.querySelectorAll(".autocomplete > button");
  if (e.key === "Enter") {
    hideSuggestions();
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    autocompleteBtns[0].focus();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    autocompleteBtns[autocompleteBtns.length - 1].focus();
  }
});

export { hideSuggestions, createSuggestions, getSuggestions };
