/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;

  constructor(rows) {
    this._rows = rows || [];

    this.elem = this.#createTable();
  }

  #createCell(value = '') {
    const cell = document.createElement('td');
    cell.textContent = value;

    return cell;
  }

  #createDeleteButton() {
    return `<td><button>X</button></td>`;
  }

  #createRow(rowData) {
    const row = document.createElement('tr');

    for (const value of Object.values(rowData)) {
      row.appendChild(this.#createCell(value));
    }

    row.insertAdjacentHTML('beforeend', this.#createDeleteButton());

    return row;
  }

  #createTable() {
    const table = document.createElement('table');
    const tableTemplate = `
    <table>
      <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
    `;

    table.insertAdjacentHTML('beforeend', tableTemplate);

    this._rows.forEach((row) => {
      table.tBodies[0].append(this.#createRow(row));
    });

    table.addEventListener('click', ({target}) => {
      if (target.tagName === 'BUTTON') {
        target.closest('tr').remove();
      }
    });

    return table;
  }
}
