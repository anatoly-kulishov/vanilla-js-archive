import { DetailedHTMLProps, HTMLAttributes, forwardRef, ChangeEvent } from 'react';
import classNames from 'classnames';
import { Icon, IIconProps, Text } from '..';
import styles from './RadioButton.module.scss';
interface IRadioButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  value: string;
  name: string;
  label?: string;
  subLabel?: string;
  icon?: IIconProps;
  inputSide?: 'right' | 'left';
  transparent?: boolean;
  size?: 's' | 'm';
  width?: 'auto' | 'max';
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  hideCircle?: boolean;
  onChange?: (() => void) | ((e: ChangeEvent<HTMLInputElement>) => void);
}

export const RadioButton = forwardRef<HTMLInputElement, IRadioButtonProps>(
  (
    {
      value,
      label,
      subLabel,
      name,
      icon,
      inputSide = 'right',
      transparent,
      size = 'm',
      width = 'max',
      checked,
      disabled,
      hideCircle,
      onChange,
    },
    ref,
  ) => {
    return (
      <label
        className={classNames(
          styles['radio'],
          {
            [styles['radio_transparent']]: transparent,
            [styles['radio_checked']]: checked,
            [styles['radio_no-checked']]: hideCircle,
            [styles['radio_side']]: inputSide === 'left',
          },
          styles[`radio_size_${size}`],
          styles[`radio_width_${width}`],
        )}
        htmlFor={label}
      >
        <div className={styles['radio__label-container']}>
          <div className={styles['radio__label-content']}>
            {icon?.icon && (
              <Icon icon={icon.icon} width={icon.width || '40'} height={icon.height || '40'} />
            )}
            {!subLabel ? (
              <span
                className={classNames(
                  styles['radio__label'],
                  {
                    [styles['radio__label_no-margin']]: icon === undefined,
                  },
                  [styles[`radio__label_size_${size}`]],
                )}
              >
                {label}
              </span>
            ) : (
              <div className={styles['radio__sub-container']}>
                <span
                  className={classNames(
                    styles['radio__label'],
                    {
                      [styles['radio__label_no-margin']]: icon === undefined,
                    },
                    [styles[`radio__label_size_${size}`]],
                  )}
                >
                  {label}
                </span>
                <Text tag='span' size='s' weight='medium' className={styles['radio__sub-label']}>
                  {subLabel}
                </Text>
              </div>
            )}
          </div>
        </div>
        <input
          name={name}
          type='radio'
          className={classNames(styles['radio__input'], {
            [styles['radio_circle']]: hideCircle,
          })}
          id={label}
          value={value}
          checked={checked}
          disabled={disabled}
          autoFocus={true}
          onChange={onChange}
          ref={ref}
        />
      </label>
    );
  },
);

RadioButton.displayName = 'RadioButton';
