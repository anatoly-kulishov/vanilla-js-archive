import { Button, Image, TSvgImageNames, Text } from '@/shared';
import { Link } from 'react-router-dom';
import {
  ASSET_PATH,
  ASSETS_COLUMNS,
  ASSETS_BUTTONS,
  ASSETS_OPERATIONS,
  COMISSION,
  EMPTY_AMOUNT,
  STATEMENT,
} from '../consts';
import { Fragment, useEffect, useState } from 'react';
import { Filter, Intention, AssetOperation } from '../model/types';
import s from './LKbriefcaseOperationsHistoryAssets.module.scss';

const LKbriefcaseOperationsHistoryAssets = () => {
  const [filters, setFilters] = useState<Filter>({ 'Все события': true });
  const [operations, setOperations] = useState<AssetOperation[]>(ASSETS_OPERATIONS);

  useEffect(() => {
    if (filters['Все события']) {
      setOperations(ASSETS_OPERATIONS);
    } else {
      if (!Object.values(filters).includes(true)) {
        setOperations(ASSETS_OPERATIONS);
      } else {
        setOperations(
          ASSETS_OPERATIONS.filter((operation) => filters[Intention[operation.intention]]),
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
          {ASSETS_BUTTONS.map((name: string) => {
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
            {ASSETS_COLUMNS.map((column: string) => {
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
          {operations.map((operation: AssetOperation, index: number) => {
            return (
              <Fragment key={index}>
                <tr className={s['table-tr']}>
                  <td className={s['table-date']}>
                    <Text tag='span' weight={'medium'} size='s'>
                      {operation.created.split(' ')[0]}
                    </Text>
                    <Text tag='span' weight={'medium'} size='s'>
                      {operation.created.split(' ')[1]}
                    </Text>
                  </td>
                  <td>
                    <Link to={ASSET_PATH + operation.moex_id} className={s['table-ticker']}>
                      <Image
                        image={operation.moex_id as TSvgImageNames}
                        width='45px'
                        height='45px'
                      />
                      <Text tag='span' weight={'medium'} size='s'>
                        {operation.moex_id}
                      </Text>
                    </Link>
                  </td>
                  <td>
                    <Text tag='span' weight={'medium'} size='s'>
                      {Intention[operation.intention]}
                    </Text>
                  </td>
                  <td>
                    <Text tag='span' weight={'medium'} size='s'>
                      {operation.amount}
                    </Text>
                  </td>
                  <td>
                    <Text
                      tag='span'
                      weight={'medium'}
                      size='s'
                      className={operation.intention === 1 ? s.negative : s.positive}
                    >
                      {`${operation.intention === 1 ? '-' : '+'} ${
                        operation.amount * operation.price
                      } ₽`}
                    </Text>
                  </td>
                </tr>
                <tr className={s['table-tr']}>
                  <td className={s['table-date']}>
                    <Text tag='span' weight={'medium'} size='s'>
                      {operation.created.split(' ')[0]}
                    </Text>
                    <Text tag='span' weight={'medium'} size='s'>
                      {operation.created.split(' ')[1]}
                    </Text>
                  </td>
                  <td>
                    <div className={s['table-ticker']}>
                      <Image image={'comission' as TSvgImageNames} width='45px' height='45px' />
                      <Text tag='span' weight={'medium'} size='s'>
                        {COMISSION}
                      </Text>
                    </div>
                  </td>
                  <td>
                    <Text tag='span' weight={'medium'} size='s'>
                      {' '}
                    </Text>
                  </td>
                  <td>
                    <Text tag='span' weight={'medium'} size='s'>
                      {EMPTY_AMOUNT}
                    </Text>
                  </td>
                  <td>
                    <Text
                      tag='span'
                      weight={'medium'}
                      size='s'
                    >{`- ${operation.comission} ₽`}</Text>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default LKbriefcaseOperationsHistoryAssets;
