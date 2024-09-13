import { FC } from 'react';
import { Empty, Typography } from 'antd';

import cn from '@t2crm/wfm-utils/lib/utils/cn';

import './styles.less';

const { Title } = Typography;

const className = cn('main-page');

const MainPage: FC = () => (
  <div className={className()}>
    <Empty
      description={(
        <Title level={3} type="secondary">Выберите страницу, которую хотите администрировать</Title>
      )}
    />
  </div>
);

export default MainPage;
