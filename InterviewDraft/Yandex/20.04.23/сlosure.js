var i = 10;
var result = [];

while (i--) {
    result.push(function () {
        return i + i
    })
}

console.log(
    result[0](), // ???
    result[1]() // ???
);
