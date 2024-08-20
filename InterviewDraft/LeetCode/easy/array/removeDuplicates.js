/**
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.
 * The relative order of the elements should be kept the same.
 * Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums.
 * More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result.
 * It does not matter what you leave beyond the first k elements.
 * Return k after placing the final result in the first k slots of nums.
 * Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.
 *
 * 1 <= nums.length <= 3 * 104
 * -100 <= nums[i] <= 100
 * nums is sorted in non-decreasing order.
 */

const testCase = require("../../../../Helpers/testCase");

const removeDuplicates = (nums) => {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            nums.splice(i, 1);
            i--;
        }
    }

    return nums.length;
}

testCase(removeDuplicates([0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4]), 5, true, 'removeDuplicates');
testCase(removeDuplicates([1, 1, 2]), 2);
testCase(removeDuplicates([1, 1]), 1);
testCase(removeDuplicates([]), 0);
