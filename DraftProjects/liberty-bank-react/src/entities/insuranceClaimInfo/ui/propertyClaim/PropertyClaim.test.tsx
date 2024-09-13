import { render, screen } from '@testing-library/react';
import { PropertyClaim } from './PropertyClaim';
import { FormProvider, useForm } from 'react-hook-form';
import { FIELDS } from '../../constants';

const PropertyClaimWithForm = () => {
  const methods = useForm({
    mode: 'onTouched',
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: true,
    },
    values: {
      [FIELDS.thingsName]: '',
      [FIELDS.thingsEventType]: '',
      [FIELDS.thingsDate]: '',
      [FIELDS.thingLocation]: '',
      [FIELDS.thingsDescription]: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <PropertyClaim />
    </FormProvider>
  );
};

describe('Testing PropertyClaim', () => {
  test('should render basic fields', () => {
    render(<PropertyClaimWithForm />);
    expect(screen.getByText('Вид имущества')).toBeInTheDocument();
    expect(screen.getByText('Тип события')).toBeInTheDocument();
    expect(screen.getByText('Дата события')).toBeInTheDocument();
    expect(screen.getByText('Адрес расположения имущества')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Обстоятельства происшествия')).toBeInTheDocument();
  });
});
