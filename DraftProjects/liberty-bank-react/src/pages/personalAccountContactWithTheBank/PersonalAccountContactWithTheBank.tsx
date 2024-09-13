import { useState, FormEvent, FC } from 'react';
import { InputText, Text, Button } from '@/shared';
import styles from './PersonalAccountContactWithTheBank.module.scss';

const PersonalAccountContactWithTheBank: FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue('');
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  return (
    <div className={styles.contactWithTheBank__block}>
      <form className={styles.contactWithTheBank__item} onSubmit={handleSubmit}>
        <Text tag='h3' weight='medium'>
          Напишите нам
        </Text>
        <InputText
          placeholder='Ваше сообщение'
          value={inputValue}
          valueChange={handleInputChange}
          className={styles.contactWithTheBank_input}
        />
        <Button
          size='m'
          disabled={!inputValue}
          className={styles.contactWithTheBank_btn}
          type='submit'
        >
          Отправить сообщение
        </Button>
      </form>
      <div className={styles.contactWithTheBank__phone}>
        <Text tag='h3' weight='medium'>
          Позвоните нам
        </Text>
        <div className={styles.contactWithTheBank__phone_item}>
          <div>
            <Text tag='h4' weight='medium'>
              +7 495 676-57-55
            </Text>
            <Text className={styles.text} tag='h5'>
              В Москве и за границей
            </Text>
          </div>
          <div>
            <Text tag='h4' weight='medium'>
              8 800 666-99-98
            </Text>
            <Text className={styles.text} tag='h5'>
              для звонков по России
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountContactWithTheBank;
