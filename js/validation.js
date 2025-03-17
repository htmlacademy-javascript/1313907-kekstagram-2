import { sendData} from './api';

const MAX_HASHTAGS = 5;
const COMMENT_MAX_LENGTH = 140;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправляю...'
};

const imageUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('#upload-submit');
const hashtagPattern = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/i;
const errorDataMessageTemplate = document.querySelector('#data-error').content;
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

const messageFragment = document.createDocumentFragment();

const addSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  messageFragment.append(successMessage);
  document.body.append(messageFragment);

  const successButton = document.querySelector('.success__button');
  const successElement = document.querySelector('.success');
  const successElementModal = successElement.querySelector('.success__inner');

  const onClickButton = () => {
    successElement.remove();
    successButton.removeEventListener('click', onClickButton);
  };

  const onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      successElement.remove();
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };

  const onClickOverlay = (evt) => {
    if(successElement.className === 'success' && !successElementModal.contains(evt.target)) {
      successElement.remove();
      document.removeEventListener('click', onClickOverlay);
    }
  };

  successButton.addEventListener('click', onClickButton);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onClickOverlay);
};

const addErrorDataMessage = () => {
  const errorMessage = errorDataMessageTemplate.cloneNode(true);
  messageFragment.append(errorMessage);
  document.body.append(messageFragment);
  setTimeout(() => {
    const errorElement = document.querySelector('.data-error');
    errorElement.remove();
  }, 5000);
};

const addErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  messageFragment.append(errorMessage);
  document.body.append(messageFragment);

  const errorElement = document.querySelector('.error');
  const errorButton = errorElement.querySelector('.error__button');
  const errorInner = errorElement.querySelector('.error__inner');

  const onClickButton = () => {
    errorElement.remove();
    errorButton.removeEventListener('click', onClickButton);
  };
  const onEscapeKeydown = (evt) => {
    if (evt.key === 'Escape') {
      errorElement.remove();
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };
  const onClickOverlay = (evt) => {
    if (!errorInner.contains(evt.target)) {
      errorElement.remove();
      document.removeEventListener('click', onClickOverlay);
    }
  };

  errorButton.addEventListener('click', onClickButton);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onClickOverlay);
};

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
  submitButton.textContent = SubmitButtonText.IDLE;
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

export { imageUploadValidator, isInputFocused, setImageFormSubmit, addErrorDataMessage};
