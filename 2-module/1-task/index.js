function sumSalary(salaries) {
  let result = 0;

  for (const key in salaries) {
    const value = salaries[key];

    if (isNumber(value)) {
      result += value;
    }
  }

  return result;
}

function isNumber (value) {
  return typeof value === 'number' && isFinite(value);
}
