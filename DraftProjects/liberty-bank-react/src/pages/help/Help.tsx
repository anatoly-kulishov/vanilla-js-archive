import { BackButton, Button, Collapse, Tabs, Text, Wrapper } from '@/shared';
import { BACK, FOOTER_LINK, FOOTER_STR, MOCK_DATA, TITLE } from './const';
import styles from './Help.module.scss';

const Help = () => {
  return (
    <Wrapper size='l'>
      <div className={styles.help}>
        <BackButton text={BACK} theme='blue' height='24' width='24' />
        <div className={styles.body}>
          <div className={styles.main}>
            <Text tag='h3' weight='medium'>
              {TITLE}
            </Text>
            <Tabs
              tabs={MOCK_DATA.map(({ label, value }, i1) => ({
                label: label,
                content: (
                  <div className={styles.list}>
                    {value.map((item, i2) => (
                      <Collapse key={i1 + '-' + i2} title={item.question}>
                        <div className={styles.answer}>
                          <Text tag='h4'>{item.answer}</Text>
                        </div>
                      </Collapse>
                    ))}
                  </div>
                ),
              }))}
            />
          </div>
          <div className={styles.footer}>
            <Text tag='p'>{FOOTER_STR[0]}</Text>
            <Button theme='tertiary' href={FOOTER_LINK[0].link}>
              {FOOTER_LINK[0].value}
            </Button>
            <Text tag='p'>{FOOTER_STR[1]}</Text>
            <Button theme='tertiary' href={FOOTER_LINK[1].link}>
              {FOOTER_LINK[1].value}
            </Button>
            <Text tag='p'>{FOOTER_STR[2]}</Text>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Help;
