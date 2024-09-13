import { ChangeEventHandler, FC, useState } from "react";
import { Modal, Select, Form, Typography, Button, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient, useMutation } from "react-query";
import cn from "@t2crm/wfm-utils/lib/utils/cn";
import IconTooltip from "components/IconTooltip";
import "./styles.less";
import DeleteLimitButton from "../DeleteLimitButton";
import {
  getLimitedClaim,
  getLimitedTypes,
  updateLimitedClaim,
  deleteLimitedClaim,
  createLimitedClaim,
} from "utils/api/accessPolicy";
import { AxiosError } from "axios";
import { useForm } from "antd/lib/form/Form";

const className = cn("operation-setup");

type Props = {
  operation: string;
  role: string;
  onClose: VoidFunction;
};

const OperationSetup: FC<Props> = ({ operation, role, onClose }) => {
  const client = useQueryClient();
  const [form] = useForm();

  const [isShowAddLimitButton, setIsShowAddLimitButton] = useState(true);
  const [isShowLimitValue, setIsShowLimitValue] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const [chosenLimit, setChosenLimit] = useState<string | null>(null);
  const [limitValue, setLimitValue] = useState<string>("");

  const {
    isFetching: isFetchingActivedLimitedClaim,
    data: activedLimitedClaim,
  } = useQuery({
    queryKey: ["role-claims", role, "limited-claims"],
    queryFn: () =>
      getLimitedClaim({ RoleName: role, ClaimValue: operation }).then(
        ({ data }) => {
          if (data.length) {
            const limitedClaim = data[0];
            setChosenLimit(String(limitedClaim?.limitedTypeId));
            setIsShowAddLimitButton(false);

            if (limitedClaim?.value) {
              setIsShowLimitValue(true);
            } else {
              setIsShowLimitValue(false);
            }
          }

          return data
        }
      ),
  });

  const { isFetching: isFetchingLimitedTypes, data: limitedTypes } = useQuery({
    queryKey: ["limited-types"],
    queryFn: () => getLimitedTypes().then(({ data }) => data),
  });

  const optionsModifyLimitedClaim = {
    onSuccess: () => {
      client.invalidateQueries(["role-claims", role, "limited-claims"]);
      onClose();
    },
    onError: (errorResponse: AxiosError) => {
      return Promise.reject(errorResponse);
    }
  }

  const createLimitedClaimMutation = useMutation(createLimitedClaim, optionsModifyLimitedClaim)
  const updateLimitedClaimMutation = useMutation(updateLimitedClaim, optionsModifyLimitedClaim);
  const deleteLimitedClaimMutation = useMutation(deleteLimitedClaim, optionsModifyLimitedClaim);

  const onSelectLimit = (limit: string) => {
    setChosenLimit(limit);

    const isNeedValue = limitedTypes?.some(
      (type) => String(type.id) === String(limit) && type.isNeedValue
    );

    if (isNeedValue) {
      setIsShowLimitValue(true);
    } else {
      setIsShowLimitValue(false);
    }
  };

  const onChangeLimitValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLimitValue(e.target.value);
  };

  const onClickUpdateLimitClaim = () => {
    const claimId = activedLimitedClaim?.[0]?.id;

    const isNeedValue = limitedTypes?.some(
      (type) => String(type.id) === String(chosenLimit) && type.isNeedValue
    );

    const basePayload = {
      id: claimId,
      roleName: role,
      claimValue: operation,
      limitedTypeId: Number(chosenLimit),
      value: isNeedValue ? limitValue : '',
    }

    if (claimId) {
      updateLimitedClaimMutation.mutate({
        ...basePayload,
        id: claimId,
      });
      return
    }

    createLimitedClaimMutation.mutate(basePayload)
  };

  const onClickDeleteLimitClaim = () => {
    const claimId = activedLimitedClaim?.[0]?.id;

    if (claimId) {
      deleteLimitedClaimMutation.mutate({
        id: claimId,
      });
    }

    setChosenLimit(null);
    setIsShowAddLimitButton(true);
    onClose();
  };

  const onFieldsChange = () => {
    setIsDisabled(false);
  }

  return (
    <Modal
      open
      centered
      width={700}
      title="Настройки операции"
      okText="Сохранить"
      onOk={onClickUpdateLimitClaim}
      okButtonProps={{ disabled: isDisabled || isFetchingActivedLimitedClaim }}
      cancelText="Отменить"
      onCancel={onClose}
    >
      <div className={className()}>
        <Form layout="vertical">
          <Form.Item label="Название операции" name="operationName">
            <Select disabled defaultValue={operation} />
          </Form.Item>
          <Form.Item label="Роль" name="role">
            <Select disabled defaultValue={role} />
          </Form.Item>
        </Form>
        <div className={className("limit")}>
          <div className={className("limit__header")}>
            <Typography.Text strong>Ограничение</Typography.Text>
            <IconTooltip type="default" title="Ограничение влияет на данные, которые будут доступны пользователю.  Ограничение осуществляется согласно индивидуальным параметрам." />
          </div>
          <div className={className("limit__main")}>
            {isShowAddLimitButton ? (
              <Button
                block
                type="dashed"
                icon={<PlusOutlined />}
                loading={isFetchingActivedLimitedClaim}
                onClick={() => setIsShowAddLimitButton(false)}
              >
                Добавить ограничение
              </Button>
            ) : (
              <Form
                form={form}
                layout="vertical"
                onFieldsChange={onFieldsChange}
                className={className("limit__main__form")}
              >
                <Form.Item
                  className={className("limit__main__form__item")}
                  label="Тип ограничения"
                  name="limitType"
                >
                  <Select
                    defaultValue={activedLimitedClaim?.[0]?.limitedTypeName}
                    value={chosenLimit}
                    loading={
                      isFetchingActivedLimitedClaim || isFetchingLimitedTypes
                    }
                    options={
                      limitedTypes?.length
                        ? limitedTypes?.map((type) => ({
                          value: type.id,
                          label: type.name,
                        }))
                        : []
                    }
                    onSelect={onSelectLimit}
                  />
                </Form.Item>
                {isShowLimitValue && (
                  <Form.Item
                    className={className("limit__main__form__item")}
                    label="Значение"
                    name="limitValue"
                  >
                    <Input
                      allowClear
                      defaultValue={activedLimitedClaim?.[0]?.value}
                      value={limitValue}
                      onChange={onChangeLimitValue}
                      max={255}
                    />
                  </Form.Item>
                )}
                <DeleteLimitButton
                  classNameButton={className("limit__main__form__delete")}
                  onConfirm={onClickDeleteLimitClaim}
                  onCancel={onClose}
                />
              </Form>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OperationSetup;
