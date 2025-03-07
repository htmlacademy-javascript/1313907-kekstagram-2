import { getRandomArrayElement, getRandomInteger } from './functions';

const PHOTO_DESCRIPTION = [
  'Я и моя собака',
  'Вид из окна',
  'Мой обед',
  'Мой ужин',
  'Я простужен',
  'Я здоров'
];

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'

];

const AUTHOR = [
  'Иван',
  'Вован',
  'Костян',
  'Колян',
  'Армэн'
];

const Numbers = {
  BEFORE_COMMENT_NUMBER: 0,
  UNTIL_COMMENT_NUMBER: 30,
  BEFORE_LIKES: 15,
  UNTIL_LIKES: 200,
  BEFORE_AVATAR_IMAGE: 1,
  UNTIL_AVATAR_IMAGE: 6
};

const MAX_NUMBER = 10000;
const ARRAY_LENGTH = 25;

const createComment = () => ({
  id: getRandomInteger(1, MAX_NUMBER),
  avatar: `img/avatar-${getRandomInteger(Numbers.BEFORE_AVATAR_IMAGE, Numbers.UNTIL_AVATAR_IMAGE)}.svg`,
  message: `${getRandomArrayElement(COMMENT_MESSAGE)}, ${getRandomArrayElement(COMMENT_MESSAGE)}`,
  name: getRandomArrayElement(AUTHOR)
});

const createComments = () => {
  const quantity = getRandomInteger(Numbers.BEFORE_COMMENT_NUMBER, Numbers.UNTIL_COMMENT_NUMBER);
  const arrayComment = [];

  for (let i = 1; i <= quantity; i++) {
    arrayComment.push(createComment());
  }
  return arrayComment;
};

const createImage = (index) => ({
  id: index + 1,
  url: `photos/${ index + 1 }.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTION),
  likes: getRandomInteger(Numbers.BEFORE_LIKES, Numbers.UNTIL_LIKES),
  comments: createComments()
});


const createPhotoData = () => Array.from({length: ARRAY_LENGTH}, (_, index) =>
  createImage(index)
);

export {createPhotoData};
