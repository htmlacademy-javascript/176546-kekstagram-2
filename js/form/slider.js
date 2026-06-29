const effectLevelValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imageUploadEffectLevel = document.querySelector('.img-upload__effect-level');

let currentEffect = 'none';

const effectConfig = {
  none: { filter: 'none', from: 0, to: 1, step: 0.01, unit: '' },
  chrome: { filter: 'grayscale', from: 0, to: 1, step: 0.01, unit: '' },
  sepia: { filter: 'sepia', from: 0, to: 1, step: 0.01, unit: '' },
  marvin: { filter: 'invert', from: 0, to: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', from: 0, to: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', from: 1, to: 3, step: 0.01, unit: '' }
};

const slider = noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Math.round(value),
    from: (value) => parseFloat(value)
  }
});

const applyEffect = (effect, intensity) => {
  if (effect === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  const config = effectConfig[effect];
  const range = config.to - config.from;
  const value = config.from + (intensity / 100) * range;

  const formattedValue = config.step >= 1
    ? Math.round(value)
    : Math.round(value * 100) / 100;

  imagePreview.style.filter = `${config.filter}(${formattedValue}${config.unit})`;
};

const changeEffectList = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effect = evt.target.value;
    currentEffect = effect;

    if (effect === 'none') {
      imageUploadEffectLevel.style.display = 'none';
      imagePreview.style.filter = 'none';
    } else {
      imageUploadEffectLevel.style.display = 'block';

      slider.set(100);
      effectLevelValue.value = 100;

      applyEffect(effect, 100);
    }
  }
};

const sliderUpdate = () => {
  slider.on('update', (values) => {
    const value = Math.round(values[0]);
    effectLevelValue.value = value;

    if (currentEffect !== 'none') {
      applyEffect(currentEffect, value);
    }
  });
};

const initSlider = () => {
  imageUploadEffectLevel.style.display = 'none';
  effectsList.addEventListener('change', changeEffectList);
  sliderUpdate();
};

export { initSlider };
