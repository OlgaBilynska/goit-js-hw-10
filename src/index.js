import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'

new SlimSelect({
  select: '#selectElement'
})

const API_KEY = 'live_HGnjQBBvjYKKro9qi1Q17SySFaNdyzGt90Ea6MVdKjuAo0HKe9MoziJrFSMFYGJx';
const BASE_URL = 'https://api.thecatapi.com/v1';

const selectEl = document.querySelector('.breed-select');
const infoBlockEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

let catId = '';
errorEl.classList.add('visually-hidden');

function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        return  response.json();
        })
        .then(data => data)
        .catch(onError);
}

fetchBreeds()
    .then(data => {
        makeSelectMarkup(data);
        selectEl.classList.remove('visually-hidden');
        infoBlockEl.classList.remove('visually-hidden');
        loaderEl.classList.add('visually-hidden');
        errorEl.classList.add('visually-hidden');
      return 
    })
    .catch(onError);


function makeSelectMarkup(cats) {
const selectMarkup = cats.map(cat => {
        catId = cat.id;
        return `<option value=${cat.id}>${cat.name}</option>`
    })
        .join('');
    selectEl.insertAdjacentHTML('beforeend', selectMarkup);
}


selectEl.addEventListener('change', onCatSelect);

function onCatSelect(evt) {
    selectEl.classList.add('visually-hidden');
    infoBlockEl.classList.add('visually-hidden');
    loaderEl.classList.remove('visually-hidden');
    errorEl.classList.add('visually-hidden');
    catId = evt.target.value;
    fetchCatByBreed(catId);
    console.log('catId', catId);
    return 
}


function fetchCatByBreed(breedId) {
    console.log('id', breedId);
    const URL = `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
    console.log(URL);
    return fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('fetchCatByBreed', data[0]);
            catMarkup(data);
            selectEl.classList.remove('visually-hidden');
            infoBlockEl.classList.remove('visually-hidden');
            loaderEl.classList.add('visually-hidden');
            errorEl.classList.add('visually-hidden');
        })
        .catch(onError);
}
        
function catMarkup(data) {
    console.log('data', data);
    console.log('data[0]', data[0]);
    const markup = cat => {
        return `<div class="cat-card">
        <img src="${cat.url}" alt="${cat.breeds[0].name}" width="300">
        <div class="cat-text">
        <h1>${cat.breeds[0].name}</h1>
    <p>${cat.breeds[0].description}</p>
    <p><span class="cat-temperament">Temperament:&nbsp;</span>${cat.breeds[0].temperament}</p>
    </div>
    </div>
    `;
   }
   infoBlockEl.innerHTML = markup(data[0]);
}

function onError(){
    loaderEl.classList.add('visually-hidden');
    selectEl.classList.remove('visually-hidden');
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
} 

// {
//             errorEl.classList.remove('visually-hidden');
//             
//         }




