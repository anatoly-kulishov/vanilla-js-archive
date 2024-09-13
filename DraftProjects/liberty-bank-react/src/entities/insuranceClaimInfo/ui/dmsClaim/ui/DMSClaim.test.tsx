import { render, screen } from '@testing-library/react';
import { DMSClaim } from './DMSClaim';

describe('Testing DMSClaim', () => {
  test('should render basic page', () => {
    render(<DMSClaim />);
    expect(
      screen.getByText(
        'Что делать, если возникла потребность в квалифицированной медицинской помощи, и вы застрахованы у нас',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Что делать, если возникла потребность в квалифицированной медицинской помощи, и вы не застрахованы у нас',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'В этом случае вам необходимо связаться со страховой компанией, заполнить медицинскую анкету, выбрать программу страхования и оформить договор.',
      ),
    ).toBeInTheDocument();
  });
});
