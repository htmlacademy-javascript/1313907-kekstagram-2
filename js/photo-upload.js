const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFileField = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');

uploadFileField.addEventListener('change', () => {
  const file = uploadFileField.files[0];
  const fileType = file.type.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileType.endsWith(it));
  if (matches) {
    const fileUrl = URL.createObjectURL(file);
    imagePreview.src = fileUrl;
  }
});


