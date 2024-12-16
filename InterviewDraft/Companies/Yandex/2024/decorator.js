/**
 * Напишите функцию addLimit, которая создает "обёртку" для функции fn, ограничивая количество её вызовов до заданного значения limit.
 * Когда число вызовов достигает limit, дальнейшие вызовы функции не должны вызывать fn.
 * Если передан необязательный параметр callback, он должен вызываться при превышении лимита.
 *
 * Функция также должна возвращать объект с методом reset, который сбрасывает счетчик вызовов, позволяя снова вызывать функцию fn с нуля.
 *
 * Параметры:
 * fn — функция, для которой требуется установить ограничение на количество вызовов.
 * limit — максимальное количество вызовов функции fn.
 * callback (опционально) — функция, которая будет вызвана после достижения лимита вызовов функции fn.
 * Возвращаемое значение:
 *
 * Возвращает новую функцию limitedFn, которая:
 * Вызывает fn, пока счетчик вызовов не достигнет limit.
 * Вызывает callback при превышении лимита вызовов.
 * Имеет метод reset, который сбрасывает счетчик вызовов, позволяя снова вызвать fn заданное количество раз.
 */

const addLimit = (fn, limit, callback) => {
    let count = 0;

    const limitedFn = (...args) => {
        if (count < limit) {
            count++;
            fn(...args);
        } else if (callback) {
            callback();
        }
    };

    limitedFn.reset = () => {
        count = 0;
    };

    return limitedFn;
};

// Пример использования
const log = (title) => {
    console.log(title);
};

const firstCase = addLimit(log, 2);
firstCase('test1'); // test1
firstCase('test2'); // test2
firstCase('test3'); // Не должна отработать!

firstCase.reset();
firstCase('test3'); // test3
firstCase('test4'); // test4

const secondCase = addLimit(log, 2, () => console.log('finish()'));
secondCase('test1'); // test1
secondCase('test2'); // test2
// finish
