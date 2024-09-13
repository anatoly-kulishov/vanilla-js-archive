import { Button, Icon, PATH_PAGE, Text } from '@/shared';
import { Analytics } from '@/widgets/analytics';
import { MyAssets } from '@/widgets/myAssets/ui/MyAssets';
import React, { Fragment } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { GO_START_INVEST } from '../constants';
import styles from './LKbriefcaseMain.module.scss';
import { analyticsData } from './constants';

export default function LKbriefcaseMain() {
  const { isTestSuccess } = useOutletContext<{
    isTestSuccess: boolean;
    setIsTestSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  }>();
  const navigate = useNavigate();
  return (
    <>
      {!isTestSuccess && (
        <div className={styles['start-invest-block']}>
          <div className={styles['start-invest-content-block']}>
            <div className={styles['start-invest-text-block']}>
              <Text tag='h2' weight='bold' className={styles['start-invest-content-title']}>
                {GO_START_INVEST.title}
              </Text>
              <Text tag='h4' weight='regular' className={styles['start-invest-content-text']}>
                {GO_START_INVEST.text.map((line) => (
                  <Fragment key={line}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </Text>
            </div>
            <Button
              size='m'
              theme='primary'
              width='auto'
              className={styles.startInvestBtn}
              onClick={() => {
                navigate(PATH_PAGE.investmentLK.testing);
              }}
            >
              {GO_START_INVEST.btn}
            </Button>
          </div>
          <div className={styles['start-invest-svg']}>
            <Icon
              icon={GO_START_INVEST.icon.name}
              height={GO_START_INVEST.icon.height}
              width={GO_START_INVEST.icon.width}
              className='svg'
            />
          </div>
        </div>
      )}
      <MyAssets isTest={isTestSuccess} />
      {isTestSuccess && <Analytics analyticsData={analyticsData} />}
    </>
  );
}
