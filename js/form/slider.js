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
    min: effectConfig.none.from,
    max: effectConfig.none.to
  },
  start: effectConfig.none.to,
  step: effectConfig.none.step,
  connect: 'lower',
  format: {
    to: (value) => {
      const config = effectConfig[currentEffect];
      if (config && config.step >= 1) {
        return Math.round(value);
      }
      return Math.round(value * 100) / 100;
    },
    from: (value) => parseFloat(value)
  }
});

const applyEffect = (value) => {
  if (currentEffect === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  const config = effectConfig[currentEffect];
  const formattedValue = config.step >= 1
    ? Math.round(value)
    : Math.round(value * 100) / 100;

  imagePreview.style.filter = `${config.filter}(${formattedValue}${config.unit})`;
};

const changeEffectList = (evt) => {
  currentEffect = evt.target.value;
  const config = effectConfig[currentEffect];

  if (currentEffect === 'none') {
    imageUploadEffectLevel.style.display = 'none';
    imagePreview.style.filter = 'none';
  } else {
    imageUploadEffectLevel.style.display = 'block';

    slider.updateOptions({
      range: {
        min: config.from,
        max: config.to
      },
      start: config.to,
      step: config.step
    });

    slider.set(config.to);
    effectLevelValue.value = config.to;
    applyEffect(config.to);
  }
};

const sliderUpdate = () => {
  slider.on('update', (values) => {
    const value = parseFloat(values[0]);
    effectLevelValue.value = value;

    if (currentEffect !== 'none') {
      applyEffect(value);
    }
  });
};

const resetEffects = () => {
  currentEffect = 'none';
  imageUploadEffectLevel.style.display = 'none';
  imagePreview.style.filter = 'none';

  const config = effectConfig.none;
  slider.updateOptions({
    range: {
      min: config.from,
      max: config.to
    },
    start: config.to,
    step: config.step
  });

  slider.set(config.to);
  effectLevelValue.value = config.to;

  const noneRadio = document.querySelector('.effects__radio[value="none"]');
  if (noneRadio) {
    noneRadio.checked = true;
  }
};

const initSlider = () => {
  imageUploadEffectLevel.style.display = 'none';
  effectsList.addEventListener('change', changeEffectList);
  sliderUpdate();
};

export { initSlider, resetEffects };
