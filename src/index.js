import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');

inputSearchBox.addEventListener(
  'input',
  debounce(e => {
    if (inputSearchBox.value == '' || inputSearchBox.value == undefined) {
      const countryList = document.querySelectorAll('.item');
      countryList.forEach(country => country.remove());
      return;
    }

    fetchCountries(inputSearchBox.value.trim());
  }, DEBOUNCE_DELAY)
);
