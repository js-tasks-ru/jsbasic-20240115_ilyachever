function showSalary(users, age) {
  const specialSymbol = '\n';

  const isValid = (userAge, age) => userAge <= age;

  return users
    .filter((user) => isValid(user.age, age))
    .reduce((acc, user, index, array) => {
      const {name, balance} = user;
      acc += `${name}, ${balance}${index < array.length - 1 ? specialSymbol : ''}`;

      return acc;
    }, '');
}
