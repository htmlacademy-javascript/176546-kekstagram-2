const imgUploadForm = document.querySelector('.img-upload__form');
const hashTags = imgUploadForm.querySelector('.text__hashtags');
const descriptionTextarea = imgUploadForm.querySelector('.text__description');

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error-text'
});

const validateHashTagsAmount = (hashtags) => hashtags.length <= 5;

const validateHashTag = (value) => {

  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  const isValidAmount = validateHashTagsAmount(hashtags);
  const isValidDoubles = new Set(hashtags).size === hashtags.length;

  if (hashtags.length > 5) {
    return false;
  }

  if (!isValidAmount || !isValidDoubles) {
    return false;
  }

  for (const tag of hashtags) {
    if (!HASHTAG_REGEX.test(tag)) {
      return false;
    }
  }

  return true;
};

const validateTextarea = (value) => value.length <= 140;

const initValidation = () => {
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
};

const validateForm = () => pristine.validate();

export { initValidation, validateForm };
