/**
 * Нужно реализовать react-функцию, которая возвращает квадрат,
 * размером 10 на 10 пикселей, у которого цвета меняются по клику
 * Серый -> Красный -> Зеленый -> Серый
 *
 * Идея решения:
 * - храним в стейте не сам цвет, а ИНДЕКС в массиве цветов
 * - по клику увеличиваем индекс на 1
 * - если дошли до конца массива — возвращаемся к 0 (цикл)
 */

import { useState } from "react";

// Палитра вынесена наружу компонента, чтобы массив
// не создавался заново на каждый рендер.
const COLORS = ["gray", "red", "green"];

function ColoredBox() {
    // colorIndex: 0 → gray, 1 → red, 2 → green
    // useState(0) — стартуем с серого
    const [colorIndex, setColorIndex] = useState(0);

    function handleClick() {
        // Функциональный апдейт setState(prev => ...):
        // React сам передаст актуальный предыдущий индекс.
        // Так надёжнее, чем писать setColorIndex(colorIndex + 1),
        // потому что colorIndex из замыкания может быть устаревшим
        // при быстрых повторных кликах / батчинге.
        setColorIndex((prevIndex) => {
            // Последний цвет в массиве? → прыгаем в начало
            if (prevIndex === COLORS.length - 1) {
                return 0;
            }
            // Иначе просто следующий цвет
            return prevIndex + 1;
        });

        // Альтернатива одной строкой:
        // setColorIndex((prevIndex) => (prevIndex + 1) % COLORS.length);
    }

    // Квадрат 10×10, цвет из COLORS по текущему индексу.
    // onClick вешаем на div — по клику крутим цвет.
    //
    // Почему здесь не нужен useCallback:
    // handleClick не передаётся в React.memo-ребёнка и не стоит
    // в зависимостях других хуков. Новый div и так создаётся каждый рендер,
    // мемоизация колбэка ничего ощутимо не сэкономит.
    return (
        <div
            style={{
                width: 10,
                height: 10,
                background: COLORS[colorIndex],
            }}
            onClick={handleClick}
        />
    );
}

export default ColoredBox;
