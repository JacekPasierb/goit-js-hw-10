import './css/styles.css';
import { fetchCountry } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { trimInput } from './myLibrary';

const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');

inputSearchBox.addEventListener(
  'input',
  debounce(e => {
    countryName = trimInput(inputSearchBox.value);

    fetchCountry(countryName).then(dob => console.log(dob));
  }, DEBOUNCE_DELAY)
);
