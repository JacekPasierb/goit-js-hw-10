import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import  debounce  from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputSearchBox = document.querySelector('#search-box');



inputSearchBox.addEventListener("input", debounce((e) => {
    
    console.log(inputSearchBox.value);
    // fetchCountries(inputSearchBox.value);
  

    if (inputSearchBox.value == '' || inputSearchBox.value == undefined) {
        console.log('puste pole');
        return;
    } 
    
        console.log('start');
        fetchCountries(inputSearchBox.value.trim());
   
}, DEBOUNCE_DELAY));
