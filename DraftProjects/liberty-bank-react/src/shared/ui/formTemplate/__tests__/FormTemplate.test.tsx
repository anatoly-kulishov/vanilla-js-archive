import { fireEvent, render } from '@testing-library/react';
import { FormTemplate } from '..';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  return { ...jest.requireActual('react-router-dom'), useNavigate: () => mockUseNavigate() };
});
const mockBackHandler = jest.fn();
const mockSubmitHandler = jest.fn();

describe('FormTemplate test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('FormTemplate renders without props correctly', () => {
    const { container } = render(
      <FormTemplate>
        <input type='text' />
      </FormTemplate>,
    );
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  test('FormTemplate renders with title correctly', () => {
    const { getByRole } = render(
      <FormTemplate formTitle='Form Title'>
        <input type='text' />
      </FormTemplate>,
    );
    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Form Title');
  });

  test('FormTemplate receives styles correctly', () => {
    const { container } = render(
      <FormTemplate className='some-class-name'>
        <input type='text' />
      </FormTemplate>,
    );
    expect(container.querySelector('form')).toHaveClass('some-class-name');
  });

  test('Callback on BackButton invoked correctly', () => {
    const { getByText } = render(
      <FormTemplate handleBackButtonClick={mockBackHandler} backButtonText='Back Button'>
        <input type='text' />
      </FormTemplate>,
    );
    fireEvent.click(getByText('Back Button'));
    expect(mockBackHandler).toBeCalled();
  });

  test('Callback on Next button invoked correctly', () => {
    const { getByText } = render(
      <FormTemplate handleSubmitButtonClick={mockSubmitHandler} nextButtonText='Next Button'>
        <input type='text' />
      </FormTemplate>,
    );
    fireEvent.click(getByText('Next Button'));
    expect(mockSubmitHandler).toBeCalled();
  });

  test('FormTemplate blocks next button correctly', () => {
    const { getByText } = render(
      <FormTemplate
        handleSubmitButtonClick={mockSubmitHandler}
        nextButtonText='Next Button'
        canSubmit={false}
      >
        <input type='text' />
      </FormTemplate>,
    );
    expect(getByText('Next Button')).toBeDisabled();
    fireEvent.click(getByText('Next Button'));
    expect(mockSubmitHandler).not.toBeCalled();
  });
});
