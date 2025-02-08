
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

