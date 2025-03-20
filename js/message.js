import { onEscKeydown } from './utils.js';

const TIMEOUT_DELAY = 5000;

const errorDataMessageTemplate = document.querySelector('#data-error').content;
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;
const messageFragment = document.createDocumentFragment();

const showMessage = ({ template, mainSelector, buttonSelector, innerSelector, timeout = TIMEOUT_DELAY }) => {
  const message = template.cloneNode(true);
  messageFragment.append(message);
  document.body.append(messageFragment);

  const messageElement = document.querySelector(mainSelector);
  const closeButton = buttonSelector ? document.querySelector(buttonSelector) : null;

  function closeMessage() {
    messageElement.remove();
    if (closeButton) {
      closeButton.removeEventListener('click', onButtonClick);
    }
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onOverlayClick);
  }

  function onButtonClick(evt) {
    evt.stopPropagation();
    closeMessage();
  }

  function onDocumentKeydown(evt) {
    onEscKeydown(evt, () => {
      evt.stopPropagation();
      evt.preventDefault();
      closeMessage();
    });
  }

  function onOverlayClick(evt) {
    const innerElement = innerSelector ? messageElement.querySelector(innerSelector) : null;
    if (!innerElement || !innerElement.contains(evt.target)) {
      evt.stopPropagation();
      closeMessage();
    }
  }

  if (closeButton) {
    closeButton.addEventListener('click', onButtonClick);
  }
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOverlayClick);
  setTimeout(closeMessage, timeout);
};

const addErrorDataMessage = () => showMessage({
  template: errorDataMessageTemplate,
  mainSelector: '.data-error'
});

const addErrorMessage = () => showMessage({
  template: errorMessageTemplate,
  mainSelector: '.error',
  buttonSelector: '.error__button',
  innerSelector: '.error__inner'
});

const addSuccessMessage = () => showMessage({
  template: successMessageTemplate,
  mainSelector: '.success',
  buttonSelector: '.success__button',
  innerSelector: '.success__inner'
});

export { addErrorDataMessage, addErrorMessage, addSuccessMessage };
