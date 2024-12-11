/**
 * 1
 */
// const logger = {
//     mode: 'Dev',
//     check() {
//         console.log(`This is ${this.mode} mode`)
//     }
// }
//
// logger.check(); // => ? (1)
//
// const loggerCheck = logger.check();
// loggerCheck() // => ? (2)
//
// function execute(fn) {
//     return fn();
// }
//
// execute(logger.check) // => ? (3)

/**
 * 2
 */
// (function () {
//     // Функция, изменяющая данные и возвращающая другую функцию
//     function modifyItemData(price, platform) {
//         // Локальные изменения
//         price.rub = 5000;   // Изменение объекта по ссылке
//         platform = 'iOS';   // Локальная переменная
//         let isModified = true; // Локальная переменная
//
//         // Вложенная функция для вывода значений
//         function printItemData() {
//             console.log(price);      // {rub: 5000}
//             console.log(platform);   // iOS
//             console.log(isModified); // true
//         }
//
//         return printItemData; // Возвращаем вложенную функцию
//     }
//
//     // Исходные значения
//     let price = {rub: 5000}; // Объект
//     let platform = 'Android'; // Примитив
//     let isModified = false;   // Примитив
//
//     // Вызываем modifyItemData и получаем функцию для печати данных
//     const printItemData = modifyItemData(price, platform);
//
//     // Логируем исходные значения
//     console.log(price);      // {rub: 5000} - объект изменён внутри функции
//     console.log(platform);   // Android - не изменён, так как примитив
//     console.log(isModified); // false - не изменён, так как примитив
//
//     // Изменяем значения вне функции
//     price = {usd: 100};    // Новый объект
//     platform = 'Web';        // Новая строка
//     isModified = null;       // Новое значение
//
//     // Вызов ранее возвращённой функции
//     printItemData(); // Вывод значений из захваченной области видимости
// })();

/**
 * 3
 */
/**
 Мы разрабатываем приложение через Console Driven Development.
 К сожалению, у нас потерялась часть кода, но остался последний вывод. Расставьте тексты для console.log
 Последний вывод:
 1
 2
 3
 5
 6
 */
// function checkOrder() {
//     console.log('?');
//
//     async function asyncFn() {
//         console.log('?');
//         await Promise.resolve(null);
//         console.log('?');
//     }
//
//     asyncFn();
//
//     new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, 0);
//         console.log('?')
//     }).then(() => {
//         console.log('?');
//     });
//     console.log('?');
// }
//
// checkOrder();
/**
 * 4
 */
/**
 * Напишите функцию retryFetch поверх fetch API, которая отправляет запрос в случае неудачи и раз * Функция принимает те же параметры, что и fetch + количество попыток и возвращает Promise.
 * Если метод запроса PUT, то повторных запросов не разрешаем
 * Если пользователь НЕАВТОРИЗОВАН или У НЕГО НЕТ ПРАВ, то повторный запрос не делаем
 * Если количество попыток закончилось, то вернуть последнюю ошибку в reject
 */
// function retryFetch(url, options = {}, attempts = 0) {
//     const { method = 'GET', headers = {} } = options;
//
//     return new Promise((resolve, reject) => {
//         const attemptRequest = (remainingAttempts) => {
//             fetch(url, { method, headers })
//                 .then((response) => {
//                     if (response.ok) {
//                         resolve(response);
//                     } else {
//                         // Проверяем статус ответа
//                         if (
//                             remainingAttempts > 0 &&
//                             method !== 'PUT' &&
//                             response.status !== 401 &&
//                             response.status !== 403
//                         ) {
//                             attemptRequest(remainingAttempts - 1);
//                         } else {
//                             reject(response);
//                         }
//                     }
//                 })
//                 .catch((error) => {
//                     // Если fetch выбросил ошибку (например, сеть недоступна)
//                     if (
//                         remainingAttempts > 0 &&
//                         method !== 'PUT'
//                     ) {
//                         attemptRequest(remainingAttempts - 1);
//                     } else {
//                         reject(error);
//                     }
//                 });
//         };
//
//         attemptRequest(attempts);
//     });
// }
//
// // Пример использования
// retryFetch(
//     'https://jsonplaceholder.typicode.com/todos/1',
//     { method: 'GET', headers: { Authorization: 'Bearer token' } },
//     3
// )
//     .then((res) => res.json()) // Парсим JSON только после получения ответа
//     .then((data) => console.log(data))
//     .catch((err) => {
//         console.error('Request failed:', err);
//     });
