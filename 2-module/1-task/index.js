function sumSalary(salaries) {
  let result = 0;

  function isNumber (value) {
    return typeof value === 'number' && isFinite(value);
  }

  for (const key in salaries) {
    const value = salaries[key];

    if (isNumber(value)) {
      result += value;
    }
  }

  return result;
}
