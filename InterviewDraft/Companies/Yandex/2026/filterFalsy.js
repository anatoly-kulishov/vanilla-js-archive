/**
 * Убрать все falsy значения из объекта/массива (рекурсивно).
 * falsy: false, 0, "", null, undefined, NaN
 * [] и {} — truthy, пустой массив после очистки остаётся.
 */

function filterFalsy(value) {
    // массив: сначала рекурсия в каждый элемент, потом .filter(Boolean) выбросит falsy
    // пример: [false, 1] → map → [false, 1] → filter → [1]
    if (Array.isArray(value)) {
        return value.map(filterFalsy).filter(Boolean);
    }

    // объект: value && — иначе null попадёт сюда (typeof null === "object")
    if (value && typeof value === "object") {
        const result = {};

        for (const key in value) {
            // рекурсия: если внутри массив/объект — почистит; примитив вернёт как есть
            const cleaned = filterFalsy(value[key]);

            // родитель решает: falsy-ключ не копируем
            // a: null → cleaned=null → if(null) ✗
            // b: [1]   → cleaned=[1] → if([1]) ✓
            if (cleaned) {
                result[key] = cleaned;
            }
        }

        return result;
    }

    // примитив сам себя не фильтрует — просто возвращает value
    // 0, null, false уберёт родитель (filter(Boolean) или if(cleaned))
    return value;
}

console.log(filterFalsy([null, 0, false, 1])); // [1]
console.log(filterFalsy({ a: null, b: [false, 1] })); // { b: [1] }
console.log(filterFalsy([null, 0, 5, [0], [false, 16]])); // [5, [], [16]]
