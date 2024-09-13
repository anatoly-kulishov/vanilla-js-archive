export function getFormattedDate(date: Date, format: 'ru-RU' | 'sv-SE'): string {
  return date.toLocaleString(format, {
    day: 'numeric',
    year: 'numeric',
    month: 'numeric',
  });
}

export function getFormattedTime(date: Date): string {
  const hours = date.getHours();
  const mins = date.getMinutes();

  const formattedHours = hours > 9 ? hours : `0${hours}`;
  const formattedMins = mins > 9 ? mins : `0${mins}`;

  return `${formattedHours}:${formattedMins}`;
}
