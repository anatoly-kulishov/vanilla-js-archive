import { FC } from 'react';
import { Empty, Typography } from 'antd';

import cn from '@t2crm/wfm-utils/lib/utils/cn';

import './styles.less';

const { Title } = Typography;

const className = cn('page-403');

const Page403: FC = () => (
  <div className={className()}>
    <Empty
      description={(
        <Title level={3}>У вас нет прав для просмотра данной страницы</Title>
      )}
    />
  </div>
);

export default Page403;
