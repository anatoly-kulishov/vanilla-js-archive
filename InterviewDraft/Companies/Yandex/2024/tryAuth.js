import asyncAuth from '.'

/**
 * Реализуйте две функции, auth() и tryAuth(n), для управления асинхронной аутентификацией, используя вызов asyncAuth.
 * Функция auth() должна оборачивать вызов asyncAuth() в Promise, чтобы результаты можно было использовать в async/await синтаксисе.
 * Функция tryAuth(n) должна использовать auth() и повторять попытку аутентификации n раз, если возникает ошибка, прежде чем окончательно выбросить исключение.
 */

/**
 * Вам нужно реализовать функцию `auth()`,
 * которая вызывает `asyncAuth()`, но возвращает Promise.
 *
 * @returns {Promise}
 */
function auth() {
    return new Promise((res, rej) => {
        asyncAuth((error, data) => {
            if (!error) {
                res(data);
            } else {
                rej(error);
            }
        });
    });
}

/**
 * Функция `tryAuth()` использует `auth()` и, в случае ошибки,
 * совершает N дополнительных попыток.
 *
 * @returns {Promise}
 */
async function tryAuth(n) {
    let authData;

    try {
        authData = await auth();
    } catch (e) {
        if (n > 0) {
            authData = await tryAuth(n - 1);
        } else {
            throw e;
        }
    }

    return authData;
}
