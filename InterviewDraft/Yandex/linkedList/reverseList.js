/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
const reverseList = function(head) {

    if(!head) return null;

    let reversed = null, temp = null;

    while (head) {
        temp = head.next;
        head.next = reversed;
        reversed = head;
        head = temp;
    }

    return reversed;
};