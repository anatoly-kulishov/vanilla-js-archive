const testCase = require("../../../Helpers/testCase");

function deepCopy(obj) {
    // Если obj не является объектом или массивом (т.е. это примитив), просто возвращаем его
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // Инициализируем стек, в котором будем хранить информацию о текущем копируемом объекте
    const stack = [];
    // Создаем пустой объект или массив в зависимости от типа исходного значения
    const result = Array.isArray(obj) ? [] : {};

    // Начинаем с первого объекта/массива и кладем его в стек
    stack.push({
        source: obj,  // оригинальный объект/массив
        target: result // копия объекта/массива
    });

    // Стек обрабатываем, пока он не станет пустым
    while (stack.length) {
        // Извлекаем текущую пару (source - объект/массив, target - его копия)
        const { source, target } = stack.pop();

        // Проходим по всем ключам объекта или элементам массива
        for (let key in source) {
            // Проверяем, что это собственное свойство, а не унаследованное
            if (source.hasOwnProperty(key)) {
                const value = source[key];

                // Если значение является объектом или массивом, помещаем его в стек для дальнейшей обработки
                if (typeof value === 'object' && value !== null) {
                    const copy = Array.isArray(value) ? [] : {}; // Создаем пустую копию массива или объекта
                    target[key] = copy; // Присваиваем ссылку на эту копию в целевой объект
                    stack.push({ source: value, target: copy }); // Добавляем в стек для дальнейшей обработки
                } else {
                    // Если это примитивное значение, просто копируем его
                    target[key] = value;
                }
            }
        }
    }

    return result; // Возвращаем итоговую копию
}


testCase(deepCopy([{a: {b: [{c: 1}]}}, [1, 2, 3]]), [{a: {b: [{c: 1}]}}, [1, 2, 3]]);
testCase(deepCopy([[1, '2', null], undefined, true]), [[1, '2', null], undefined, true]);
testCase(deepCopy({a: [{ b: []}]}), {a: [{ b: []}]});
testCase(deepCopy([{}, {}, {}]), [{}, {}, {}]);
