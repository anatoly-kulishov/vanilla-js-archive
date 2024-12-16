const diagonalSort = function (M) {
    let x = M[0].length - 1;
    let y = M.length;

    for (let i = 2 - y; i < x; i++) {
        let diag = new Array(y);
        let k = 0;

        for (let j = 0; j < y; j++) {
            if (M[j][i + j]) {
                diag[k++] = M[j][i + j]
            }
        }

        diag.sort((a, b) => a - b)
        k = 0

        for (let j = 0; j < y; j++) {
            if (M[j][i + j]) {
                M[j][i + j] = diag[k++]
            }
        }
    }
    return M
};


console.log(diagonalSort([[3, 3, 1, 1], [2, 2, 1, 2], [1, 1, 1, 2]]))
