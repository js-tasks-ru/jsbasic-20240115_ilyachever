function filterRange(arr, a, b) {
  return arr.filter(number => {
    if (number >= a && number <= b) {
      return number;
    }
  })
}

/* Для тренировки while
function filterRange(arr, a, b) {
  let counter = 0;
  const result = [];

  while (counter <= arr.length) {
    const currentNumber = arr[counter];

    if (currentNumber >= a && currentNumber <= b) {
      result.push(currentNumber);
    }

    counter++;
  }

  return result;
}
*/
