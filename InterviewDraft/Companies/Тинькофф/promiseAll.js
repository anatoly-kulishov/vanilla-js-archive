const promiseAll = (promises) => {
    return new Promise((resolve, reject) => {
        const finishPromises = [];
        let secondIndex = 0

        for(let index in promises) {
            promises[index]
                .then((data) => {
                    finishPromises[index] = data
                    secondIndex++;

                    if(secondIndex === promises.length) {
                        resolve(finishPromises)
                    }
                })
                .catch((rej) => reject(rej))
        }
    })
}

const resolve = (value, timeout) =>
    new Promise((res) => setTimeout(res, timeout, value))

const reject = (value, timeout) =>
    new Promise((_, rej) => setTimeout(rej, timeout, value))

promiseAll([resolve(1, 200), resolve(2, 300), resolve(3, 100)])
    .then(console.log)

// promiseAll([reject(1, 200), reject(2, 500), resolve(3, 1000)])
//     .then(console.error)
