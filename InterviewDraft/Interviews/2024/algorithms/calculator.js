/**
 * Задача: "Цепочка вызовов методов"
 *
 * Создайте конструктор Calculator, который создает объект калькулятора.
 * Калькулятор должен поддерживать следующие операции: add, subtract, multiply, divide.
 * Каждая операция должна возвращать this для возможности цепочки вызовов.
 * Метод equals должен возвращать результат вычислений.
 *
 * Пример использования:
 * const calc = new Calculator(10);
 * console.log(calc.add(5).subtract(3).multiply(2).divide(2).equals()); // Должно вывести 12
 *
 * Дополнительно:
 * - Добавьте метод clear(), который сбрасывает текущее значение на начальное
 * - Реализуйте защиту от деления на ноль
 */

function Calculator(initialValue) {
    // Ваш код здесь
}

// Тесты
const calc = new Calculator(10);
console.log(calc.add(5).subtract(3).multiply(2).divide(2).equals()); // Должно вывести 12
console.log(calc.clear().add(3).multiply(2).equals()); // Должно вывести 6
console.log(calc.divide(0).equals()); // Должно вывести сообщение об ошибке и вернуть предыдущий результат
