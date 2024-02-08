function recursiveTraversal(obj) {
    for (let key in obj) {
        const value = obj[key];

        if (typeof value === 'object') {
            recursiveTraversal(value); // Рекурсивный вызов для обхода вложенного объекта
        } else {
            console.log(key + ': ' + value); // Вывод ключа и значения
        }
    }
}

const myObj = {
    key1: 'value1',
    key2: {
        nestedKey1: 'nestedValue1',
        nestedKey2: {
            deeplyNestedKey: 'deeplyNestedValue'
        }
    },
    key3: 'value3'
};

recursiveTraversal(myObj);
