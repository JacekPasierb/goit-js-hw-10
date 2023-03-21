import './css/styles.css';
import { fetchCountry } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { trimInput } from './myLibrary';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryListItem = document.querySelectorAll('.item');
const countryInfo = document.querySelectorAll('.info');
let countryListHtml = '';
let countryInfoHtml = '';

inputSearchBox.addEventListener(
  'input',
  debounce(e => {
    let countryName = trimInput(inputSearchBox.value);
    
    fetchCountry(countryName).then(countryData => {
      console.log('1:', countryData);

    })
  }, DEBOUNCE_DELAY))

