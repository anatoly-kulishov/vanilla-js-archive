const testCase = require("../../../../Helpers/testCase");

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
