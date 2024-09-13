import { BackButton, InsuranceCategory, Text, Wrapper } from '@/shared';
import { BACK, CHAT_BOTS, CHAT_BOTS_TITLE, HEADER, MOCK_DATA } from './const';
import styles from './Contacts.module.scss';

const Contacts = () => {
  return (
    <Wrapper size='l'>
      <div className={styles.contacts}>
        <BackButton text={BACK} theme='blue' name='arrow-left-blue' height='24' width='24' />
        <div className={styles.body}>
          <Text tag='h3' weight='medium'>
            {HEADER}
          </Text>
          <div className={styles.main}>
            {MOCK_DATA.map((data, i) => (
              <div key={i} className={styles.block}>
                <Text tag='p' size='ml' weight='medium'>
                  {data.title}
                </Text>
                <div className={styles.items}>
                  {data.value.map((item, i) => (
                    <div key={i} className={styles.item}>
                      <Text tag='p' size='s' weight='medium'>
                        {item.value}
                      </Text>
                      <Text tag='p' size='s' weight='medium' className={styles.description}>
                        {item.description}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chat_bots}>
          <Text tag='h3' weight='medium'>
            {CHAT_BOTS_TITLE}
          </Text>
          <div className={styles.items}>
            {CHAT_BOTS.map((bot, i) => (
              <InsuranceCategory key={i} {...bot} />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contacts;
