import { sendData} from './api';
import { addSuccessMessage, addErrorMessage } from './message';

const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/i;

const SubmitButtonText = {
  PUBLIC: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('#upload-submit');

const isInputFocused = () => hashtagInput === document.activeElement || commentInput === document.activeElement;
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
    if (!HASHTAG_PATTERN.test(hashtag)) {
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
  invalidHashtag: 'Введён невалидный хэштег',
  tooManyHashtags: 'Превышено количество хэштегов',
  duplicateHashtag: 'Хэштеги повторяются'
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
  tooLongComment: 'Длина комментариев больше 140 символов'
};

const getCommentErrorMessage = () => commentErrorMessages[validateComment.lastError] || '';

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.PUBLIC;
};

const setImageFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (imageUploadValidator.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          addSuccessMessage();
        })
        .catch(() => {
          addErrorMessage();
        })
        .finally(unblockSubmitButton);
    }
  });
};

imageUploadValidator.addValidator(hashtagInput, validateHashtags, getHashtagErrorMessage);
imageUploadValidator.addValidator(commentInput, validateComment, getCommentErrorMessage);

export { imageUploadValidator, setImageFormSubmit, isInputFocused };
