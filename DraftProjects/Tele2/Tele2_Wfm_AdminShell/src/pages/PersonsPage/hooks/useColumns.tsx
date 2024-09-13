import { Button, TableColumnsType } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import useCheckRoles from '@t2crm/wfm-utils/lib/hooks/useCheckRoles';

import type ResponsePerson from 'types/response/persons';
import Roles from 'enums/roles';

type UseColumnsProps = {
  setActivePerson: (record: ResponsePerson.Person) => void;
};

const useColumns = ({
  setActivePerson,
}: UseColumnsProps): TableColumnsType<ResponsePerson.Person> => {
  const isAllowEdit = useCheckRoles(Roles.AuthWrite);

  return ([
    {
      title: 'Логин',
      dataIndex: 'login',
      key: 'login',
      fixed: 'left',
      width: '24%',
    },
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: '28%',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      width: '23%',
    },
    {
      title: 'Номер телефона',
      dataIndex: 'mobilePhone',
      key: 'mobilePhone',
      width: '18%',
    },
    {
      key: 'render_action',
      width: '7%',
      align: 'center',
      render: (_: any, record: ResponsePerson.Person) => (
        isAllowEdit ? (
          <Button
            title="Редактировать данные пользователя"
            type="text"
            icon={<EditOutlined id="edit" size={40} />}
            onClick={() => setActivePerson(record)}
          />
        ) : null),
    },
  ]);
};

export default useColumns;
