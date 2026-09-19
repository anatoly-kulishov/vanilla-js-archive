// Поиск файлов в IDE
function search(term, str) {
    if (!term.length) return true;  // Пустая подстрока всегда найдена
    if (!str.length) return false;  // Если строка пустая, но подстрока не пуста, возвращаем false

    let termIndex = 0;

    for (let char of str) {
        if (char === term[termIndex]) {
            termIndex++;  // Если символы совпали, идем дальше по подстроке
        }
    }

    return termIndex === term.length;  // Если до конца строки не нашли всю подстроку, возвращаем false
}


console.log(search('el', 'crocodile')); // false
console.log(search('le', 'crocodile')); // true
console.log(search('ccd', 'crocodile')); // true
console.log(search('ccod', 'crocoodile')); // true
console.log(search('cdc', 'crocodile')); // false