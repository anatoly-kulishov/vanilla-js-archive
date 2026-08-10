/**
 * 2 часть. На базе auth написать функцию tryAuth(n), которая
 * при возникновении ошибок делает дополнительно n попыток,
 * чтобы получить данные.
 *
 * Что значит "дополнительно n попыток":
 *   сначала 1 обычный вызов auth()
 *   если упал — ещё до n повторов
 *   итого максимум вызовов: 1 + n
 *
 * Пример: tryAuth(5) → до 6 вызовов auth().
 *
 * auth() уже возвращает промис (см. promisifyAuth.js),
 * поэтому здесь удобно писать через async/await.
 */

async function tryAuth(extraAttempts = 5) {
    // attemptsLeft — сколько вызовов auth ещё можно сделать,
    // включая текущий/первый.
    let attemptsLeft = extraAttempts + 1;

    // Сюда сохраняем последнюю ошибку, чтобы кинуть её наружу,
    // если все попытки провалились.
    let lastError;

    while (attemptsLeft > 0) {
        try {
            // Ждём результат auth. Если успешно — сразу возвращаем данные
            // и выходим из функции (дальше цикл не нужен).
            const data = await auth();
            return data;
        } catch (error) {
            // auth упал: уменьшаем запас попыток и запоминаем ошибку.
            attemptsLeft -= 1;
            lastError = error;

            // Цикл while сам пойдёт на следующую итерацию,
            // если attemptsLeft ещё > 0.
        }
    }

    // Сюда попадаем, только если ни одна попытка не удалась.
    // Важно кидать lastError, а не err:
    // переменная err/error из catch видна ТОЛЬКО внутри блока catch.
    // Снаружи её нет — будет ReferenceError.
    throw lastError;
}

// Пример использования:
// tryAuth(5)
//     .then((data) => console.log(data))
//     .catch((error) => console.error(error));
