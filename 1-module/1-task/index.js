// while loop
function factorial(n) {
  if (n <= 1) return 1;

  let counter = n;
  while (n > 1) {
    counter *= n - 1;
    n--;
  }

  return counter;
}

// for loop
/*
function factorial(n) {
  if (n <= 1) return 1;

  let counter = 1;
  for (; n > 1; n--) {
    counter *= n;
  }

  return counter;
}
*/
