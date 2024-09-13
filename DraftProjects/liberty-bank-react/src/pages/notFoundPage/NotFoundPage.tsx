import { Button, Image, PATH_PAGE, Text } from '@/shared';
import { FC } from 'react';
import styles from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Image image={'frame'} width='205.3px' height='200px' />
      <div className={styles.container}>
        <Text tag='p' size='s' weight='bold'>
          Ошибка 404 (Not Found)
        </Text>
        <Button href={PATH_PAGE.root} width='max'>
          Вернуться на главную страницу
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
