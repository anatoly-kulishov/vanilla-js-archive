/**
 * Задача: "Сложное асинхронное выполнение и порядок вывода"
 *
 * Что выведет в консоль следующий код? Объясните порядок вывода.
 */
console.log('1');

setTimeout(() => console.log('2'), 0);

new Promise(resolve => {
    console.log('3');
    resolve();
}).then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
    new Promise(resolve => resolve()).then(() => console.log('6'));
}).then(() => {
    console.log('7');
});

new Promise(resolve => {
    console.log('8');
    resolve('9');
}).then(value => {
    console.log(value);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('10');
            resolve('11');
        }, 0);
    });
}).then(value => console.log(value));

console.log('12');

queueMicrotask(() => console.log('13'));

// Output:
