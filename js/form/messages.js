import {isEscapeKey, showMessage} from '../util.js';

const createModalManager = (modalType, buttonSelector) => {
  const modalClassName = modalType;
  const buttonClass = buttonSelector;

  const closeModal = () => {
    const modal = document.querySelector(`.${modalClassName}`);
    if (modal) {
      // eslint-disable-next-line no-use-before-define
      document.removeEventListener('keydown', handleKeydown);
      // eslint-disable-next-line no-use-before-define
      document.removeEventListener('click', handleOutsideClick);

      const button = document.querySelector(buttonClass);
      if (button) {
        // eslint-disable-next-line no-use-before-define
        button.removeEventListener('click', handleButtonClick);
      }

      modal.remove();
    }
  };

  const handleKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  };

  const handleOutsideClick = (evt) => {
    const modal = document.querySelector(`.${modalClassName}`);
    if (modal && evt.target === modal) {
      closeModal();
    }
  };

  const handleButtonClick = () => {
    closeModal();
  };

  const addHandlers = () => {
    const button = document.querySelector(buttonClass);

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleOutsideClick);

    if (button) {
      button.addEventListener('click', handleButtonClick);
    }
  };

  const showModal = (isError = false) => {
    showMessage(modalClassName, isError);
    addHandlers();
  };

  return {
    showModal,
    closeModal,
  };
};

const successModal = createModalManager('success', '.success__button');
const errorModal = createModalManager('error', '.error__button');

const showSuccessMessage = () => successModal.showModal(false);
const showErrorMessage = () => errorModal.showModal(false);

export {showSuccessMessage, showErrorMessage};
