import { TEXT, DESCRIPTIONS } from '../../constants';

export const getCardDescription = (typeName: string, isCredit: boolean = false): string => {
  return (
    DESCRIPTIONS[typeName] ||
    (isCredit ? TEXT.description.creditCardDefault : TEXT.description.debitCardDefault)
  );
};
