import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDepositProductList } from '@/widgets';
import {
  NotifyContext,
  PATH_PAGE,
  Spinner,
  getDaysUntilDate,
  useGetUsersDepositsQuery,
  useNotify,
} from '@/shared';
import { createNotificationBody } from './utils';

const NOTIFICATION_TITLE = 'Закрытие депозита';

const UserDepositsPage = () => {
  const value = useContext(NotifyContext);
  const { error, data: userDepositList, isLoading } = useGetUsersDepositsQuery();
  const { warning } = useNotify();

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];

    userDepositList?.forEach((el) => {
      const daysLeft = getDaysUntilDate(el.closeDate);
      const timeoutId = setTimeout(() => {
        const notificationExists = value.some(
          (notification) => notification.title === NOTIFICATION_TITLE,
        );

        if (!notificationExists && daysLeft === 0) {
          warning({
            title: NOTIFICATION_TITLE,
            label: createNotificationBody(el.name, el.depAccountNumber),
            delay: 20000,
          });
        } else if (!notificationExists && daysLeft === 7) {
          warning({
            title: NOTIFICATION_TITLE,
            label: createNotificationBody(el.name, el.depAccountNumber, daysLeft, el.closeDate),
            delay: 20000,
          });
        }
      }, 1000);
      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  }, [userDepositList]);

  if (error) {
    return <Navigate to={PATH_PAGE.error} state={{ error }} replace />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      {userDepositList && <UserDepositProductList userDepositList={userDepositList} />}
    </>
  );
};

export default UserDepositsPage;
