import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;
let totalPages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'The search field cannot be empty',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    const { hits, totalHits } = data;

    if (!hits || !hits.length) {
      iziToast.info({
        title: '',
        message: 'No images found. Please try again.',
        position: 'topRight',
      });
      return;
    }

    totalPages = Math.ceil(totalHits / perPage);
    createGallery(hits);

    if (page < totalPages) {
      showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'End of Results',
        message: 'You have reached the end of the search results.',
        position: 'topRight',
      });
    }

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while loading more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
