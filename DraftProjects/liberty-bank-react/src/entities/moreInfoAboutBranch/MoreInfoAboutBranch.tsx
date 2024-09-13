import { useRef } from 'react';
import { Button, CityBranch, Icon, Tabs, Text } from '@/shared';
import { BRANCHES, PHONE_NUMBERS, SERVICES_BANK } from './const';
import styles from './MoreInfoAboutBranch.module.scss';
import { ReturnButton } from './ui/ReturnButton';
import classNames from 'classnames';

interface Props {
  bankInfo: CityBranch | null | undefined;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const MoreInfoAboutBranch = (props: Props) => {
  const { bankInfo, isOpen, setIsOpen } = props;
  const ref = useRef<HTMLDivElement>(null);

  if (!bankInfo)
    return (
      <div className={styles.container}>
        <div className={styles.modal} ref={ref} />
      </div>
    );

  const {
    branchNumber,
    branchAddress,
    cityName,
    metro,
    workingSchedulePhysical,
    workingScheduleLegal,
    servicesBank,
    bankBranchType,
  } = bankInfo;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
      setIsOpen(false);
    }
  };

  const schedules = [
    {
      text: 'Обслуживание физических лиц',
      value: workingSchedulePhysical,
    },
    {
      text: 'Обслуживание юридических лиц',
      value: workingScheduleLegal,
    },
  ];

  const servicesBankStr = (Object.keys(servicesBank) as Array<keyof typeof servicesBank>)
    .filter((key) => servicesBank[key])
    .map((key) => SERVICES_BANK[key])
    .join(', ');

  return (
    <div
      className={classNames(styles.container, isOpen && styles.open)}
      onClickCapture={handleClick}
    >
      <div className={styles.modal} ref={ref}>
        <ReturnButton onClick={() => setIsOpen(false)} />
        <div className={styles.header}>
          <div className={styles.title}>
            <Icon icon={'bank'} widthAndHeight={'32px'} color={'#005AFE'} />
            <Text
              tag='h1'
              size='xl'
              weight='bold'
              className={styles.text_primary}
            >{`${BRANCHES[bankBranchType]} №${branchNumber}`}</Text>
          </div>
          <Text
            tag='p'
            size='s'
            className={styles.address}
          >{`г.${cityName}, ${branchAddress}`}</Text>
          {metro && (
            <div className={styles.metro}>
              <Icon icon={'subwayIcon'} />
              <Text tag='p' size='s'>
                {metro}
              </Text>
            </div>
          )}
        </div>
        {servicesBankStr && (
          <Text tag='p' className={styles.text_primary}>
            {`${servicesBankStr}.`}
          </Text>
        )}
        <Tabs
          tabs={[
            {
              label: 'Контактная информация',
              content: (
                <div className={styles.tabs_content}>
                  <div className={styles.schedule}>
                    {schedules.map((schedule, index) => (
                      <div className={styles.schedule_block} key={index}>
                        <Icon icon={'clock'} color='#005AFE' />
                        <div className={styles.schedule_text}>
                          <Text tag='p' size='s' weight='bold' className={styles.text_primary}>
                            {schedule.text}
                          </Text>
                          <Text tag='p' size='xs' className={styles.text_action}>
                            {`открыто до ${schedule.value[new Date().getDay()].closingTime}`}
                          </Text>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.cashDesk}>
                    <Text tag='p' weight='bold'>
                      Работа касс
                    </Text>
                    <Button theme='tertiary'>Показать время работы</Button>
                  </div>
                  <div className={styles.phoneNumbers}>
                    {PHONE_NUMBERS.map((item, index) => (
                      <div key={index} className={styles.phoneNumbers_item}>
                        <Icon icon={'connection-with-bank'} className={styles.text_action} />
                        <div className={styles.numbers}>
                          <Text tag='p' weight='bold'>
                            {item.label}
                          </Text>
                          {item.value.map((elem, index) => (
                            <Text tag='p' key={index} className={styles.text_secondary}>
                              {elem}
                            </Text>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
            { label: 'Услуги', content: <div>Услуги</div> },
          ]}
        />
      </div>
    </div>
  );
};
