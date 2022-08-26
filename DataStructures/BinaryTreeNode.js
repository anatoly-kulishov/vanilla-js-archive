/**
 * Each node in a binary tree data structure must have the following properties:
 *
 * key: The key of the node
 * value: The value of the node
 * parent: The parent of the node (null if there is none)
 * left: A pointer to the node's left child (null if there is none)
 * right: A pointer to the node's right child (null if there is none)
 * The main operations of a binary tree data structure are:
 *
 * insert: Inserts a node as a child of the given parent node
 * remove: Removes a node and its children from the binary tree
 * find: Retrieves a given node
 * preOrderTraversal: Traverses the binary tree by recursively traversing each node followed by its children
 * postOrderTraversal: Traverses the binary tree by recursively traversing each node's children followed by the node
 * inOrderTraversal: Traverses the binary tree by recursively traversing each node's left child, followed by the node, followed by its right child
 *
 * Create a class for the BinaryTreeNode with a constructor that initializes the appropriate key, value, parent, left and right properties.
 * Define an isLeaf getter, that uses Array.prototype.length to check if both left and right are empty.
 * Define a hasChildren getter, that is the reverse of the isLeaf getter.
 * Create a class for the BinaryTree with a constructor that initializes the root of the binary tree.
 * Define a preOrderTraversal() generator method that traverses the binary tree in pre-order, using the yield* syntax to recursively delegate traversal to itself.
 * Define a postOrderTraversal() generator method that traverses the binary tree in post-order, using the yield* syntax to recursively delegate traversal to itself.
 * Define a inOrderTraversal() generator method that traverses the binary tree in in-order, using the yield* syntax to recursively delegate traversal to itself.
 * Define an insert() method, that uses the preOrderTraversal() method to find the given parent node and insert a new child BinaryTreeNode either as the left or right child, depending on the passed options object.
 * Define a remove() method, that uses the preOrderTraversal() method and Array.prototype.filter() to remove a BinaryTreeNode from the binary tree.
 * Define a find() method, that uses the preOrderTraversal() method to retrieve the given node in the binary tree.
 *
 * O(log(n)) [Logarithmic] - At the best case || O(n) [Linear] - At the worst case
 * Inserting
 * Removing
 * Finding
 */

class BinaryTreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class BinaryTree {
  constructor(key, value = key) {
    this.root = new BinaryTreeNode(key, value);
  }

  * inOrderTraversal(node = this.root) {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  * postOrderTraversal(node = this.root) {
    if (node.left) yield* this.postOrderTraversal(node.left);
    if (node.right) yield* this.postOrderTraversal(node.right);
    yield node;
  }

  * preOrderTraversal(node = this.root) {
    yield node;
    if (node.left) yield* this.preOrderTraversal(node.left);
    if (node.right) yield* this.preOrderTraversal(node.right);
  }

  insert(
    parentNodeKey,
    key,
    value = key,
    {left, right} = {left: true, right: true}
  ) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        const canInsertLeft = left && node.left === null;
        const canInsertRight = right && node.right === null;
        if (!canInsertLeft && !canInsertRight) return false;
        if (canInsertLeft) {
          node.left = new BinaryTreeNode(key, value, node);
          return true;
        }
        if (canInsertRight) {
          node.right = new BinaryTreeNode(key, value, node);
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.left.key === key) {
        node.left = null;
        return true;
      }
      if (node.right.key === key) {
        node.right = null;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}

const tree = new BinaryTree(1, 'AB');

console.log(tree.insert(1, 11, 'AC'));                            // true
console.log(tree.insert(1, 12, 'BC'));                            // true
console.log(tree.insert(12, 121, 'BG', {right: true}));  // true

console.log([...tree.preOrderTraversal()].map(x => x.value)); // ['AB', 'AC', 'BC', 'BCG']
console.log([...tree.inOrderTraversal()].map(x => x.value)); // ['AC', 'AB', 'BC', 'BG']

console.log(tree.root.value);       // 'AB'
console.log(tree.root.hasChildren); // true

console.log(tree.find(12).isLeaf);          // false
console.log(tree.find(121).isLeaf);         // true
console.log(tree.find(121).parent.value);   // 'BC'
console.log(tree.find(12).left);            // null
console.log(tree.find(12).right.value);     // 'BG'

console.log(tree.remove(12)); // true

console.log([...tree.postOrderTraversal()].map(x => x.value)); // ['AC', 'AB']