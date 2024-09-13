import { render, screen } from '@testing-library/react';
import { AbroadClaim } from './AbroadClaim';
import { FormProvider, useForm } from 'react-hook-form';
import { FIELDS } from '../../constants';

const AbroadClaimWithForm = () => {
  const methods = useForm({
    mode: 'onTouched',
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
    values: {
      [FIELDS.abroad]: '',
      [FIELDS.abroadDate]: '',
      [FIELDS.country]: '',
      [FIELDS.startDate]: '',
      [FIELDS.expirationDate]: '',
      [FIELDS.insuranceSum]: '',
      [FIELDS.currencyNumericCode]: '',
      [FIELDS.injuryDescription]: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <AbroadClaim />
    </FormProvider>
  );
};

describe('Testing AbroadClaim', () => {
  test('should render basic fields', () => {
    render(<AbroadClaimWithForm />);
    expect(screen.getByText('Тип события')).toBeInTheDocument();
    expect(screen.getByText('Дата события')).toBeInTheDocument();
    expect(screen.getByText('Страна пребывания')).toBeInTheDocument();
    expect(screen.getByText('Дата начала поездки')).toBeInTheDocument();
    expect(screen.getByText('Дата завершения поездки')).toBeInTheDocument();
    expect(screen.getByText('Страховая расходов')).toBeInTheDocument();
    expect(screen.getByText('Валюта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Обстоятельства происшествия')).toBeInTheDocument();
  });
});
