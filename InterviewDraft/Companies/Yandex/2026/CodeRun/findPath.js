/**
 * Найти маршрут from → to по дереву рейсов.
 * fetchFlights(airport) → соседние аэропорты (прямой вылет).
 * Сеть — дерево без циклов. Нет пути → [].
 */
export async function findPath(from, to, fetchFlights) {
    // BFS: очередь пар [аэропорт, путь до него]
    const queue = [[from, [from]]];

    while (queue.length > 0) {
        const [current, path] = queue.shift();

        if (current === to) {
            return path;
        }

        const nextAirports = (await fetchFlights(current)) || [];

        for (const next of nextAirports) {
            queue.push([next, [...path, next]]);
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
// findPath('A', 'C', fetchFlights).then(console.log); // ['A', 'B', 'C']
// findPath('B', 'S', fetchFlights).then(console.log); // []
