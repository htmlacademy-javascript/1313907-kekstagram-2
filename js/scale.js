const STEP_VALUE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');
const decreaseButton = document.querySelector('.scale__control--smaller');
const increaseButton = document.querySelector('.scale__control--bigger');

const getScaleValue = () => {
  const value = parseInt(scaleValue.value, 10);
  return isNaN(value) ? MAX_SCALE : value;
};

const updateScale = (newValue) => {
  scaleValue.value = `${newValue}%`;
  imageUploadPreview.style.transform = `scale(${newValue / 100})`;
};

const onDecreaseButtonClick = () => {
  const currentValue = getScaleValue();
  const newValue = Math.max(currentValue - STEP_VALUE, MIN_SCALE);
  updateScale(newValue);
};

const onIncreaseButtonClick = () => {
  const currentValue = getScaleValue();
  const newValue = Math.min(currentValue + STEP_VALUE, MAX_SCALE);
  updateScale(newValue);
};

const resetScale = () => {
  updateScale(MAX_SCALE);
};

decreaseButton.addEventListener('click', onDecreaseButtonClick);
increaseButton.addEventListener('click', onIncreaseButtonClick);

export { resetScale, MAX_SCALE };
