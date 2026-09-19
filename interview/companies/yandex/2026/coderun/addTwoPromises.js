/**
 * Сложить значения двух Promise<number>.
 * Если промис reject — в сумму всё равно идёт его reason.
 */
export const addTwoPromises = async function (promise1, promise2) {
    const a = await promise1.catch((e) => e);
    const b = await promise2.catch((e) => e);
    return a + b;
};
