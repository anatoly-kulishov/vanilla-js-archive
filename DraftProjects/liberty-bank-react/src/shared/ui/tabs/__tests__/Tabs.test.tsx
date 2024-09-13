import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs } from '..';
import { Provider } from 'react-redux';
import { setupStore } from '../../../../app/appStore.ts';

describe('Test Tabs', () => {
  const mockTabs = [
    {
      label: 'Phone',
      content: <div>Phone tab</div>,
    },
    {
      label: 'Document',
      content: <div>Document tab</div>,
    },
  ];
  test('Tabs should be render correctly', () => {
    const { container } = render(
      <Provider store={setupStore()}>
        <Tabs tabs={mockTabs} />
      </Provider>,
    );

    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Document')).toBeInTheDocument();
    expect(screen.getByText('Phone tab')).toBeInTheDocument();
    expect(screen.queryByText('Document tab')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.tabItem')).toHaveLength(2);
  });

  test('When clicked on another Tab, the correct content should appear', () => {
    render(
      <Provider store={setupStore()}>
        <Tabs tabs={mockTabs} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Document'));
    expect(screen.getByText('Document tab')).toBeInTheDocument();
    expect(screen.queryByText('Phone tab')).not.toBeInTheDocument();
  });
});
