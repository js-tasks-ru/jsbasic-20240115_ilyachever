function getMinMax(str) {
  let minValue = Infinity;
  let maxValue = -Infinity;

  const isNumber = value => !isNaN(value) && isFinite(value);

	return str.split(' ').reduce((_, value) => {
    if (isNumber(value)) {
      if (value > maxValue) {
        maxValue = +value;
      }

      if (value < minValue) {
        minValue = +value;
      }

      return {
        min: minValue,
        max: maxValue
      }
    }
  }, {})
}
