const imageUploadContainer = document.querySelector('.img-upload');
const imageUploadInput = imageUploadContainer.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadContainer.querySelector('.img-upload__overlay');
const closeButton = imageUploadContainer.querySelector('.img-upload__cancel');
const imagePreview = imageUploadContainer.querySelector('.img-upload__preview img');
const submitButton = imageUploadContainer.querySelector('.img-upload__submit');

// Обработчик для клавиши Esc
const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePreviewModal();
  }
};

const closePreviewModal = () => {


  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

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
