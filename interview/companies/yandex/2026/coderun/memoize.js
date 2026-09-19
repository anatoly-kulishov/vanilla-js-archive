/**
 * Мемоизация: при тех же аргументах fn не вызываем повторно.
 * Объекты с одинаковыми полями считаются одним ключом → JSON.stringify.
 */
export function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}
