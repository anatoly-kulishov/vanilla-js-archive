import {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  Modal, Spin, Form, Input,
} from 'antd';
import { useQuery } from 'react-query';
import { maxNumbersCount, onlyNumbers, requiredRule } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { getAutoOperationsSettings } from 'utils/api/autoOperationsSettings';
import AutoOperationsSettingsResponses from 'types/response/autoOperationsSettings';
import AdminPanelNamespace from 'types/adminPanel';
import CustomSelect from 'components/CustomSelect';
import useDictionaries from 'hooks/useDictionaries';
import Common from '@t2crm/wfm-utils/lib/types/common';
import PartnerSelect from 'components/PartnerSelect';
import useOperationsSettingsMutations from '../hooks/useOperationsSettingsMutations';
import activityIdRule from './helper';
import './styles.less';

const { Item, useWatch, useForm } = Form;

type Props = {
  modalData: {
    data: AutoOperationsSettingsResponses.Setting,
    state: AdminPanelNamespace.ModalState,
  };
  onCancel: () => void;
};

const className = cn('operation-settings-modal');

const AutoOperationsSettingsModal: FC<Props> = ({
  modalData,
  onCancel,
}) => {
  const [form] = useForm();
  const selectedPartnerId = useWatch('partnerId', form);
  const employeeActivityIdField = useWatch('employeeActivityId', form);
  const { modifySettings } = useOperationsSettingsMutations();

  const isModalVisible = useMemo<boolean>(
    () => modalData.state === AdminPanelNamespace.ModalState.Add || !!modalData.data,
    [modalData.data, modalData.state],
  );

  const isEditModalState = useMemo(
    () => modalData.state === AdminPanelNamespace.ModalState.Edit, [modalData.state],
  );

  const [isDisabledOkButton, setIsDisabledOkButton] = useState<boolean>(!isEditModalState);

  useEffect(() => {
    setIsDisabledOkButton(!isEditModalState);
  }, [isEditModalState]);

  const { employeeActivities } = useDictionaries(['employee-activities']);

  const { autoOperationsTypes } = useDictionaries(
    ['auto-operations-types'],
    employeeActivityIdField ? { employeeActivityId: employeeActivityIdField } : undefined,
    isModalVisible,
  );

  const { dealers } = useDictionaries(
    ['dealers'],
    selectedPartnerId ? { partnerId: selectedPartnerId } : undefined,
    isModalVisible,
  );

  useEffect(() => {
    if (!isEditModalState && form.isFieldTouched('employeeActivityId')) {
      form.validateFields(['employeeActivityId']);
    }
  }, [form, autoOperationsTypes, isEditModalState]);

  const opertionSettings = useQuery({
    queryKey: ['single-operation-settings', modalData.data],
    queryFn: () => {
      const { dealerId, employeeActivityId, autoOperationsTypeId } = modalData.data;
      return getAutoOperationsSettings({
        dealerIdList: [dealerId],
        employeeActivityIdList: [employeeActivityId],
        autoOperationsTypeIdList: [autoOperationsTypeId],
      })
        .then(({ data }) => {
          form.setFieldsValue({
            ...data.settings?.[0],
            timeLag: data.settings[0].timeLag.toString(),
          });
          return data;
        });
    },
    enabled: !!modalData.data,
  });

  const onSubmit = () => {
    form.validateFields().then(() => {
      const formFields = form.getFieldsValue();
      modifySettings.mutateAsync({
        ...formFields,
        timeLag: formFields.timeLag ? Number(formFields.timeLag) : undefined,
      }).then(onCancel);
    });
  };

  const handleValuesChange = (_: Common.KeyValue, allFields: Common.KeyValue) => {
    const {
      dealerId, partnerId, autoOperationsTypeId, employeeActivityId,
    } = allFields;

    const isDisabledBtn = !dealerId || !partnerId || !autoOperationsTypeId || !employeeActivityId;

    setIsDisabledOkButton(isDisabledBtn);
  };

  const onChangePartner = () => {
    form.setFieldsValue({ dealerId: undefined });
    handleValuesChange(form, form.getFieldsValue());
  };

  const onChangeEmployeeActivityId = () => {
    form.setFieldsValue({ autoOperationsTypeId: undefined });
    handleValuesChange(form, form.getFieldsValue());
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={onCancel}
      className={className()}
      title="Настройки автоматических операций"
      okText="Сохранить"
      cancelText="Отменить"
      onOk={onSubmit}
      afterClose={form.resetFields}
      okButtonProps={{
        disabled: isDisabledOkButton,
        loading: modifySettings.isLoading,
      }}
    >
      {opertionSettings.isFetching ? (
        <Spin size="large" className={className('spin')} />
      ) : (
        <Form
          form={form}
          name="wrap"
          layout="vertical"
          colon={false}
          onValuesChange={handleValuesChange}
        >
          <Item
            className={className('field')}
            name="partnerId"
            label="Партнер"
            rules={[requiredRule]}
          >
            <PartnerSelect
              onChange={onChangePartner}
              disabled={isEditModalState}
            />
          </Item>

          <Item
            className={className('field')}
            name="dealerId"
            label="Дилер"
            rules={[requiredRule]}
          >
            <CustomSelect
              options={dealers.data}
              loading={dealers.isFetching}
              disabled={isEditModalState}
            />
          </Item>

          <Item
            className={className('field')}
            name="employeeActivityId"
            label="Активность"
            rules={[
              requiredRule,
              activityIdRule(autoOperationsTypes.data, autoOperationsTypes.isFetching),
            ]}
          >
            <CustomSelect
              options={employeeActivities.data}
              loading={employeeActivities.isFetching}
              onChange={onChangeEmployeeActivityId}
              disabled={isEditModalState}
            />
          </Item>

          <Item
            className={className('field')}
            name="autoOperationsTypeId"
            label="Тип операции"
            rules={[requiredRule]}
          >
            <CustomSelect
              options={autoOperationsTypes.data}
              loading={autoOperationsTypes.isFetching}
              disabled={isEditModalState}
            />
          </Item>

          <Item
            className={className('field')}
            name="timeLag"
            label="Временная задержка, мин"
            rules={[
              maxNumbersCount(4),
              onlyNumbers,
            ]}
          >
            <Input allowClear />
          </Item>
        </Form>
      )}
    </Modal>
  );
};

export default AutoOperationsSettingsModal;
