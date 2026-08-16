/**
 * Функция, которая запрашивает данные с помощью fetcher
 * и повторяет запрос в случае ошибки. Запросы повторяются
 * до тех пор, пока не будет получен успешный ответ
 * или пока не будут исчерпаны все попытки.
 *
 * @param {function} fetcher - функция, которая возвращает Promise
 * @param {number} count - максимальное количество попыток
 */
export async function fetchWithAutoRetry(fetcher, count) {
    // попытки кончились — пробрасываем ошибку наружу
    if (count <= 0) {
        throw new Error("Attempts exhausted");
    }

    try {
        // успех — сразу возвращаем результат
        return await fetcher();
    } catch (error) {
        // если это была последняя попытка — отдаём исходную ошибку
        if (count <= 1) {
            throw error;
        }

        // иначе пробуем ещё раз с count - 1
        return fetchWithAutoRetry(fetcher, count - 1);
    }
}

// --- пример ---
// let tries = 0;
// const flaky = async () => {
//     tries++;
//     if (tries < 3) throw new Error("fail");
//     return "ok";
// };
//
// fetchWithAutoRetry(flaky, 3).then(console.log); // "ok"
