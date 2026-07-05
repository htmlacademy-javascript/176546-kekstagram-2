const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (id, autoHide = false) => {
  const existingMessage = document.querySelector(`.${id}`);
  if (existingMessage) {
    existingMessage.remove();
  }

  const template = document.querySelector(`#${id}`);
  if (!template) {
    return;
  }

  const element = template.content.querySelector(`.${id}`).cloneNode(true);
  document.body.append(element);

  if (autoHide) {
    setTimeout(() => {
      if (element.parentNode) {
        element.remove();
      }
    }, ALERT_SHOW_TIME);
  }
};

export { getRandomInteger, getRandomArrayElement, isEscapeKey, showMessage };
