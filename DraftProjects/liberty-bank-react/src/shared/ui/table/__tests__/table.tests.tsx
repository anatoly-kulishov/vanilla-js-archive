import { render } from '@testing-library/react';
import { Table } from '../table';

describe('Table tests', () => {
  test('Renders correctly', () => {
    const tableData = {
      head: {
        columns: [
          {
            value: 'one',
          },
          {
            value: 'two',
          },
          {
            value: 'three',
          },
        ],
      },
      content: [
        {
          three: 3,
        },
      ],
    };
    const { getByRole } = render(<Table {...tableData} />);
    expect(getByRole('table')).toBeInTheDocument();
    expect(getByRole('columnheader', { name: /one/ })).toBeInTheDocument();
    expect(getByRole('cell', { name: /3/ })).toBeInTheDocument();
  });

  test('Renders correctly without header', () => {
    const tableData = {
      head: null,
      content: [
        {
          one: 1,
          two: 2,
          three: 3,
        },
      ],
    };
    const { queryByRole } = render(<Table {...tableData} />);
    expect(queryByRole('columnheader')).not.toBeInTheDocument();
  });

  test('Applies custom classes correctly', () => {
    const tableData = {
      head: {
        columns: [
          {
            value: 'one',
          },
          {
            value: 'two',
          },
          {
            value: 'three',
            tcStyle: 'third-column-style',
          },
        ],
      },
      content: [
        {
          three: 3,
        },
      ],
      tHeadStyle: 'header-style',
      tBodyStyle: 'body-style',
    };
    const { queryAllByRole, getByRole } = render(<Table {...tableData} />);
    expect(queryAllByRole('rowgroup')[0]).toHaveClass('header-style');
    expect(queryAllByRole('rowgroup')[1]).toHaveClass('body-style');
    expect(getByRole('cell', { name: /3/ })).toHaveClass('third-column-style');
  });
});
