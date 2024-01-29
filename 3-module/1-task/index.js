function namify(users) {
  return users.reduce((acc, user) => {
    const {name} = user;

    if (typeof name === 'string') {
      acc.push(name);

      return acc;
    }
  }, [])
}

/*
function namify(users) {
  const result = [];

  for (let i = 0; i < users.length; i++) {
    const {name} = user;

    if (typeof name === 'string') {
      result.push(name);
    }
  }

  return result;
}
*/
