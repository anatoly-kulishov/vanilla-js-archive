const matrix = [
    [1,   2,   3],
    [10,  20,  30],
    [100, 200, 300]
];

const n = 20;

const getValueByIndex = (matrix, index) => {
    const w = matrix[0].length

    const row = index / w;
    const col = index % w;

    return matrix[row][col]
}

function search(matrix, n) {
    let start = 0;
    let end = matrix.length * matrix[0].length;
    let found = false
    let position = -1;

    while (found === false && start <= end) {
        const middle = Math.floor(start + end / 2)

        // code here
    }

    return;
}
