import './css/styles.css';
import { fetchCountry } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { trimInput } from './myLibrary';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
let countryListHtml = '';
inputSearchBox.addEventListener(
  'input',
  debounce(e => {
    countryName = trimInput(inputSearchBox.value);

    fetchCountry(countryName).then(countryData => {
      if (countryData.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      countryListHtml = "";
      countryData.forEach(country => {
        countryListHtml += `<li class="item"><img src="${country.flags.svg}" width="60" height="40"> <span class="nameCountry">${country.name.common}</span></li>`;
      });
      countryList.innerHTML = countryListHtml;
    });
  }, DEBOUNCE_DELAY)
);
