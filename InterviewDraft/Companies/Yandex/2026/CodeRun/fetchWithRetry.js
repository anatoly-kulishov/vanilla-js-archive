/**
 * Запрос через fetcher с повторами при ошибке.
 * count — число дополнительных попыток (всего вызовов ≤ count + 1).
 * Все попытки по очереди; при полном фейле — последняя ошибка.
 */
export async function fetchWithAutoRetry(fetcher, count) {
    try {
        return await fetcher();
    } catch (error) {
        // ещё есть доп. попытки — пробуем снова
        if (count > 0) {
            return fetchWithAutoRetry(fetcher, count - 1);
        }

        throw error;
    }
}
