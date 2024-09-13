import { useState } from 'react';
import { NOTIFICATION_BLOCK } from './consts';
import styles from './selectNotifications.module.scss';
import {
  Checkbox,
  Input,
  Text,
  getEnableNotifications,
  getNotificationsPeriod,
  getNotificationsWithPeriodEnable,
  setEnableNotifications,
  setIsSettingsChanged,
  setNotificationsPeriod,
  setNotificationsWithPeriodEnable,
} from '@/shared';
import { useDispatch, useSelector } from 'react-redux';
export const SelectNotifications = () => {
  const dispatch = useDispatch();
  const enabled = useSelector(getEnableNotifications);
  const periodical = useSelector(getNotificationsWithPeriodEnable);
  const timePeriod = useSelector(getNotificationsPeriod);
  const [value, setValue] = useState(timePeriod);

  const onEnabledChange = (isChanged: boolean) => {
    dispatch(setEnableNotifications(!isChanged));
    dispatch(setIsSettingsChanged(true));
  };
  const onPeriodicalChange = (isChanged: boolean) => {
    dispatch(setNotificationsWithPeriodEnable(!isChanged));
    dispatch(setIsSettingsChanged(true));
  };
  const onTimePeriodChange = (period: string) => {
    dispatch(setNotificationsPeriod(period));
    dispatch(setIsSettingsChanged(true));
  };

  return (
    <div className={styles.notificationsBlock}>
      <div className={styles.notificationsBlockItem}>
        <Text tag='p' weight='medium'>
          {NOTIFICATION_BLOCK.enableNotifications}
        </Text>
        <Checkbox name='enabled' checked={enabled} onChange={() => onEnabledChange(enabled)} />
      </div>
      {enabled && (
        <div className={styles.notificationsBlockItem}>
          <Text tag='p' weight='medium'>
            {NOTIFICATION_BLOCK.enablePeriod}
          </Text>
          <Checkbox
            name='periodical'
            checked={periodical}
            onChange={() => onPeriodicalChange(periodical)}
          />
        </div>
      )}
      {periodical && enabled && (
        <div className={styles.notificationsBlockTimeBlock}>
          <Text tag='p' weight='medium'>
            {NOTIFICATION_BLOCK.notificationsPeriod}
          </Text>
          <Input.Text
            id='timePeriod'
            type='time'
            value={value}
            size='s'
            className={styles.timeInput}
            onChange={(e) => {
              setValue(e.target.value);
              onTimePeriodChange(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};
