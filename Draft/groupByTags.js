// Исходный массив
const initialArray = [
    { id: 1, name: "item one", tags: ["music", "sport", "science"] },
    { id: 2, name: "item two", tags: ["music"] },
    { id: 3, name: "item three", tags: ["fun"] },
    { id: 4, name: "item four", tags: ["sport", "science"] },
    { id: 5, name: "item five", tags: [] },
    { id: 6, name: "item six", tags: ["sport"] },
];

const groupByTags = (array) => {
    const result = {};

    array.forEach(item => {
        if (item.tags.length === 0) {
            // Добавляем в "without tag" если нет тегов
            if (!result["without tag"]) result["without tag"] = [];
            result["without tag"].push(item);
        } else {
            // Добавляем элемент в каждый тэг
            item.tags.forEach(tag => {
                if (!result[tag]) result[tag] = [];
                result[tag].push(item);
            });
        }
    });

    return result;
};

console.log(groupByTags(initialArray))

// Ожидаемый результат
const correctResult = {
    sport: [
        { id: 6, name: "item six", tags: ["sport"] },
        { id: 4, name: "item four", tags: ["sport", "science"] },
        { id: 1, name: "item one", tags: ["music", "sport", "science"] },
    ],
    music: [
        { id: 2, name: "item two", tags: ["music"] },
        { id: 1, name: "item one", tags: ["music", "sport", "science"] },
    ],
    science: [
        { id: 4, name: "item four", tags: ["sport", "science"] },
        { id: 1, name: "item one", tags: ["music", "sport", "science"] },
    ],
    fun: [
        { id: 3, name: "item three", tags: ["fun"] }
    ],
    "without tag": [
        { id: 5, name: "item five", tags: [] }
    ]
};


