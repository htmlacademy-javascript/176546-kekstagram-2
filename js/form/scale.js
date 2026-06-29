const scaleControlValue = document.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

const MIN_SCALE = 25;
const STEP_SCALE = 25;
const MAX_SCALE = 100;

const onScaleControlSmallerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  const newScaleValue = Math.max(MIN_SCALE, currentValue - STEP_SCALE);

  scaleControlValue.value = `${newScaleValue}%`;
  preview.style.transform = `scale(${newScaleValue / MAX_SCALE})`;
};

const onScaleControlBiggerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);

  const newScaleValue = Math.min(MAX_SCALE, currentValue + STEP_SCALE);

  scaleControlValue.value = `${newScaleValue}%`;
  preview.style.transform = `scale(${newScaleValue / MAX_SCALE})`;
};

const initScale = () => {
  scaleControlSmaller.addEventListener('click', () => onScaleControlSmallerClick());
  scaleControlBigger.addEventListener('click', () => onScaleControlBiggerClick());
};

const resetScale = () => {
  scaleControlSmaller.removeEventListener('click', () => onScaleControlSmallerClick());
  scaleControlBigger.removeEventListener('click', () => onScaleControlBiggerClick());
};

export { initScale, resetScale };
