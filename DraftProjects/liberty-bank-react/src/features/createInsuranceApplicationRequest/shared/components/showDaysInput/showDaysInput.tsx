import classNames from 'classnames';
import { Icon, Input } from '@/shared';
import { HC_DURATION } from '../../../constants';
import styles from '../../styles/styles.module.scss';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

export const ShowDaysInput = () => {
  const [days, setDays] = useState('');
  const { setValue, getValues } = useFormContext();
  const [startDate, endDate] = getValues(['startDate', 'endDate']);

  useEffect(() => {
    if (startDate && endDate && startDate < endDate) {
      const daysCount = Math.ceil(
        Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24),
      );
      const invalidPeriod =
        daysCount > 365 ||
        new Date(endDate) < new Date() ||
        new Date(startDate).getTime() === new Date(endDate).getTime();
      invalidPeriod ? setDays(' ') : setDays(String(daysCount));
      setValue('duration', daysCount);
    } else {
      setDays('');
    }
  }, [startDate, endDate]);

  return (
    <div className={classNames(styles['form__row'], styles['width-550'])}>
      <div className={styles['form__field']}>
        <Input.Number
          required
          readOnly
          value={days}
          size='m'
          label={HC_DURATION.showInputLabel}
          white
          contentRight={<Icon icon={'days'} height='24px' width='37px' />}
        />
      </div>
    </div>
  );
};
