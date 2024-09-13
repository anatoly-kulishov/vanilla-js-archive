import { TAllImages } from '../../..';

export const createCardTypeName = (typeName: string): TAllImages => {
  const substring = 'Liberty Card ';
  const cardImagePrefix = 'card-';
  return cardImagePrefix.concat(typeName.replace(substring, '').toLowerCase()) as TAllImages;
};
