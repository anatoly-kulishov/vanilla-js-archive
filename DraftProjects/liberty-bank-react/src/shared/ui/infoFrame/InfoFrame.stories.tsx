import type { Meta, StoryObj } from '@storybook/react';
import { CardType, InfoFrame } from './InfoFrame';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import { IImageProps } from '@/shared/ui';

const meta: Meta<typeof InfoFrame> = {
  title: 'Components/InfoFrame',
  component: InfoFrame,
  argTypes: {
    title: {
      description: 'Заголовок фрейма',
    },
    subTitle: {
      description: 'Подзаголовок фрейма',
    },
    primaryBtnText: {
      description: 'Текст главной кнопки',
    },
    secondaryBtnText: {
      description: 'Текст второстепенной кнопки',
    },
    onCloseClick: {
      description: 'Callback, закрывающий фрейм',
    },
    icon: {
      description: 'Изображение',
    },
    underImageTitle: {
      description: 'Заголовок изображения',
    },
    underImageSubTitle: {
      description: 'Массив подзаголовков изображения',
    },
    cardType: {
      description: 'Тип карточки',
    },
    onPrimaryButtonClick: {
      description: 'Обработчик клика по главной кнопке',
    },
    onSecondaryButtonClick: {
      description: 'Обработчик клика по второстепенной кнопке',
    },
    checkbox: {
      description: 'Конфигурация checkbox',
    },
  },
  args: {
    title: 'Заголовок',
    subTitle: 'Подзаголовок',
    primaryBtnText: 'Главная кнопка',
    secondaryBtnText: 'Вторичная кнопка',
    icon: { image: 'frame' } as IImageProps,
    underImageTitle: 'Заголовок изображения',
    underImageSubTitle: ['Подзаголовок изображения 1', 'Подзаголовок изображения 2'],
    onPrimaryButtonClick: () => {},
    cardType: CardType.closeBill,
  },
};

export default meta;
type Story = StoryObj<typeof InfoFrame>;

export const Primary: Story = {};

