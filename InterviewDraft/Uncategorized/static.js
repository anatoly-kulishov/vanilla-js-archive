class Car {
    static secretNumber = 0;

    constructor(model, color) {
        this.model = model;
        this.color = color;
        Car.secretNumber += 1;
    }

    static staticMethod() {
        console.log('staticMethod()');
    }

    printAllInfo() {
        console.log(`Model: ${this.model}\nColor: ${this.color}\n`)
    }
}

const mazda = new Car('Mazda', 'red');
const bmw = new Car('BWM', 'black');

/**
 * Model: Mazda
 * Color: red
 */
mazda.printAllInfo();

/**
 * Model: BWM
 * Color: black
 */
bmw.printAllInfo();

console.log(Car.staticMethod()); // staticMethod()