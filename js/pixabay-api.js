// js/pixabay-api.js

import axios from 'axios';

const API_KEY = '50197209-2a2796b344803c480c3c957e7';
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Отримує зображення за запитом користувача з Pixabay API.
 * 
 * @param {string} query - Пошуковий запит.
 * @param {number} page - Номер сторінки (за замовчуванням 1).
 * @param {number} perPage - Кількість зображень на сторінку (за замовчуванням 15).
 * @returns {Promise<Object>} - Обʼєкт з полем hits (масив зображень) та інші метадані.
 */
export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Помилка при запиті до Pixabay:', error.message);
    throw new Error('Failed to fetch images from Pixabay');
  }
}
