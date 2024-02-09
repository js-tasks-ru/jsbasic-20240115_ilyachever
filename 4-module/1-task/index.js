function makeFriendsList(friends) {
  const list = document.createElement('ul');

  friends.forEach(friend => {
    const { firstName, lastName } = friend;
    const templateString = `${firstName} ${lastName}`;
    const itemTemplate = document.createElement('li');

    itemTemplate.textContent = templateString;
    list.append(itemTemplate);
  });

  return list;
}
