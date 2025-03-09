// modal.js
const modalWindow = document.querySelector('.big-picture');
const closeButton = modalWindow.querySelector('.big-picture__cancel');
const modalImage = modalWindow.querySelector('.big-picture__img img');
const modalImageLikes = modalWindow.querySelector('.likes-count');
const commentShownCount = modalWindow.querySelector('.social__comment-shown-count');
const commentTotalCount = modalWindow.querySelector('.social__comment-total-count');
const commentsList = modalWindow.querySelector('.social__comments');
const socialCaption = modalWindow.querySelector('.social__caption');
const commentCountBlock = modalWindow.querySelector('.social__comment-count');
const commentsLoader = modalWindow.querySelector('.comments-loader');

// Функция создания элемента комментария
const createCommentElement = ({ avatar, name, message }) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  commentItem.append(img, text);
  return commentItem;
};

// Обработчик для клавиши Esc
const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closePhotoModal();
  }
};

// Функция закрытия модального окна
const closePhotoModal = () => {
  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  closeButton.removeEventListener('click', closePhotoModal);
};

// Функция открытия модального окна
const openPhotoModal = (pictureId, photos) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  if (!currentPhoto) {
    return;
  }

  modalWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Заполняем данными
  modalImage.src = currentPhoto.url;
  modalImageLikes.textContent = currentPhoto.likes;
  commentShownCount.textContent = currentPhoto.comments.length;
  commentTotalCount.textContent = currentPhoto.comments.length;
  socialCaption.textContent = currentPhoto.description;

  // Заполняем комментарии
  commentsList.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  currentPhoto.comments.forEach((comment) => {
    commentsFragment.append(createCommentElement(comment));
  });
  commentsList.append(commentsFragment);

  // Скрываем блоки
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Добавляем обработчики
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', closePhotoModal);
};

export { openPhotoModal };
