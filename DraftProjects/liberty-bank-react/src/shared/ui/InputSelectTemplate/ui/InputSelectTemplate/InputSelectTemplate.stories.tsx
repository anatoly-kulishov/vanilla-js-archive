import { StoryObj } from '@storybook/react';
import { InputSelectTemplate } from './InputSelectTemplate';
import { useEffect, useState } from 'react';
import { SelectOption } from '../../model/types';
import { AccountOption } from '../Options/accountOption/ui/AccountOption';

const defaultContainer = (
  <div
    style={{
      height: '72px',
      backgroundColor: '#fefefe',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '20px',
    }}
  >
    Любой контент, когда ничего не выбрано
  </div>
);

export default {
  title: 'Components/InputSelectTemplate',
  component: InputSelectTemplate,
  args: {
    options: [
      {
        value: 'value 1',
        content: ({ selected, isInContainer }) => (
          <AccountOption
            selected={selected ?? false}
            accountName={'1234123412341234'}
            balance={12345}
            currency={'EUR'}
            isInContainer={isInContainer ?? false}
          />
        ),
      },
      {
        value: 'value 2',
        content: ({ selected, isInContainer }) => (
          <AccountOption
            selected={selected ?? false}
            accountName={'1234123412341234'}
            balance={555}
            currency={'RUB'}
            isInContainer={isInContainer ?? false}
          />
        ),
      },
    ] as SelectOption[],
    defaultContainer,
  },
};

type Story = StoryObj<typeof InputSelectTemplate>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<string>();

    const options = args.options;

    useEffect(() => {
      const modalRoot = document.createElement('div');
      modalRoot.setAttribute('id', 'modal-root');
      document.querySelector('body')!.appendChild(modalRoot);

      return () => {
        modalRoot.remove();
      };
    }, []);

    return (
      <InputSelectTemplate
        {...args}
        value={{
          value: value ?? '',
          content: options?.find((o) => o.value === value)?.content,
        }}
        onChange={(option) => {
          setValue(option.value);
        }}
      />
    );
  },
};
