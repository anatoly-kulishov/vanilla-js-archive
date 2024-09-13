import { CardForm, CardFormLSKeys } from '../../model/types';

export class CardFormLSApi {
  cardFormPrefix: CardForm;

  constructor(cardForm: CardForm) {
    this.cardFormPrefix = cardForm;
  }

  setValue<T>(key: CardFormLSKeys, value: T) {
    localStorage.setItem(this.getPath(key), JSON.stringify({ value }));
  }

  getValue<T>(key: CardFormLSKeys) {
    const readData = localStorage.getItem(this.getPath(key));
    return readData ? (JSON.parse(readData).value as T) : null;
  }

  getDate(key: CardFormLSKeys) {
    const readData = localStorage.getItem(this.getPath(key));
    return readData ? new Date(JSON.parse(readData).value) : null;
  }

  clearValue(key: CardFormLSKeys) {
    localStorage.removeItem(this.getPath(key));
  }

  clearFormData(keys: CardFormLSKeys[]) {
    keys.forEach((key) => {
      localStorage.removeItem(this.getPath(key));
    });
  }

  private getPath(key: CardFormLSKeys) {
    return `${this.cardFormPrefix}/${key}`;
  }
}
