import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.7.min.css';
import axios from 'axios';

let storedCats = [];

  export const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/breeds');
      storedCats = response.data;
      return storedCats
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
  };

export const fetchCatByBreed = async (breedId) => {
  try {
    let selectedCatData = [];
    const response = await axios.get(`https://api.thecatapi.com/v1/images/${breedId[0]}`);
    selectedCatData.push(response.data);
    return selectedCatData
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}