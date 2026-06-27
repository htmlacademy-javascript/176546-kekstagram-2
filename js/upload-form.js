import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
const hashTags = imgUploadOverlay.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadOverlay, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateHashTag = (value) => {
  const newHashtag = [];
  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtagsArray = value.split(' ');

  hashtagsArray.forEach((hashtag) => {
    if (!hashtagReg.test(hashtag)) {
      return false;
    }

    if (hashtagsArray.length > 5) {
      return false;
    }

    if (newHashtag.includes(hashtag)) {
      return false;
    }

    newHashtag.push(hashtag);
  });

  return true;
};

pristine.addValidator(
  hashTags,
  validateHashTag,
  'Хэштег не подходит под условия'
);

imgUploadOverlay.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUploadModal () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onUploadContainerClick = () => {
  imgUploadInput.onchange = function () {
    openUploadModal();
  };
};

const setUploadListener = () => {
  imgUploadInput.addEventListener('click', () => onUploadContainerClick());

  imgUploadCancel.addEventListener('click', () => closeUploadModal());
};

export { setUploadListener };
