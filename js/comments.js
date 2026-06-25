const socialCommentsElement = document.querySelector('.social__comments');
const showCountCommentElement = document.querySelector('.social__comment-shown-count');
const loadButton = document.querySelector('.comments-loader');

const COMMENTS_PER_LOAD = 5;

let allComments = [];
let currentIndex = 5;

const renderComment = (comment) => {
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

  return li;
};

const renderComments = ({comments, addToExisting = false}) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const liItem = renderComment(comment);

    fragment.appendChild(liItem);
  });

  if (addToExisting) {
    socialCommentsElement.appendChild(fragment);
  } else {
    socialCommentsElement.innerHTML = '';
    socialCommentsElement.appendChild(fragment);
  }

  showCountCommentElement.textContent = String(currentIndex);
};

const onLoadMoreClick = () => {
  const nextComments = allComments.slice(
    currentIndex,
    currentIndex + COMMENTS_PER_LOAD
  );

  if (nextComments.length > 0) {
    currentIndex += nextComments.length;
    renderComments({ comments: nextComments, addToExisting: true });
  }

  const restCommentsLength = allComments.length - currentIndex;

  if (restCommentsLength <= 0) {
    loadButton.classList.add('hidden');
    loadButton.removeEventListener('click', onLoadMoreClick);
  }
};

const initComments = (comments) => {
  allComments = comments;
  currentIndex = 5;

  const initialComments = allComments.slice(0, COMMENTS_PER_LOAD);
  currentIndex = Math.min(initialComments.length, 5);
  renderComments({ comments: initialComments });

  const restCommentsLength = allComments.length - currentIndex;

  if (restCommentsLength > 0) {
    loadButton.addEventListener('click', onLoadMoreClick);
    loadButton.classList.remove('hidden');
  } else {
    loadButton.classList.add('hidden');
  }
};

export { initComments };

