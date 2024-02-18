function highlight(table) {
  const tHeadKeys = {};

  const setStatus = (element) => {
    const parentElement = element.parentElement;
    const isAvailable = element.dataset.available;
    const statusVariants = {
      true: 'available',
      false: 'unavailable'
    };

    parentElement.classList.add(statusVariants[isAvailable]);

    if (!('available' in element.dataset)) parentElement.setAttribute('hidden', true);
  };

  const setGender = (element) => {
    const parentElement = element.parentElement;
    const currentGender = element.textContent.trim().toLowerCase();
    const genderVariants = {
      m: 'male',
      f: 'female'
    };

    parentElement.classList.add(genderVariants[currentGender]);
  };

  const isAdult = (age) => {
    return age > 18;
  };

  const setAge = (element) => {
    const parentElement = element.parentElement;
    const currentAge = parseFloat(element.textContent.trim());

    if (!isFinite(currentAge)) return;

    if (!isAdult(currentAge)) parentElement.style.textDecoration = 'line-through';
  };

  const getValidKeysFromTHead = (table, obj) => {
    Array.from(table.tHead.rows[0].cells).forEach((cell, i) => {
      const key = cell.textContent.trim().toLowerCase();
      obj[key] = i;
    });
  };

  getValidKeysFromTHead(table, tHeadKeys);

  Array.from(table.tBodies[0].rows).forEach(row => {
    const cells = row.cells;
    const cellStatus = cells[tHeadKeys.status];
    const cellGender = cells[tHeadKeys.gender];
    const cellAge = cells[tHeadKeys.age];

    setStatus(cellStatus);
    setGender(cellGender);
    setAge(cellAge);
  });
}
