import Notiflix from 'notiflix';
export const fetchCountries = name => {
  const fetchCountry = fetch('https://restcountries.com/v3.1/all');

  fetchCountry
    .then(response => {
      const countryData = response.json();

      return countryData;
    })
    .then(receiveCountryData => {
      const selectedKeys = [
        'name',
        'capital',
        'population',
        'flags',
        'languages',
      ];
      let newCountryData = [];

      for (const object of receiveCountryData) {
        let newObject = {};
        for (let key in object) {
          if (selectedKeys.includes(key)) {
            newObject[key] = object[key];
          }
        }

        newCountryData.push(newObject);
      }

      return newCountryData;
    })
    .then(revceiveNewCountryData => {
      const nameCommon = revceiveNewCountryData.filter(country =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      );
      // if (name.length >= 1 && !nameCommon.includes(name)) {
      //   console.log(name);
      //   Notiflix.Notify.failure('Qui timide rogat docet negare');
      // }
      printCountry(nameCommon);
    })
    .catch(error => console.log(error));
};
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
function printCountry(countries) {
  let countryListHtml = '';
  let countryInfoHtml = '';
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  countries.forEach(country => {
    countryListHtml += `<li class="item"><img src="${country.flags.svg}" width="60" height="40"> <span class="nameCountry">${country.name.common}</span></li>`;
  });

  countryList.innerHTML = countryListHtml;

  const allLi = document.querySelectorAll('li');
  const ul = document.querySelector('ul');
  ul.style.padding = '0px';
  allLi.forEach(li => {
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.gap = '20px';
    li.style.marginBottom = '10px';
  });
  if (countries.length == 1) {
    countries.forEach(country => {
      const spn = document.querySelector('span.nameCountry');
      spn.style.fontWeight = 'bold';
      spn.style.fontSize = '48px';

      for (const key in country) {
        if (key !== 'name' && key !== 'flags') {
          if (key == 'languages') {
            countryInfoHtml += `<span class="info"><b>${key}:</b> ${Object.values(
              country[key]
            ).join(', ')}</span>`;
          } else {
            countryInfoHtml += `<p class="info"><b>${key}:</b> ${country[key]}</p>`;
          }
        }
      }
    });
  }

  countryInfo.innerHTML = countryInfoHtml;
}
