/**
 * Есть функция asyncAuth(cb), которая принимает функцию-обработчик,
 * в которую может быть передана ошибка (1-м аргументом)
 * или необходимые данные (2-м аргументом).
 * Необходимо написать функцию auth, которая выполняет asyncAuth, но возвращает промис.
 *
 * Это классический "promisify":
 * был callback-стиль → хотим удобный Promise (.then / await).
 *
 * Конвенция callback (как в Node.js):
 *   cb(error, data)
 *   - если ошибка есть → первый аргумент truthy, data обычно нет
 *   - если успех → error = null/undefined, во втором аргументе данные
 */

function auth() {
    // new Promise((resolve, reject) => { ... })
    // Мы контролируем, когда промис завершится успешно или с ошибкой.
    return new Promise((resolve, reject) => {
        // Вызываем старую asyncAuth и передаём ей наш callback.
        // Когда asyncAuth закончит работу — она вызовет этот callback.
        asyncAuth((error, data) => {
            // Ошибка → отклоняем промис.
            // Тогда сработает .catch(...) или попадем в catch у await.
            if (error) {
                reject(error);
                return;
            }

            // Успех → резолвим промис данными.
            // Тогда сработает .then(data => ...) или const data = await auth().
            resolve(data);
        });
    });
}

// Пример использования:
// auth()
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));
