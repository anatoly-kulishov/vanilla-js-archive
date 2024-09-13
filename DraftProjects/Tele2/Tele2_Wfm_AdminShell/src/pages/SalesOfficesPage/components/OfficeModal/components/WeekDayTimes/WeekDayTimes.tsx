import { FC } from 'react';
import dayjs from 'dayjs';
import { Typography, Skeleton } from 'antd';
import useOfficePattern from 'hooks/useOfficePattern';
import prepareWorkTime from '@t2crm/wfm-utils/lib/utils/prepareWorkTime';
import OfficesResponse from 'types/response/offices';

const { Paragraph } = Typography;

const prepareTimes = (from?: string, to?: string) => (
  `с ${
    from ? dayjs(from, 'HH:mm:ss').format('HH:mm') : '-'
  } по ${
    to ? dayjs(to, 'HH:mm:ss').format('HH:mm') : '-'
  }`
);

type Props = {
  office?: OfficesResponse.OfficeByIdInfo;
  day?: string;
};

const WeekDayTimes: FC<Props> = ({ office, day }) => {
  const activeDay = day || dayjs().format('YYYY-MM-DD');

  const weekDayData = useOfficePattern(office, activeDay);

  if (!office) return null;

  if (!weekDayData.isFetched) return <Skeleton.Input block active />;

  if (!weekDayData.data) {
    return (
      <>
        <Paragraph>В этот день работает:</Paragraph>
        <Paragraph strong>{prepareWorkTime(office.workTime)}</Paragraph>
      </>
    );
  }

  if (weekDayData.data.workType && weekDayData.data.workType.toLowerCase() === 'выходной') {
    return <Paragraph type="secondary">Выходной день. Офис не работает</Paragraph>;
  }

  return (
    <>
      <Paragraph>В этот день работает:</Paragraph>
      <Paragraph strong>
        {prepareTimes(weekDayData.data.workTimeBegin, weekDayData.data.workTimeEnd)}
      </Paragraph>
    </>
  );
};

WeekDayTimes.defaultProps = {
  office: undefined,
  day: undefined,
};

export default WeekDayTimes;
