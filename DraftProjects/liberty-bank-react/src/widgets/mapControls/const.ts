export type TabsType = 'LOCAL_BRANCH' | 'ATM' | 'TERMINAL';
export type TabsValue = 'Отделения' | 'Банкоматы' | 'Терминалы';

export const BRANCHES: { type: TabsType; unit: string; value: TabsValue }[] = [
  { type: 'LOCAL_BRANCH', unit: 'Отделение', value: 'Отделения' },
  { type: 'ATM', unit: 'Банкомат', value: 'Банкоматы' },
  { type: 'TERMINAL', unit: 'Терминал', value: 'Терминалы' },
];

export const IN_CITY = [['Москва', 'Москве']];
