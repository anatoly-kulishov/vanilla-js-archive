import { PATH_PAGE, Text, Wrapper } from '@/shared';
import { SellAssets } from '@/widgets/sellAssets';
import { useNavigate } from 'react-router-dom';
import { BUTTON_TEXT, COLUMN_NAMES, MOCK_CONTENT, TABLE_TITLE, TITLE } from '../const';
import styles from './InvestmentAccClosureAssets.module.scss';

const InvestmentAccClosureAssets = () => {
  const navigate = useNavigate();

  const navigatePage = () => navigate(PATH_PAGE.investmentAccClosureCurrency);

  const headValues = Object.keys(MOCK_CONTENT[0]);
  headValues.push('sum');
  const head = {
    columns: headValues.map((value) => ({ value: value, name: COLUMN_NAMES[value] || null })),
  };
  const content = MOCK_CONTENT.map((asset) => {
    const res = { ...asset, sum: asset.amount * asset.price || null };
    return res;
  }).sort((a, b) => a.type.localeCompare(b.type));

  const tableData = { head, content, tBodyStyle: styles.tbody_wider };

  return (
    <Wrapper size='l'>
      <div className={styles.body}>
        <Text tag='p' size='m' weight='medium'>
          {TITLE}
        </Text>
        <SellAssets
          title={TABLE_TITLE}
          tableData={tableData}
          useCalcWidth={true}
          button={{
            onClick: navigatePage,
            text: BUTTON_TEXT,
          }}
        />
      </div>
    </Wrapper>
  );
};

export default InvestmentAccClosureAssets;
