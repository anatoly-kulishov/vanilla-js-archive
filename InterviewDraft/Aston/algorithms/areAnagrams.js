/**
 * Если длина обоих слов различается, то они не могут быть анаграммами, и мы возвращаем false.
 * Мы создаем объект charCount для подсчета количества каждой буквы в первом слове word1.
 * Затем проходим по каждому символу во втором слове word2 и проверяем, есть ли этот символ в объекте charCount и количество символов неотрицательное
 * (чтобы избежать случаев, когда во втором слове букв больше, чем в первом).
 * Если все проверки пройдены успешно, то слова являются анаграммами, и мы возвращаем true.
 */
function areAnagrams(word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }

  const charCount = {};

  // Подсчет количества каждой буквы в первом слове
  for (let char of word1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Проверка, что все буквы во втором слове есть в charCount и их количество совпадает
  for (let char of word2) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }

  return true;
}

const word1 = "llaa";
const word2 = "alla";

const result = areAnagrams(word1, word2);
console.log(result); // Output: true
