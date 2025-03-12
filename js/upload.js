const imageUploadContainer = document.querySelector('.img-upload');
const imageUploadInput = imageUploadContainer.querySelector('.img-upload__input');
const imageUploadOverlay = imageUploadContainer.querySelector('.img-upload__overlay');
const imagePreview = imageUploadContainer.querySelector('.img-upload__preview');
const submitButton = imageUploadContainer.querySelector('.img-upload__submit');

const addImage = (image) => {
  imageUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

imageUploadInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  addImage(evt.target.files[0]); // Возвращаем выбранный файл
});

export default 'upload.js';
