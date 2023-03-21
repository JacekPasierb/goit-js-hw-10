import './css/styles.css';
import { fetchCountry } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { trimInput } from './myLibrary';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
let countryListHtml = '';
let countryInfoHtml = '';

inputSearchBox.addEventListener(
  'input',
  debounce(e => {
    let countryName = trimInput(inputSearchBox.value);
    if (countryName === '') {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      return;
    }
    fetchCountry(countryName)
      .then(countryData => {
        countryListHtml = '';
        countryInfoHtml = '';
        if (countryData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countryData.length >= 2 && countryData.length <= 10) {
          countryInfoHtml = '';
          countryInfo.innerHTML = countryInfoHtml;

          countryData.forEach(country => {
            countryListHtml += `<li class="item"><img src="${country.flags.svg}" width="60" height="40"> <span class="nameCountryList"> ${country.name.common}</span></li>`;
          });
        } else {
          countryData.forEach(country => {
            for (const key in country) {
              if (key == 'languages') {
                countryInfoHtml += `<span class="info"><b>${key}:</b> ${Object.values(
                  country[key]
                ).join(', ')}</span>`;
              } else if (key == 'flags') {
                countryInfoHtml += `<img src="${country.flags.svg}" width="60" height="40" style=" margin-right:20px;">`;
              } else if (key == 'name') {
                countryInfoHtml += `<span class="nameCountry"><b>${country.name.common}</b></span>`;
              } else {
                countryInfoHtml += `<p class="info"><b>${key}:</b> ${country[key]}</p>`;
              }
            }
            const countryList = document.querySelectorAll('.item');
            countryList.forEach(country => country.remove());
            countryInfo.innerHTML = countryInfoHtml;
            const spn = document.querySelector('.nameCountry');
            spn.style.fontSize = '48px';
            spn.style.fontWeight = 'bold';
          });
        }

        countryList.innerHTML = countryListHtml;
        const ul = document.querySelector('ul');
        ul.style.padding = '0px';
        const allLi = document.querySelectorAll('li');
        allLi.forEach(li => {
          li.style.display = 'flex';
          li.style.alignItems = 'center';
          li.style.gap = '20px';
          li.style.marginBottom = '10px';
        });
      })
      .catch(error => {
        console.log(error);
        countryInfoHtml = '';
        countryInfo.innerHTML = countryInfoHtml;
        countryListHtml = '';
        countryList.innerHTML = countryListHtml;
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }, DEBOUNCE_DELAY)
);
