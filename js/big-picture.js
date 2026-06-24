import { renderComments } from './comments.js';

const urlElement = document.querySelector('.big-picture__img img');
const likesElement = document.querySelector('.likes-count');
const descriptionElement = document.querySelector('.social__caption');
const showCountCommentElement = document.querySelector('.social__comment-shown-count');
const totalCountCommentElement = document.querySelector('.social__comment-total-count');
const socialCommentsElement = document.querySelector('.social__comments');

const createBigPicture = (element) => {
  urlElement.src = element.url;
  likesElement.textContent = element.likes;
  descriptionElement.textContent = element.description;
  totalCountCommentElement.textContent = String(element.comments.length);

  socialCommentsElement.innerHTML = '';

  const socialCommentElement = document.querySelectorAll('.social__comment');
  showCountCommentElement.textContent = String(socialCommentElement.length);
  renderComments(element.comments);
};

export { createBigPicture };
