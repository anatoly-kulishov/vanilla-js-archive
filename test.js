function getMaxScore(input) {
    const users = {}

    for (const dayIndex in input) {
        for (const userData of input[dayIndex]) {
            if (!users[userData.userId]) users[userData.userId] = []
            users[userData.userId].push(userData.count)
        }
    }

    const result = {
        userIds: [], steps: 0
    }

    const data = Object.entries(users)
        .filter(([_, counts]) => input.length === counts.length)
        .map(([userId, counts]) => [userId, counts.reduce((sum, count) => sum += count)])
        .sort((a, b) => b[1] - a[1])

    let maxStepsCount = data[0]?.[1]
    for (const count of data) {
        if (count[1] === maxStepsCount) {
            result.steps = count[1]
            result.userIds.push(count[0])
        }
    }

    return result
}

// Примеры
const statistics1 = [
    [{ userId: 1, steps: 5000 }, { userId: 2, steps: 1500 }],
    [{ userId: 2, steps: 1000 }]
];
console.log(getMaxScore(statistics1)); // { userIds: [2], steps: 2500 }

const statistics2 = [
    [{ userId: 1, steps: 2000 }, { userId: 2, steps: 1500 }],
    [{ userId: 2, steps: 4000 }, { userId: 1, steps: 3500 }]
];
console.log(getMaxScore(statistics2)); // { userIds: [1, 2], steps: 5500 }

const statistics3 = [
    [],
    [{ userId: 1, steps: 2000 }, { userId: 2, steps: 1500 }],
    [{ userId: 2, steps: 4000 }, { userId: 1, steps: 3500 }]
];
console.log(getMaxScore(statistics3)); // { userIds: [], steps: 0 }