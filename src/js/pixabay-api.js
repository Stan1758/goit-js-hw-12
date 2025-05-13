import axios from 'axios';

const API_KEY = '50197209-2a2796b344803c480c3c957e7';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

let currentPage = 1;
let currentQuery = '';

export function setQuery(newQuery) {
  currentQuery = newQuery;
  currentPage = 1;
}

export function resetPage() {
  currentPage = 1;
}

export async function getImagesByQuery(query) {
  currentQuery = query;
  currentPage = 1;

  return await fetchImages();
}

export async function getMoreImages() {
  currentPage += 1;
  return await fetchImages();
}

async function fetchImages() {
  const params = {
    key: API_KEY,
    q: currentQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: PER_PAGE,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Помилка при запиті до Pixabay:', error);
    throw error;
  }
}
