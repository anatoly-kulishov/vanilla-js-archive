import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import EllipsisTooltip from 'components/EllipsisTooltip';
import PartnersResponse from 'types/response/partners';

type Props = {
  onEditPartner: (selectedId: number) => void;
};

const useColumns = ({ onEditPartner }: Props): ColumnsType<PartnersResponse.Partner> => ([
  {
    title: 'ИД партнера',
    dataIndex: 'id',
    key: 'id',
    width: '15%',
    ellipsis: true,
  },
  {
    title: 'Группа компаний',
    dataIndex: 'companyGroup',
    key: 'companyGroup',
    width: '25%',
    ellipsis: true,
  },
  {
    title: 'Партнер',
    dataIndex: 'fullName',
    width: '25%',
    key: 'fullName',
    ellipsis: true,
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    width: '15%',
    key: 'status',
    ellipsis: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: '15%',
    key: 'email',
    render: (_, { email }) => <EllipsisTooltip text={email} />,
  },
  {
    width: '5%',
    align: 'center',
    render: (_, { id }) => (
      <Button
        title="Редактировать"
        type="text"
        icon={<EditOutlined id="edit" size={40} />}
        onClick={() => onEditPartner(id)}
      />
    ),
  },
]);

export default useColumns;
