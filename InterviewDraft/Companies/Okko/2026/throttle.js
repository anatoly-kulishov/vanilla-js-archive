/**
 * Функция throttle
 *
 * Задача: не давать fn вызываться чаще, чем раз в delay мс.
 *
 * Картинка по времени (leading-edge throttle):
 *   вызовы:  X  Y  .  .  .  |  .  .  .
 *   время:   0         100ms
 *   сработает: X, потом пауза delay, Y игнорируется если попал в окно
 *
 * Отличие от debounce:
 * - throttle: "не чаще раза в delay" (первый вызов обычно проходит сразу)
 * - debounce: "подожди delay тишины, потом вызови один раз"
 */

function throttle(fn, delay) {
    // Флаг в замыкании: сейчас мы в "блокировке" и новые вызовы игнорируем.
    // Живёт между вызовами обёртки, пока существует throttled-функция.
    let blocked = false;

    // Возвращаем обёртку: снаружи будут вызывать её, а не fn напрямую
    return function (...args) {
        // Уже заблокированы → этот вызов пропускаем
        if (blocked) {
            return;
        }

        // Первый вызов в окне — выполняем сразу (leading edge)
        // fn.call(this, ...args) — сохраняем this,
        // чтобы работало как метод: obj.method = throttle(...)
        fn.call(this, ...args);

        // Включаем блокировку и планируем снятие через delay.
        // ВАЖНО: blocked = true и setTimeout ставим ТОЛЬКО здесь,
        // после реального вызова fn.
        //
        // На скрине они были СНАРУЖИ if — тогда каждый игнорируемый
        // вызов заново ставил таймер и отодвигал разблокировку.
        // Это уже больше похоже на сломанный debounce, а не throttle.
        blocked = true;
        setTimeout(() => {
            blocked = false;
        }, delay);
    };
}

// Пример:
// const onScroll = throttle(() => console.log("scroll"), 100);
// window.addEventListener("scroll", onScroll);
