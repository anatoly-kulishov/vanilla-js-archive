import { FC, useEffect, useState } from 'react';
import styles from './PersonalAccountNotification.module.scss';
import {
  Text,
  Checkbox,
  useGetCustomerNotificationsQuery,
  getCustomerId,
  useChangeNotificationsMutation,
  getAccessToken,
  trimQuotesReg,
} from '@/shared';

const NOTIFICATION_TYPES = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
};

const NOTIFICATION = [
  { type: NOTIFICATION_TYPES.EMAIL, name: 'Email-оповещения' },
  { type: NOTIFICATION_TYPES.SMS, name: 'SMS-оповещения' },
  { type: NOTIFICATION_TYPES.PUSH, name: 'Push-оповещения' },
];

const PersonalAccountNotification: FC = () => {
  const accessToken = getAccessToken();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    [NOTIFICATION_TYPES.EMAIL]: false,
    [NOTIFICATION_TYPES.SMS]: false,
    [NOTIFICATION_TYPES.PUSH]: false,
  });
  const { data: customerNotifications } = useGetCustomerNotificationsQuery({
    customerId: getCustomerId(accessToken!),
    accessToken: accessToken!.replace(trimQuotesReg, ''),
  });
  const [changeNotification] = useChangeNotificationsMutation();

  useEffect(() => {
    if (customerNotifications) {
      setCheckedItems({
        [NOTIFICATION_TYPES.EMAIL]: customerNotifications.emailSubscription,
        [NOTIFICATION_TYPES.SMS]: customerNotifications.smsNotification,
        [NOTIFICATION_TYPES.PUSH]: customerNotifications.pushNotification,
      });
    }
  }, [customerNotifications]);

  const handleChange = (type: string) => {
    changeNotification({
      notificationStatus: !checkedItems[type],
      customerId: getCustomerId(accessToken!),
      type,
      accessToken: JSON.parse(accessToken!),
    });
  };

  return (
    <>
      <Text className={styles.text} tag='h3' weight='medium'>
        Уведомления
      </Text>
      <ul className={styles.personalAccountNitification__items}>
        {NOTIFICATION.map((item) => (
          <li className={styles.personalAccountNitification__item} key={item.type}>
            <Checkbox
              checked={checkedItems[item.type]}
              onChange={() => handleChange(item.type)}
              name={item.type}
            />
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonalAccountNotification;
