import { Button, Text } from '@/shared';
import { TableInput } from '@/shared/ui/tableInput/TableInput';
import { useNavigate } from 'react-router-dom';
import { InvestmentAssetsTable } from '../investmentAssetsTable/ui/InvestmentAssetsTable';
import styles from './SellAssets.module.scss';
import { ACCOUNTS, CANCEL, INPUT_LABELS } from './const';
import { MySelect } from '../mySelect/MySelect';
import { TableData } from '@/shared/ui/table/table';

interface SellAssetsProps {
  title: string;
  tableData: TableData;
  useCalcWidth: boolean;
  button: {
    text: string;
    onClick: () => void;
  };
}

export const SellAssets = (props: SellAssetsProps) => {
  const {
    title,
    tableData,
    useCalcWidth,
    button: { text: buttonText, onClick },
  } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Text tag='p' size='m' weight='medium'>
          {title}
        </Text>

        {!useCalcWidth && (
          <div className={styles.header}>
            <TableInput value={'7777 2134 7885 3125 6442'} inputLabel={INPUT_LABELS[0]} />
            <MySelect label={'Номер счета поступления'} options={ACCOUNTS} />
          </div>
        )}

        <InvestmentAssetsTable tableData={tableData} />

        <div className={styles.buttons}>
          <Button
            className={styles.cancel}
            theme='third'
            onClick={() => navigate('/investment/lk')}
          >
            {CANCEL}
          </Button>
          <Button className={styles.submit} type='submit' onClick={onClick}>
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};
