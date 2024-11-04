// Необходимо реализовать метод sum таким образом, чтобы выводилось значение всех сумм как показано в примере
const someCustom = (arg) => {
    let result = arg;
    console.log(result);

    return function sum(num) {
        result += num;
        console.log(result);
        return sum;
    };
};

// Примеры использования
someCustom(1)(10)(15);        // выводит: 1, 11, 26
console.log('\n');
someCustom(6)(5)(4)(3)(2);    // выводит: 6, 11, 15, 18, 20
console.log('\n');
someCustom(200)(100);          // выводит: 200, 300
