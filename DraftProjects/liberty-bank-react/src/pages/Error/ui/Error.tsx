import { useLocation, useNavigate } from 'react-router-dom';
import { InfoFrame, CardType, TAllImages } from '@/shared';
import { DataError } from '../constant';
import styles from './Error.module.scss';

const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.state?.path;
  const message = location.state?.error?.data?.message || location.state?.error?.data?.errorMessage;
  const status = location.state.error?.status?.toString();

  // eslint-disable-next-line no-console
  console.log(status, message);

  return (
    <div className={styles['body-block']}>
      {DataError.map((item) => {
        if (item.status === status) {
          return (
            <InfoFrame
              key={item.id}
              icon={{
                image: `${item.status}` as TAllImages,
                height: `${item.height}`,
                width: `${item.width}`,
              }}
              primaryBtnText={'Вернуться на шаг назад'}
              underImageTitle={message}
              cardType={CardType.error}
              onPrimaryButtonClick={path ? () => navigate(path) : () => navigate(-1)}
            />
          );
        }
      })}
    </div>
  );
};

export default Error;
