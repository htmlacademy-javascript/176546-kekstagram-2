const socialCommentElement = document.querySelector('.social__comments');

const createComments = (comments) => {
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

    socialCommentElement.appendChild(li);
  });

  return socialCommentElement;
};

export { createComments };
