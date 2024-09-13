import { FC } from 'react';
import { Empty, Typography } from 'antd';

import useCheckRoles from '@t2crm/wfm-utils/lib/hooks/useCheckRoles';

import Roles from 'enums/roles';

import LoadPersons from '../LoadPersons';

const { Title, Paragraph } = Typography;

const EmptyScreen: FC = () => {
  const isMigrationUsersDownload = useCheckRoles(Roles.MigrationUsersDownload);

  return (
    <Empty
      description={(
        <>
          <Title level={4}>Подходящие пользователи не найдены</Title>
          <Paragraph type="secondary">Измените фильтры поиска или загрузите новых пользователей</Paragraph>
        </>
      )}
    >
      {isMigrationUsersDownload && <LoadPersons />}
    </Empty>
  );
};

export default EmptyScreen;
