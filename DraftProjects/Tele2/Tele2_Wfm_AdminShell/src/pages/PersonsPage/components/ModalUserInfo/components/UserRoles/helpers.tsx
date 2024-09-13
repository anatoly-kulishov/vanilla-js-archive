import { TableColumnsType, TablePaginationConfig } from "antd";
import ResponseAuth from "types/response/auth";
import DeleteRoleButton from "./components/DeleteRoleButton";

export const isUserAlreadyHasRole = (
  roleName: string,
  userRoles?: ResponseAuth.Role[]
) => userRoles?.some(({ name }) => name === roleName) || false;

export const getColumns = (
  onDeleteUserRole: (roleName: string) => void
): TableColumnsType<ResponseAuth.Role> => [
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1),
    showSorterTooltip: false,
  },
  {
    title: "",
    dataIndex: "operations",
    key: "operations",
    render: (_, role) => (
      <DeleteRoleButton onConfirm={() => onDeleteUserRole(role.name)} />
    ),
    width: "10%",
  },
];

export const pagination: TablePaginationConfig = {
  position: ["bottomRight"],
  pageSize: 6,
};
