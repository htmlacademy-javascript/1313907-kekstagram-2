import { openPhotoModal } from './modal';

const userPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const renderPictures = (pictures) => {
  const existingPictures = userPictures.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());

  const listFragment = document.createDocumentFragment();

const addPictures = (pictureArray) => {

  pictureArray.forEach(({id, url, description, likes, comments }) => {
    const pictureFragment = pictureTemplate.cloneNode(true);
    const pictureItem = pictureFragment.querySelector('.picture');

    pictureItem.dataset.pictureId = id;
    pictureItem.querySelector('.picture__img').src = url;
    pictureItem.querySelector('.picture__img').alt = description;
    pictureItem.querySelector('.picture__likes').textContent = likes;
    pictureItem.querySelector('.picture__comments').textContent = comments.length;
    listFragment.append(pictureItem);
  });

  userPictures.append(listFragment);

  userPictures.addEventListener('click', (evt) => {
    const currentPictureNode = evt.target.closest('.picture');

    if(currentPictureNode) {
      evt.preventDefault();
      openPhotoModal(currentPictureNode.dataset.pictureId, pictureArray);
    }
  });
};

export {renderPictures};
