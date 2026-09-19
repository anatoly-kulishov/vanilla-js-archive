/**
 * Что выведет в консоль следующий код?
 */

Promise.resolve(1)
    // Старт: промис сразу с значением 1

    .then((x) => x + 1)
    // x = 1 → возвращаем 2. Цепочка идёт дальше успешно со значением 2

    .then((x) => {
        throw x;
    })
    // x = 2 → бросаем ошибку со значением 2.
    // Следующий then ПРОПУСКАЕТСЯ, управление уходит в catch

    .then((x) => console.log(x))
    // Сюда НЕ зайдём, потому что предыдущий шаг rejected

    .catch((err) => console.log(err)) // выведет: 2
    // Ловим ошибку 2, печатаем её.
    // console.log возвращает undefined.
    // catch НЕ пробросил ошибку дальше → цепочка снова fulfilled(undefined)

    .then((x) => Promise.resolve(x))
    // x = undefined → возвращаем Promise.resolve(undefined)
    // Это всё ещё успех со значением undefined

    .catch((err) => console.log(err))
    // Ошибки нет → этот catch пропускается

    .then((x) => console.log(x)); // выведет: undefined
    // x = undefined → печатаем undefined

// Итого в консоли:
// 2
// undefined
