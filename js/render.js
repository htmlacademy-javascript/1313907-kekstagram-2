import { createPhotoData } from './data';

const userPictures = document.querySelector('.pictures');
const pictureData = createPhotoData();
const pictureTemplate = document.querySelector('#picture').content;
const listFragment = document.createDocumentFragment();

pictureData.forEach(({ url, description, likes, comments }) => {
  const pictureItem = pictureTemplate.cloneNode(true);
  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  listFragment.append(pictureItem);
});

userPictures.append(listFragment);

export {pictureTemplate};