export const DontOpen: Story = {
  name: 'dontOpen',
  decorators: [
    (Story) => {
      const props = {
        cardType: CardType.dontOpen,
        icon: {
          image: 'dont-open-bill',
          width: '172',
          height: '216',
        } as IImageProps,
        title: 'На данный момент у Вас нет открытых счетов',
        primaryBtnText: 'Открыть счет',
        onPrimaryButtonClick: () => {},
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};

export const OpenBill: Story = {
  name: 'openBill',
  decorators: [
    (Story) => {
      const props = {
        cardType: CardType.openBill,
        title: 'На данный момент отсутствуют действующие кредитные продукты',
        icon: {
          image: 'dont-open-bill',
          width: '172',
          height: '216',
        } as IImageProps,
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};

export const CloseBill: Story = {
  name: 'closeBill',
  decorators: [
    (Story) => {
      const [isVisibleFrame, setIsVisibleFrame] = useState(true);
      const props = {
        CardType: CardType.closeBill,
        icon: {
          width: '300',
          height: '300',
          image: 'frame',
        } as IImageProps,
        onCloseClick: (value: boolean) => setIsVisibleFrame(value),
        primaryBtnText: 'Вернуться к счету',
        title: 'Название счета успешно изменено',
        onPrimaryButtonClick: () => {},
      };

      return <BrowserRouter>{isVisibleFrame && <Story args={props} />}</BrowserRouter>;
    },
  ],
};

export const OpenCard: Story = {
  name: 'openCard',
  decorators: [
    (Story) => {
      const props = {
        cardType: CardType.openCard,
        icon: {
          width: '400',
          height: '400',
          image: 'current-bill',
        } as IImageProps,
        primaryBtnText: 'Попробовать еще раз',
        secondaryBtnText: 'Перейти в «Мои карты»',
        onSecondaryButtonClick: () => {},
        underImageTitle: 'Ваша заявка успешно отправлена',
        onPrimaryButtonClick: () => {},
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};

export const CancelRequest: Story = {
  name: 'cancelRequest',
  decorators: [
    (Story) => {
      const [isVisibleFrame, setIsVisibleFrame] = useState(true);
      const props = {
        cardType: CardType.cancelRequest,
        icon: {
          width: '244',
          height: '200',
          image: 'close-bill',
        } as IImageProps,
        title: 'Вы действительно хотите отозвать данную заявку?',
        primaryBtnText: 'Отмена',
        secondaryBtnText: 'Да',
        onPrimaryButtonClick: () => setIsVisibleFrame(false),
        onSecondaryButtonClick: () => setIsVisibleFrame(false),
      };

      return <BrowserRouter>{isVisibleFrame && <Story args={props} />}</BrowserRouter>;
    },
  ],
};

export const ApplicationSent: Story = {
  name: 'applicationSent',
  decorators: [
    (Story) => {
      const props = {
        cardType: CardType.applicationSent,
        title: 'Ваш депозит открыт',
        icon: {
          image: 'all-product-current-bill',
          dir: 'bills',
          width: '278',
          height: '200',
          style: { transform: 'scale(-1, 1)' },
        } as IImageProps,
        primaryBtnText: 'Посмотреть мои депозиты',
        onPrimaryButtonClick: () => {},
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};

export const ApplicationDeclined: Story = {
  name: 'applicationDeclined',
  decorators: [
    (Story) => {
      const props = {
        cardType: CardType.applicationDeclined,
        title: 'Не удалось открыть депозит. Попробуйте оформить его снова!',
        icon: {
          image: 'failed-open-bill',
          dir: 'bills',
          width: '269',
          height: '200',
        } as IImageProps,
        primaryBtnText: 'Повторно подать заявку',
        onPrimaryButtonClick: () => {},
        secondaryBtnText: 'Вернуться к списку депозитов',
        onSecondaryButtonClick: () => {},
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};

export const ServiceUnavailable: Story = {
  name: 'serviceUnavailable',
  decorators: [
    (Story) => {
      const props = {
        cardType: CardType.serviceUnavailable,
        icon: {
          width: '227',
          height: '200',
          image: 'service-unavailable',
        } as IImageProps,
        primaryBtnText: 'Вернуться на шаг назад',
        onPrimaryButtonClick: () => {},
        underImageTitle: 'Сервис недоступен.',
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};

export const MoveOn: Story = {
  name: 'moveOn',
  decorators: [
    (Story) => {
      const props = {
        cardType: CardType.moveOn,
        title: 'Брокерский счет открыт',
        icon: {
          image: 'character',
          width: '59',
          height: '240',
        } as IImageProps,
        primaryBtnText: 'Перейти к моим счетам',
        onPrimaryButtonClick: () => {},
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};

export const Checkbox: Story = {
  name: 'checkbox',
  decorators: [
    (Story) => {
      const [isChecked, setIsChecked] = useState(false);
      const props = {
        cardType: CardType.checkbox,
        title: 'Вы действительно хотите закрыть счет?',
        primaryBtnText: 'Нет',
        secondaryBtnText: 'Да',
        icon: {
          image: 'close-bill',
          width: '244',
          height: '200',
        } as IImageProps,
        checkbox: {
          checked: isChecked,
          onChange: () => setIsChecked((prev) => !prev),
          link: '/',
          text: [
            'Я подтверждаю, что ознакомлен с ',
            'Порядком закрытия брокерского счета',
            ' и ограничением открытия нового брокерского счета не ранее 48 часов с момента\n закрытия текущего счета ',
          ],
        },
        onPrimaryButtonClick: () => {},
        onSecondaryButtonClick: () => {},
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};

export const Error: Story = {
  name: 'error',
  decorators: [
    (Story) => {
      const props = {
        cardType: CardType.error,
        icon: {
          image: '400',
          width: '247',
          height: '200',
        } as IImageProps,
        underImageTitle: 'Ошибка',
        primaryBtnText: 'Вернуться на шаг назад',
        onPrimaryButtonClick: () => {},
      };

      return (
        <BrowserRouter>
          <Story args={props} />
        </BrowserRouter>
      );
    },
  ],
};
