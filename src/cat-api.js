const API_KEY =
  'live_HGnjQBBvjYKKro9qi1Q17SySFaNdyzGt90Ea6MVdKjuAo0HKe9MoziJrFSMFYGJx';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const URL = `${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  return fetch(URL).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
