import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountInfo } from '@/entities';
import {
  ACCOUNT_STATUS_TYPE,
  Button,
  CURRENCY,
  CopyButton,
  DotsButton,
  Icon,
  PATH_PAGE,
  StatusLabel,
  TSvgIconNames,
  Text,
  formatDate,
} from '@/shared';
import { MY_BILL_CARD_TEXT } from '../constants';
import { useAddNavigationFunctions } from '../hooks';
import { ACCOUNT_STATUS_TEXT, ACCOUNT_TYPE } from '../hooks/constants';
import styles from './MyBillCard.module.scss';

interface IMyBillProps {
  bill: AccountInfo;
}
const currencyIcons: Record<'RUB' | 'USD' | 'EUR', TSvgIconNames> = {
  RUB: 'ruble',
  EUR: 'euro',
  USD: 'dollar',
};
export const MyBillCard: FC<IMyBillProps> = ({ bill }) => {
  const navigate = useNavigate();
  const accountStatus =
    ACCOUNT_STATUS_TYPE[bill.status.toLocaleLowerCase() as keyof typeof ACCOUNT_STATUS_TYPE];

  const menuClick = useAddNavigationFunctions(bill);

  const handleTransferClick = () => {
    navigate(`${PATH_PAGE.transfers.home}`);
  };

  return (
    <div className={styles['my-bill-card']}>
      <div className={styles['my-bill-card__info']}>
        <Text tag='p'>
          {bill.currency in currencyIcons && (
            <Icon icon={currencyIcons[bill.currency]} widthAndHeight={'40'} />
          )}
        </Text>

        <div className={styles['my-bill-card__block']}>
          <div className={styles['my-bill-card__top']}>
            <div className={styles['my-bill-card__top-desc']}>
              <Text
                tag='p'
                size='m'
                weight='medium'
                className={styles['my-bill-card__top-desc-text']}
                data-testid={'account_type'}
              >
                {ACCOUNT_TYPE[bill.accountType]}
              </Text>
              {
                <StatusLabel
                  type={accountStatus}
                  text={ACCOUNT_STATUS_TEXT[bill.status]}
                  size='m'
                  data-testid={'account_status_label'}
                />
              }
              {bill.isMain && (
                <StatusLabel
                  type='info'
                  text='Основной счет'
                  size='m'
                  data-testid={'main_account_label'}
                />
              )}
            </div>
            <div className={styles['my-bill-card__top-number']}>
              <Text
                tag='p'
                size='s'
                weight='regular'
                className={styles['my-bill-card__top-number-text']}
                data-testid={'account_number'}
              >
                {MY_BILL_CARD_TEXT.accountNumber} {bill.accountNumber}
              </Text>
              <CopyButton value={bill.accountNumber} testId={'account_number_copy_button'} />
            </div>
          </div>

          <div className={styles['my-bill-card__bot']}>
            <div className={styles['my-bill-card__bot-items']}>
              <div className={styles['my-bill-card__bot-item']}>
                <Text
                  tag='p'
                  weight='regular'
                  className={styles['my-bill-card__bot-item-text-title']}
                >
                  {MY_BILL_CARD_TEXT.contractNumber}
                </Text>
                <Text tag='p' size='s' weight='medium' data-testid={'contract_number'}>
                  {bill.accountNumber}
                </Text>
              </div>
              <div className={styles['my-bill-card__bot-item']}>
                <Text
                  tag='p'
                  weight='regular'
                  className={styles['my-bill-card__bot-item-text-title']}
                >
                  {MY_BILL_CARD_TEXT.openDate}
                </Text>
                <Text tag='p' size='s' weight='medium' data-testid={'open_date'}>
                  {formatDate(bill.openDate.split(' ')[0])}
                </Text>
              </div>
              {bill.status === 'CLOSED' && (
                <div className={styles['my-bill-card__bot-item']}>
                  <Text
                    tag='p'
                    weight='regular'
                    className={styles['my-bill-card__bot-item-text-title']}
                  >
                    {MY_BILL_CARD_TEXT.closeDate}
                  </Text>
                  <Text tag='p' size='s' weight='medium' data-testid={'close_date'}>
                    {bill.closeDate
                      ? `${formatDate(bill.closeDate.split(' ')[1])}  ${formatDate(
                          bill.closeDate.split(' ')[0],
                        )}`
                      : '—'}
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles['my-bill-card__actions']}>
        <div className={styles['my-bill-card__balance']}>
          {bill && (
            <Text tag='p' size='m' weight='medium' data-testid={'account_balance'}>
              {MY_BILL_CARD_TEXT.balance} {bill.balance.toLocaleString()}{' '}
              {CURRENCY[bill.currency].text}
            </Text>
          )}
          <DotsButton elements={bill.isMain ? menuClick.MAIN : menuClick[bill.status]} width='s' />
        </div>

        <div className={styles['my-bill-card__button']}>
          <Button
            type='button'
            width='max'
            disabled={bill.status !== 'ACTIVE'}
            data-testid={'transfer_button'}
            onClick={handleTransferClick}
          >
            {MY_BILL_CARD_TEXT.transfer}
          </Button>
        </div>
      </div>
    </div>
  );
};
