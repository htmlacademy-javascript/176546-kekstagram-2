import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const pictures = document.querySelector('.pictures');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

const openUserModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUserModal () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onPicturesContainerClick = (evt, photos, cb) => {
  const pictureElement = evt.target.closest('.picture');

  if (!pictureElement || pictureElement.dataset.id) {
    return;
  }

  const targetElement = photos.find((el) => el.id === Number(pictureElement.dataset.id));

  if (!targetElement) {
    return;
  }

  openUserModal();
  cb(targetElement);
};

const setPictureListener = (photos, cb) => {
  pictures.addEventListener('click', (evt) => onPicturesContainerClick(evt, photos, cb));

  bigPictureCancel.addEventListener('click', () => closeUserModal());
};

export { setPictureListener };
