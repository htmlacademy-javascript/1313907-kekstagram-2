import { renderComments, clearComments } from './render-comments';

const modalWindow = document.querySelector('.big-picture');
const closeButton = modalWindow.querySelector('.big-picture__cancel');
const modalImage = modalWindow.querySelector('.big-picture__img img');
const modalImageLikes = modalWindow.querySelector('.likes-count');
const commentShownCount = modalWindow.querySelector('.social__comment-shown-count');
const commentTotalCount = modalWindow.querySelector('.social__comment-total-count');
const socialCaption = modalWindow.querySelector('.social__caption');


// Обработчик для клавиши Esc
const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePhotoModal();
  }
};

// Функция закрытия модального окна
const closePhotoModal = () => {
  clearComments();

  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // удаляет обработчики
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

  renderComments(currentPhoto.comments);

  // Добавляем обработчики
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', closePhotoModal);
};

export { openPhotoModal};
