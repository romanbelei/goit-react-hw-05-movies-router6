const BASE_URL = 'https://api.themoviedb.org/3';
const KEY = '2df0d61e4e977c645a20818274a83726';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function FetchTrending() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${KEY}`
  );
}

export function FetchFilmById(filmId) {
  return fetchWithErrorHandling(`${BASE_URL}/movie/${filmId}?api_key=${KEY}`);
}

export function FetchFilmCast(filmId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${filmId}/credits?api_key=${KEY}`
  );
}
export function FetchFilmReviews(filmId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${filmId}/reviews?api_key=${KEY}`
  );
}
export function FetchFilmSearch(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${KEY}&query=${query}`
  );
}
