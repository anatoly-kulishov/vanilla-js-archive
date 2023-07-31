function fetchWithTimeout(promises, timeout, error) {
  // Создаем новый промис, который будет отклонен, если истекает время таймаута
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(error));
    }, timeout);
  });

  // Используем Promise.race() для выполнения всех промисов параллельно
  return Promise.race([...promises, timeoutPromise]);
}

const p1 = new Promise((r) => setTimeout(r, 1900, 'Promise 1 are resolved'));
const p2 = new Promise((r) => setTimeout(r, 2800, 'Promise 2 are resolved'));

fetchWithTimeout([p1, p2], 2000, 'Timeout error')
  .then((result) => console.log(result)) // Обработка успешного результата
  .catch((error) => console.error(error.message)); // Обработка ошибки таймаута
