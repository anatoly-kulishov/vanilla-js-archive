import { Text, Icon } from '@/shared';
import styles from './insuranceDmsTariffs.module.scss';
import { SELECT_TARIFF } from './constants';

interface ID {
  index: string;
  standart: string;
  standartplus: string;
  premium: string;
  vip: string;
}

export const InsuranceDmsTariffs = ({
  tariffsHeader,
  tariffsBody,
}: {
  tariffsHeader: ID[];
  tariffsBody: ID[];
}) => {
  function displaysData(argument: string) {
    if (argument !== 'yes' && argument !== 'no') {
      return argument;
    } else {
      return (
        <Icon
          icon={argument === 'yes' ? 'yes' : 'close-white'}
          widthAndHeight={'28px'}
          color={argument === 'yes' ? '#005AFE' : '#E4E7EA'}
        />
      );
    }
  }

  return (
    <div className={styles['tariff']}>
      <Text tag='p' size='xl' weight='bold'>
        {SELECT_TARIFF}
      </Text>
      <div className={styles['tariff-table']}>
        <table className={styles['tariff-table-table']}>
          <thead>
            {tariffsHeader.map((item) => {
              return (
                <tr key={item.index}>
                  <td className={styles['td-index']}>{displaysData(item.index)}</td>
                  <td>{displaysData(item.standart)}</td>
                  <td>{displaysData(item.standartplus)}</td>
                  <td>{displaysData(item.premium)}</td>
                  <td>{displaysData(item.vip)}</td>
                </tr>
              );
            })}
          </thead>
          <tbody>
            {tariffsBody.map((item) => {
              return (
                <tr key={item.index}>
                  <td className={styles['td-index']}>{displaysData(item.index)}</td>
                  <td>{displaysData(item.standart)}</td>
                  <td>{displaysData(item.standartplus)}</td>
                  <td>{displaysData(item.premium)}</td>
                  <td>{displaysData(item.vip)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
