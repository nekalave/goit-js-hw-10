import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.7.min.css';
import axios from 'axios';

let storedCats = [];
axios.defaults.headers.common['x-api-key'] = 'api_key=live_Z0ocRMVso3mQ6VEPgThApOaPxZRDJWDtWwYDxuSWnS2oaB8FlHHqxXYVTU2zs9RZ';
export const fetchBreeds = async (loader, select) => {
  try {
    loader.style.display = 'block';
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    storedCats = response.data;
    const mappedStore = storedCats.map(cat => ({
      text: cat.name,
      value: cat.reference_image_id,
    }));
    select.setData(mappedStore);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  } finally {
    loader.style.display = 'none';
    select.settings.disabled = false;
  }
};

export const fetchImg = async (selectedCat, localShit, loader, select, divCat) => {
  try {
    loader.style.display = 'block';
    const response = await axios.get(`https://api.thecatapi.com/v1/images/${selectedCat[0]}`);
    const data = response.data;
    localShit.push(data);
    const arr = localShit.map(d => `
      <img alt='${d.breeds[0].name}' src='${d.url}' width='400'/>
      <div style='margin-left: 20px'>
        <h2>${d.breeds[0].name}</h2>
        <div style='width: 600px; margin-bottom: 20px'>${d.breeds[0].description}</div>
        <div style='width: 600px'><span style='font-weight: bold'>Temperament: </span>${d.breeds[0].temperament}</div>
      </div>
    `).join('');
    divCat.insertAdjacentHTML('beforeend', arr);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  } finally {
    loader.style.display = 'none';
    select.settings.disabled = false;
  }
}