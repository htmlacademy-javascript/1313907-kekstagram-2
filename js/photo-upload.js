const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFileField = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');

const isValidFileType = (file) => FILE_TYPES.some((type) => file.type.toLowerCase().endsWith(type));
const updatePreview = (file) => {
  imagePreview.src = URL.createObjectURL(file);
};

uploadFileField.addEventListener('change', () => {
  const file = uploadFileField.files[0];
  if (isValidFileType(file)) {
    updatePreview(file);
  }
});


