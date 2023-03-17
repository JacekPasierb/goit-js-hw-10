export const fetchCountries = (name) => {
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
        'flags.svg',
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

      console.log('5. Nowy Obiekt z Wybranymi właściwosciami: ', newCountryData);
      return newCountryData;
    }).then(revceiveNewCountryData => {

      console.log("NowyData", revceiveNewCountryData);
      
     
      const nameOfficial = revceiveNewCountryData.filter(country => country.name.official.toLowerCase().includes(name.toLowerCase()));
      console.log("6. kraje", nameOfficial);
      
      printCountry(nameOfficial);
      
    });
}
const countryList = document.querySelector(".country-list");
function printCountry(country) {
  let countryListHtml = "";

  country.forEach((country) => {
    countryListHtml += `<li>${country.name.official}</li>`;
  })
  countryList.innerHTML = countryListHtml;
  // if (name == '' || name == undefined) {
  
  //   countryList.innerHTML = "";
  // } 
}