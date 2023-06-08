import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const infoBlockEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
let catId = '';

fetchBreeds()
  .then(data => {
    makeSelectMarkup(data);
    onAppear();
  })
  .catch(onError);

function showCat(catId) {
  fetchCatByBreed(catId)
    .then(data => {
      catMarkup(data);
      onAppear();
    })
    .catch(onError);
}

function makeSelectMarkup(cats) {
  const selectMarkup = cats
    .map(cat => {
      catId = cat.id;
      return `<option value=${cat.id}>${cat.name}</option>`;
    })
    .join('');
  selectEl.insertAdjacentHTML('beforeend', selectMarkup);
}

selectEl.addEventListener('change', onCatSelect);

function onCatSelect(evt) {
  onLoad();
  catId = evt.target.value;
  showCat(catId);
}

function catMarkup(data) {
  const markup = cat => {
    return `<div class="cat-card">
        <img class="cat-img" src="${cat.url}" alt="${cat.breeds[0].name}" width="300">
        <div class="cat-text">
        <h1 class="cat-header">${cat.breeds[0].name}</h1>
    <p>${cat.breeds[0].description}</p>
    <p><span class="cat-temperament">Temperament:&nbsp;</span>${cat.breeds[0].temperament}</p>
    </div>
    </div>
    `;
  };
  infoBlockEl.innerHTML = markup(data[0]);
}

function onError() {
  loaderEl.classList.add('visually-hidden');
  selectEl.classList.remove('visually-hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function onAppear() {
  selectEl.classList.remove('visually-hidden');
  infoBlockEl.classList.remove('visually-hidden');
  loaderEl.classList.add('visually-hidden');
}

function onLoad() {
  selectEl.classList.add('visually-hidden');
  infoBlockEl.classList.add('visually-hidden');
  loaderEl.classList.remove('visually-hidden');
}
