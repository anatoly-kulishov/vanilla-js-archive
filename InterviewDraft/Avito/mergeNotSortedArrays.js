// Time: O(sort) = O(n log n)
// Memory: O(n + m)
function mergeNotSortedArrays(nums1, nums2) {
    let p1 = 0,
        p2 = 0;
    const result = [];

    while (p1 !== nums1.length || p2 !== nums2.length) {

        if (p2 >= nums2.length || p1 !== nums1.length && nums1[p1] <= nums2[p2]) {
            result.push(nums1[p1])
            p1 += 1
        } else {
            result.push(nums2[p2])
            p2 += 1
        }

    }

    return result;
}

console.log(mergeNotSortedArrays([-2, 3, 3], [-5, 0])) // [-5, -2, 0, 3, 3]
