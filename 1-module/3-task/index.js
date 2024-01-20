function ucFirst(str) {
  if (!str) return str;

  str = str.trim();
  const firstSymbolInUpperCase = str.charAt(0).toUpperCase();
  const stringWithoutFirstLetter = str.slice(1);

  return firstSymbolInUpperCase + stringWithoutFirstLetter;
}
