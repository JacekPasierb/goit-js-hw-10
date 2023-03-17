export const fetchCountries = (name) => {
  const fetchCountry = fetch('https://restcountries.com/v3.1/all',{
  mode: 'no-cors'
});

  console.log('FetchCountry', fetchCountry);

  fetchCountry
    .then(response => {
      console.log('response:', response);
      const countryData = response.json();
      console.log('countryData:', countryData);
      return countryData;
    })
    .then(receiveCountryData => {
      console.log('receiveCountryData:', receiveCountryData);

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

      console.log('to', newCountryData);
    });
}
