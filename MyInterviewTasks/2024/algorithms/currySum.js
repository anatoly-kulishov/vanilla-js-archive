function sum(a) {
    let sum = a

    function innerSum (b) {
        if(b) {
            sum += b
            return innerSum
        } else {
            return sum
        }

    }

    return innerSum
}

console.log(sum(1)(2)(3)(4)()) // 10