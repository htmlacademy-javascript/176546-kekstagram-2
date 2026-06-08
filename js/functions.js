const isString = (str, maxLength) => str.length <= maxLength;

function isPalindrome(str) {
  const newString = str.replaceAll(' ', '').toLowerCase();
  const len = newString.length;

  if (len <= 1) {
    return true;
  }

  for (let i = 0; Math.floor(i < len / 2); i++) {
    if (newString[i] !== newString[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

function isNumber(str) {
  let newString = '';
  const normaliseString = str.toString();
  const len = normaliseString.length;

  for (let i = 0; i <= len - 1; i++) {
    const number = parseInt(normaliseString[i], 10);

    if (!number.isNaN && number >= 0) {
      newString += number;
    }
  }
  return parseInt(newString, 10);
}
