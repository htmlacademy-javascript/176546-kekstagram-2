import { initComments } from './comments.js';

const urlElement = document.querySelector('.big-picture__img img');
const likesElement = document.querySelector('.likes-count');
const descriptionElement = document.querySelector('.social__caption');
const totalCountCommentElement = document.querySelector('.social__comment-total-count');

const createBigPicture = (element) => {
  urlElement.src = element.url;
  likesElement.textContent = element.likes;
  descriptionElement.textContent = element.description;
  totalCountCommentElement.textContent = String(element.comments.length);

  initComments(element.comments);
};

export { createBigPicture };
