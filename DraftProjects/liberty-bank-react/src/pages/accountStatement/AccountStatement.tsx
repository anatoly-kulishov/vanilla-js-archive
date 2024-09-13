import { BackButton, Button, RadioButton, Text, Wrapper, Input } from '@/shared';
import { TEXT } from './constants';
import { Controller, useForm } from 'react-hook-form';
import style from './AccountStatement.module.scss';
import dayjs, { ManipulateType } from 'dayjs';
import 'dayjs/locale/ru';
import { useNavigate } from 'react-router-dom';

function getPreviousDate(date: ManipulateType) {
  const today = dayjs();

  return today.subtract(1, date);
}

interface IDate {
  dateFrom: Date | string;
  dateTo: Date | string;
}

const AccountStatement = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const previousWeekValue = getPreviousDate('week').format('YYYY-MM-DD');
  const previousMonthValue = getPreviousDate('month').format('YYYY-MM-DD');

  const currentDate = dayjs().locale('ru').format('DD MMMM');
  const previousWeekDate = getPreviousDate('week').locale('ru').format('DD MMMM');
  const previousMonthDate = getPreviousDate('month').locale('ru').format('DD MMMM');

  const { control, handleSubmit } = useForm({
    defaultValues: {
      dateFrom: getPreviousDate('week').format('YYYY-MM-DD'),
      dateTo: dayjs().format('YYYY-MM-DD'),
    },
  });

  const onSubmit = ({ dateFrom, dateTo }: IDate) => {
    dateTo = dayjs(dateTo).format('YYYY-MM-DD');
    dateFrom = dayjs(dateFrom).format('YYYY-MM-DD');

    return { dateTo, dateFrom };
  };

  return (
    <Wrapper size='l'>
      <div>
        <BackButton
          text={TEXT.back}
          theme='blue'
          height='24'
          width='24'
          name='arrow-left-blue'
          className={style.statementBackButton}
        />
        <Text tag='h2' size='m' weight='medium' className={style.statementHeader}>
          {TEXT.header}
        </Text>
      </div>
      <form className={style.statementContainer} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='dateFrom'
          render={({ field: { onChange, name } }) => (
            <RadioButton
              name={name}
              value={previousMonthValue}
              label={TEXT.month}
              subLabel={`${TEXT.subLabel} ${previousMonthDate} - ${currentDate}`}
              onChange={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name='dateFrom'
          render={({ field: { onChange, name } }) => (
            <RadioButton
              name={name}
              value={previousWeekValue}
              label={TEXT.week}
              subLabel={`${TEXT.subLabel} ${previousWeekDate} - ${currentDate}`}
              onChange={onChange}
            />
          )}
        />
        <div className={style['inputs-container']}>
          <Controller
            control={control}
            name='dateFrom'
            render={({ field: { name, value, onChange } }) => (
              <Input.Date
                className={style['state-input-date']}
                value={new Date(value)}
                name={name}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name='dateTo'
            render={({ field: { name, value, onChange } }) => (
              <Input.Date
                className={style['state-input-date']}
                value={new Date(value)}
                name={name}
                onChange={onChange}
              />
            )}
          />
        </div>
        <div className={style['footer-statement']}>
          <button onClick={goBack} className={style['statement-back-btn']}>
            {TEXT.back}
          </button>
          <div>
            <Button type='submit' width='max' className={style['send-form-state']}>
              {TEXT.send}
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AccountStatement;
