import type { TSvgIconNames } from '@/shared';

interface IInsuranceCategory {
  icon: TSvgIconNames;
  name: string;
  link: string;
}

export const CATEGORIES: IInsuranceCategory[] = [
  {
    icon: 'med',
    name: 'Медицинское страхование',
    link: '/insurance/products/health',
  },
  {
    icon: 'car',
    name: 'Автострахование',
    link: '/insurance/products/car',
  },
  {
    icon: 'travel',
    name: 'Страхование выезжающих за границу',
    link: '/insurance/products/travel',
  },
  {
    icon: 'sad',
    name: 'Страхование от несчастных случаев',
    link: '/insurance/products/accident',
  },
  {
    icon: 'home-circle',
    name: 'Страхование имущества',
    link: '/insurance/products/property',
  },
];
