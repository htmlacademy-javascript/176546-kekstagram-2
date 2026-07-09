const ALERT_SHOW_TIME = 5000;

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

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, showMessage, debounce };
