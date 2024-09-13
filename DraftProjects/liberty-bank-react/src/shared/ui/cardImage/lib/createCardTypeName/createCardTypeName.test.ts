import { createCardTypeName } from './createCardTypeName';

test('createCardTypeName should return correct card type name', () => {
  const typeName = 'Liberty Card Gold';
  const result = createCardTypeName(typeName);
  expect(result).toBe('card-gold');
});
