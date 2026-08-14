/**
 * Реализовать функцию compose, которая принимает
 * переменное количество функций и возвращает новую функцию.
 * Результат работы каждой функции передается в следующую.
 *
 * Идея: compose(f, g, h)(x) === f(g(h(x)))
 * То есть функции применяются СПРАВА НАЛЕВО
 */

// Вспомогательные функции для проверки
const square = (x) => x * x; // возвести в квадрат
const times2 = (x) => x * 2; // умножить на 2
const sum = (a, b) => a + b; // сложить два числа

function compose(...functions) {
    // ...functions — все функции, которые передали в compose,
    // собраны в массив. Например: [square, times2, sum]

    // compose сам по себе НЕ считает результат.
    // Он возвращает НОВУЮ функцию, которую потом вызовут с аргументами.
    return function (...initialArgs) {
        // initialArgs — то, с чем вызвали результат compose.
        // Пример: compose(square, times2, sum)(3, 4)
        //   → initialArgs = [3, 4]

        // reduceRight идёт по массиву functions С КОНЦА к началу.
        // Начальное значение аккумулятора — initialArgs.
        //
        // Почему результат кладём в массив [nextResult]?
        // Чтобы всегда можно было вызвать fn(...acc):
        // у первой (правой) функции может быть несколько аргументов,
        // у остальных — обычно один (предыдущий результат).
        const resultAsArray = functions.reduceRight(
            (previousResultAsArray, currentFunction) => {
                const nextResult = currentFunction(...previousResultAsArray);
                return [nextResult];
            },
            initialArgs,
        );

        /**
         * 2
         */
        // return functions.reduceRight(
        //     (acc, fn, idx) => idx === functions.length - 1
        //         ? fn(...acc) // Первая справа функция получает все аргументы
        //         : fn(acc),   // Остальные получают только результат
        //     initialArgs
        // );

        // reduceRight вернул массив с одним итоговым значением — достаём его
        return resultAsArray[0];
    };
}

console.clear();
// compose(square, times2)(2) → square(times2(2)) → square(4) → 16
console.log(compose(square, times2)(2) === square(times2(2))); // true (16)

// compose(square, times2, sum)(3, 4) → square(times2(sum(3, 4))) → 196
console.log(compose(square, times2, sum)(3, 4) === square(times2(sum(3, 4)))); // true (196)