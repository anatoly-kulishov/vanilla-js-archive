import { InsuranceCard } from '@/entities/insuranceCard';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { InsuranceProduct } from '../constants';
import styles from './InsuranceList.module.scss';
import { INSURANCE_INFO, InsuranceType } from '@/shared/consts/insuranceInfo.ts';

interface InsuranceListProps {
  insuranceData: InsuranceProduct[];
}

export const InsuranceList: FC<InsuranceListProps> = ({ insuranceData }) => {
  const navigate = useNavigate();

  return (
    <div className={styles['cardList']}>
      {insuranceData.length > 0 &&
        insuranceData.map((product) => (
          <InsuranceCard
            key={product.attributes.id_product}
            name={product.attributes.name}
            imgName={INSURANCE_INFO[product.attributes.name as InsuranceType].imgName}
            onButtonClick={() =>
              navigate(INSURANCE_INFO[product.attributes.name as InsuranceType].path, {
                state: {
                  name: product.attributes.name,
                  style: INSURANCE_INFO[product.attributes.name as InsuranceType].style,
                  pathCalculation:
                    INSURANCE_INFO[product.attributes.name as InsuranceType].pathCalculation,
                  id: product.attributes.id_product,
                },
              })
            }
            style={INSURANCE_INFO[product.attributes.name as InsuranceType].style}
          />
        ))}
    </div>
  );
};
