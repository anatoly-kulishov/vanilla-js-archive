const TEST_ARRAY = [3, 1, 3, 9, 6, 4, 6, 6, 2, 1, 8, 5, 8, 7];

const insertionSort = (arr) => {
    for(let i = 1; i < arr.length; i++) {
        let j = i - 1;
        let temp = arr[i];

        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }

    return arr
}

const binarySearch = (arr, target) => {
    let start = 0;
    let end = arr.length;

    let position = -1;
    let found = false;

    while(found === false && start <= end) {
        const middle = Math.floor((start + end) / 2);

        if(arr[middle] === target) {
            found = true;
            position = middle;
        }

        if(target < arr[middle]) {
            end = middle - 1
        } else {
            start = middle + 1
        }
    }

    return position;
}

console.log(insertionSort(TEST_ARRAY)) // [1, 1, 2, 3, 3, 4, 5, 6, 6, 6, 7, 8, 8, 9]
console.log(binarySearch(TEST_ARRAY, 6)) // 7 (index)
