import {isEscapeKey} from '../util.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {initValidation, validateForm, resetValidation} from './validate.js';
import {initScale, resetScale} from './scale.js';
import {initSlider, resetEffects} from './slider.js';
import {sendData} from './api.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashTags = imgUploadForm.querySelector('.text__hashtags');
const descriptionTextarea = imgUploadForm.querySelector('.text__description');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const activeElement = document.activeElement;
    const isFormElementFocused = activeElement === hashTags || activeElement === descriptionTextarea;

    const isErrorModalOpen = document.querySelector('.error');

    if (isFormElementFocused || isErrorModalOpen) {
      return;
    }

    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeUploadModal();
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (validateForm()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        closeUploadModal();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
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

const closeUploadModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadForm.removeEventListener('submit', onFormSubmit);

  resetScale();
  resetEffects();
  resetValidation();
  unblockSubmitButton();
};

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
