const promise = new Promise((resolve, reject) => {
    const random = !!Math.round(Math.random(0, 1));

    if (random) {
        setTimeout(() => resolve("resolve()"), 0)
    } else {
        setTimeout(() => reject("reject()"), 0)
    }
})

promise
    .then((res) => {
        console.log('then() ->', res)
    })
    .catch((res) => {
        console.log('catch() ->', res)
    });
