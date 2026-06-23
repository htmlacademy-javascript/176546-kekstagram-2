import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const createModalEvents = (arr, func) => {
  pictures.addEventListener('click', (evt) => {
    openUserModal();
    if (evt.target.hasAttribute('data-id')) {
      const targetElement = Array.from(arr).find((el) => Number(el.id) === Number(evt.target.dataset.id));
      if (targetElement) {
        func(targetElement);
      }
    }
  });
};

bigPictureCancel.addEventListener('click', () => {
  closeUserModal();
});

export { createModalEvents };
