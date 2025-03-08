
const modalWindow = document.querySelector('.big-picture');
console.log(modalWindow);
const mainTag = document.querySelector('main');
console.log(mainTag);


mainTag.addEventListener('click', (evt) => {
  if(evt.target.className === 'picture__img') {
    openPhotoModal(evt);
  }
});

const openPhotoModal = (image) => {

  console.log(image.target.nextElementSibling);
};

const closePhotoModal = () => {

};


export default 'modal.js';
