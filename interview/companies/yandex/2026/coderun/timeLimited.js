/**
 * Дана асинхронная функция fn и время t в миллисекундах.
 * Вернуть версию fn с ограничением по времени.
 *
 * Новая функция принимает те же аргументы, что и fn.
 * - fn успела за t мс → resolve с результатом fn
 * - fn не успела → reject("Time limit exceeded")
 */

const timeLimited = function (fn, t) {
    return function (...args) {
        // кто быстрее: fn(...args) или таймер на t мс
        const timeout = new Promise((_, reject) => {
            setTimeout(() => reject("Time limit exceeded"), t);
        });

        return Promise.race([fn(...args), timeout]);
    };
};

// --- пример ---
const slow = (n) => new Promise((r) => setTimeout(() => r(n * 2), 500));

timeLimited(slow, 300)(5)
    .then(console.log)
    .catch(console.error); // "Time limit exceeded"

timeLimited(slow, 800)(5)
    .then(console.log); // 10
