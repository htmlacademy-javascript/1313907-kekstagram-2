const COUNT_STEP = 5;
const commentsCurrentCount = {
  count: 0
};
const commentsData = {
  comments: []
};

const modalWindow = document.querySelector('.big-picture');
const commentsCountBlock = modalWindow.querySelector('.social__comment-count');
const commentsLoader = modalWindow.querySelector('.comments-loader');
const commentsList = modalWindow.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');

//Отрисовывает часть комментариев
const renderNextComments = () => {
  const socialCommentFragment = document.createDocumentFragment();
  const renderedComments = commentsData.comments.slice(commentsCurrentCount.count, commentsCurrentCount.count + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + commentsCurrentCount.count;

  renderedComments.forEach(({avatar, name, message}) => {
    const socialComment = commentTemplate.cloneNode(true);

    socialComment.querySelector('.social__picture').src = avatar;
    socialComment.querySelector('.social__picture').alt = name;
    socialComment.querySelector('.social__text').textContent = message;

    socialCommentFragment.append(socialComment);
  });

  commentsList.append(socialCommentFragment);
  commentsCountBlock.firstChild.textContent = `${renderedCommentsLength} из `;
  commentsCountBlock.querySelector('.social__comment-total-count').textContent = commentsData.comments.length;

  if(renderedCommentsLength >= commentsData.comments.length) {
    commentsLoader.classList.add('hidden');
  }

  commentsCurrentCount.count += COUNT_STEP;
};

//Убирает комментарии
const clearComments = () => {
  commentsCurrentCount.count = 0;
  commentsList.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderNextComments);
};

//Отрисовывает комментарии
const renderComments = (currentPhotoComments) => {
  commentsList.innerHTML = '';
  commentsData.comments = currentPhotoComments;
  renderNextComments();

  commentsLoader.addEventListener('click', renderNextComments);
};

export {renderComments, clearComments};
