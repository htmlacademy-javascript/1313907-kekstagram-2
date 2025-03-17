const getData = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
    }
    return response.json();
  });

const sendData = (body) => fetch(
  'https://31.javascript.htmlacademy.pro/kekstagram',
  {
    method: 'POST',
    body
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла');
    }
  })
  .catch(() => {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  });

export { getData, sendData };
