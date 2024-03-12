// O(log n)
function isPalindrome(str) {
  let a_pointer = 0;
  let b_pointer = str.length - 1;

  while (a_pointer < b_pointer) {
    if(str[a_pointer].toLowerCase() !== str[b_pointer].toLowerCase()) {
      return false
    }

    a_pointer++;
    b_pointer--;
  }

  return true
}


// return str === str.split('').reverse().join(''); // O(3*n) = O(n)

console.log(isPalindrome("radar")); // true (палиндром)
console.log(isPalindrome("hello")); // false (не палиндром)
console.log(isPalindrome("level")); // true (палиндром)
