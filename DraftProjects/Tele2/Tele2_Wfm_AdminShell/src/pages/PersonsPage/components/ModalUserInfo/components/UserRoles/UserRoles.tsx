import { FC, useMemo, useState } from "react";
import { Table, Button, Select } from "antd";
import { AxiosError } from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import cn from "@t2crm/wfm-utils/lib/utils/cn";
import {
  getUserRoles,
  getRoles,
  addUserRole,
  deleteUserRole,
} from "utils/api/auth";
import { getColumns, pagination, isUserAlreadyHasRole } from "./helpers";
import DeleteRoleButton from "./components/DeleteRoleButton";
import "./styles.less";

const className = cn("user-roles");

type Props = {
  userId?: number;
};

const UserRoles: FC<Props> = ({ userId }) => {
  const [roleCandidate, setRoleCandidate] = useState<string>();

  const queryClient = useQueryClient();

  const { isFetching: isLoadingUserRoles, data: userRoles } = useQuery({
    queryKey: ["user", userId, "roles"],
    queryFn: () =>
      getUserRoles({ userId: userId! }).then(({ data }) =>
        data.map((name) => ({ name }))
      ),
    enabled: Boolean(userId),
  });

  const { isFetching: isLoadingRoles, data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles().then(({ data }) => data),
  });

  const addUserRoleMutation = useMutation(addUserRole, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId, "roles"], { exact: true });
      setRoleCandidate(undefined);
    },
    onError: (err: AxiosError) => {
      addUserRoleMutation.reset();
      return Promise.reject(err);
    },
  });

  const deleteUserRoleMutation = useMutation(deleteUserRole, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId, "roles"], { exact: true });
    },
    onError: (err: AxiosError) => {
      deleteUserRoleMutation.reset();
      return Promise.reject(err);
    },
  });

  const rolesOptions = useMemo(
    () =>
      roles?.map(({ name }) => {
        const isAlreadyHas = isUserAlreadyHasRole(name, userRoles);
        const label = isAlreadyHas ? (
          <div className={className("search__option")}>
            <span>{name}</span>
            <DeleteRoleButton onConfirm={() => onDeleteUserRole(name)} />
          </div>
        ) : (
          name
        );

        return {
          label,
          value: name,
          disabled: isAlreadyHas,
        };
      }) || [],
    [roles, userRoles]
  );

  const onSelectNewUserRole = (role: string) => {
    setRoleCandidate(role);
  };

  const onClickAddNewUserRole = () => {
    if (userId && roleCandidate) {
      addUserRoleMutation.mutate({ userId, roleName: roleCandidate });
    }
  };

  const onDeleteUserRole = (roleName: string) => {
    if (userId && roleName) {
      deleteUserRoleMutation.mutate({ userId, roleName });
    }
  };

  return (
    <div className={className()}>
      <Table
        columns={getColumns(onDeleteUserRole)}
        dataSource={userRoles}
        pagination={pagination}
        loading={
          isLoadingUserRoles ||
          addUserRoleMutation.isLoading ||
          deleteUserRoleMutation.isLoading
        }
      />
      <div className={className("search")}>
        <Select
          className={className("search__input")}
          value={roleCandidate}
          placeholder="Выберите роль"
          loading={isLoadingRoles || addUserRoleMutation.isLoading}
          listHeight={200}
          showSearch
          options={rolesOptions}
          onChange={onSelectNewUserRole}
        />
        <Button
          type="primary"
          disabled={!roleCandidate}
          loading={addUserRoleMutation.isLoading}
          onClick={onClickAddNewUserRole}
        >
          Добавить роль
        </Button>
      </div>
    </div>
  );
};

export default UserRoles;
