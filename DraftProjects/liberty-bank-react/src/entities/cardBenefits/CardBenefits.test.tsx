import { CardBenefits } from './CardBenefits';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../test/testUtils';

const props = {
  typeName: 'Тариф',
};

describe('CardBenefits component', () => {
  test('renders benefits correctly when data is available', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardBenefits {...props} />
      </MemoryRouter>,
    );
  });
});
