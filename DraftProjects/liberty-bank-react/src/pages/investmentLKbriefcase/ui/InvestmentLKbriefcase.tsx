import { useEffect, useState } from 'react';
import cn from 'classnames';
import {
  Text,
  Icon,
  Button,
  Input,
  Preloader,
  getInvestOptionsIntoStorage,
  CurrencyValues,
  IInvestOptions,
} from '@/shared';
import { COLOR, ACTIONS, INPUT_PLACEHOLDER } from '../constants';
import styles from './InvestmentLKbriefcase.module.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { useConversionCurrency } from '@/shared/hooks/useConversionCurrency';

const InvestmentLKbriefcase = () => {
  const [funds, setFunds] = useState<string>('100');
  const [isTestSuccess, setIsTestSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const investOptionsIntoStorage: IInvestOptions = JSON.parse(
    getInvestOptionsIntoStorage() || 'null',
  );
  const briefcaseCurrencyInStorage: CurrencyValues =
    investOptionsIntoStorage?.briefcaseCurrency || CurrencyValues.ruble;

  const {
    resultCurrency: currentCurrency,
    isLoading,
    isError,
  } = useConversionCurrency(briefcaseCurrencyInStorage, +funds);

  useEffect(() => {
    if (currentCurrency) {
      setFunds(currentCurrency.funds.toFixed(2));
    }
  }, [currentCurrency]);

  return (
    <div className={styles['body']}>
      <div className={styles['block-left']}>
        <Text tag={'h3'} weight={'medium'} className={styles['check-title']}>
          Брокерские счета
        </Text>
        <div className={styles['check-block']}>
          <Icon icon={'info-rate'} widthAndHeight={'45'} color={COLOR.white} />
          <div className={styles['check-block-text']}>
            <div className={styles['check-block-title']}>
              <Text
                tag={'p'}
                weight={'regular'}
                size={'sxs'}
                className={styles['check-block-name']}
              >
                Брокерский счет (название)
              </Text>
              <Button theme={'icon'}>
                <Icon icon={'pencil'} />
              </Button>
            </div>
            <Text tag={'h3'} weight={'medium'}>
              {isLoading ? (
                <Preloader />
              ) : isError ? (
                'Произошла ошибка конвертации'
              ) : (
                `${funds} ${currentCurrency.label}`
              )}
            </Text>
            <Text tag={'h5'} weight={'regular'}>
              {isLoading ? (
                <Preloader />
              ) : isError ? (
                'Произошла ошибка конвертации'
              ) : (
                `0 ${currentCurrency.label}`
              )}
            </Text>
          </div>
        </div>
        <Button width={'max'}>Открыть новый счет</Button>
        <Text tag={'h3'} weight={'medium'} className={styles['actions-title']}>
          Действия
        </Text>
        {ACTIONS.map((item) => (
          <NavLink
            to={item.link}
            key={item.id}
            className={cn(
              styles['actions-item'],
              activeTab === item.id && styles['actions-item_active'],
            )}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon icon={item.name} widthAndHeight={'32'} color={'#005AFE'} />
            <Text tag={'h4'} weight={'medium'}>
              {item.title}
            </Text>
          </NavLink>
        ))}
      </div>

      <div className={styles['block-right']}>
        <Input.Search placeholder={INPUT_PLACEHOLDER} />
        <Outlet
          context={{
            funds: funds,
            setFunds: setFunds,
            isTestSuccess: isTestSuccess,
            setIsTestSuccess: setIsTestSuccess,
          }}
        />
      </div>
    </div>
  );
};

export default InvestmentLKbriefcase;
