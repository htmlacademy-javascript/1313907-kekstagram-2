const imageUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('.effects__radio');

const effects = {
  none: { filter: () => '', min: 0, max: 100, step: 1 },
  chrome: { filter: (intensity) => `grayscale(${parseFloat(intensity).toFixed(1)})`, min: 0, max: 1, step: 0.1 },
  sepia: { filter: (intensity) => `sepia(${parseFloat(intensity).toFixed(1)})`, min: 0, max: 1, step: 0.1 },
  marvin: { filter: (intensity) => `invert(${parseFloat(intensity).toFixed(0)}%)`, min: 0, max: 100, step: 1 },
  phobos: { filter: (intensity) => `blur(${parseFloat(intensity).toFixed(1)}px)`, min: 0, max: 3, step: 0.1 },
  heat: { filter: (intensity) => `brightness(${parseFloat(intensity).toFixed(1)})`, min: 1, max: 3, step: 0.1 }
};

noUiSlider.create(effectLevelSlider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower'
});

const updateEffect = (effect, value) => {
  imageUploadPreview.style.filter = effects[effect].filter(value);
  effectLevelValue.value = value;
};

const updateSlider = (effect) => {
  const config = effects[effect];
  const slider = effectLevelSlider.noUiSlider;

  if (effect === 'none') {
    effectLevelContainer.classList.add('hidden');
    imageUploadPreview.style.filter = 'none';
    effectLevelValue.value = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
    slider.updateOptions({
      range: { min: config.min, max: config.max },
      step: config.step,
      start: config.max
    });
    updateEffect(effect, config.max);
  }
};

effectRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    updateSlider(radio.value);
  });
});

effectLevelSlider.noUiSlider.on('update', (values) => {
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  if (selectedEffect !== 'none') {
    updateEffect(selectedEffect, values[0]);
  }
});

updateSlider('none');

export {updateSlider};
