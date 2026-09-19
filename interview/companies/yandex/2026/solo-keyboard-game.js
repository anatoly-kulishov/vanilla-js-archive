/**
 * Yandex Advanced Code. SoloKeyboardGame (тренажёр печати).
 *
 * constructor(texts, render, sendAnalytics)
 * - texts: массив строк
 * - render(text, meta): колбэк отрисовки
 * - sendAnalytics(key): колбэк на каждое нажатие
 *
 * meta: { speed, cursorPosition, errors }
 *
 * - в constructor перемешать texts (Fisher-Yates, не sort+random)
 * - constructor: shuffle texts, зануление
 * - #renderFrame: random text из #texts (TODO в скелете), #render(text, meta)
 * - #getSpeed: символов в секунду; таймер не в constructor
 * - onKeyPress: BACKSPACE (константа) / символ; userInput; errors строка
 * - конец: cursorPosition === text.length && errors пустые -> "The end"
 */

const BACKSPACE = 'BACKSPACE';

class SoloKeyboardGame {
    static #shuffle(array) {
        const items = array.slice();

        for (let i = items.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }

        return items;
    }

    #texts;
    #render;
    #sendAnalytics;

    #text = '';
    #userInput = '';
    #errors = '';
    #meta = { cursorPosition: 0, textsIndex: 0 };
    #startTime = null;
    #finished = false;

    constructor(texts, render, sendAnalytics) {
        // было: .sort(() => Math.random() - 0.5)
        this.#texts = SoloKeyboardGame.#shuffle(texts);
        this.#render = render;
        this.#sendAnalytics = sendAnalytics;

        // зануление состояния здесь, не startTime = Date.now()
        this.#userInput = '';
        this.#errors = '';
        this.#meta.cursorPosition = 0;
        this.#startTime = null;
        this.#finished = false;

        this.#renderFrame();
    }

    #getSpeed() {
        if (this.#userInput.length === 0 || this.#startTime === null) {
            return 0;
        }

        const seconds = (Date.now() - this.#startTime) / 1000;
        return seconds > 0 ? Math.round(this.#userInput.length / seconds) : 0;
    }

    #renderFrame() {
        if (this.#finished) {
            this.#render('The end', {
                speed: this.#getSpeed(),
                cursorPosition: 0,
                errors: '',
            });
            return;
        }

        // TODO в скелете: random text из #texts (был фиксированный textsIndex)
        if (!this.#text) {
            this.#meta.textsIndex = Math.floor(Math.random() * this.#texts.length);
            this.#text = this.#texts[this.#meta.textsIndex];
        }

        this.#render(this.#text, {
            speed: this.#getSpeed(),
            cursorPosition: this.#meta.cursorPosition,
            errors: this.#errors,
        });
    }

    onKeyPress(key) {
        if (this.#finished) {
            return;
        }

        if (key === BACKSPACE) {
            if (this.#meta.cursorPosition > 0) {
                this.#userInput = this.#userInput.slice(0, -1);
                this.#meta.cursorPosition -= 1;

                if (this.#errors.length > 0) {
                    this.#errors = this.#errors.slice(0, -1);
                }
            }
        } else if (key.length === 1 && this.#meta.cursorPosition < this.#text.length) {
            if (this.#startTime === null) {
                this.#startTime = Date.now();
            }

            this.#userInput += key;

            if (key !== this.#text[this.#meta.cursorPosition]) {
                this.#errors += 'x';
            }

            this.#meta.cursorPosition += 1;
        }

        if (this.#meta.cursorPosition === this.#text.length && this.#errors.length === 0) {
            this.#finished = true;
        }

        this.#renderFrame();
        this.#sendAnalytics(key);
    }
}

// self-check: node 17.08.26.js
if (typeof require !== 'undefined' && require.main === module) {
    const assert = (condition, message) => {
        if (!condition) throw new Error(message);
        console.log(`ok: ${message}`);
    };

    const frames = [];
    const analytics = [];

    const game = new SoloKeyboardGame(
        ['abc', 'xyz'],
        (text, meta) => frames.push({ text, ...meta }),
        (key) => analytics.push(key),
    );

    assert(frames.length === 1, 'constructor вызывает render');
    assert(['abc', 'xyz'].includes(frames[0].text), 'случайный текст из массива');
    assert(frames[0].cursorPosition === 0, 'cursorPosition = 0 в начале');
    assert(frames[0].speed === 0, 'speed = 0 до ввода');

    const text = frames[0].text;

    for (const char of text.slice(0, 1)) {
        game.onKeyPress(char);
    }
    game.onKeyPress('x');
    assert(frames.at(-1).errors === 'x', 'ошибка маркируется в errors');

    game.onKeyPress(BACKSPACE);
    assert(frames.at(-1).errors === '', 'BACKSPACE убирает последнюю ошибку');

    for (const char of text.slice(1)) {
        game.onKeyPress(char);
    }
    assert(frames.at(-1).text === 'The end', 'конец без ошибок -> The end');
    assert(analytics.length > 0, 'sendAnalytics на каждый key');

    console.log('\nlast frame:', frames.at(-1));
}

module.exports = { SoloKeyboardGame, BACKSPACE };
