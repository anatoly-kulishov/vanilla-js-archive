import {
  ChangeEvent,
  MouseEvent,
  useState,
  forwardRef,
  SetStateAction,
  useEffect,
  FocusEvent,
} from 'react';
import { InputText } from '../InputText/InputText';
import { IInputDateProps } from './types';
import { Icon } from '@/shared';
import styles from './InputDate.module.scss';
import Calendar from 'react-calendar';
import classNames from 'classnames';
import { CALENDAR_PROPS } from './const';

export const InputDate = forwardRef<HTMLInputElement, IInputDateProps>((props, ref) => {
  const {
    value: valueProp,
    onChange: onChangeProp,
    contentRight: contentRightProp,
    onBlur: onBlurProp,
    ...rest
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(valueProp || undefined);

  useEffect(() => {
    if (valueProp && !date) setDate(valueProp);
  }, [valueProp]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setDate(new Date(e.target.value));
    onChangeProp?.(e);
  };

  const onClick = (e: MouseEvent) => {
    if (!props.disabled) {
      e.stopPropagation();
      setIsOpen((s) => !s);
    }
  };

  const onClickDay = (e: SetStateAction<Date | undefined>) => {
    setDate(e);
    onChangeProp?.(e as unknown as ChangeEvent<HTMLInputElement>);
    onBlurProp?.(e as unknown as FocusEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  const contentRight = [
    <Icon
      key='calendar'
      icon={'calendar'}
      onClick={onClick}
      className={props.isError ? styles.isError : styles.isNotError}
    />,
    contentRightProp,
  ];

  return (
    <div className={styles.inputDate}>
      <InputText
        ref={ref}
        value={date ? date.toLocaleDateString() : undefined}
        contentRight={contentRight}
        onChange={onChange}
        readOnly
        {...rest}
      />
      {isOpen && (
        <div className={styles.container}>
          <Calendar
            value={date}
            onClickDay={onClickDay}
            className={classNames(styles.content__total_calendar, styles.calendar)}
            {...CALENDAR_PROPS}
          />
        </div>
      )}
    </div>
  );
});

InputDate.displayName = 'InputDate';
