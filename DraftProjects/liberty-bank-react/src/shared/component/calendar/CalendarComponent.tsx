import { FC } from 'react';
import { Icon } from '../..';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './CalendarComponent.module.scss';

export const CalendarComponent: FC<CalendarProps> = (...props) => {
  return (
    <div className={styles.content__total_calendar}>
      <Calendar
        view={'month'}
        navigationLabel={({ label }) => `${label.slice(0, -2)}`}
        prev2Label={<Icon icon={'double-arrow-grey-left'} width={'28'} height={'24'} />}
        prevLabel={<Icon icon={'arrow-left-grey'} width={'24'} height={'19'} />}
        next2Label={<Icon icon={'double-arrow-grey-right'} width={'28'} height={'24'} />}
        nextLabel={<Icon icon={'arrow-right-grey'} width={'24'} height={'19'} />}
        {...props}
      />
    </div>
  );
};
