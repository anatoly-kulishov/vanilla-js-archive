function ListNode(x) {
  this.value = x;
  this.next = null;
}

const mergeTwoLists = (list1, list2) => {
  const dummy = new ListNode(-Infinity);
  let prev = dummy;

  while (list1 && list2) {
    if(list1.val < list2.val) {
      prev.next = list1;
      prev = list1;
      list1 = list1.next;
    } else {
      prev.next = list2;
      prev = list2;
      list2 = list2.next;
    }
  }

  if(!list1) prev.next = list2;
  if(!list2) prev.next = list1;

  return dummy.next;
};

console.log('Result:', mergeTwoLists([1, 2, 4], [1, 3, 4])); // [1,1,2,3,4,4]
console.log('Result:', mergeTwoLists([], [])); // []
console.log('Result:', mergeTwoLists([], [0])); // [0]