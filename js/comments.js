const socialCommentElement = document.querySelector('.social__comments');
const showCountCommentElement = document.querySelector('.social__comment-shown-count');
const loadButton = document.querySelector('.comments-loader');

let allComments = [];
let currentIndex = 0;
const COMMENTS_PER_LOAD = 5;

const renderComments = (comments, append = false) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');

    li.classList.add('social__comment');
    img.classList.add('social__picture');
    p.classList.add('social__text');

    img.src = comment.avatar;
    img.alt = comment.alt;
    img.width = 35;
    img.height = 35;

    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);

    fragment.appendChild(li);
  });

  if (append) {
    socialCommentElement.appendChild(fragment);
  } else {
    socialCommentElement.innerHTML = '';
    socialCommentElement.appendChild(fragment);
  }

  const commentsElement = document.querySelectorAll('.social__comment');
  showCountCommentElement.textContent = String(commentsElement.length);
};

const loadMoreItems = () => {
  const nextComments = allComments.slice(
    currentIndex,
    currentIndex + COMMENTS_PER_LOAD
  );

  if (nextComments.length > 0) {
    renderComments(nextComments, true); // true = добавляем к существующим
    currentIndex += nextComments.length;
  }

  const remaining = allComments.length - currentIndex;
  loadButton.classList.toggle('hidden', remaining <= 0);
};

const initComments = (comments) => {
  allComments = comments;
  currentIndex = 0;

  const initialComments = allComments.slice(0, COMMENTS_PER_LOAD);
  renderComments(initialComments, false);
  currentIndex = initialComments.length;

  loadButton.addEventListener('click', loadMoreItems);

  const remaining = allComments.length - currentIndex;
  loadButton.classList.toggle('hidden', remaining <= 0);
};

export { initComments };

