function camelize(str) {
  return str.trim()
            .split('-')
            .reduce((acc, word, index) => {
              acc += index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);

              return acc;
            }, '')
}
