import { IInsuranceConditionProps } from '@/entities/insuranceCondition';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { InsuranceConditions } from '../InsuranceConditions';

const mockConditions: IInsuranceConditionProps[] = [
  {
    title: 'Title 1',
    description: 'Description 1',
    fixedTooltip: true,
    details: {
      content: [
        {
          title: 'Title 1',
          description: 'Description 1',
        },
      ],
    },
    icon: 'calendar-blue',
  },
];

describe('InsuranceConditions component', () => {
  test('renders InsuranceConditions without crashing', () => {
    render(
      <MemoryRouter>
        <InsuranceConditions conditions={mockConditions} />
      </MemoryRouter>,
    );
  });
});
