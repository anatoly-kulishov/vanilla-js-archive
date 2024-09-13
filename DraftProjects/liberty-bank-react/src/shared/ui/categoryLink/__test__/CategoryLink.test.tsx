import { fireEvent } from '@testing-library/dom';
import { CategoryLink, CategoryLinkProps } from '..';
import { PATH_PAGE, TSvgIconNames, renderWithRouter } from '../../..';
import {
  COLOR,
  CardAction,
  DIR,
} from '../../../../widgets/cardsInfoCategories/constants/constants';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';

const propsWithSwitcher: CategoryLinkProps = {
  name: 'Сделать карту основной',
  icon: 'actions-tick' as TSvgIconNames,
  dir: DIR.cards,
  color: COLOR.white,
  hasSwitcher: true,
  switcherIsOn: true,
  handleSwitcher: () => {},
};

const propsWithLink: CategoryLinkProps = {
  name: 'Изменить пин-код',
  icon: 'actions-pin' as TSvgIconNames,
  dir: DIR.cards,
  color: COLOR.white,
  linkStatus: PATH_PAGE.registration,
};

const propsWithModal: CategoryLinkProps = {
  name: 'Заблокировать карту',
  icon: 'actions-block' as TSvgIconNames,
  dir: DIR.cards,
  color: COLOR.white,
  modalType: CardAction.BLOCK,
};

describe('testing the CategoryLink component', () => {
  test('render with switcher', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CategoryLink {...propsWithSwitcher} />
      </MemoryRouter>,
    );

    expect(getByTestId('category-link')).toBeInTheDocument();
    expect(getByTestId('switcher')).toBeInTheDocument();
  });

  test('render with link', () => {
    const { getByTestId, queryByTestId, queryByText, getByText } = renderWithRouter(
      <>
        <Route path={PATH_PAGE.root} element={<CategoryLink {...propsWithLink} />} />
        <Route path={PATH_PAGE.registration} element={<div>Registration page</div>} />
      </>,
    );

    expect(getByTestId('category-link')).toBeInTheDocument();
    expect(queryByTestId('switcher')).not.toBeInTheDocument();

    expect(queryByText('Registration page')).not.toBeInTheDocument();
    fireEvent.click(getByTestId('category-link'));
    expect(queryByTestId('category-link')).not.toBeInTheDocument();
    expect(getByText('Registration page')).toBeInTheDocument();
  });

  test('render with modal', () => {
    const { getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <CategoryLink {...propsWithModal} />
      </MemoryRouter>,
    );

    expect(getByTestId('category-link')).toBeInTheDocument();
    expect(queryByTestId('switcher')).not.toBeInTheDocument();
  });
});
