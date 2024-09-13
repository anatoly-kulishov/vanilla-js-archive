/* eslint-disable max-len */

import type { Filters } from './News';

interface News {
  id: string;
  tagType: Filters['category'][] | string;
  image: string;
  title: string;
  description: string;
  instant: number;
}

export const NEWS: News[] = [
  {
    id: '1',
    tagType: ['bank'],
    image: 'https://i.postimg.cc/6yT0CjWR/catz.png',
    title: 'Liberty Bank открыл офис во Владивостоке',
    description:
      '«Мы учли все пожелания клиентов при выборе места для открытия нового офиса и обустройства пространства внутри, сделали комфортные места для ожидания и обслуживания, расширили перечень нефинансовых услуг, которые могут пригодиться в повседневных делах.»',
    instant: 1716959256072,
  },
  {
    id: '2',
    tagType: ['bank', 'technology'],
    image: 'https://i.postimg.cc/6yT0CjWR/catz.png',
    title: 'Ipsum nisi aliqua incididunt velit commodo in.',
    description:
      'Ut ad magna sit ullamco aliqua laboris enim aute et anim culpa exercitation. Veniam deserunt dolor in elit. Consequat eiusmod ipsum sunt cillum ad irure officia ipsum sunt elit ad sunt fugiat. Nisi excepteur sunt non tempor ex sit excepteur laboris sunt officia nulla adipisicing qui laborum. Et dolor ullamco incididunt proident pariatur veniam consequat labore dolor nostrud consequat et reprehenderit. Officia exercitation veniam laboris aliquip. Incididunt nisi voluptate consequat elit.',
    instant: 1716959296774,
  },
  {
    id: '3',
    tagType: ['technology'],
    image: 'https://i.postimg.cc/6yT0CjWR/catz.png',
    title: 'Laborum velit proident Lorem amet ad quis.',
    description:
      'Excepteur incididunt ad sint velit reprehenderit aute aliquip mollit nisi nisi cillum dolor. Consectetur aute ipsum exercitation ad magna deserunt reprehenderit. Eu mollit aute consequat do ullamco laboris voluptate ea nisi consectetur proident minim dolor. Occaecat ullamco anim magna do ullamco ullamco.',
    instant: 1709637732925,
  },
  {
    id: '4',
    tagType: ['bank'],
    image: 'https://i.postimg.cc/6yT0CjWR/catz.png',
    title: 'Liberty Bank открыл первый офис в Москве',
    description:
      'Liberty Bank открыл свой первый офис. Он занял трёхэтажное здание в центре города. Его общая площадь составляет около 700 кв. м.',
    instant: 1716959334399,
  },
  {
    id: '5',
    tagType: ['insurance'],
    image: 'https://i.postimg.cc/6yT0CjWR/catz.png',
    title: 'Adipisicing fugiat sit et non culpa aliquip.',
    description:
      'Nostrud et velit labore qui dolor. Pariatur minim nulla do quis. Do magna exercitation quis cillum nisi nisi adipisicing minim occaecat minim officia nulla cupidatat id.',
    instant: 1716959355908,
  },
];
