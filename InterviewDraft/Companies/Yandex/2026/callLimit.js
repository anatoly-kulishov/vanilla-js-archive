/**
 * Декоратор callLimit(fn, limit, callback):
 * - fn можно вызвать не больше limit раз
 * - после лимита вызовы игнорируются
 * - callback срабатывает при последнем разрешённом вызове
 * - у обёртки есть .reset() — сброс счётчика
 */

function callLimit(fn, limit, callback) {
    let count = 0;

    function limited(...args) {
        // лимит исчерпан — ничего не делаем
        if (count >= limit) {
            return;
        }

        count++;
        fn(...args);

        // последний разрешённый вызов — вызываем callback
        if (count === limit && callback) {
            callback();
        }
    }

    limited.reset = function () {
        count = 0;
    };

    return limited;
}

function log(title, desc) {
    console.log(title, desc);
}

const logLimited = callLimit(log, 3, () => console.log("limit reached"));

logLimited("title1", "desc");
logLimited("title2", "desc");
logLimited("title3", "desc");
logLimited("title4", "desc"); // не сработает

logLimited.reset();

logLimited("title1", "desc");
logLimited("title2", "desc");
logLimited("title3", "desc");
