const effectLevelValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imageUploadEffectLevel = document.querySelector('.img-upload__effect-level');

let currentEffect = 'none';

const effectConfig = {
  none: { filter: 'none', range: { min: 0, max: 1 }, step: 0.01, unit: '' },
  chrome: { filter: 'grayscale', range: { min: 0, max: 1 }, step: 0.01, unit: '' },
  sepia: { filter: 'sepia', range: { min: 0, max: 1 }, step: 0.01, unit: '' },
  marvin: { filter: 'invert', range: { min: 0, max: 100 }, step: 1, unit: '%' },
  phobos: { filter: 'blur', range: { min: 0, max: 3 }, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', range: { min: 1, max: 3 }, step: 0.01, unit: '' }
};

const formatValue = (value, config) => config.step >= 1 ? Math.round(value) : Math.round(value * 100) / 100;

const slider = noUiSlider.create(sliderContainer, {
  range: effectConfig.none.range,
  start: effectConfig.none.range.max,
  step: effectConfig.none.step,
  connect: 'lower',
  format: {
    to: (value) => {
      const config = effectConfig[currentEffect];
      return formatValue(value, config);
    },
    from: (value) => parseFloat(value)
  }
});


const updateSlider = (config, setValue = true) => {
  slider.updateOptions({
    range: config.range,
    start: config.range.max,
    step: config.step
  });

  if (setValue) {
    slider.set(config.range.max);
    effectLevelValue.value = config.range.max;
  }
};

const applyEffect = (value) => {
  if (currentEffect === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  const config = effectConfig[currentEffect];
  const formattedValue = formatValue(value, config);
  imagePreview.style.filter = `${config.filter}(${formattedValue}${config.unit})`;
};

const onEffectListChange = (evt) => {
  currentEffect = evt.target.value;
  const config = effectConfig[currentEffect];

  if (currentEffect === 'none') {
    imageUploadEffectLevel.style.display = 'none';
    imagePreview.style.filter = 'none';
  } else {
    imageUploadEffectLevel.style.display = 'block';
    updateSlider(config);
    applyEffect(config.range.max);
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
  updateSlider(config);

  const noneRadio = document.querySelector('.effects__radio[value="none"]');
  if (noneRadio) {
    noneRadio.checked = true;
  }
};

const initSlider = () => {
  imageUploadEffectLevel.style.display = 'none';
  effectsList.addEventListener('change', onEffectListChange);
  sliderUpdate();
};

export { initSlider, resetEffects };
