import { Text, Button } from '@/shared';
import { HC_CONTRACT, HC_FORM_BACK } from '../../constants';
import styles from '../../shared/styles/styles.module.scss';
import { FC } from 'react';
import { FormFrameProps } from '../../model/types';
import { useNavigate } from 'react-router-dom';
import { SwitchButtonForm } from '../components/switchButtonForm/switchButtonForm';
import { CurrencyField } from '../../ui/components/currencyField/currencyField';
import classNames from 'classnames';
import { CountyGroup } from '../../ui/components/countryGroup/countryGroup';
import { DurationField } from '../../ui/components/durationField/durationField';
import { SportActivity } from '../../ui/components/sportActivity/sportActivity';
import { SPORT_ACTIVITY_GROUP } from '@/features';
import { AccidentActivity } from '../../ui/components/accidentActivity/accidentActivity';

const ContractDetailsFrame: FC<FormFrameProps> = ({
  stepper,
  nextButton,
  prevButton,
  submitButton,
  properties,
  countryGroup,
  duration = { type: 'Input', maxMonths: 120 },
  currencies = ['rub', 'usd', 'eur'],
  hasSportActivity = false,
  accidentActivity,
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles['form__container']}>
      <div className={styles['form__header']}>
        <Text tag='h4' size='ml' weight='medium' className={styles['form__header']}>
          {HC_CONTRACT.title}
        </Text>
        {stepper}
      </div>
      <div className={styles['form__body']}>
        <CurrencyField currencies={currencies} />
        <DurationField duration={duration} />
        {countryGroup && (
          <div className={classNames(styles['form__row'])}>
            <CountyGroup countryGroup={countryGroup} />
            {hasSportActivity && <SportActivity sportActivity={SPORT_ACTIVITY_GROUP} />}
          </div>
        )}
        {accidentActivity && <AccidentActivity {...accidentActivity} />}
      </div>
      {properties && (
        <div className={classNames(styles['form__row'], styles['switch_button_row'])}>
          {properties.map((property) => (
            <SwitchButtonForm key={property.name} name={property.name} title={property.title} />
          ))}
        </div>
      )}
      <div className={styles['form__footer']}>
        <div>
          {prevButton && (
            <Button onClick={handleBack} theme='third' className={styles['back-btn']}>
              {HC_FORM_BACK}
            </Button>
          )}
        </div>
        <div>{nextButton || submitButton}</div>
      </div>
    </div>
  );
};

export default ContractDetailsFrame;
