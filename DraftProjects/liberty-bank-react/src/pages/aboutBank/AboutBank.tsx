import { Icon, Link, Tabs, Text, Wrapper } from '@/shared';

import styles from './AboutBank.module.scss';

import { ITEMS_TAB, TITLE } from './const';

const AboutBank = () => {
  return (
    <Wrapper size='l'>
      <div className={styles.body}>
        <Text tag='h1' weight='bold'>
          {TITLE}
        </Text>
        <Tabs
          tabs={ITEMS_TAB.map((tab) => ({
            label: tab.title,
            content: (
              <div className={styles.items}>
                {tab.value.map((item) => (
                  <Link key={item.title} to={item.link}>
                    <div className={styles.item} key={item.title}>
                      <Icon icon={item.icon} widthAndHeight={'56px'} />
                      <Text tag='h4' weight='medium'>
                        {item.title}
                      </Text>
                    </div>
                  </Link>
                ))}
              </div>
            ),
          }))}
        />
      </div>
    </Wrapper>
  );
};

export default AboutBank;
