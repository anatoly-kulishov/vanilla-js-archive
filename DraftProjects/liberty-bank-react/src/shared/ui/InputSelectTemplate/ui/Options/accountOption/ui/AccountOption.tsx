import classNames from 'classnames';
import { CURRENCY, Text, Icon } from '@/shared';
import { Currency } from '../model/types';
import s from './AccountOption.module.scss';

interface Props {
  className?: string;
  accountName: string;
  balance: number;
  currency: Currency;
  selected: boolean;
  isInContainer: boolean;
}

export const AccountOption = ({
  className,
  accountName,
  balance,
  currency,
  selected,
  isInContainer,
}: Props) => {
  return (
    <div
      className={classNames(
        s.accountOption,
        { [s.selected]: selected, [s.isInDropdown]: !isInContainer },
        className,
      )}
    >
      <div className={s.accountIconBlock}>
        <Icon icon={CURRENCY[currency].icon} widthAndHeight={'40px'} />
      </div>
      <div className={s.accountTextBlock}>
        <Text tag='p' size='xs' weight='regular' className={classNames(s.accountName, s.text)}>
          {accountName}
        </Text>
        <Text tag='p' size='s' weight='medium' className={s.text}>
          {new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
          }).format(balance)}
        </Text>
      </div>
      {selected && <Icon icon='check-blue' />}
    </div>
  );
};
