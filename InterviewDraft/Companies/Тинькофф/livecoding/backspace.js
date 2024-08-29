// const backspace = (str1, str2) => {
//     // Code here...
// }

const backspace = (str1, str2) => {
    const str1Arr = [];
    const str2Arr = [];

    for(let i = 0; i < str1.length; i++) {
        let current = str1[i];

        if(current === '#') {
            str1Arr.pop();
            continue;
        }

        str1Arr.push(current)
    }

    for(let i = 0; i < str2.length; i++) {
        let current = str2[i];

        if(current === '#') {
            str2Arr.pop();
            continue;
        }

        str2Arr.push(current)
    }

    console.log(str1Arr, str2Arr)


    return str1Arr.join('') === str2Arr.join('')
}

console.log(backspace('ab#d', 'ac#d')) // true (ad === ad)
console.log(backspace('ab##', 'ab##')) // true (a === a)
console.log(backspace('ab#d', 'ab#c')) // false (ad !== ac)
