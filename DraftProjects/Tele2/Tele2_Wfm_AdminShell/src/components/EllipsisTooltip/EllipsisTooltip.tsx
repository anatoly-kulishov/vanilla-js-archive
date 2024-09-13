import { Tooltip } from 'antd';
import { FC } from 'react';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import './styles.less';

type Props = {
  text: string;
};

const className = cn('ellipsis-tooltip');

const EllipsisTooltip: FC<Props> = ({ text }) => (
  <Tooltip title={text}>
    <div className={className('text')}>
      {text}
    </div>
  </Tooltip>
);

export default EllipsisTooltip;
