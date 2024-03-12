const fetchFlights = async (from) => {}

const findPath = async (from, to, fetchFlights) => {
    const queue = [from];
    const routes = new Map();
    routes.set(from, [from])

    while(queue.length > 0) {
        const node = queue.shift();

        const neighbours = await fetchFlights(node);

        if(!neighbours) {
            continue;
        }

        const currentRoute = routes.get(node);

        for(const neighbour of neighbours) {
            if(!routes.has(neighbour)) {
                queue.push(neighbour)
            }

            routes.set(neighbour, [...currentRoute, neighbour]);

            if(to === neighbour) {
                return Promise.resolve(routes.get(neighbour));
            }
        }
    }

    return Promise.reject('No way')
}

console.log(findPath('A', 'N', fetchFlights)) // Promise.resolve(['A', 'B', 'N'])
console.log(findPath('A', 'S', fetchFlights)) // Promise.resolve(['A', 'D', 'F', 'S']
console.log(findPath('B', 'S', fetchFlights)) // Promise.reject('No way')
