import { Text } from '@/shared';
import { getPercentValue } from '../../lib/utils';
import { TEXT } from '../../constants';

interface Props {
  value: number;
  type: 'fee' | 'cashback';
  text?: string;
}

export const PercentValue = ({ value, type, text }: Props) => {
  if (type === 'fee') {
    return (
      <Text tag='p' size='s'>
        {value === 0 ? TEXT.noFee : `${getPercentValue(value)}${text ? ` ${text}` : ''}`}
      </Text>
    );
  }

  return (
    <Text tag='p' size='s'>
      {`${getPercentValue(value)}${text ? ` ${text}` : ''}`}
    </Text>
  );
};
