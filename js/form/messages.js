import {isEscapeKey} from '../util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const showPopup = (node) => {
  const button = node.querySelector('button');

  const closeModal = () => {
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);

    node.remove();
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onDocumentClick(evt) {
    if (evt.target === node) {
      closeModal();
    }
  }

  function onButtonClick() {
    closeModal();
  }

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
  button.addEventListener('click', onButtonClick);

  document.body.append(node);
};

const showSuccessMessage = () => {
  const successNode = successTemplate.cloneNode(true);

  showPopup(successNode);
};

const showErrorMessage = () => {
  const errorNode = errorTemplate.cloneNode(true);

  showPopup(errorNode);
};

export {showSuccessMessage, showErrorMessage};
