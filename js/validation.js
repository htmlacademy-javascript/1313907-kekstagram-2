const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');

// Регулярное выражение и валидаторы
const hashtagPattern = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/i;
const imageUploadValidator = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error'
});

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  if (hashtags.length > 5) {
    validateHashtags.lastError = 'tooManyHashtags';
    return false;
  }
  const seenHashtags = new Set();
  for (const hashtag of hashtags) {
    if (!hashtagPattern.test(hashtag)) {
      validateHashtags.lastError = 'invalidHashtag';
      return false;
    }
    const lowerCaseHashtag = hashtag.toLowerCase();
    if (seenHashtags.has(lowerCaseHashtag)) {
      validateHashtags.lastError = 'duplicateHashtag';
      return false;
    }
    seenHashtags.add(lowerCaseHashtag);
  }
  return true;
};

const getHashtagErrorMessage = () => {
  switch (validateHashtags.lastError) {
    case 'invalidHashtag':
      return 'Хэштег должен начинаться с #, содержать только буквы и цифры, длина до 20 символов';
    case 'tooManyHashtags':
      return 'Нельзя указать больше 5 хэштегов';
    case 'duplicateHashtag':
      return 'Хэштеги не должны повторяться';
    default:
      return '';
  }
};

const validateComment = (value) => {
  if (!value) {
    return true;
  }
  if (value.length > 140) {
    validateComment.lastError = 'tooLongComment';
    return false;
  }
  return true;
};

const getCommentErrorMessage = () => {
  if (validateComment.lastError === 'tooLongComment') {
    return 'Комментарий не должен превышать 140 символов';
  }
  return '';
};

imageUploadValidator.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);
imageUploadValidator.addValidator(commentInput, validateComment, getCommentErrorMessage);

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
