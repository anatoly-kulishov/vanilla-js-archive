// 1) Создаем конструктор родительского класса
function Animal(name) {
    this.name = name;

    this.sayHello = function () {
        console.log("Привет, я " + this.name);
    }
}

// 2) Добавляем метод к родительскому классу
// Animal.prototype.sayHello = function() {
//     console.log("Привет, я " + this.name);
// };

// 3) Создаем подкласс, наследующий от Animal
function Cat(name, color) {
    // Вызываем конструктор родительского класса
    Animal.call(this, name);
    this.color = color;
}

// 4) Наследуем прототип Animal
Cat.prototype = Object.create(Animal.prototype);

// 5) Добавляем свой метод к подклассу
Cat.prototype.meow = function() {
    console.log(`Мяу ${this.color}!`);
};

// function Animal(name) {}
// function Cat(name, color) {}

var myCat = new Cat("Барсик", "рыжий");

// Проверяем методы
myCat.sayHello(); // Привет, я Барсик
myCat.meow(); // Мяу!
