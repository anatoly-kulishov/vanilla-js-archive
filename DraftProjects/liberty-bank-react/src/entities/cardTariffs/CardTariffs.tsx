import { Text, CurrencyCode } from '@/shared';
import { GroupedCashback, GroupedTransferFee, GroupedWithdrawalCashFee } from './model/types';
import { AmountValue, PercentValue, Cell } from './ui';
import { getTheCost, getPercentValue } from './lib/utils';
import styles from './CardTariffs.module.scss';
import { TEXT } from './constants';

interface Props {
  transferFee: GroupedTransferFee;
  withdrawalCashFee: GroupedWithdrawalCashFee;
  costPerMonth: number[];
  freeCostFrom: number[];
  servicePrice: number[];
  cardReissue: number[];
  addCardCost: number[];
  cashback: GroupedCashback;
  currency: CurrencyCode[];
  title?: string;
}

export const CardTariffs = ({
  transferFee,
  withdrawalCashFee,
  costPerMonth,
  freeCostFrom,
  servicePrice,
  cardReissue,
  addCardCost,
  cashback,
  currency,
  title,
}: Props) => {
  return (
    <div className={styles['tariffs']}>
      {title && (
        <Text tag='h3' size='xl' weight='bold' className={styles['tariffs__title']}>
          {title}
        </Text>
      )}
      <div className={styles['tariffs__table-wrapper']}>
        <table className={styles['table']}>
          <colgroup span={4} className={styles['table__columns']} />
          <thead className={styles['table__header']}>
            <tr>
              {TEXT.table.headers.map((header) => (
                <Cell key={header}>
                  <Text tag='p' size='s'>
                    {header}
                  </Text>
                </Cell>
              ))}
            </tr>
          </thead>
          <tbody className={styles['table__body']}>
            <tr>
              <Cell text={TEXT.table.content.newCart}>
                <AmountValue value={servicePrice} currency={currency} isCanBeFree />
              </Cell>
              <Cell text={TEXT.table.content.transfer.ourClient}>
                <PercentValue
                  value={transferFee.ourClient}
                  type='fee'
                  text={TEXT.table.content.ofTheTransferAmount}
                />
              </Cell>
              <Cell text={TEXT.table.content.withdrawal.ourBank}>
                <PercentValue
                  value={withdrawalCashFee.ourBank}
                  type='fee'
                  text={TEXT.table.content.ofTheTransferAmount}
                />
              </Cell>
              <Cell text={TEXT.table.content.cashback.interest}>
                <PercentValue value={cashback.interestPerMonth} type='cashback' />
              </Cell>
            </tr>
            <tr>
              <Cell text={TEXT.table.content.cardReissue}>
                <AmountValue value={cardReissue} currency={currency} isCanBeFree />
              </Cell>
              <Cell text={TEXT.table.content.transfer.partnerClient}>
                <PercentValue
                  value={transferFee.partnerClient}
                  type='fee'
                  text={TEXT.table.content.ofTheTransferAmount}
                />
              </Cell>
              <Cell text={TEXT.table.content.withdrawal.partnersBank}>
                <PercentValue
                  value={withdrawalCashFee.partnersBank}
                  type='fee'
                  text={TEXT.table.content.fromTheAmountToBeWithdrawn}
                />
              </Cell>
              <Cell text={TEXT.table.content.cashback.interestForAll}>
                <PercentValue value={cashback.interestForAll} type='cashback' />
              </Cell>
            </tr>
            <tr>
              <Cell text={TEXT.table.content.addCardCost}>
                <AmountValue value={addCardCost} currency={currency} isCanBeFree />
              </Cell>
              <Cell text={TEXT.table.content.transfer.anotherClientRu}>
                <PercentValue
                  value={transferFee.anotherClientRu}
                  type='fee'
                  text={TEXT.table.content.ofTheTransferAmount}
                />
              </Cell>
              <Cell text={TEXT.table.content.withdrawal.anotherBankRu}>
                <PercentValue
                  value={withdrawalCashFee.anotherBankRu}
                  type='fee'
                  text={TEXT.table.content.fromTheAmountToBeWithdrawn}
                />
              </Cell>
              <Cell text={TEXT.table.content.cashback.interestForPartners}>
                <Text tag='p' size='s'>
                  {cashback.interestForPartners !== 0 ? `${TEXT.table.content.until} ` : ''}
                  {getPercentValue(cashback.interestForPartners)}
                </Text>
              </Cell>
            </tr>
            <tr>
              <Cell text={TEXT.table.content.service}>
                <AmountValue value={costPerMonth} currency={currency} isCanBeFree />
              </Cell>
              <Cell text={TEXT.table.content.transfer.anotherClientWorld}>
                <Text tag='p' size='s'>
                  {transferFee.anotherClientWorld === 0
                    ? TEXT.noFee
                    : `${getPercentValue(transferFee.anotherClientWorld)} ${
                        TEXT.table.content.ofTheTransferAmountWithMin
                      } ${getTheCost(transferFee.minFeeWorld, currency)}`}
                </Text>
              </Cell>
              <Cell text={TEXT.table.content.withdrawal.anotherBankWorld}>
                <Text tag='p' size='s'>
                  {withdrawalCashFee.anotherBankWorld === 0
                    ? TEXT.noFee
                    : `${getPercentValue(withdrawalCashFee.anotherBankWorld)} ${
                        TEXT.table.content.fromTheAmountToBeWithdrawnWithMin
                      } ${getTheCost(withdrawalCashFee.minCashFeeWorld, currency)}`}
                </Text>
              </Cell>
              <Cell text={TEXT.table.content.cashback.cashbackLimit}>
                <AmountValue value={cashback.cashbackLimit} currency={currency} />
              </Cell>
            </tr>
            <tr>
              {freeCostFrom.every((item) => item !== 0) ? (
                <Cell>
                  <Text tag='p' size='s'>
                    {TEXT.free}
                  </Text>
                  <Text tag='p' size='xs' className={styles['table__cell-description']}>
                    {`${TEXT.table.content.freeService} ${getTheCost(freeCostFrom, currency)}`}
                  </Text>
                </Cell>
              ) : (
                <Cell />
              )}
              <Cell text={TEXT.table.content.transfer.onBankAccount}>
                <PercentValue
                  value={transferFee.onBankAccount}
                  type='fee'
                  text={TEXT.table.content.ofTheTransferAmount}
                />
              </Cell>
              <Cell />
              <Cell />
            </tr>
            <tr>
              <Cell place='bottom' />
              <Cell text={TEXT.table.content.transfer.byPhoneNumber} place='bottom'>
                <PercentValue
                  value={transferFee.byPhoneNumber}
                  type='fee'
                  text={TEXT.table.content.ofTheTransferAmount}
                />
              </Cell>
              <Cell place='bottom' />
              <Cell place='bottom' />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
