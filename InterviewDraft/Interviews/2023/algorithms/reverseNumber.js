function reverseNumber(num) {
    const str = String(num)
    let result = []

    for(let i = str.length - 1; i >= 0; i--) {
        const char = str[i]

        if(char === '-') {
            result.unshift(char)
        } else {
            result.push(char)
        }

    }

    return Number(result.join(''))
}

console.log(reverseNumber(24)); // 42
console.log(reverseNumber(-123)); // -321
