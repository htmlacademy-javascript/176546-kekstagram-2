const scaleControlValue = document.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

const MIN_SCALE = 25;
const STEP_SCALE = 25;
const MAX_SCALE = 100;

const setScale = (value) => {
  const clampedValue = Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
  scaleControlValue.value = `${clampedValue}%`;
  preview.style.transform = `scale(${clampedValue / MAX_SCALE})`;
};

const onScaleControlSmallerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(currentValue - STEP_SCALE);
};

const onScaleControlBiggerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(currentValue + STEP_SCALE);
};

const initScale = () => {
  setScale(MAX_SCALE);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
};

const resetScale = () => {
  setScale(MAX_SCALE);

  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
};

export { initScale, resetScale };
