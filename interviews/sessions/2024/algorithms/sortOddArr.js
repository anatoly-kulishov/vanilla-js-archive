// Отсортировать только нечетные
function sortOddArr(arr) {
    const temp = arr.reduce((acc, el) => {
        if(el % 2 !== 0) {
            acc[0].push(el);
        }
        if(el % 2 === 0) {
            acc[1].push(el);
        }

        return acc
    }, [[], []])

    return temp[0].sort((a, b) => a - b).concat(temp[1]);
}

const ARRAY = [2, 4, 1, 5, 6, 2, 9, 2, 7, 3]

console.log(sortOddArr(ARRAY)) // [1, 3, 5, 7, 9, 2, 4, 6, 2, 2]
