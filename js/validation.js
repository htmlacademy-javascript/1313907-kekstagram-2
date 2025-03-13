const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');

const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;


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
  if (hashtags.length > MAX_HASHTAGS) {
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

const hashtagErrorMessages = {
  invalidHashtag: 'Хэштег должен начинаться с #, содержать только буквы и цифры, длина до 20 символов',
  tooManyHashtags: 'Нельзя указать больше 5 хэштегов',
  duplicateHashtag: 'Хэштеги не должны повторяться'
};

const getHashtagErrorMessage = () => hashtagErrorMessages[validateHashtags.lastError] || '';

const validateComment = (value) => {
  if (!value) {
    return true;
  }
  if (value.length > COMMENT_MAX_LENGTH) {
    validateComment.lastError = 'tooLongComment';
    return false;
  }
  return true;
};

const commentErrorMessages = {
  tooLongComment: 'Комментарий не должен превышать 140 символов'
};

const getCommentErrorMessage = () => commentErrorMessages[validateComment.lastError] || '';

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
