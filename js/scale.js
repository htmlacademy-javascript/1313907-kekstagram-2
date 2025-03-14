const scaleValue = document.querySelector('.scale__control--value');
const decreaseButton = document.querySelector('.scale__control--smaller');
const increaseButton = document.querySelector('.scale__control--bigger');

const STEP_VALUE = 25;

const calculateScale = (evt) => {
  console.log(evt.target.classList);
};

decreaseButton.addEventListener('click', (evt) => {
  calculateScale(evt);
});

increaseButton.addEventListener('click', (evt) => {
  calculateScale(evt);
});

export default 'scale.js';
