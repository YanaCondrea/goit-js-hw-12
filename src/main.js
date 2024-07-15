import { httpRequest } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import error from './img/error.svg';
import { createMurkup } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const key = '44769616-4ffe0cee5617f53d3e1075857';
let perPage = 15;
let page = 1;
let maxPage;
let searchText = '';
const hiddenClass = 'visually-hidden';

let lightbox = new SimpleLightbox('.list a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const elements = {
  form: document.querySelector('.search-form'),
  list: document.querySelector('.list'),
  input: document.querySelector('.search-input'),
  loaderBtn: document.querySelector('.loader-btn'),
  loader: document.querySelector('.loader'),
};

elements.form.addEventListener('submit', searchQuery);

async function searchQuery(evt) {
  evt.preventDefault();
  elements.list.innerHTML = '';
  page = 1;
  searchText = evt.target.elements.input.value.trim();

  if (searchText === '') {
    iziToast.show({
      backgroundColor: '#ef4040',
      close: false,
      closeOnClick: true,
      progressBarColor: 'white',
      title: 'Error',
      titleColor: 'white',
      iconUrl: error,
      position: 'topRight',
      icon: 'icon-error.svg',
      messageColor: 'white',
      messageSize: '16px',
      message: 'Form field must be filled in',
    });
    elements.form.reset();
    hideLoaderBtn();
    return;
  }

  showLoaderBtn();
  disableLoaderBtn();
  showLoader();

  try {
    const data = await httpRequest(key, searchText, perPage, page);
    maxPage = Math.ceil(data.totalHits / perPage);
    const image = data.hits;
    elements.list.insertAdjacentHTML('beforeend', createMurkup(image));

    lightbox.refresh();

    if (image.length !== data.totalHits && image.length > 0) {
      enableLoaderBtn();
      hideLoader();
      elements.loaderBtn.addEventListener('click', getLoadMoreImage);
    } else {
      iziToast.show({
        backgroundColor: '#ef4040',
        close: false,
        closeOnClick: true,
        progressBarColor: 'white',
        title: 'Error',
        titleColor: 'white',
        iconUrl: error,
        position: 'topRight',
        icon: 'icon-error.svg',
        messageColor: 'white',
        messageSize: '16px',
        message:
          '"Sorry, there are no images matching your search query. Please try again!"',
      });
      hideLoader();
      hideLoaderBtn();
    }
  } catch (err) {
    console.log(err);
  } finally {
    elements.form.reset();
  }
}

async function getLoadMoreImage() {
  page += 1;
  disableLoaderBtn();
  showLoader();
  try {
    const data = await httpRequest(key, searchText, perPage, page);
    const image = data.hits;
    elements.list.insertAdjacentHTML('beforeend', createMurkup(image));
    lightbox.refresh();
    scrolePage();
  } catch (err) {
    console.log(err);
  } finally {
    enableLoaderBtn();
    hideLoader();

    if (page === maxPage) {
      hideLoaderBtn();
      elements.loaderBtn.removeEventListener('click', getLoadMoreImage);
      iziToast.show({
        class: 'toast',
        position: 'topRight',
        messageColor: 'black',
        message: `We're sorry, but you've reached the end of search results.`,
      });
    }
  }
}

function hideLoaderBtn() {
  elements.loaderBtn.classList.add(hiddenClass);
}

function showLoaderBtn() {
  elements.loaderBtn.classList.remove(hiddenClass);
}

function disableLoaderBtn() {
  elements.loaderBtn.disabled = true;
}

function showLoader() {
  elements.loader.classList.remove(hiddenClass);
}

function enableLoaderBtn() {
  elements.loaderBtn.disabled = false;
}

function hideLoader() {
  elements.loader.classList.add(hiddenClass);
}

function scrolePage() {
  const li = elements.list.lastChild.getBoundingClientRect();
  scrollBy({
    top: li.top + li.height * 2,
    behavior: 'smooth',
  });
}
