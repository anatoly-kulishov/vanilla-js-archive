import { FC, useMemo, useState } from "react";
import { Modal, Select, Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";

import { getRoleConditions, getRolesConditionsTypes, updateRoleConditions } from "utils/api/roles";
import IconTooltip from "components/IconTooltip";
import RolesResponse from "types/response/roles";
import cn from "@t2crm/wfm-utils/lib/utils/cn";

import ConditionsGroup from "./components/ConditionsGroup";
import { useRoleConditions } from "./helpers";
import "./styles.less";
import RolesRequests from "types/requests/roles";

const className = cn("setting-up-role");

type Props = {
  settingUpRole: ResponseAccessPolicy.ClaimsType;
  onClose: () => void;
};

type ConditionsTypesMap = {
  [key: string]: RolesResponse.AssignmentCondition
}

const SettingUpRole: FC<Props> = ({ settingUpRole, onClose }) => {
  const [isShowAddConditionalButton, setIsShowAddConditionalButton] =
    useState(true);
  const [conditionsTypes, setConditionsTypes] = useState<RolesResponse.AssignmentCondition[]>([])

  const {
    conditions: roleConditions,
    initConditions,
    addCondition,
    changeCondition,
    removeCondition,
  } = useRoleConditions();

  const { isFetching, isError } = useQuery({
    queryKey: ["conditions-for-role"],
    enabled: settingUpRole.id !== undefined,
    queryFn: async () => {
      const [
        roleConditionsPromise,
        conditionsTypesPromise
      ] = await Promise.allSettled([
        getRoleConditions({ id: settingUpRole.id, roleName: settingUpRole.name }),
        getRolesConditionsTypes()
      ])

      const roleConditions = roleConditionsPromise.status === 'fulfilled' ?
        roleConditionsPromise.value.data?.assignmentConditionsList || [] : []
      const conditionsTypesRaw = conditionsTypesPromise.status === 'fulfilled' ?
        conditionsTypesPromise.value.data?.types || [] : []

      const conditionsTypes = conditionsTypesRaw.map((condition) => ({
        parameterTypeId: condition.id,
        parameterTypeName: condition.name,
        parameterValues: []
      }))

      return {
        roleConditions,
        conditionsTypes
      }
    },
    onSuccess: ({ conditionsTypes, roleConditions }) => {
      const initialConditionsMap = conditionsTypes.reduce((accMap, condition) => {
        accMap[String(condition.parameterTypeId)] = condition

        return accMap
      }, {} as ConditionsTypesMap)
      const roleConditionsMap = roleConditions.reduce(
        (accMap: ConditionsTypesMap, condition: RolesResponse.AssignmentCondition) => {
          accMap[String(condition.parameterTypeId)] = condition

          return accMap
        },
        initialConditionsMap
      )

      setConditionsTypes(conditionsTypes)
      initConditions(Object.values(roleConditionsMap));
      setIsShowAddConditionalButton(false);
    }
  });

  const updateLimitedClaimMutation = useMutation(updateRoleConditions, {
    onSuccess: () => {
      onClose();
    },
    onError: (errorResponse: AxiosError) => {
      return Promise.reject(errorResponse);
    },
  });

  const isValidForm = useMemo(() => {
    const conditions = Object.values(roleConditions);

    const hasNewValues =
      conditions.some((condition) => condition?.values?.some(({ initialValue, value }) => initialValue !== value));

    return hasNewValues;
  }, [roleConditions]);

  const handleOk = () => {
    const assignmentConditions = Object.values(roleConditions).reduce(
      (acc, curr) => {
        const conditionsByGroup = curr.values.map(({ value }) => {
          return {
            parameterTypeId: curr.parameterTypeId,
            parameterTypeName: curr.parameterTypeName,
            parameterValue: value!,
          };
        });

        return [...acc, ...conditionsByGroup];
      },
      [] as RolesRequests.UpdateAssignmentConditionsParams[]
    );

    updateLimitedClaimMutation.mutate({
      roleId: settingUpRole.id,
      roleName: settingUpRole.name,
      assignmentConditions,
    });
  };

  return (
    <Modal
      open
      centered
      width={850}
      title="Настройка роли"
      okText="Сохранить"
      onOk={handleOk}
      okButtonProps={{ disabled: !isValidForm }}
      cancelText="Отменить"
      onCancel={onClose}
    >
      <div className={className()}>
        <Select className={className("select")} disabled defaultValue={settingUpRole.name} />
        <div className="сondition">
          <div className={className("condition__header")}>
            <Typography.Text strong>Условие получение роли </Typography.Text>
            <IconTooltip
              type="default"
              title="Данные условия будут учитываться при регистрации новых пользователей и смене торговой точки. Условием для получения роли будет считаться наличие одного из значений, указанных у параметра. Если указаны значения у нескольких параметров, то обязательно выполнение всех условий"
            />
          </div>
          <div className={className("condition__main")}>
            {isShowAddConditionalButton && !roleConditions?.length ? (
              <div>
                <Button
                  block
                  type="dashed"
                  icon={<PlusOutlined />}
                  loading={isFetching}
                  disabled={isError}
                  onClick={() => {
                    setIsShowAddConditionalButton(!isShowAddConditionalButton)
                    initConditions(conditionsTypes);
                  }}
                >
                  Добавить условие
                </Button>
              </div>
            ) : (
              <div className={className("condition__groups")}>
                {roleConditions &&
                  Object.values(roleConditions)?.map((conditions) => (
                    <ConditionsGroup
                      conditions={conditions}
                      addCondition={addCondition}
                      changeCondition={changeCondition}
                      removeCondition={removeCondition}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingUpRole;
