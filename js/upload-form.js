import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const hashTags = imgUploadForm.querySelector('.text__hashtags');
const descriptionTextarea = imgUploadForm.querySelector('.text__description');
const wrapper = document.querySelector('.img-upload__field-wrapper');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview');
const effectLevelValue = document.querySelector('.effect-level__value');
// const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error-text'
});

const startEffectLevelSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
  });

  effectLevelSlider.noUiSlider.on('update', (values) => {
    if (effectLevelValue) {
      effectLevelValue.value = Math.round(values[0]);
    }
  });
};

const validateHashTag = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);
  const hashtagReg = /^#[a-zа-яё0-9]{1,19}$/i;

  if (hashtags.length > 5) {
    return false;
  }

  const unique = new Set();
  for (const tag of hashtags) {
    if (!hashtagReg.test(tag)) {
      return false;
    }
    const lower = tag.toLowerCase();
    if (unique.has(lower)) {
      return false;
    }
    unique.add(lower);
  }

  return true;
};

const validateTextarea = (value) => value.length <= 140;

const onHashTagsClick = (evt) => {
  evt.preventDefault();
  validateHashTag();
};

const onTextareaClick = (evt) => {
  evt.preventDefault();
  validateTextarea();
};

const isFormValid = () => !wrapper.classList.contains('img-upload__field-wrapper--error');

const onSubmitButtonClick = (evt) => {
  if (!isFormValid()) {
    evt.preventDefault();
    return false;
  }
};

const onScaleControlSmallerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  if (!isNaN(currentValue) && currentValue > 25) {
    const scale = currentValue - 25;
    scaleControlValue.value = `${scale}%`;
    preview.style.transform = `scale(${scale / 100})`;
  } else {
    scaleControlValue.value = '25%';
    preview.style.transform = 'scale(0.25)';
  }
};

const onScaleControlBiggerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  if (!isNaN(currentValue) && currentValue < 100) {
    const scale = currentValue + 25;
    scaleControlValue.value = `${scale}%`;
    preview.style.transform = `scale(${scale / 100})`;
  } else {
    scaleControlValue.value = '100%';
    preview.style.transform = 'scale(1)';
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const activeElement = document.activeElement;
    const isInputFocused = activeElement === hashTags ||
                          activeElement === descriptionTextarea;

    if (!isInputFocused) {
      evt.preventDefault();
      closeUploadModal();
    }
  }
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  imgUploadForm.addEventListener('submit', (evt) => onSubmitButtonClick(evt));
  hashTags.addEventListener('input', (evt) => onHashTagsClick(evt));
  descriptionTextarea.addEventListener('input', (evt) => onTextareaClick(evt));
  scaleControlSmaller.addEventListener('click', () => onScaleControlSmallerClick());
  scaleControlBigger.addEventListener('click', () => onScaleControlBiggerClick());

  pristine.addValidator(
    hashTags,
    validateHashTag,
    'Хэштег должен начинаться с #, содержать буквы/цифры, не более 5 уникальных'
  );

  pristine.addValidator(
    descriptionTextarea,
    validateTextarea,
    'Комментарий не более 140 символов'
  );

  startEffectLevelSlider();
};

function closeUploadModal () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('input', onHashTagsClick);
  document.removeEventListener('submit', onTextareaClick);
  document.removeEventListener('submit', onSubmitButtonClick);
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
