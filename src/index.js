import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchImg } from './cat-api';

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
      let selectedCat = select.getSelected();
      let localShit = [];
      loader.style.display = 'inline-block';
      select.settings.disabled = true;
      fetchImg(selectedCat, localShit, loader, select, divCat)
    },
    beforeClose: () => {
      while (divCat.firstChild) {
        divCat.removeChild(divCat.firstChild);
      }
    },
  },
});

fetchBreeds(loader, select)