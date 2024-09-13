import type { ArgTypes } from '@storybook/react';
import type { IInputTextProps } from './InputText/types.ts';

export const argTypesText: Partial<ArgTypes<IInputTextProps>> = {
  size: {
    description:
      'Устанавливает размер инпута. Допустимые значения: `"l"` (маленький), `"s"` (средний), `"m"` (большой)',
    control: 'inline-radio',
    options: ['l', 's', 'm'],
    table: { type: { summary: null }, defaultValue: { summary: 'm' } },
  },
  label: {
    description: 'Представляет подпись к элементу ввода. Тип данных: `string`',
    control: 'text',
    table: { type: { summary: null } },
  },
  placeholder: {
    description: 'Устанавливает подсказку в поле для ввода информации. Тип данных: `string`',
    control: 'text',
    table: { type: { summary: null } },
  },
  contentLeft: {
    description: 'Отображает содержимое слева от инпута. Тип данных: `ReactNode`',
    type: 'string',
    table: { type: { summary: null } },
  },
  white: {
    description: 'Определяет будет ли весь инпут белого цвета `$bg_primary`',
    type: 'boolean',
    table: { type: { summary: null }, defaultValue: { summary: false } },
  },
  contentRight: {
    description: 'Отображает содержимое справа от инпута. Тип данных: `ReactNode`',
    type: 'string',
    table: { type: { summary: null } },
  },
  clearable: {
    description:
      'Объект с двумя свойствами: `onClear` - функция, которая вызывается при очистке инпута, и `hide` - булевое значение, указывающее, следует ли скрывать элемент очистки. Если значение `undefined`, элемент очистки не отображается',
    control: 'object',
    table: { type: { summary: null } },
  },
  isError: {
    description: 'Определяет, является ли инпут в состоянии ошибки. Тип данных: `boolean`',
    control: 'boolean',
    table: { type: { summary: null } },
  },
  className: {
    description: 'Дополнительный класс для кастомизации стилей компонента. Тип данных: `string`',
    control: 'text',
    table: { type: { summary: null } },
  },
  required: {
    description: 'Указывает, является ли инпут обязательным для заполнения. Тип данных: `boolean`',
    control: 'boolean',
    table: { type: { summary: null } },
  },
  mask: {
    description:
      'Объект с двумя свойствами: `chars` - регулярное выражение для определения допустимых символов, и `pattern` - шаблон маски. Если значение `undefined`, маска не применяется',
    control: 'object',
    table: { type: { summary: null } },
  },
  isReverseMask: {
    description:
      'Определяет в каком порядке будет применяться маска. `true` - справа налево, `false` - слева направо',
    control: 'boolean',
    table: { type: { summary: null } },
  },
};
