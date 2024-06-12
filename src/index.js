import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const divCat = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');


let select = new SlimSelect({
  select: '#selectElement',
  settings: {
    placeholderText: 'Choose a cat!',
    disabled: false,
  },
  events: {
    afterClose: () => {
      let breedId = select.getSelected();
      loader.style.display = 'inline-block';
      select.settings.disabled = true;
      renderCatInfo(breedId)
    },
    beforeClose: () => {
      while (divCat.firstChild) {
        divCat.removeChild(divCat.firstChild);
      }
    },
  },
});

const renderCatInfo = async (breedId) => {
  loader.style.display = 'block';
 const selectedCatData = await fetchCatByBreed(breedId)
  const arr = selectedCatData.map(d => `
      <img alt='${d.breeds[0].name}' src='${d.url}' width='400'/>
      <div style='margin-left: 20px'>
        <h2>${d.breeds[0].name}</h2>
        <div style='width: 600px; margin-bottom: 20px'>${d.breeds[0].description}</div>
        <div style='width: 600px'><span style='font-weight: bold'>Temperament: </span>${d.breeds[0].temperament}</div>
      </div>
    `).join('');
  divCat.insertAdjacentHTML('beforeend', arr);
  loader.style.display = 'none';
  select.settings.disabled = false;
}

const fillSelectFunc = async () => {
  loader.style.display = 'block';
  let storedCats = await fetchBreeds()
  const mappedStore = storedCats.map(cat => ({
    text: cat.name,
    value: cat.reference_image_id,
  }));
  select.setData(mappedStore);
  loader.style.display = 'none';
  select.settings.disabled = false;
}

fillSelectFunc()
