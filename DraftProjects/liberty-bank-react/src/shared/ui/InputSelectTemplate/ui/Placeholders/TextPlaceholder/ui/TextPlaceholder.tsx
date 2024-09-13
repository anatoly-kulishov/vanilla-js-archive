import { Text } from '@/shared';
import s from './TextPlaceholder.module.scss';

interface Props {
  text: string;
}

export const TextPlaceholder = ({ text }: Props) => {
  return (
    <div className={s.wrapper}>
      <Text tag='span' size='s' weight='medium' className={s.text}>
        {text}
      </Text>
    </div>
  );
};
