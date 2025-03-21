const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFileField = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');


const isValidFileType = (file) => FILE_TYPES.some((type) => file.type.toLowerCase().endsWith(type));
const updatePreview = (file) => {
  const fileUrl = URL.createObjectURL(file);
  imagePreview.src = URL.createObjectURL(file);
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${fileUrl})`;
  });
};


uploadFileField.addEventListener('change', () => {
  const file = uploadFileField.files[0];
  if (isValidFileType(file)) {
    updatePreview(file);
  }
});


