const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');

// Регулярное выражение и валидаторы остаются такими же
const hashtagPattern = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/i;
const imageUploadValidator = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text'
});

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > 5) {
    return false;
  }
  const seenHashtags = new Set();
  for (const hashtag of hashtags) {
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }
    const lowerCaseHashtag = hashtag.toLowerCase();
    if (seenHashtags.has(lowerCaseHashtag)) {
      return false;
    }
    seenHashtags.add(lowerCaseHashtag);
  }
  return true;
};

const validateComment = (value) => {
  if (!value) {
    return true;
  }
  return value.length <= 140;
};

imageUploadValidator.addValidator(hashtagInput, validateHashtags, 'Хэштеги должны начинаться с #, содержать только буквы и цифры, быть уникальными, не длиннее 20 символов, максимум 5 хэштегов');
imageUploadValidator.addValidator(commentInput, validateComment, 'Комментарий не должен превышать 140 символов');

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (imageUploadValidator.validate()) {
    console.log('Форма валидна, можно отправлять');
  } else {
    console.log('Форма содержит ошибки');
  }
});


const isInputFocused = () => hashtagInput === document.activeElement || commentInput === document.activeElement;

export { imageUploadValidator, isInputFocused };
