const checkString = (str, maxLength) => str.length <= maxLength;

const isPalindrome = (str) => {
  const newString = str.replaceAll(' ', '').toLowerCase();

  if (newString.length <= 1) {
    return true;
  }

  for (let i = 0; i < Math.floor(newString.length / 2); i++) {
    if (newString[i] !== newString[newString.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

const extractNumbersFromString = (str) => {
  let newString = '';
  const normaliseString = str.toString();

  for (let i = 0; i <= normaliseString.length - 1; i++) {
    const number = parseInt(normaliseString[i], 10);

    if (!isNaN(number)) {
      newString += number;
    }
  }

  return parseInt(newString, 10);
};

checkString('Civic', 5);
isPalindrome('Civic');
extractNumbersFromString(2023);
