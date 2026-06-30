/**
 * Входные данные:
 * Массив объектов, где каждый объект описывает маршрут {from, to}.
 * Строка start — город, с которого начинается маршрут.
 *
 * Выходные данные:
 * Упорядоченный массив маршрутов, начиная с start.
 *
 * Условия:
 * Каждый пункт назначения (to) становится отправной точкой (from) для следующего маршрута.
 * Если маршрут не начинается с start, пропустить его.
 */
function goTo(cities = [], start) {
    const result = [];
    let currentCity = start;

    while (true) {
        const route = cities.find(route => route.from === currentCity);
        if (!route) break; // Если маршрут не найден, выходим
        result.push(route); // Добавляем маршрут в результат
        currentCity = route.to; // Переходим в следующий город
    }

    return result;
}

console.log(goTo([
    {from: 'Moscow', to: 'Bishkek'},
    {from: 'Belgorod', to: 'Moscow'},
    {from: 'Bishkek', to: 'Saint Petersburg'},
], 'Belgorod'));
/**
 * [
 *     {from: 'Belgorod', to: 'Moscow'},
 *     {from: 'Moscow', to: 'Bishkek'},
 *     {from: 'Bishkek', to: 'Saint Petersburg'}
 * ]
 */