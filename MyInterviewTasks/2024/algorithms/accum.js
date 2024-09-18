function accum(str) {
    let result = []

    for(let i = 0; i < str.length; i++) {
        result.push(str[i].toUpperCase() + str[i].repeat(i))
    }

    return result.join('-')
}

console.log(accum('abcd')) // A-Bb-Ccc-Dddd