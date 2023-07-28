function promiseAll(promises) {
  // Возвращаем новый промис
  return new Promise((resolve, reject) => {
    // Инициализируем массив для хранения результатов промисов
    const results = [];
    // Счетчик завершенных промисов
    let completedPromises = 0;

    // Проходим по массиву промисов
    for (let i = 0; i < promises.length; i++) {
      // Добавляем обработчики для успешного выполнения промиса
      promises[i]
        .then((result) => {
          // Сохраняем результат промиса в массив results
          results[i] = result;
          // Увеличиваем счетчик завершенных промисов
          completedPromises++;

          // Если все промисы успешно завершены, вызываем resolve с результатами
          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        // Добавляем обработчики для отклоненных промисов
        .catch((error) => {
          // Если хотя бы один промис отклонен, вызываем reject с ошибкой
          reject(error);
        });
    }

    // Обрабатываем случай, когда переданный массив промисов пустой
    if (promises.length === 0) {
      resolve(results);
    }
  });
}
