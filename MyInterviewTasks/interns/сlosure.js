/** Output: [-2, -2] */

var i = 10;
var result = [];

while (--i) {
    result.push(() => {
        return i + i
    })
}

console.log(
    result[0](), // ???
    result[1]() // ???
);
