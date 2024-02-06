function makeDiagonalRed(table) {
  Array.from(table.rows).forEach(tr => {
    const trIndex = tr.rowIndex;
    tr.children[trIndex].style.backgroundColor = 'red';
  });
}
