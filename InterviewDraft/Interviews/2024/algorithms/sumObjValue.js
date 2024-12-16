/**
 * Посчитать сумму всех value
 * {
 *     value: 12,
 *     a: {
 *         value: 1,
 *         b: {
 *             value: NaN,
 *             c: {
 *                 value: null,
 *                 d: {
 *                     value: 3
 *                 }
 *             },
 *         },
 *     }
 * }
 */
function sumValues(obj) {
    let sum = 0;

    for (let key in obj) {
        const value = obj[key];

        // Проверяем тип значения свойства
        if (typeof value === "object" && value !== null) {
            // Если значение свойства является объектом (и не равно null), то делаем рекурсивный вызов
            // sumValues() для вложенного объекта и добавляем его результат к сумме
            sum += sumValues(value);
        } else if (typeof value === "number" && !Number.isNaN(value)) {
            // Если значение свойства является числом, то добавляем его к сумме
            sum += value;
        }
    }

    return sum;
}

const data = {
    value: 12,
    a: {
        value: 1,
        b: {
            value: NaN,
            c: {
                value: null,
                d: {
                    value: 3
                }
            },
        },
    }
};

const totalSum = sumValues(data);
console.log(totalSum); // Output: 16