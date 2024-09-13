// words: ['Слово', 'Слова', 'Слов']
export function endingBasedQuantity(quantity: number, words: [string, string, string]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    quantity % 100 > 4 && quantity % 100 < 20 ? 2 : cases[quantity % 10 < 5 ? quantity % 10 : 5]
  ];
}
