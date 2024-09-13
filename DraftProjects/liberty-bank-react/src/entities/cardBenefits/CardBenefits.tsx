import classNames from 'classnames';
import { Text, useGetCardProductBenefitsQuery, Icon } from '@/shared';
import { TEXT, ICON_NAMES } from './constants';
import styles from './CardBenefits.module.scss';

interface Props {
  typeName: string;
}

export const CardBenefits = ({ typeName }: Props) => {
  const { data } = useGetCardProductBenefitsQuery(typeName);
  const benefits = data?.cardProductBenefits || [];

  if (!benefits.length) {
    return null;
  }

  return (
    <div className={styles['benefits']}>
      <Text tag='h3' size='xl' weight='bold' className={styles['benefits__title']}>
        {TEXT.title.benefits}
      </Text>
      <ul
        className={classNames(
          styles['benefits__list'],
          benefits.length >= 4 && styles['benefits__list_align_start'],
        )}
      >
        {benefits.map((benefit) => (
          <li key={benefit.description} className={styles['benefit']}>
            <Icon
              icon={ICON_NAMES[benefit.benefitType] || ICON_NAMES.default}
              widthAndHeight={'48'}
            />
            <div className={styles['benefit__description-wrapper']}>
              <Text tag='h4' size='m' weight='medium'>
                {benefit.title || TEXT.description.noData}
              </Text>
              <Text tag='p' size='s' weight='regular' className={styles['benefit__description']}>
                {benefit.description || TEXT.description.noData}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
