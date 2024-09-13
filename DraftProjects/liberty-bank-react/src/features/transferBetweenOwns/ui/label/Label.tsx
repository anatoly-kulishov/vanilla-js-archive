import { Text } from '@/shared';
import { TEXT } from '../../model/constants';
import s from './Label.module.scss';

interface Props {
  text: string;
  required?: boolean;
}

export const Label = ({ text, required = true }: Props) => {
  return (
    <Text tag='p' size='s' weight='regular' className={s.labelText}>
      {`${text} `}
      {required && (
        <Text tag='span' size='s' weight='regular' className={s.labelAccent}>
          {TEXT.asterisk}
        </Text>
      )}
    </Text>
  );
};
