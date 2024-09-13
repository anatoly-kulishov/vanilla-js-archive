import { Button, Icon, Image, Text, Wrapper } from '@/shared';
import { NavMenu } from '@/shared/ui/navMenu';
import { FC, ReactNode } from 'react';
import logo from '../../shared/ui/icon/assets/images/logo.svg';
import styles from './Footer.module.scss';
import { APPLICATIONS, COOKIE, DATA, ICON, LICENSE, PAGES } from './constants';

type FooterProps = {
  children?: ReactNode;
};

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogoPhone}>
        <Wrapper size={'l'}>
          <div className={styles.footerHead}>
            <div className={styles.footerBlockLogo}>
              <div className={styles.footerLogo}>
                <img className={styles.footerLogoImg} src={logo} alt='logo' />
              </div>
              <div className={styles.footerPhoneBlock}>
                <Text className={styles.footerPhone} tag='h1' weight='bold'>
                  {DATA.telefon}
                </Text>
                <Text tag='h5' weight='regular'>
                  {DATA.title}
                </Text>
              </div>
            </div>
            <div>
              <Text className={styles.footerApplicationsText} tag='p' size='m' weight='bold'>
                {DATA.application}
              </Text>
              <div className={styles.footerButton}>
                {APPLICATIONS.map((item) => (
                  <Button key={item.id} theme='icon' href={item.href}>
                    <Image image={item.icon} height='46px' />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      <Wrapper size={'l'}>
        <div className={styles.footerNavMenu}>
          <NavMenu items={PAGES} colorText='action' disableActive />
        </div>
        <Text className={styles.footerText} tag='h5' weight='regular'>
          {COOKIE}
        </Text>
        <hr className={styles.footerLine} />
        <div className={styles.footerInfo}>
          <Text tag='h5' weight='regular'>
            {LICENSE}
          </Text>
          <div className={styles.footerIcon}>
            {ICON.map((item) => (
              <Button key={item.id} theme='icon' href={item.href}>
                <Icon icon={item.icon} />
              </Button>
            ))}
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};
