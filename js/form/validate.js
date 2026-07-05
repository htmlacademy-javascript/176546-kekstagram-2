const imgUploadForm = document.querySelector('.img-upload__form');
const hashTags = imgUploadForm.querySelector('.text__hashtags');
const descriptionTextarea = imgUploadForm.querySelector('.text__description');

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const createPristine = () => new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error-text'
});

let pristine = createPristine();

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  const errors = {
    count: hashtags.length > MAX_HASHTAGS,
    unique: new Set(hashtags).size !== hashtags.length,
    format: !hashtags.every((tag) => HASHTAG_REGEX.test(tag))
  };

  if (errors.count) {
    return `Превышено количество хэштегов (максимум ${MAX_HASHTAGS}, сейчас ${hashtags.length})`;
  }

  if (errors.unique) {
    const duplicates = hashtags.filter((tag, i) => hashtags.indexOf(tag) !== i);
    return `Повторяющиеся хэштеги: ${[...new Set(duplicates)].join(', ')}`;
  }

  if (errors.format) {
    const invalid = hashtags.filter((tag) => !HASHTAG_REGEX.test(tag));
    return `Невалидный хэштег: ${invalid.join(', ')} (должен начинаться с #, содержать буквы/цифры, до 19 символов)`;
  }

  return true;
};

const validateComment = (value) => {
  if (value.length > MAX_COMMENT_LENGTH) {
    return `Комментарий слишком длинный (${value.length}/${MAX_COMMENT_LENGTH} символов)`;
  }
  return true;
};

const initValidation = () => {
  pristine = createPristine();

  pristine.addValidator(
    hashTags,
    (value) => {
      const result = validateHashtags(value);
      return result === true;
    },
    (value) => {
      const result = validateHashtags(value);
      return typeof result === 'string' ? result : '';
    },
    1,
    false
  );

  pristine.addValidator(
    descriptionTextarea,
    (value) => {
      const result = validateComment(value);
      return result === true;
    },
    (value) => {
      const result = validateComment(value);
      return typeof result === 'string' ? result : '';
    },
    1,
    false
  );
};

const clearValidationUI = () => {
  document.querySelectorAll('.img-upload__field-wrapper--error-text')
    .forEach((el) => el.remove());

  document.querySelectorAll('.img-upload__field-wrapper')
    .forEach((wrapper) => {
      wrapper.classList.remove('img-upload__field-wrapper--error', 'img-upload__field-wrapper--success');
    });

  hashTags.value = '';
  descriptionTextarea.value = '';
  hashTags.classList.remove('error');
  descriptionTextarea.classList.remove('error');
};

const resetValidation = () => {
  clearValidationUI();
  if (pristine?.reset) {
    pristine.reset();
  }

  initValidation();
};

const validateForm = () => {
  if (!pristine) {
    initValidation();
  }

  return pristine.validate();
};

export { initValidation, validateForm, resetValidation };
