
const checkString = (str, maxLength) => str.length <= maxLength;

const isPalindrome = (string) => {
  const words = string.replaceAll(' ', '').toLowerCase();

  let emptyString = '';
  for(let i = words.length - 1; i >= 0; i--) {
    emptyString += words[i];
  }

  return emptyString === words;
};

const getNumber = (str) => {
  const inputStr = str.toString();
  let result = '';
  for (let i = 0; i < inputStr.length; i++) {
    const letter = inputStr[i];
    const num = parseInt(letter, 10);
    if(!Number.isNaN(num)) {
      result += letter;
    }
  }
  return parseInt(result, 10);
};

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

export {getRandomArrayElement, getRandomInteger};
