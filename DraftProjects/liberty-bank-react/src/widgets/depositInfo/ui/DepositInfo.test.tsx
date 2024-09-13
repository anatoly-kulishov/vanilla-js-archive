import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, generatePath } from 'react-router-dom';
import { DepositInfo } from '.';
import { PATH_PAGE } from '@/shared';

import { depositDataArray, depositProduct, transformedDepositCard } from '../mocksConstants';

const MAKE_DEPOSIT = 'Оформить';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Deposit Info  render and button click', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <DepositInfo depositProduct={depositProduct} />
      </MemoryRouter>,
    );
  });

  test('the data is displayed correctly in DepositInfo', () => {
    const nameElement = screen.getByText(depositProduct.name);
    expect(nameElement).toBeInTheDocument();

    const imageElement = screen.getByTestId('image-heap-of-coins');
    expect(imageElement).toBeInTheDocument();

    const titleElement = screen.getByText(depositProduct.tagline);
    expect(titleElement).toBeInTheDocument();

    const productDetailsElement = screen.getByText(depositProduct.productDetails);
    expect(productDetailsElement).toBeInTheDocument();

    const makeDepositButton = screen.getByText(MAKE_DEPOSIT);
    expect(makeDepositButton).toBeInTheDocument();

    depositDataArray.map((item) => {
      expect(screen.getByText(item.amount)).toBeInTheDocument();
      expect(screen.getByText(item.point)).toBeInTheDocument();
    });

    transformedDepositCard.map((item) => {
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(item.title)).toBeInTheDocument();

      const iconElement = screen.getByTestId(`icon-${item.icon}`);
      expect(iconElement).toBeInTheDocument();
    });
  });

  test('buttons navigating work correctly ', () => {
    const makeDepositPath = generatePath(PATH_PAGE.depositApplication, {
      id: depositProduct.id,
    });

    fireEvent.click(screen.getByText(MAKE_DEPOSIT));
    expect(mockedUseNavigate).toHaveBeenCalledWith(makeDepositPath);
  });
});
