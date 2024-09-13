import { useMemo } from 'react';
import { Button, Text, getDay, Icon, CityBranch } from '@/shared';
import styles from './BranchCard.module.scss';
import { TEXT } from './const';

interface BranchCardProps {
  cityBranch: CityBranch;
  selectBranch: (branch: CityBranch) => void;
}

export const BranchCard = (props: BranchCardProps) => {
  const { cityBranch, selectBranch } = props;
  const {
    branchNumber,
    bankBranchType,
    cityName,
    branchAddress,
    metro,
    legalEntity,
    workingSchedulePhysical,
    workingScheduleLegal,
  } = cityBranch;

  const getText = (text: string) => (
    <Text tag='p' className={styles.color_text_primary}>
      {text}
    </Text>
  );

  const getSchedule = (text: string, date: string) => (
    <div className={styles.schedule}>
      <Icon icon={'clock'} className={styles.color_text_action} />
      <div className={styles.body}>
        {getText(text)}
        <Button theme='tertiary'>
          <Text tag='p' size='xs'>
            {TEXT.OPEN_UNTIL + date}
          </Text>
        </Button>
      </div>
    </div>
  );

  const currentDay = useMemo(getDay, []);

  return (
    <div className={styles.branch_card}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon icon={'bank'} widthAndHeight={'20px'} className={styles.color_text_action} />
          <Text tag='h3' weight='medium'>
            {TEXT[bankBranchType] + branchNumber}
          </Text>
        </div>
        {getText(`г. ${cityName}, ${branchAddress}`)}
        {metro && (
          <div className={styles.metro}>
            <Icon icon={'subwayIcon'} className={styles.color_text_action} />
            {getText(metro)}
          </div>
        )}
        {getSchedule(TEXT.PHYSICAL, workingSchedulePhysical[currentDay].closingTime)}
        {legalEntity && getSchedule(TEXT.LEGAL, workingScheduleLegal[currentDay].closingTime)}
        <Button theme='tertiary' className={styles.button} onClick={() => selectBranch(cityBranch)}>
          {TEXT.MORE}
          <Icon icon={'arrow-right'} className={styles.color_text_action} />
        </Button>
      </div>
    </div>
  );
};
