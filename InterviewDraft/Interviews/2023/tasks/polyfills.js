/** (Array.prototype.myCall) */
Function.prototype.myCall = function(obj, ...args) {
  obj.that = this
  obj.that(...args)
};
/** (Array.prototype.map) */
Array.prototype.myMap = function(callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
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
Array.prototype.myReduce = function(callback, initialValue = null) {
    if (!Array.isArray(this)) {
        throw new Error(`${this} is not an array`)
    }

    if (!(callback instanceof Function)) {
        throw new Error(`${callback} is not a function`)
    }

    let accum = initial;

    for (let i = 0; i < this.length; i++) {
        accum = callback(accum, this[i], i, this)
    }

    return accum
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
