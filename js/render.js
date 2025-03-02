const userPictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const listFragment = document.createDocumentFragment();

const addPictures = (pictureArray) => {
  pictureArray.forEach(({ url, description, likes, comments }) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = url;
    pictureItem.querySelector('.picture__img').alt = description;
    pictureItem.querySelector('.picture__likes').textContent = likes;
    pictureItem.querySelector('.picture__comments').textContent = comments.length;
    listFragment.append(pictureItem);
  });
  userPictures.append(listFragment);
};

export {addPictures};
