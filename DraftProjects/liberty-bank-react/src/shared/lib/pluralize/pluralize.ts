export const pluralize = (amount: number, arr: [string, string, string]) => {
  const suffixes = new Map([
    ['one', arr[0]],
    ['few', arr[1]],
    ['many', arr[2]],
  ]);

  const rule = new Intl.PluralRules('ru').select(amount);
  const suffix = suffixes.get(rule);
  return `${amount} ${suffix}`;
};
