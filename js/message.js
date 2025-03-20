const TIMEOUT_DELAY = 5000;

const errorDataMessageTemplate = document.querySelector('#data-error').content;
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const messageFragment = document.createDocumentFragment();


const addErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  messageFragment.append(errorMessage);
  document.body.append(messageFragment);

  const errorButton = document.querySelector('.error__button');
  const errorElement = document.querySelector('.error');

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
      evt.stopPropagation();
      errorElement.remove();
      document.removeEventListener('click', onClickOverlay);
    }
  };

  errorButton.addEventListener('click', onClickButton);
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
  }, TIMEOUT_DELAY);
};

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

export {addErrorDataMessage, addErrorMessage, addSuccessMessage};
