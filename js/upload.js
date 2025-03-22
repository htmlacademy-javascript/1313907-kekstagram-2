import { isInputFocused, imageUploadValidator } from './validation.js';
import { resetScale} from './scale.js';
import { updateSlider } from './effect.js';
import { onEscKeydown } from './utils.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadContainer = document.querySelector('.img-upload');
const imageUploadInput = imageUploadContainer.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadContainer.querySelector('.img-upload__overlay');
const closeButton = imageUploadContainer.querySelector('.img-upload__cancel');

const onPreviewButtonClick = () => {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetScale();
  updateSlider('none');

  imageUploadForm.reset();
  imageUploadValidator.reset();
  imageUploadInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onPreviewButtonClick);
};

function onDocumentKeydown (evt) {
  const errorMessage = document.querySelector('.error');
  if (errorMessage && evt.key === 'Escape') {
    evt.stopPropagation();
    return;
  }
  if(!isInputFocused()) {
    onEscKeydown(evt, onPreviewButtonClick);
  }
}

const addImage = () => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onPreviewButtonClick);
};

imageUploadInput.addEventListener('change', () => {
  addImage();
});

export {onPreviewButtonClick};
