import { Button, Text } from '@/shared';
import { useEffect, useState } from 'react';
import { Filter, BalanceOperation } from '../model/types';
import { BALANCE_BUTTONS, BALANCE_OPERATIONS, BALANCE_COLUMNS, STATEMENT } from '../consts';
import s from './LKbriefcaseOperationsHistoryBalance.module.scss';

const LKbriefcaseOperationsHistoryBalance = () => {
  const [filters, setFilters] = useState<Filter>({ 'Все события': true });
  const [operations, setOperations] = useState<BalanceOperation[]>(BALANCE_OPERATIONS);

  useEffect(() => {
    if (filters['Все события']) {
      setOperations(BALANCE_OPERATIONS);
    } else {
      if (!Object.values(filters).includes(true)) {
        setOperations(BALANCE_OPERATIONS);
      } else {
        setOperations(
          BALANCE_OPERATIONS.filter((operation) => filters[operation.transaction_type]),
        );
      }
    }
  }, [filters]);

  const changeFilter = (name: string): void => {
    if (name === 'Все события') {
      setFilters({ ['Все события']: true });
    } else {
      setFilters({ ...filters, [name]: !filters[name], ['Все события']: false });
    }
  };

  return (
    <>
      <div className={s.buttons}>
        <div className={s.filter}>
          {BALANCE_BUTTONS.map((name: string) => {
            return (
              <Button
                key={name}
                type={'button'}
                theme={filters[name] ? 'primary' : 'secondary'}
                className={s.button}
                onClick={() => changeFilter(name)}
              >
                {name}
              </Button>
            );
          })}
        </div>
        <Button type={'button'} theme='tertiary' size='l'>
          {STATEMENT}
        </Button>
      </div>
      <table className={s['table']}>
        <thead className={s['table-head']}>
          <tr className={s['table-tr']}>
            {BALANCE_COLUMNS.map((column: string) => {
              return (
                <th key={column} scope='col'>
                  <Text tag='span' weight={'medium'} size='m'>
                    {column}
                  </Text>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={s['table-body']}>
          {operations.map((operation: BalanceOperation, index: number) => {
            return (
              <tr className={s['table-tr']} key={index}>
                <td>
                  <div className={s['table-date']}>
                    <Text tag='span' weight={'medium'} size='s'>
                      {operation.date_time.split(' ')[0]}
                    </Text>
                    <Text tag='span' weight={'medium'} size='s'>
                      {operation.date_time.split(' ')[1]}
                    </Text>
                  </div>
                </td>
                <td className={s['table-td']}>
                  <Text tag='span' weight={'medium'} size='s'>
                    {operation.transaction_type}
                  </Text>
                </td>
                <td>
                  <Text
                    tag='span'
                    weight={'medium'}
                    size='s'
                    className={
                      operation.transaction_type === 'Пополнение' ? s.positive : s.negative
                    }
                  >
                    {`${operation.transaction_type === 'Пополнение' ? '+' : '-'} ${
                      operation.total
                    } ₽`}
                  </Text>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default LKbriefcaseOperationsHistoryBalance;
