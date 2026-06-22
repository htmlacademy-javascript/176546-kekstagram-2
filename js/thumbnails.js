import { generatePhotos } from './data.js';

const createThumbnails = () => {
  const picturesElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const photos = generatePhotos();

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments;
    fragment.appendChild(photoElement);
  });

  picturesElement.appendChild(fragment);
};

export { createThumbnails };
