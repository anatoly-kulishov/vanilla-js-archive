import { fireEvent, render, screen } from '@testing-library/react';
import { InputText } from '../inputText.tsx';

describe('Test inputText', () => {
  const onMokeFunc = jest.fn();
  const mokeValue = 'Test';

  test('Render with default props', () => {
    render(<InputText />);
    expect(screen.getByText('Ваше сообщение')).toBeInTheDocument();
  });

  test('Render placeholder correctly', () => {
    render(<InputText placeholder={mokeValue} />);
    expect(screen.getByText(mokeValue)).toBeInTheDocument();
  });

  test('Handle change works', () => {
    render(<InputText valueChange={onMokeFunc} />);
    expect(screen.getByRole('textbox')).toBeEmptyDOMElement();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: mokeValue } });
    expect(onMokeFunc).toHaveBeenCalledWith(mokeValue);
  });

  test('Value renders', () => {
    render(<InputText value={mokeValue} />);
    expect(screen.getByText(mokeValue)).toBeInTheDocument();
  });

  test('Working resetField', () => {
    const onChange = jest.fn();
    render(<InputText value={mokeValue} resetField={onMokeFunc} valueChange={onChange} />);
    expect(screen.getByText(mokeValue)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith('');
    expect(onMokeFunc).toHaveBeenCalled();
    expect(screen.getByText(mokeValue)).not.toHaveFocus();
  });

  test('Test id on elements', () => {
    render(<InputText id={mokeValue} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', mokeValue);
    expect(screen.getByLabelText('Ваше сообщение')).toHaveAttribute('id', mokeValue);
  });

  test('Render other props', () => {
    render(<InputText inputMode={'tel'} onBlur={onMokeFunc} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('inputMode', 'tel');
    expect(screen.getByRole('textbox')).toHaveAttribute('inputMode', 'tel');
  });
});
