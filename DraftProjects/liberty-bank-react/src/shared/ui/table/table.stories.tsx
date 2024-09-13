import { Table } from '@/shared/ui/table/table';
import type { Meta, StoryObj } from '@storybook/react';
import { MOCK_RAW_TABLE_DATA } from '@/pages/investmentAccClosureCurrency/ui/InvestmentAccClosureCurrency';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    content: {
      description: 'Данные таблицы',
    },
    head: {
      description: 'Шапка таблицы',
    },
    tBodyStyle: {
      description: 'Кастомные стили для тела таблицы',
    },
    tHeadStyle: {
      description: 'Кастомные стили для шапки таблицы',
    },
  },
  args: {
    head: MOCK_RAW_TABLE_DATA.head,
    content: MOCK_RAW_TABLE_DATA.content,
  },
};

export default meta;

type Story = StoryObj<typeof Table>;
export const TableDefault: Story = { args: {} };
