import { Route } from 'react-router-dom';
import { TransferActionItem } from './TransferActionItem';
import { TSvgIconNames, renderWithRouter } from '../../../../shared';

const mockItem = {
  href: '/some-href',
  icon: 'facilities' as TSvgIconNames,
  title: 'Some Title',
};

test('component TransferActionItem should render correctly', () => {
  const { getByTestId, getByText, container } = renderWithRouter(
    <Route
      path='/'
      element={<TransferActionItem href={mockItem.href} icon={mockItem.icon} title='Some Title' />}
    />,
  );

  expect(getByTestId('icon-facilities')).toBeInTheDocument();
  expect(getByTestId('icon-facilities')).toHaveAttribute('width', '32');
  expect(getByTestId('icon-facilities')).toHaveAttribute('height', '32');
  expect(getByText('Some Title')).toBeInTheDocument();
  expect(container.querySelector('a')).toHaveAttribute('href', '/some-href');
});
