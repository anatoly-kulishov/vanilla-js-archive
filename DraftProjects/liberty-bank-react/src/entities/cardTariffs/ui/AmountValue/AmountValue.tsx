import { Text, CurrencyCode } from '@/shared';
import { getTheCost } from '../../lib/utils';
import { TEXT } from '../../constants';

interface Props {
  value: number | number[];
  currency: CurrencyCode[];
  isCanBeFree?: boolean;
}

export const AmountValue = ({ value, currency, isCanBeFree }: Props) => {
  const isZero = Array.isArray(value) ? value.every((item) => item === 0) : value === 0;
  const cost = isZero && isCanBeFree ? TEXT.free : getTheCost(value, currency);

  return (
    <Text tag='p' size='s'>
      {cost}
    </Text>
  );
};
