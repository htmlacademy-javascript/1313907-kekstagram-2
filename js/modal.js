
const mainTag = document.querySelector('main');
const modalWindow = document.querySelector('.big-picture');
const closeButton = modalWindow.querySelector('.big-picture__cancel');
const modalImage = modalWindow.querySelector('.big-picture__img');
const modalImageLikes = modalWindow.querySelector('.likes-count');
const commentShownCount = modalWindow.querySelector('.social__comment-shown-count');
const commentTotalCount = modalWindow.querySelector('.social__comment-total-count');
const commentsList = modalWindow.querySelector('.social__comments');

mainTag.addEventListener('click', (evt) => {
  if(evt.target.className === 'picture__img') {
    openPhotoModal(evt);
  }
});

closeButton.addEventListener('click', () => {
  closePhotoModal();
});

const openPhotoModal = (image) => {
  modalWindow.classList.remove('hidden');
  createImage(image);
};

const closePhotoModal = () => {
  modalWindow.classList.add('hidden');
};

const createImage = (image) => {
  modalImage.children[0].src = image.target.src;
  modalImageLikes.textContent = image.target.nextElementSibling.lastElementChild.textContent;
  commentShownCount.textContent = '3';
  commentTotalCount.textContent = image.target.nextElementSibling.firstElementChild.textContent;
};

export {createComments};
