import { FC, useState } from "react";
import { useQuery } from "react-query";
import { Button, Card, Table } from "antd";

import { tablePaginationConfig } from "constants/tableConstants";
import { ModalState } from "pages/RolesPage/types";
import RolesResponse from "types/response/roles";
import cn from "@t2crm/wfm-utils/lib/utils/cn";
import { EditOutlined } from "@ant-design/icons";
import { getRoles } from "utils/api/roles";

import SettingUpRole from "./components/SettingUpRole";

import "./styles.less";

const className = cn("roles-content");

interface Props {
  selectedRoleId: number | undefined;
  setSelectedRoleId: (id: number) => void;
  setModal: (params: ModalState) => void;
}

const RolesContent: FC<Props> = ({
  selectedRoleId,
  setSelectedRoleId,
  setModal,
}) => {
  const [settingUpRole, setSettingUpRole] =
    useState<ResponseAccessPolicy.ClaimsType | null>(null);

  const roles = useQuery<RolesResponse.Role[]>({
    queryKey: ["roles"],
    queryFn: () => getRoles().then(({ data }) => data ?? []),
    initialData: [],
  });

  const columns = [
    {
      dataIndex: "name",
      key: "name",
    },
    {
      width: "5%",
      render: (_: any, record: ResponseAccessPolicy.ClaimsType) => (
        <div className={className("table__operations")}>
          <Button
            title="Редактировать"
            type="text"
            icon={<EditOutlined id="edit" size={40} />}
            onClick={(event) => {
              event?.stopPropagation();
              setSettingUpRole(record);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Card
      title="Роли"
      className={className()}
      extra={
        <Button onClick={() => setModal({ type: "Roles", visible: true })}>
          Добавить роль
        </Button>
      }
    >
      {settingUpRole && (
        <SettingUpRole
          settingUpRole={settingUpRole}
          onClose={() => setSettingUpRole(null)}
        />
      )}
      <Table
        className={className("table")}
        columns={columns}
        dataSource={roles.data}
        loading={roles.isFetching}
        rowClassName={({ id }) =>
          className("table-row", { selected: selectedRoleId === id })
        }
        onRow={(record) => ({
          onClick: () => setSelectedRoleId(record.id),
          onDoubleClick: () => setSettingUpRole(record),
        })}
        rowKey={({ id }) => id}
        pagination={tablePaginationConfig}
      />
    </Card>
  );
};

export default RolesContent;
