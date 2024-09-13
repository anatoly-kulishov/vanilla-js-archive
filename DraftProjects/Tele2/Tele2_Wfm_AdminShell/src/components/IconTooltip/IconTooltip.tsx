import { FC } from 'react';
import { Tooltip } from 'antd';
import { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import Icon, { ExclamationCircleOutlined } from '@ant-design/icons';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import './styles.less';

const className = cn('tooltip');

interface Props extends TooltipPropsWithTitle {
  type: 'success' | 'info' | 'warning' | 'error' | 'default';
  icon?: React.ElementType;
}

const IconTooltip: FC<Props> = ({
  type = 'info',
  icon = ExclamationCircleOutlined,
  ...tooltipProps
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tooltip className={className()} {...tooltipProps}>
    <Icon
      className={className('icon', { [type]: true })}
      component={icon as React.ForwardRefExoticComponent<any>}
    />
  </Tooltip>
);

export default IconTooltip;
