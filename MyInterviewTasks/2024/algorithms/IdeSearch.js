// Поиск файлов в IDE
function search(term, str) {
    let termIndex = 0;

    for(let char of str) {
        if (char === term[termIndex]) {
            termIndex++
        }
        if (termIndex === term.length) {
            return true
        }
    }

    return false
}

console.log(search('el', 'crocodile')); // false
console.log(search('le', 'crocodile')); // true
console.log(search('ccd', 'crocodile')); // true
console.log(search('ccod', 'crocoodile')); // true
console.log(search('cdc', 'crocodile')); // false