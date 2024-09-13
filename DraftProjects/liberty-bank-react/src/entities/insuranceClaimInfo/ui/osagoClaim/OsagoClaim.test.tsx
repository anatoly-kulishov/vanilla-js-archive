import { render, screen } from '@testing-library/react';
import { OsagoClaim } from './OsagoClaim';
import { FormProvider, useForm } from 'react-hook-form';
import { FIELDS } from '../../constants';

const OsagoClaimWithForm = () => {
  const methods = useForm({
    mode: 'onTouched',
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
    values: {
      [FIELDS.vehicleFullName]: '',
      [FIELDS.vehicleEvent]: '',
      [FIELDS.vehicleDate]: '',
      [FIELDS.vehicleAddress]: '',
      [FIELDS.vehicleDescription]: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <OsagoClaim />
    </FormProvider>
  );
};

describe('Testing OsagoClaim', () => {
  test('should render basic fields', () => {
    render(<OsagoClaimWithForm />);
    expect(screen.getByText('Наименование автомобиля')).toBeInTheDocument();
    expect(screen.getByText('Тип события')).toBeInTheDocument();
    expect(screen.getByText('Дата события')).toBeInTheDocument();
    expect(screen.getByText('Адрес ДТП')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Обстоятельства происшествия')).toBeInTheDocument();
  });
});
