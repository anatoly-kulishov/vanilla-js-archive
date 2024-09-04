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