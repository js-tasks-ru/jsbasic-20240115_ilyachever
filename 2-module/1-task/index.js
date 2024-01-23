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
  if (typeof value === 'number' && !isNaN(value) && isFinite(value)) return true;

  return false;
}
