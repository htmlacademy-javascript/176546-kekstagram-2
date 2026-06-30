import {isEscapeKey} from '../util.js';
import {initValidation, validateForm, resetValidation} from './validate.js';
import {initScale, resetScale} from './scale.js';
import {initSlider, resetEffects} from './slider.js';


const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashTags = imgUploadForm.querySelector('.text__hashtags');
const descriptionTextarea = imgUploadForm.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const activeElement = document.activeElement;
    const isFormElementFocused = activeElement === hashTags || activeElement === descriptionTextarea;

    if (!isFormElementFocused) {
      evt.preventDefault();
      closeUploadModal();
    }
  }
};

const onFormSubmit = (evt) => {
  if (!validateForm()) {
    evt.preventDefault();
  }
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadForm.addEventListener('submit', onFormSubmit);

  initValidation();
  initScale();
  initSlider();
};

function closeUploadModal () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';

  imgUploadForm.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  resetEffects();
  resetValidation();
}

const onUploadContainerClick = () => {
  imgUploadInput.onchange = () => {
    openUploadModal();
  };
};

const setUploadListener = () => {
  imgUploadInput.addEventListener('click', onUploadContainerClick);
  imgUploadCancel.addEventListener('click', closeUploadModal);
};

export { setUploadListener };
