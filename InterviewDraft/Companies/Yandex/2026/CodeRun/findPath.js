/**
 * Найти маршрут from → to по дереву рейсов.
 * fetchFlights(airport) → прямые вылеты. Нет пути → [].
 *
 * Итеративный DFS: не копируем path и не копим массивы на стеке вызовов.
 * parent[next] = current — в конце собираем путь от to к from.
 */
export async function findPath(from, to, fetchFlights) {
    if (from === to) {
        return [from];
    }

    // откуда пришли в аэропорт (для восстановления маршрута)
    const parent = Object.create(null);
    // уже были — защита от повторного обхода / циклов
    const visited = new Set([from]);
    // стек аэропортов (только коды, без путей)
    const stack = [from];

    while (stack.length > 0) {
        const current = stack.pop();
        const nextAirports = (await fetchFlights(current)) || [];

        for (const next of nextAirports) {
            if (visited.has(next)) {
                continue;
            }

            visited.add(next);
            parent[next] = current;

            // нашли to — собираем путь назад по parent
            if (next === to) {
                const path = [to];
                let node = to;

                while (node !== from) {
                    node = parent[node];
                    path.push(node);
                }

                path.reverse();
                return path;
            }

            stack.push(next);
        }
    }

    return [];
}

// --- пример ---
// const FLIGHTS = {
//     A: ['B', 'D'],
//     B: ['C', 'N', 'Z'],
//     D: ['E', 'F'],
//     F: ['S'],
// };
// const fetchFlights = (from) => Promise.resolve(FLIGHTS[from]);
//
// findPath('A', 'S', fetchFlights).then(console.log); // ['A', 'D', 'F', 'S']
