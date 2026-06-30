/**
 * Чемпионат по шагам
 *
 * Условие задачи
 * Мы в Авито любим проводить соревнования, — недавно мы устроили чемпионат по шагам. И вот настало время подводить итоги!
 * Необходимо определить userIds участников, которые прошли наибольшее количество шагов steps за все дни,
 * не пропустив ни одного дня соревнований.
 *
 * Сложность по времени: 𝑂 (𝑛 ⋅ 𝑘) O(n⋅k) — линейная по количеству дней и участников.
 * Сложность по памяти: 𝑂 (𝑛 ⋅ 𝑘) O(n⋅k), так как данные о каждом участнике сохраняются.
 */

const getStepChampion = (statistics) => {
    const champions = { userIds: [], steps: 0 };
    const map = {};
    const totalDays = statistics.length;

    for (let i = 0; i < statistics.length; i++) {
        const currDay = statistics[i];

        // Если день пустой, это означает, что кто-то пропустил день
        if (currDay.length === 0) {
            return champions; // Возвращаем пустой результат
        }

        currDay.forEach(curr => {
            if (!map[curr.userId]) {
                // Если участник еще не встречался, добавляем его в map
                map[curr.userId] = {
                    steps: curr.steps,
                    days: 1
                };
            } else {
                // Обновляем количество шагов и дней
                map[curr.userId].steps += curr.steps;
                map[curr.userId].days += 1;
            }
        });
    }

    let maxSteps = 0;

    for (let userId in map) {
        const user = map[userId];

        // Учитываем только тех, кто участвовал во всех днях
        if (user.days === totalDays) {
            if (user.steps > maxSteps) {
                // Новый чемпион
                maxSteps = user.steps;
                champions.userIds = [parseInt(userId)];
                champions.steps = user.steps;
            } else if (user.steps === maxSteps) {
                // Добавляем участника с таким же количеством шагов
                champions.userIds.push(parseInt(userId));
            }
        }
    }

    return champions;
};

// Примеры
const statistics1 = [
    [{ userId: 1, steps: 5000 }, { userId: 2, steps: 1500 }],
    [{ userId: 2, steps: 1000 }]
];
console.log(getStepChampion(statistics1)); // { userIds: [2], steps: 2500 }

const statistics2 = [
    [{ userId: 1, steps: 2000 }, { userId: 2, steps: 1500 }],
    [{ userId: 1, steps: 3500 }, { userId: 2, steps: 4000 }]
];
console.log(getStepChampion(statistics2)); // { userIds: [1, 2], steps: 5500 }

const statistics3 = [
    [],
    [{ userId: 1, steps: 2000 }, { userId: 2, steps: 1500 }],
    [{ userId: 2, steps: 4000 }, { userId: 1, steps: 3500 }]
];
console.log(getStepChampion(statistics3)); // { userIds: [], steps: 0 }
