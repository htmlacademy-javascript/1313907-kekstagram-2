import { isInputFocused } from './validation.js';
import { resetScale, MAX_SCALE } from './scale.js';
const imageUploadContainer = document.querySelector('.img-upload');
const imageUploadInput = imageUploadContainer.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadContainer.querySelector('.img-upload__overlay');
const closeButton = imageUploadContainer.querySelector('.img-upload__cancel');

// Обработчик для клавиши Esc
const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (!isInputFocused()) {
      closePreviewModal();
    }
  }
};

const closePreviewModal = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  //Сбрасывает стиль и устанавливает дефолтное значение фото
  resetScale(MAX_SCALE);

  //Сбрасывает значение поля выбора файла
  imageUploadInput.value = '';

  // Удаляет обработчики
  document.removeEventListener('keydown', onEscKeydown);
  closeButton.removeEventListener('click', closePreviewModal);
};

const addImage = () => {

  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляет обработчики
  document.addEventListener('keydown', onEscKeydown);
  closeButton.addEventListener('click', closePreviewModal);
};

imageUploadInput.addEventListener('change', () => {

  addImage();
});

export default 'upload.js';
