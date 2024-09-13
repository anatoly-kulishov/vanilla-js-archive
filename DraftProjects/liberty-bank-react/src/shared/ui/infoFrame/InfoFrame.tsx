import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { Button, Text, Checkbox, Link, Icon, IImageProps, Image, Preloader } from '../..';
import style from './InfoFrame.module.scss';

export enum CardType {
  dontOpen = 'dont-open',
  openBill = 'open-bill',
  closeBill = 'close-bill',
  openCard = 'open-card',
  cancelRequest = 'cancel-request',
  applicationSent = 'application-sent',
  applicationDeclined = 'application-declined',
  serviceUnavailable = 'service-unavailable',
  moveOn = 'move-on',
  checkbox = 'checkbox',
  error = 'error',
}
interface IInfoFrame {
  title?: string;
  primaryBtnText?: string;
  onCloseClick?: (value: boolean) => void;
  secondaryBtnText?: string;
  icon?: IImageProps | '';
  subTitle?: string;
  underImageTitle?: string;
  underImageSubTitle?: readonly string[];
  cardType: CardType;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  checkbox?: ICheckbox;
  isLoading?: boolean;
}

interface ICheckbox {
  checked: boolean;
  onChange: () => void;
  text?: string[];
  link: string;
}

export const InfoFrame: FC<PropsWithChildren<IInfoFrame>> = ({
  children,
  title,
  primaryBtnText,
  onCloseClick,
  icon,
  subTitle,
  secondaryBtnText,
  underImageTitle,
  underImageSubTitle,
  cardType,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  checkbox,
  isLoading,
}) => {
  const shouldApplyButtonColor =
    cardType === CardType.closeBill ||
    cardType === CardType.openCard ||
    cardType === CardType.cancelRequest ||
    cardType === CardType.applicationDeclined;

  const handleOnCloseClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (onCloseClick) {
      onCloseClick(false);
    }
    e.preventDefault();
    e.stopPropagation();
  };

  if (isLoading) {
    return (
      <div
        className={classNames(style['bill-container'], style[`${cardType}`], style['preloader'])}
      >
        <Preloader />
      </div>
    );
  }

  return (
    <div className={classNames(style['bill-container'], style[`${cardType}`])}>
      {onCloseClick && (
        <Button theme='icon' onClick={handleOnCloseClick} className={style['close-button']}>
          <Icon icon='close' widthAndHeight='28' fill='#D8DFEA' />
        </Button>
      )}
      {(title || subTitle) && (
        <div className={classNames(style.description, style[`${cardType}__description`])}>
          {title && (
            <Text
              tag='p'
              weight='medium'
              className={classNames(style.title, { [style.title__checbox]: checkbox })}
            >
              {title}
            </Text>
          )}
          {subTitle && (
            <Text
              tag='p'
              weight='medium'
              size='m'
              className={
                cardType === 'close-bill' && subTitle !== undefined
                  ? style['subTitle__close-bill']
                  : style.subTitle
              }
            >
              {subTitle}
            </Text>
          )}
        </div>
      )}
      {underImageTitle ? (
        <div
          className={classNames(style.svgInsideContainer, style[`${cardType}__svgInsideContainer`])}
        >
          {icon && (
            <Image image={icon.image} width={icon.width} height={icon.height} color={icon.color} />
          )}
          <div className={style.description}>
            <Text
              tag='p'
              size='m'
              weight='medium'
              className={classNames(style['under-image-title'], {
                [style[`${cardType}__under-image-title`]]:
                  cardType === 'service-unavailable' ||
                  cardType === 'close-bill' ||
                  cardType === 'open-card' ||
                  cardType === 'error',
              })}
            >
              {underImageTitle}
            </Text>
            {underImageSubTitle?.map((text) => {
              return (
                <Text
                  tag='p'
                  size='xs'
                  weight='regular'
                  key={text}
                  className={style['under-image-subTitle']}
                >
                  {text}
                </Text>
              );
            })}
          </div>
        </div>
      ) : (
        icon && (
          <Image image={icon.image} width={icon.width} height={icon.height} color={icon.color} />
        )
      )}

      {checkbox && (
        <div className={style['checkbox-content']}>
          <Checkbox name='checkbox' checked={checkbox.checked} onChange={checkbox.onChange} />
          <Text tag='p' weight='regular' size='xs' className={style['checkbox-content-text']}>
            {checkbox.text?.map((item, index) => {
              if (index === 1)
                return (
                  <Link key={index} to={checkbox.link}>
                    <Text
                      className={style['checkbox-content-text-click']}
                      tag='span'
                      weight='regular'
                      size='xs'
                    >
                      {item}
                    </Text>
                  </Link>
                );
              return (
                <Text key={index} tag='span' weight='regular' size='xs'>
                  {item}
                </Text>
              );
            })}
          </Text>
        </div>
      )}

      {
        <div
          className={classNames(style.doubleBtn, style[`doubleBtn__${cardType}`], {
            [style['doubleBtn__singleBtn']]: !onSecondaryButtonClick,
          })}
        >
          {onSecondaryButtonClick && (
            <Button
              disabled={checkbox ? !checkbox.checked : false}
              onClick={onSecondaryButtonClick}
              type='button'
              theme={checkbox ? 'secondary' : 'primary'}
              size='m'
              width='max'
              className={classNames(
                style.btn,
                style[`btn__${cardType}`],
                shouldApplyButtonColor && style['btn-left-color'],
              )}
            >
              {secondaryBtnText}
            </Button>
          )}
          {onPrimaryButtonClick && (
            <Button
              onClick={onPrimaryButtonClick}
              type='button'
              theme='primary'
              size='m'
              width='max'
              className={classNames(style.btn, style[`btn__${cardType}`], {
                [style['btn__singleBtn']]: !onSecondaryButtonClick,
              })}
            >
              {primaryBtnText}
            </Button>
          )}
        </div>
      }
      {children}
    </div>
  );
};
