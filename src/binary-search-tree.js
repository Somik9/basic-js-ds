const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      let current = this.rootNode;

      while (true) {
        if (data < current.data) {
          if (!current.left) {
            current.left = newNode;
            break;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            break;
          }
          current = current.right;
        }
      }
    }
  }

  has(data) {
    let current = this.rootNode;

    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this.rootNode;

    while (current) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    let current = this.rootNode;
    let parent = null;

    while (current) {
      if (data < current.data) {
        parent = current;
        current = current.left;
      } else if (data > current.data) {
        parent = current;
        current = current.right;
      } else {
        if (!current.left && !current.right) {
          if (!parent) {
            this.rootNode = null;
          } else if (parent.left === current) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        } else if (!current.left) {
          if (!parent) {
            this.rootNode = current.right;
          } else if (parent.left === current) {
            parent.left = current.right;
          } else {
            parent.right = current.right;
          }
        } else if (!current.right) {
          if (!parent) {
            this.rootNode = current.left;
          } else if (parent.left === current) {
            parent.left = current.left;
          } else {
            parent.right = current.left;
          }
        } else {
          let minRight = current.right;
          let minRightParent = current;
          while (minRight.left) {
            minRightParent = minRight;
            minRight = minRight.left;
          }

          current.data = minRight.data;

          if (minRightParent.left === minRight) {
            minRightParent.left = minRight.right;
          } else {
            minRightParent.right = minRight.right;
          }
        }
        return;
      }
    }
  }

  min() {
    if (!this.rootNode) return null;
    let current = this.rootNode;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootNode) return null;
    let current = this.rootNode;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};