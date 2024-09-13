export function saveLastToLocal(ticker: string) {
  const popularList: string[] = localStorage.getItem('lastTickers')
    ? JSON.parse(localStorage.getItem('lastTickers') || '')
    : [];
  const filteredList = popularList.filter((el) => el !== ticker);
  filteredList.unshift(ticker);
  if (filteredList.length >= 4) popularList.pop();
  localStorage.setItem('lastTickers', JSON.stringify(filteredList));
}
