import { IInsuranceConditionProps, InsuranceCondition } from '@/entities/insuranceCondition';
import { Text } from '@/shared';
import classNames from 'classnames';
import { FC } from 'react';
import styles from './InsuranceConditions.module.scss';
import { TITLE } from './constants';

interface InsuranceConditionsProps {
  conditions: IInsuranceConditionProps[];
}

export const InsuranceConditions: FC<InsuranceConditionsProps> = ({ conditions }) => {
  return (
    <div className={styles['conditions-block']}>
      <Text tag='h4' size='xl' weight='bold'>
        {TITLE}
      </Text>
      <div
        className={classNames(styles['condition-items'], conditions.length <= 3 && styles['third'])}
      >
        {conditions.map((condition, i) => (
          <InsuranceCondition {...condition} key={`condition-${i}`} />
        ))}
      </div>
    </div>
  );
};
