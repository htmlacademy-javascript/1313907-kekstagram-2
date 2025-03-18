import { isInputFocused } from './validation.js';
import { resetScale} from './scale.js';
import { updateSlider } from './effect.js';
import { onEscKeydown } from './utils.js';

const imageUploadContainer = document.querySelector('.img-upload');
const imageUploadInput = imageUploadContainer.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadContainer.querySelector('.img-upload__overlay');
const closeButton = imageUploadContainer.querySelector('.img-upload__cancel');

const closePreviewModal = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  //Сбрасывает стиль, фильтр и устанавливает дефолтный масштаб фото
  resetScale();
  updateSlider('none');

  //Сбрасывает значение поля выбора файла
  imageUploadInput.value = '';

  // Удаляет обработчики
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closePreviewModal);
};

function onDocumentKeydown (evt) {
  if(!isInputFocused()) {
    onEscKeydown(evt, closePreviewModal);
  }
}

const addImage = () => {

  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавляет обработчики
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closePreviewModal);
};

imageUploadInput.addEventListener('change', () => {

  addImage();
});

export {closePreviewModal};
