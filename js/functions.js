
const checkString = (string, length) => {
  const stringLength = string.length;

  return stringLength <= length;
};

const isPalindrome = (string) => {
  const words = string.replaceAll(' ', '').toLowerCase();

  let emptyString = '';

  for(let i = words.length; i >= 0; i--) {
    emptyString += words[i];
  }

  return emptyString.slice(9) === words;
};
