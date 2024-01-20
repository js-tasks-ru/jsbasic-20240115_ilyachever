function truncate(str, maxlength) {
  if (str.length <= maxlength) return str;

  str = str.trim();
  const endSymbol = "…";
  const truncateString = str.slice(0, maxlength - 1);

  return truncateString + endSymbol;
}
