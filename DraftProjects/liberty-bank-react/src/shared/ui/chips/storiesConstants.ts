import { ArgTypes } from '@storybook/react';

export const componentDescription = {
  component: `
  Чипы позволяют пользователям совершать определённый выбор, часто используются для фильтрации контента отображаемого пользователю.
  
  Хотя Chips добавлен сюда как отдельный компонент, чаще всего он используется внутри какой-либо формы ввода.`,
};
export const componentArgTypes: Partial<ArgTypes> = {
  values: {
    description:
      'Позволяет определить количество отображаемых элементов и их содержимое. Тип данных: `string[]`',
    control: 'array',
    table: { type: { summary: null } },
  },
  type: {
    description: 'Позволяет определить тип переключателя. Тип данных: `"checkbox" | "radio"`',
    control: 'inline-radio',
    options: ['checkbox', 'radio'],
    table: { type: { summary: null } },
  },
  viewType: {
    description:
      'Позволяет выбрать тип отображения элементов компонента. Тип данных: `"buttons" | "dots"`',
    control: 'inline-radio',
    options: ['buttons', 'dots'],
    table: {
      type: { summary: null },
      defaultValue: { summary: 'buttons' },
    },
  },
  defaultCheck: {
    description:
      'Позволяет выбрать элемент, который будет выбран по умолчанию при первом отображении компонента. Тип данных: `string`',
    type: 'string',
    table: { type: { summary: null } },
  },
};
