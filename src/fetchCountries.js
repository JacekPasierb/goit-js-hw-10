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

      printCountry(nameCommon);
    })
    .catch(error => console.log(error));
};
const countryList = document.querySelector('.country-list');
function printCountry(countries) {
  let countryListHtml = '';
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else {
    countries.forEach(country => {
      countryListHtml += `<li class="item"><img src="${country.flags.svg}" width="60" height="40"> ${country.name.common}</li>`;
    });
  }
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
}
