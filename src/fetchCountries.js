import Notiflix from 'notiflix';
export const fetchCountries = name => {
  const fetchCountry = fetch('https://restcountries.com/v3.1/all');

  console.log('1. FetchCountry: ', fetchCountry);

  fetchCountry
    .then(response => {
      console.log('2. response:', response);
      const countryData = response.json();
      console.log('3. countryData:', countryData);
      return countryData;
    })
    .then(receiveCountryData => {
      console.log('4. receiveCountryData:', receiveCountryData);

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

      console.log(
        '5. Nowy Obiekt z Wybranymi właściwosciami: ',
        newCountryData
      );
      return newCountryData;
    })
    .then(revceiveNewCountryData => {
      console.log('NowyData', revceiveNewCountryData);

      const nameCommon = revceiveNewCountryData.filter(country =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      );
      console.log('6. kraje', nameCommon);

      printCountry(nameCommon);
    });
};
const countryList = document.querySelector('.country-list');
function printCountry(countries) {
  let countryListHtml = '';
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if(countries.length == 0) {

    allLi.remove();
  }else {
    countries.forEach(country => {
      countryListHtml += `<li><img src="${country.flags.svg}" width="60" height="40"> ${country.name.common}</li>`;
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
