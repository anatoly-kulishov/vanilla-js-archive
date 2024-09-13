import { Button, Input, Text, setInvestNotificationsToLS, useNotify } from '@/shared';
import { formatNumber } from '@/shared/lib/formatNumber';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './InvestmentPriceNotificationForm.module.scss';
import { TextTitles } from './constants';
import {
  InvestmentPriceNotificationFormProps,
  PriceNotificationForm,
  notificationPriceFormScheme,
} from './model/types';

export const InvestmentPriceNotificationsForm: React.FC<InvestmentPriceNotificationFormProps> = ({
  tickerPrice,
  ticker,
}) => {
  const { control, handleSubmit, watch, setValue, trigger } = useForm<PriceNotificationForm>({
    resolver: yupResolver(notificationPriceFormScheme),
    mode: 'onChange',
  });
  const notify = useNotify();

  const handleIncrementPercent = () => {
    const currentPercentString = watch('percentPrice') || '0';
    const newPercent = parseFloat(currentPercentString.replace(',', '.').replace('%', '')) + 1;
    setValue('percentPrice', formatNumber(newPercent, false) + '%');
    setValue('numPrice', Number((tickerPrice * (1 + newPercent / 100)).toFixed(2)));
  };

  const handleDecrementPercent = () => {
    const currentPercentString = watch('percentPrice') || '0';
    const newPercent = parseFloat(currentPercentString.replace(',', '.').replace('%', '')) - 1;
    setValue('percentPrice', formatNumber(newPercent, false) + '%');
    setValue('numPrice', Number((tickerPrice * (1 + newPercent / 100)).toFixed(2)));
  };

  const handleNumPriceChange = (value: string) => {
    const newValue = value.replace(',', '.').replace('%', '');
    const newNumPrice = parseFloat(newValue);
    if (!isNaN(newNumPrice)) {
      const newPercent = (((newNumPrice - tickerPrice) / tickerPrice) * 100).toFixed(2);
      setValue('numPrice', Number(newNumPrice.toFixed(2)));
      setValue('percentPrice', formatNumber(Number(newPercent), false) + '%');
    }
  };

  const handlePercentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace('%', '');
    const cursorPosition = event.target.selectionStart;

    const newPercent = parseFloat(inputValue.replace(',', '.'));
    if (!isNaN(newPercent) || inputValue === '') {
      const formattedValue = inputValue === '' ? '' : inputValue + '%';
      setValue('percentPrice', formattedValue.replace('.', ','), { shouldValidate: true });

      if (inputValue !== '') {
        setValue('numPrice', Number((tickerPrice * (1 + newPercent / 100)).toFixed(2)));
      }
    }

    setTimeout(() => {
      event.target.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  const handlePercentKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedChars = /[0-9,%]/;
    const key = event.key;
    const inputValue = event.currentTarget.value;
    if (
      event.ctrlKey ||
      event.altKey ||
      event.metaKey ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'Backspace' ||
      key === 'Delete'
    ) {
      return;
    }
    if (!allowedChars.test(key) || ((key === ',' || key === '.') && inputValue.includes(','))) {
      event.preventDefault();
    }
  };

  const onSubmitForm = (data: PriceNotificationForm) => {
    data.percentPrice = data.percentPrice.replace(',', '.').replace('%', '');
    setInvestNotificationsToLS(ticker, data);
    notify.success({ label: `Уведомление для ${ticker} добавлено успешно` });
  };

  const percentPrice = watch('percentPrice');
  const numPrice = watch('numPrice');

  useEffect(() => {
    trigger();
  }, [percentPrice, numPrice, trigger]);

  return (
    <>
      <div className={styles['textBlock']}>
        <Text tag={'p'} size='xl' weight='medium'>
          {TextTitles.brokerAccountNameTitle}
        </Text>
        <Text tag={'p'} size='s' weight='regular'>
          {TextTitles.currencyTypeFieldTitle}
        </Text>
        <div className={styles['priceBlock']}>
          <Text tag={'p'} size='s' weight='light'>
            {TextTitles.priceTitle}
          </Text>
          <Text tag={'p'} size='xl' weight='semibold'>
            {formatNumber(Number(tickerPrice), false)} ₽
          </Text>
        </div>
      </div>
      <form id='investment-price-notification-form' onSubmit={handleSubmit(onSubmitForm)}>
        <div className={styles['formWrapper']}>
          <div className={styles['account-selection-step-page__account-radio-box']}>
            <Controller
              control={control}
              name='numPrice'
              render={({ field: { value, onChange } }) => (
                <div className={styles['inputNumPriceWrapper']}>
                  <Input.Number
                    value={value}
                    required
                    onChange={(e) => onChange(handleNumPriceChange(e.target.value))}
                    size='s'
                    label='Сумма, ₽'
                  />
                </div>
              )}
            />
          </div>
          <div className={styles['account-selection-step-page__account-radio-box']}>
            <Controller
              control={control}
              name='percentPrice'
              render={({ field: { value, onChange } }) => (
                <div className={styles['inputPercentPriceWrapper']}>
                  <Input.Text
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                      handlePercentInputChange(e);
                    }}
                    label='Изменение цены'
                    required
                    size='s'
                    placeholder='0 %'
                    onKeyDown={handlePercentKeyPress}
                  />
                  <div className={styles['buttonBlock']}>
                    <Button size='xs' onClick={handleIncrementPercent}>
                      +
                    </Button>
                    <Button size='xs' onClick={handleDecrementPercent}>
                      -
                    </Button>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <Button
          type='submit'
          className={styles.submitButton}
          disabled={!watch('percentPrice') || !watch('numPrice')}
        >
          Добавить
        </Button>
      </form>
    </>
  );
};
