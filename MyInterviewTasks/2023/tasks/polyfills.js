/** (Array.prototype.myCall) */
Function.prototype.myCall = function(obj, ...args) {
  obj.that = this
  obj.that(...args)
};
/** (Array.prototype.map) */
Array.prototype.myMap = function(callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
    // Вызываем переданную функцию обратного вызова для текущего элемента массива
    // и добавляем результат в новый массив
    newArray.push(callback(this[i], i, this));
  }

  return newArray;
};
/** (Array.prototype.some) */
Array.prototype.mySome = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true; // Возвращаем true, если элемент удовлетворяет условию
    }
  }

  return false; // Если ни один элемент не удовлетворяет условию, возвращаем false
};
/** (Array.prototype.filter) */
Array.prototype.myFilter = function(callback) {
  const filteredArray = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      filteredArray.push(this[i]); // Добавляем элемент в новый массив, если он удовлетворяет условию
    }
  }

  return filteredArray;
};
/** (Array.prototype.reduce) */
Array.prototype.myReduce = function(callback, initialValue) {
  // Проверяем, является ли переданный колбэк действительно функцией
  if (typeof callback !== "function") {
    throw new TypeError("Колбэк должен быть функцией");
  }

  // Проверяем, является ли массив пустым, и нет ли начального значения
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("Пустой массив без начального значения для reduce");
  }

  // Начальный аккумулятор и индекс
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  // Проходим по массиву и обновляем аккумулятор
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  // Возвращаем итоговый результат
  return accumulator;
};
/** ************************** Promise ************************** */
/** (Promise.all) */
Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
        const results = []; // Массив для хранения результатов промисов
        let completedPromises = 0; // Счетчик завершенных промисов

        if (promises.length === 0) {
            resolve(results);
        }

        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then(result => {
                    results[i] = result; // Сохраняем результат промиса в массив
                    completedPromises++; // Увеличиваем счетчик завершенных промисов

                    if (completedPromises === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => reject(error));
        }
    });
}
/** (Promise.race) */
function myPromiseRace(promises) {
  // Возвращаем новый промис
  return new Promise((resolve, reject) => {
    // Функция обратного вызова для обработки успешного выполнения промиса
    function handleResolve(result) {
      resolve(result); // Возвращаем результат первого успешно выполненного промиса
    }

    // Функция обратного вызова для обработки отклонения промиса
    function handleReject(error) {
      reject(error); // Возвращаем ошибку первого отклоненного промиса
    }

    // Итерируемся по всем промисам и навешиваем обработчики на каждый из них
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then(handleResolve)
        .catch(handleReject);
    }

    // Если массив промисов пустой, сразу отклоняем промис с ошибкой
    if (promises.length === 0) {
      reject(new Error("No promises provided"));
    }
  });
}
