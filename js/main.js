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

const COMENTATOR_NAME = [
  'Иван',
  'Вован',
  'Костян',
  'Колян',
  'Армэн'
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromGetRandomInteger (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// const getArrayComments = (el) => {
//   const fullComments = [];
//   for(let i = 0; i <= el.length; i++) {
//     fullComments.push({
//     });
//   }
//   return fullComments;
// };

const createArrayComments = () => {
  const quantity = getRandomInteger(0, 30);
  const arrayComment = [];
  if(quantity !== 0) {
    for(let i = 1; i <= quantity; i++) {
      arrayComment.push({
        id: getRandomInteger(1, 10000),
        avatar: `img/avatar-{{${getRandomInteger(1, 6)}}.svg`,
        message: `${getRandomArrayElement(COMMENT_MESSAGE)}, ${getRandomArrayElement(COMMENT_MESSAGE)}`,
        name: getRandomArrayElement(COMENTATOR_NAME)
      });
    }
    return arrayComment;
  }
  return '';
};

const createImage = () => {
  const randomId = createRandomIdFromGetRandomInteger(1, 25);
  const randomUrl = createRandomIdFromGetRandomInteger(1, 25);
  return {
    id: randomId(),
    url: `photos/{{${ randomUrl() }}}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTION),
    likes: getRandomInteger(15, 200),
    comments: createArrayComments()
  };
};

const photoData = Array.from({length: 25}, createImage);

console.log(photoData);


