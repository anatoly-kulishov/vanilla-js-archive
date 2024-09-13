import { Image } from './Image.tsx';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    image: {
      description: 'Название картинки',
      control: 'select',
    },
    widthAndHeight: {
      description: 'Ширина и высота (одним параметром)',
      control: 'text',
    },
    width: {
      description: 'Ширина картинки',
      control: 'text',
    },
    height: {
      description: 'Высота',
      control: 'text',
    },
  },
  args: {
    image: 'all-product-credit-bill',
  },
};

export default meta;
type TImageStory = StoryObj<typeof Image>;

export const Default: TImageStory = {};
