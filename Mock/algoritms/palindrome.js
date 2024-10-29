const str = 'A1$b$B^a^'
const str2 = 'Abb@@A'
const str3 = 'Aba@@B'

const isLetter = (str) => {
    return str.toUpperCase() !== str.toLowerCase()
}

function isPolindrom(str) {
    let left = 0;
    let right = str.length - 1;

    while(left < right) {
        if(!isLetter(str[left])) {
            left++;
            continue;
        }

        if(!isLetter(str[right])) {
            right--;
            continue;
        }

        if(str[left].toLowerCase() !== str[right].toLowerCase()) {
            return false
        }

        left++;
        right--;
    }

    return true
}

console.log(isPolindrom(str)) // true
console.log(isPolindrom(str2)) // true
console.log(isPolindrom(str3)) // false