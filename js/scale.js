const scaleValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');
const decreaseButton = document.querySelector('.scale__control--smaller');
const increaseButton = document.querySelector('.scale__control--bigger');

const STEP_VALUE = 25;

const calculateScaleMinus = () => {
  if(parseInt(scaleValue.value, 10) < 50) {
    return true;
  } else {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - STEP_VALUE}%`;
    imageUploadPreview.style.transform = `scale(${parseInt(scaleValue.value, 10) / 100})`;
  }
};

const calculateScalePlus = () => {
  if(parseInt(scaleValue.value, 10) > 75) {
    return true;
  } else {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + STEP_VALUE}%`;
    imageUploadPreview.style.transform = `scale(${parseInt(scaleValue.value, 10) / 100})`;
  }
};

decreaseButton.addEventListener('click', () => {
  calculateScaleMinus();
});

increaseButton.addEventListener('click', () => {
  calculateScalePlus();
});

export default 'scale.js';
