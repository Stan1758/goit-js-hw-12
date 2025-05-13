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
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('#load-more-btn');
const loadMoreLoader = document.querySelector('.load-more-loader');

let totalHits = 0;
let loadedImages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

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
    input.value = '';

    if (loadedImages < totalHits) {
      loadMoreBtn.hidden = false;
    } else {
      iziToast.info({
        message: 'You have reached the end of the gallery.',
        position: 'topRight',
      });
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
  loadMoreBtn.disabled = true; 
  loadMoreLoader.style.display = 'inline-block';

  try {
    const data = await getMoreImages();

    if (data.hits && data.hits.length) {
      createGallery(data.hits);
      loadedImages += data.hits.length;
    }

    
    if (loadedImages >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of Gallery',
        message: 'You have reached the end of the gallery.',
        position: 'topRight',
      });
    }

    
    smoothScrollToNextGroup();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong, please try again.',
      position: 'topRight',
    });
  } finally {
    loadMoreLoader.style.display = 'none'; 
    loadMoreBtn.disabled = false; 
  }
});

function smoothScrollToNextGroup() {
  const firstImageCard = document.querySelector('.gallery-item');
  if (firstImageCard) {
    const cardHeight = firstImageCard.getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth', 
    });
  }
}
