const filterArrayByArray = (first, second) => {
    let newArray = [];

    for (let k = 0; k < second.length; k++) {
        for (let i = 0; i < first.length; i++) {
            if (first[i].code === second[k]) {
                newArray.push(first[i]);
                break; // Прерываем внутренний цикл, чтобы избежать лишних проверок и дублей
            }
        }
    }

    return newArray;
};

const a = [{ code: 0 }, { code: 1 }, { code: 2 }, { code: 3 }, { code: 4 }];
const b = [0, 3, 4];

console.log(filterArrayByArray(a, b));// Результат: [ { code: 0 }, { code: 3 }, { code: 4 } ]

// O(m×n), m — длина массива first, n — длина массива second.
const filterArrayByArray2 = (first, second) => {
    const secondSet = new Set(second); // Преобразуем второй массив в Set для быстрого поиска
    return first.filter(item => secondSet.has(item.code));
};

// Преимущество: Эта реализация более эффективна в больших массивах, так как избегает создания дополнительных промежуточных массивов.
const filterArrayByArray3 = (first, second) => {
    const secondSet = new Set(second); // Множество для быстрого поиска
    const result = [];
    for (let item of first) {
        if (secondSet.has(item.code)) {
            result.push(item);
        }
    }
    return result;
};

// Быстродействие: Использование объекта позволяет избежать вложенных циклов, так как поиск по ключу в объекте выполняется за 𝑂(1)
const filterArrayByArray4 = (first, second) => {
    const lookup = {}; // Создаем объект для хранения значений из `second`
    second.forEach(code => {
        lookup[code] = true; // Записываем каждое значение из `second` как ключ объекта
    });

    return first.filter(item => lookup[item.code]); // Проверяем, есть ли `item.code` в объекте
};