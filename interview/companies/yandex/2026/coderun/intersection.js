/**
 * Даны два отсортированных списка с интервалами присутствия
 * пользователей в онлайне в течение дня. Начало интервала строго меньше конца.
 * Нужно вычислить интервалы, когда оба пользователя были в онлайне.
 * Интервалы указаны в часах, считаем что могут быть часы от 0 до 24.
 */

function intersection(user1, user2) {
    const result = [];
    let i = 0;
    let j = 0;

    // два указателя по отсортированным спискам
    while (i < user1.length && j < user2.length) {
        const [start1, end1] = user1[i];
        const [start2, end2] = user2[j];

        // пересечение: поздний старт, ранний конец
        const start = Math.max(start1, start2);
        const end = Math.min(end1, end2)

        // start < end — интервалы реально пересекаются
        if (start < end) {
            result.push([start, end]);
        }

        // сдвигаем тот интервал, который раньше закончился
        if (end1 < end2) {
            i++;
        } else {
            j++;
        }
    }

    return result;
}

// user1 = [[8, 12], [17, 22]]
// user2 = [[5, 11], [14, 18], [20, 23]]
// intersection(user1, user2) // [[8, 11], [17, 18], [20, 22]]

// user1 = [[9, 15], [18, 21]]
// user2 = [[10, 14], [21, 22]]
// intersection(user1, user2) // [[10, 14]]

console.log(
    intersection(
        [
            [8, 12],
            [17, 22],
        ],
        [
            [5, 11],
            [14, 18],
            [20, 23],
        ],
    ),
);
console.log(
    intersection(
        [
            [9, 15],
            [18, 21],
        ],
        [
            [10, 14],
            [21, 22],
        ],
    ),
);
