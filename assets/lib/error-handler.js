export default function handleError (response) {
  const { status, statusText, url} = response;
  console.error(
    `
      Произошла ошибка:
      - Ответ сервера: ${statusText}
      - Код ответа: ${status}
      - Запрашиваемый адрес: ${url}
    `
  );
}
