function fn() {
    console.log('hello'); //

    setTimeout(function () {
        console.log('setTimeout1'); //
    }, 0);

    new Promise(function (resolve) {
        resolve();
        console.log('resolve') //
    }).then(function () {
        console.log('then1'); //
    }).then(function () {
        console.log('then2'); //
    });

    console.log('bye'); //
}

fn();
