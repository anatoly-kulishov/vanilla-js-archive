import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavMenu } from '../navMenu';

const mockItems = [
  { id: 1, label: 'Home', link: '/home' },
  { id: 2, label: 'About', link: '/about' },
];

describe('NavMenu', () => {
  test('renders menu items with correct labels and links', () => {
    render(
      <BrowserRouter>
        <NavMenu items={mockItems} />
      </BrowserRouter>,
    );

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  test('applies "active" class to the active menu item', () => {
    render(
      <BrowserRouter>
        <NavMenu items={mockItems} />
      </BrowserRouter>,
    );

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(homeLink).not.toHaveClass('active');
    expect(aboutLink).not.toHaveClass('active');

    fireEvent.click(aboutLink);

    expect(homeLink).not.toHaveClass('active');
    expect(aboutLink).toHaveClass('active');
  });
});
