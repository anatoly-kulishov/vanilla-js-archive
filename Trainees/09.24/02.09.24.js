/**
 * Имеется магазин, в котором имеется некоторое количество касс.
 * Клиенты приходят в магазин и необходимо рассчитать количество времени через которое все клиенты пройдут эти кассы.
 * Т.е. нужно написать программу или алгоритм для расчёта времени.
 *
 * queueTime ([5,3,4], 1) - где три клиента и каждый проходит кассу 5 минут, 3 минуты и 4 минуты и имеется одна касса.
 * Время прохода будет - 12 минут.
 *
 * queueTime ([10,2,3,3], 2) - где четыре клиента и каждый проходит кассу 10 минут, 2 минуты, 3 минуты и 3 минуты.
 * Имеется две кассы.
 * Время прохода будет - 10 минут."
 */
// function queueTime(customers, tillCount) {
//     // Code here...
// }
//
// console.log(queueTime([5, 3, 4], 1)); // 12
// console.log(queueTime([10, 2, 3, 3], 2)); // 10
// console.log(queueTime([2,2,3,3,4,4], 2)); // 9
// console.log(queueTime([1,2,3,4], 10)); // 4
// console.log(queueTime([1,2,3,4,5], 10)); // 5
// console.log(queueTime([], 1)); // 0

/** **************************************************************************************************************** **/

// function plus(x, y) {
//     return x + y;
// }
//
// Function.prototype.myBind = function (context, ...args) {
//     // Code here...
// }
//
// const plus4 = plus.myBind(null, 4);
//
// console.log(plus4(4)); // 8
// console.log(plus4(6)); // 10

/** **************************************************************************************************************** **/

// class EventEmitter {
//     // Code here...
// }
//
// let a = new EventEmitter();
//
// function console1() {
//     console.log(1);
// }
//
// function console2() {
//     console.log(2);
// }
//
// a.on("event1", console1);
// a.on("event2", console2);
//
// a.emit("event1"); // Output: 1
// a.emit("event2"); // Output: 2
//
// a.off("event2");
//
// a.emit("event1"); // Output: 1

/** **************************************************************************************************************** **/

// const matrix = [
//     [1,   2,   3],
//     [10,  20,  30],
//     [100, 200, 300]
// ];
//
// const n = 20;
//
// const getValueByIndex = (matrix, index) => {
//     // Code here...
// }
//
// function search(matrix, n) {
//     // Code here...
// }
//
// console.log(search(matrix, 30)) // 5

/** **************************************************************************************************************** **/

// const diagonalSort = function (M) {
//     // Code here...
// };
//
// console.log(diagonalSort([
//     [3,3,1,1],
//     [2,2,1,2],
//     [1,1,1,2]
// ]))
/**
 * [
 *   [1,1,1,1],
 *   [1,2,2,2],
 *   [1,2,3,3]
 * ]
 */

/** **************************************************************************************************************** **/

/**
 * Обход Бинарного дерева
 1) Написать класс ноду для Бинарного дерева (Само дерево со всеми методами можно не писать)
 2) Затем функцию для проверки правильности этого дерева
 Имеется ввиду которая, рекурсивно будет смотреть чтобы левый дочерний элемент был меньше чем родительский, а правый больше
 По итогу проходится по всем элементам, и возвращает true если все узлы проходят условия
 */
// class BinaryTree {
//     constructor() {
//         this.root = null;
//     }
// }
//
// class TreeNode {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.rigth = null;
//     }
// }
//
// const node = new TreeNode();
//
// function isBinaryTree(node) {
//     // Code here...
// }
//
// isBinaryTree(node);

/** **************************************************************************************************************** **/

/** Поиск файлов в IDE */
// function search(term, str) {
//    // Code here...
// }
//
// console.log(search('el', 'crocodile')); // false
// console.log(search('le', 'crocodile')); // true
// console.log(search('ccd', 'crocodile')); // true
// console.log(search('ccod', 'crocoodile')); // true
// console.log(search('cdc', 'crocodile')); // false
