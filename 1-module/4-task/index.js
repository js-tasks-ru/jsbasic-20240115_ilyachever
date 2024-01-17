function checkSpam(str) {
  const spam = ['1xBet', 'XXX'];
  str = str.trim().toLowerCase();

  for (let i = 0; i < spam.length; i++) {
    const spamWordInLowerCase = spam[i].toLowerCase();
    if (str.includes(spamWordInLowerCase)) return true;
  }

  return false;
}
