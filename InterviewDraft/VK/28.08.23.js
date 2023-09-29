/**
 * Обход Бинарного дерева
  1) Написать класс ноду для Бинарного дерева (Само дерево со всеми методами можно не писать)
  2) Затем функцию для проверки правильности этого дерева
  Имеется ввиду которая, рекурсивно будет смотреть чтобы левый дочерний элемент был меньше чем родительский, а правый больше
  По итогу проходится по всем элементам, и возвращает true если все узлы проходят условия
 */
class BinaryTree {
  constructor() {
    this.root = null;
  }
}

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.rigth = null;
  }
}

const node = new TreeNode();

function isBinaryTree(node) {
  const isCorrectNodeValues = node.left.value < node.value && node.value < node.rigth.value;

  if (node.left !== null && isCorrectNodeValues) {
    isBinaryTree(node.left);
  }

  if (node.rigth !== null && isCorrectNodeValues) {
    isBinaryTree(node.rigth);
  }

  return false;
}

isBinaryTree(node);
