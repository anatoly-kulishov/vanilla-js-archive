import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ACCOUNT_STATUS_TYPE,
  Button,
  CardImage,
  CopyButton,
  ICardInfo,
  ICreditCardInfo,
  PATH_PAGE,
  StatusLabel,
  Text,
  maskNumber,
} from '@/shared';
import { CARD_STATUS_TEXT, MY_CARD_TEXT } from '../constants';
import s from './MyCardInfo.module.scss';

interface IMyCardInfo {
  cardInfo: ICardInfo | ICreditCardInfo;
}

export const MyCardInfo: FC<IMyCardInfo> = ({ cardInfo }) => {
  const navigate = useNavigate();

  const {
    cardStatus,
    expiredAt,
    closedAt,
    currency,
    cardNumber,
    paymentSystem,
    typeName,
    securityCode,
    balance,
    cardName,
  } = cardInfo;

  const accountStatus =
    ACCOUNT_STATUS_TYPE[cardStatus.toLocaleLowerCase() as keyof typeof ACCOUNT_STATUS_TYPE];
  const expirationDate = useMemo(() => {
    if (closedAt) {
      return closedAt;
    }
    if (expiredAt && !closedAt) {
      return expiredAt;
    }

    return MY_CARD_TEXT.noData;
  }, [closedAt, expiredAt]);

  const handleTransferClick = () => {
    navigate(`${PATH_PAGE.transfers.home}`);
  };

  return (
    <div className={s.wrapper}>
      <CardImage typeName={typeName} paymentSystem={paymentSystem} currency={currency} />
      <div className={s.infoWrapper}>
        <div className={s.block}>
          <div>
            <div className={s.header}>
              <Text tag='h2' size='xl' weight='bold'>
                {cardName}
              </Text>
              <div className={s.statusWrapper}>
                {<StatusLabel type={accountStatus} text={CARD_STATUS_TEXT[cardStatus]} size='m' />}
                {'favourite' in cardInfo && cardInfo.favourite && (
                  <StatusLabel type='info' text={MY_CARD_TEXT.mainCard} size='m' />
                )}
              </div>
            </div>
            <Text tag='p' size='xl' weight='bold' className={s.balance}>
              {balance !== null && !isNaN(balance)
                ? balance.toLocaleString('ru-RU', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: currency,
                  })
                : MY_CARD_TEXT.noData}
            </Text>
            <div className={s.body}>
              <div className={s.columnWrapper}>
                <div className={s.itemWrapper}>
                  <Text tag='p' size='m' weight='medium' className={s.textValue}>
                    {maskNumber(cardNumber)}
                  </Text>
                  <div className={s.copyBtnWrapper}>
                    <CopyButton value={cardNumber} />
                  </div>
                </div>
                <Text tag='p' size='xs' weight='regular' className={s.textCaption}>
                  {MY_CARD_TEXT.cardNumber}
                </Text>
              </div>
              <div className={s.columnWrapper}>
                <div className={s.itemWrapper}>
                  <Text tag='p' size='m' weight='medium' className={s.textValue}>
                    {MY_CARD_TEXT.maskSecurityCode}
                  </Text>
                  <CopyButton value={securityCode} />
                </div>
                <Text tag='p' size='xs' weight='regular' className={s.textCaption}>
                  {MY_CARD_TEXT.securityCode}
                </Text>
              </div>
              <div className={s.columnWrapper}>
                <div className={s.itemWrapper}>
                  <Text tag='p' size='m' weight='medium' className={s.textValue}>
                    {expirationDate}
                  </Text>
                  <CopyButton value={expirationDate} />
                </div>
                <Text tag='p' size='xs' weight='regular' className={s.textCaption}>
                  {MY_CARD_TEXT.closeDate}
                </Text>
              </div>
            </div>
          </div>
          <div className={s.buttonWrapper}>
            <Button
              type='button'
              width='max'
              disabled={cardStatus !== 'ACTIVE'}
              onClick={handleTransferClick}
              className={s.button}
            >
              {MY_CARD_TEXT.transfer}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
