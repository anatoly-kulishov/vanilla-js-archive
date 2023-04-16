/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const testCase = require("../../../Helpers/testCase");

cons

/**
 * @param head
 * @returns {null}
 */
const reversLinkedList = (head) => {
    let prev = null, next = null;

    while (head) {
        next = head.next
        head.next = prev;
        prev = head;
        head = next;
    }

    return prev;
};

testCase(reversLinkedList([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1], true);
testCase(reversLinkedList([1, 2]), [2, 1]);
testCase(reversLinkedList([]), []);
