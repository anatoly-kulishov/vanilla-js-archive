console.log(1);

setTimeout(() => {
    console.log(2);
})

Promise.resolve(3).then(console.log);

console.log(4);

setTimeout(function () {
    console.log(5);
}, 0)

console.log(6);

const foo2 = () => {
    console.log('foo2');

    setTimeout(foo2)
}

foo2();

// Output: 1, 4, 6, foo2, 3, 2, 5, foo2...

