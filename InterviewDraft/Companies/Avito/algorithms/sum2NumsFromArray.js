// Функция, которая ищет в массиве 2 числа, которые будут равны сумме.

function func(arr, total) {
    let result = [];
    let map = {};

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];

        if (map[current] === undefined) {
            map[current] = 1;
        } else {
            map[current] += 1;
        }
    }

    for(let key in map) {
        if(map[total - key]) {
            result.push(total - key)
        }
    }

    return result
}

let arr = [1, 3, 5, 10, 24, 32];
let total = 35

console.log(func(arr, total)) // [32, 3]
