import { render } from '@testing-library/react';
import { InsuranceHeader } from '../InsuranceHeader';
import { MemoryRouter } from 'react-router-dom';

describe('InsuranceHeader component', () => {
  test('renders InsuranceHeader without crashing', () => {
    render(
      <MemoryRouter>
        <InsuranceHeader
          backBtn='Back'
          headerInfo={{ title: 'Title', subtitle: 'Subtitle', calcBtnText: 'Calculate' }}
          headerImage='path/to/image'
        />
      </MemoryRouter>,
    );
  });
});
