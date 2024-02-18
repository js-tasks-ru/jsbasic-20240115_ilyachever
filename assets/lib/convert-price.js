export default function convertPrice(price, currency, digits = 2) {
  return `${currency}${price.toFixed(digits)}`;
}
