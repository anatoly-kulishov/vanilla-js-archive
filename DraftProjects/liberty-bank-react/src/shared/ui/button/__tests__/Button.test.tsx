import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '..';
import { Route } from 'react-router-dom';
import { PATH_PAGE, renderWithRouter } from '../../..';

describe('Test Button', () => {
  test('Button should be render correctly', () => {
    render(<Button>Next</Button>);

    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('Button should be disabled', () => {
    render(<Button disabled>Next</Button>);

    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('When button clicked, "onClick" function must be called', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Next</Button>);

    fireEvent.click(screen.getByText('Next'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('When button is link and clicked, it should be redirected to new page', () => {
    renderWithRouter(
      <>
        <Route
          path={PATH_PAGE.root}
          element={<Button href={PATH_PAGE.registration}>Next</Button>}
        />
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
