import { FC, useState } from "react";
import { useQuery } from "react-query";
import { Button, Card, Empty, Table, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import RolesResponse from "types/response/roles";
import cn from "@t2crm/wfm-utils/lib/utils/cn";
import { getRoleById } from "utils/api/roles";
import DeleteButton from "components/DeleteButton";
import { ModalState } from "pages/RolesPage/types";
import { tablePaginationConfig } from "constants/tableConstants";
import useOperationMutations from "pages/RolesPage/hooks/useOperationMutations";
import OperationSetup from "./components/OperationSetup";
import "./styles.less";

const { Title } = Typography;

const className = cn("operations-content");

interface Props {
  selectedRoleId: number | undefined;
  setModal: (params: ModalState) => void;
}

const OperationsContent: FC<Props> = ({ selectedRoleId, setModal }) => {
  const [activedOperationSetup, setActivedShowOperationSetup] = useState<
    string | null
  >(null);

  const { deleteOperationMutation } = useOperationMutations();

  const selectedRole = useQuery<RolesResponse.RoleFullData | undefined>({
    queryKey: ["selected-role", selectedRoleId],
    enabled: selectedRoleId !== undefined,
    queryFn: () =>
      getRoleById(selectedRoleId as number).then(({ data }) => data ?? []),
    initialData: undefined,
  });

  const onDeleteButton = (name: string) => {
    if (selectedRoleId) {
      deleteOperationMutation.mutateAsync({
        roleId: selectedRoleId,
        operationName: name,
      });
    }
  };

  const columns = [
    {
      dataIndex: "value",
      key: "value",
    },
    {
      width: "5%",
      render: (_: any, { value }: RolesResponse.Claim) => (
        <div className={className("table__operations")}>
          <Button
            title="Редактировать"
            type="text"
            icon={<EditOutlined rev={undefined} id="edit" size={40} />}
            onClick={() => setActivedShowOperationSetup(value)}
          />
          <DeleteButton onDelete={() => onDeleteButton(value)} />
        </div>
      ),
    },
  ];

  return (
    <Card
      title="Доступные операции"
      className={className()}
      extra={
        <Button
          disabled={!selectedRoleId}
          onClick={() => setModal({ type: "Operations", visible: true })}
        >
          Добавить операцию
        </Button>
      }
    >
      {activedOperationSetup && selectedRole.data?.name && (
        <OperationSetup
          operation={activedOperationSetup}
          role={selectedRole.data.name}
          onClose={() => setActivedShowOperationSetup(null)}
        />
      )}
      {selectedRoleId ? (
        <Table
          className={className("table")}
          columns={columns}
          dataSource={selectedRole.data?.claims || []}
          loading={selectedRole.isFetching}
          rowKey={({ value }) => value}
          pagination={tablePaginationConfig}
          onRow={(record) => ({
            onDoubleClick: () => setActivedShowOperationSetup(record?.value),
          })}
        />
      ) : (
        <Empty
          className={className("empty")}
          description={
            <Title level={4} type="secondary">
              Для просмотра операций выберите роль
            </Title>
          }
        />
      )}
    </Card>
  );
};

export default OperationsContent;
