function processOrder(store, order) {
    // Сортируем склад по возрастанию размеров
    store.sort((a, b) => a.size - b.size);

    // Преобразуем склад в объект для удобного доступа
    let storeDict = {};
    store.forEach(item => {
        storeDict[item.size] = item.quantity;
    });

    let assignment = [];
    let stats = [];

    // Для каждого рабочего в заказе
    for (let worker of order) {
        let id = worker.id;
        let sizes = worker.size;

        let assigned = false;

        // Проверяем, можно ли выдать первый размер
        if (storeDict[sizes[0]] > 0) {
            storeDict[sizes[0]]--;
            assignment.push({ id: id, size: sizes[0] });
            assigned = true;
        }
        // Если есть второй размер и первый не подошел, пробуем его
        else if (sizes.length === 2 && storeDict[sizes[1]] > 0) {
            storeDict[sizes[1]]--;
            assignment.push({ id: id, size: sizes[1] });
            assigned = true;
        }

        // Если не удалось назначить ни один размер
        if (!assigned) {
            return false;
        }
    }

    // Формируем финальные статистики по складу
    for (let size in storeDict) {
        stats.push({ size: parseInt(size), quantity: storeDict[size] });
    }
    stats.sort((a, b) => a.size - b.size);

    return { stats: stats, assignment: assignment };
}

// Пример тестов для проверки
function runTests() {
    // Пример 1: Есть достаточно одежды на складе
    let store = [{ size: 1, quantity: 1 }, { size: 2, quantity: 1 }, { size: 3, quantity: 2 }];
    let order = [{ id: 1, size: [1] }, { id: 2, size: [2, 3] }, { id: 3, size: [3] }];
    let result = processOrder(store, order);
    console.log(result);  // Должен вернуть { stats: [...], assignment: [...] }

    // Пример 2: Недостаточно одежды
    store = [{ size: 1, quantity: 1 }, { size: 2, quantity: 1 }, { size: 3, quantity: 0 }];
    order = [{ id: 1, size: [1] }, { id: 2, size: [2, 3] }, { id: 3, size: [3] }];
    result = processOrder(store, order);
    console.log(result);  // Должен вернуть false
}

runTests();
