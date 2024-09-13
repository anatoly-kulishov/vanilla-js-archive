/* eslint-disable */

const enRuReplacer = {
  q: 'й',
  w: 'ц',
  e: 'у',
  r: 'к',
  t: 'е',
  y: 'н',
  u: 'г',
  i: 'ш',
  o: 'щ',
  p: 'з',
  '[': 'х',
  '{': 'х',
  ']': 'ъ',
  '}': 'ъ',
  a: 'ф',
  s: 'ы',
  d: 'в',
  f: 'а',
  g: 'п',
  h: 'р',
  j: 'о',
  k: 'л',
  l: 'д',
  ';': 'ж',
  ':': 'ж',
  "'": 'э',
  z: 'я',
  x: 'ч',
  c: 'с',
  v: 'м',
  b: 'и',
  n: 'т',
  m: 'ь',
  ',': 'б',
  '<': 'б',
  '.': 'ю',
  '>': 'ю',
  '?': ','
}

const ruEnReplacer = {
  й: 'q',
  ц: 'w',
  у: 'e',
  к: 'r',
  е: 't',
  н: 'y',
  г: 'u',
  ш: 'i',
  щ: 'o',
  з: 'p',
  ф: 'a',
  ы: 's',
  в: 'd',
  а: 'f',
  п: 'g',
  р: 'h',
  о: 'j',
  л: 'k',
  д: 'l',
  я: 'z',
  ч: 'x',
  с: 'c',
  м: 'v',
  и: 'b',
  т: 'n',
  ь: 'm'
}

const replaceSymbols = (word, replacer) => {
  let newWord = ''
  word
    .split('')
    .forEach(item => (newWord += replacer[item.toLowerCase()] || item))
  return newWord
}

export const toRuLayout = word => {
  return replaceSymbols(word, enRuReplacer);
};

export const toEnLayout = word => {
  return replaceSymbols(word, ruEnReplacer);
};

export const changeLayout = word => {
  const changedWord = word.split("").map(char => {
    return enRuReplacer[char] || ruEnReplacer[char] || char;
  });
  return changedWord.join("");
};

export const findItems = (item, array, ruArray) => {
  const ruItem = toRuLayout(item)
  return array.filter((_, index) => ruArray[index].includes(ruItem))
};

export const findItem = (item, array, ruArray) => {
  const ruItem = toRuLayout(item)
  return array.find((_, index) => ruArray[index] === ruItem)
};

export const getRuLayoutArray = words => {
  return words.map(word => {
    return replaceSymbols(word, enRuReplacer)
  })
}
