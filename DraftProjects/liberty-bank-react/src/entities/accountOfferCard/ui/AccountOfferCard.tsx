import { Link } from 'react-router-dom';
import { Image, Text, TSvgImageNames } from '@/shared';
import { TEXT } from '../model/constants';
import s from './AccountOfferCard.module.scss';

interface Props {
  imageName: TSvgImageNames;
  title: string;
  text: string;
  link: string;
  testId: string;
}

export const AccountOfferCard = ({ imageName, title, text, link, testId }: Props) => {
  return (
    <li>
      <Link to={link} data-testid={testId} className={s.wrapper}>
        <div className={s.textWrapper}>
          <Text tag='h5' size='m' weight='medium' className={s.title}>
            {title}
          </Text>
          <Text tag='p' className={s.description}>
            {text}
          </Text>
          <Text tag='p' size='xs' className={s.link}>
            {TEXT.openAccount}
          </Text>
        </div>
        <Image image={imageName} height={'183px'} width={'131px'} className={s.image} />
      </Link>
    </li>
  );
};
