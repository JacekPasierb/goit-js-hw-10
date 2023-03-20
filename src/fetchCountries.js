import { fetchJsonToJs } from './myLibrary';

export const fetchCountry = countryName => {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
  return fetch(url).then(fetchJsonToJs);
};
