import { screen, fireEvent } from '@testing-library/react';
import { Link } from '..';
import { Route } from 'react-router-dom';
import { PATH_PAGE, renderWithRouter } from '../../..';

describe('Test Link', () => {
  test('Link should be render correctly', () => {
    renderWithRouter(
      <Route path={PATH_PAGE.root} element={<Link to={PATH_PAGE.registration}>Next</Link>} />,
    );

    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('When Link is clicked, it should be redirected to new page', () => {
    renderWithRouter(
      <>
        <Route path={PATH_PAGE.root} element={<Link to={PATH_PAGE.registration}>Next</Link>} />
        <Route path={PATH_PAGE.registration} element={<div>Registration page</div>} />
      </>,
    );

    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.queryByText('Registration page')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
    expect(screen.getByText('Registration page')).toBeInTheDocument();
  });
});
