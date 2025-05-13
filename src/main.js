import { getImagesByQuery, getMoreImages, setQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('#load-more-btn');

let totalHits = 0;
let loadedImages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const input = form.elements['search-text'];
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Hello!',
      message: 'The search field cannot be empty',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();
  loadMoreBtn.hidden = true;
  setQuery(query);

  try {
    const data = await getImagesByQuery(query);
    totalHits = data.totalHits;
    loadedImages = data.hits.length;

    if (!data.hits.length) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (loadedImages < totalHits) {
      loadMoreBtn.hidden = false;
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong, please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  showLoader();

  try {
    const data = await getMoreImages();
    createGallery(data.hits);
    loadedImages += data.hits.length;

    if (loadedImages >= totalHits) {
      loadMoreBtn.hidden = true;
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
