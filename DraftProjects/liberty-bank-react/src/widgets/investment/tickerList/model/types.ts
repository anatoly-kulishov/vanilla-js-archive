export interface ITickerItem {
  item: {
    name: string;
    currentValue: number;
    changedValue: number;
    changedValueInPercent: number;
    change: string;
  };
}
