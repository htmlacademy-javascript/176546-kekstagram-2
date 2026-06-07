function checkString(string, maxLength) {
  return string.length <= maxLength;
}

function checkPalindrome(string) {
  const normaliseString = string.toUpperCase().replaceAll(' ', '');
  let newString = '';

  for (let i = normaliseString.length - 1; i >= 0; i--) {
    newString += normaliseString[i];
  }

  return newString === normaliseString;
}

function checkNumber(string) {
  let newString = '';

  string = string.isNaN ? parseInt(string).toString() : string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    newString += parseInt(string[i]) >= 0 ? parseInt(string[i]) : '';
  }

  return parseInt(newString);
}
