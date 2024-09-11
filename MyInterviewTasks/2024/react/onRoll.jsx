import React from "react";

/**
 * Реализовать простую имплементацию слот-машины ("однорукий бандит"):
 *
 * Три барабана (с цифрами от 0 до 9), и кнопка запуска
 * При нажатии на кнопку — крутим барабаны
 * Пока барабаны крутятся — кнопка заблокирована
 * Цифры меняются по-очереди 0,1,2...9,0,1,2...
 * За каждый оборот барабана на нём выпадает следующее значение
 * Если все три цифры совпали после остановки — говорим, что победил
 * Если нет — говорим "попробуй снова"
 * Имплементация процесса вращения барабана писать не надо, есть готовая.
 * Пример, что хотим получить: https://gifyu.com/image/SY0Bf
 */

function randomInt(min = 0, max = 9) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 Функция имитирует рандомайзер вращения барабана с постепенной остановкой
 - используй onRoll для анимации вращения (смена текущего значения на барабане)
 - и onStop для оповещения, когда барабан закончил крутиться
 */
const runDynamo = (onRoll, onStop) => {
    const velocityConsumed = 200;
    const initialSpeed = 50;

    const initialV = randomInt(3000, 5000);
    let velocity = initialV;

    const round = () => {
        const speed = (initialV - velocity) / 10;
        velocity -= velocityConsumed;
        if (velocity < 0) {
            onStop();
            return;
        }
        onRoll();
        setTimeout(round, speed);
    };

    setTimeout(round, initialSpeed);
};

/** --  ниже идет твой код: -- **/

function Roller() {
   // ...
}

const App = () => {
    return (
        <div style={{fontFamily: "sans-serif"}}>
            <div style={{fontSize: "64px"}}>
                <Roller/>
                <Roller/>
                <Roller/>
            </div>

            <button style={{margin: '5px 30px'}}>
                spin!
            </button>
        </div>
    );
}

export default App;