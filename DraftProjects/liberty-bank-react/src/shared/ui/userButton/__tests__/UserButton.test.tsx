import { render } from '@testing-library/react';
import { IItemsProps, IUserButtonProps, UserButton } from '../UserButton';

describe('UserButton', () => {
  const mokeMenuItems: IItemsProps[] = [
    { to: '/test/1', label: 'First test', icon: 'card' },
    { to: '/test/2', label: 'Second test', icon: 'close-button' },
  ];
  const mokeFullName = 'John Doe';
  const defaultProps: IUserButtonProps = {
    valueFullName: mokeFullName,
    menuItems: mokeMenuItems,
  };

  test('Correct render with necessary props', () => {
    const { getByText } = render(
      <UserButton menuItems={mokeMenuItems} valueFullName={mokeFullName} />,
    );
    expect(getByText('Doe')).toBeInTheDocument();
  });

  test('Render valueFullName with many words words', () => {
    const { getByText } = render(
      <UserButton {...defaultProps} valueFullName={'John Doe-Elips-Doe'} />,
    );
    expect(getByText('Doe-Elips-Doe')).toBeInTheDocument();
  });

  test('Render with valueFullName as empty string', () => {
    const { getByText } = render(<UserButton {...defaultProps} valueFullName={''} />);
    expect(getByText('Аноним')).toBeInTheDocument();
  });

  test('Render message type message', () => {
    const { getAllByRole } = render(<UserButton {...defaultProps} message={'message'} />);
    const buttons = getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('type', 'button');
      const children = btn.children.item(0);
      if (children?.tagName === 'svg') {
        expect(children).toHaveAttribute('name', 'bell');
      }
    });
  });

  test('Render message type mail', () => {
    const { getAllByRole } = render(<UserButton {...defaultProps} message={'mail'} />);
    const buttons = getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute('type', 'button');
      const children = btn.children.item(0);
      if (children?.tagName === 'svg') {
        expect(children).toHaveAttribute('name', 'mail');
      }
    });
  });
});
