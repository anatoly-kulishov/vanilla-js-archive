import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { Form, Modal, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import AdminPanelNamespace from 'types/adminPanel';
import NotificationSettingsResponses from 'types/response/notificationSettings';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import './styles.less';
import Common from '@t2crm/wfm-utils/lib/types/common';

import NotificationInfo from './NotificationInfo';
import DealerInfo from './DealerInfo';
import useNotificationSettingsMutations from '../hooks/useNotificationSettingsMutations';

type Props = {
  modalData: {
    data: NotificationSettingsResponses.Setting,
    state: AdminPanelNamespace.ModalState,
  };
  onCancel: () => void;
};

const className = cn('notification-settings-modal');

const NotificationSettingsModal: FC<Props> = ({
  modalData,
  onCancel,
}) => {
  const [form] = useForm();
  const { createSettings, modifySettings } = useNotificationSettingsMutations();

  const isModalVisible = useMemo<boolean>(
    () => modalData.state !== AdminPanelNamespace.ModalState.Close,
    [modalData.state],
  );

  const isEditModalState = useMemo(
    () => modalData.state === AdminPanelNamespace.ModalState.Edit, [modalData.state],
  );

  const [isDisabledOkButton, setIsDisabledOkButton] = useState<boolean>(!isEditModalState);

  useEffect(() => {
    if (modalData.data) {
      form.setFieldsValue({
        ...modalData.data,
        isActive: String(modalData.data?.isActive),
        timeLag: modalData.data.timeLag.toString(),
      });
    }
  }, [form, modalData.data]);

  useEffect(() => {
    setIsDisabledOkButton(!isEditModalState);
  }, [isEditModalState]);

  const onSubmit = () => {
    form.validateFields().then(() => {
      const formFields = form.getFieldsValue();

      const isActive = formFields?.isActive === 'true';
      const timeLag = formFields.timeLag ? Number(formFields.timeLag) : undefined;

      if (modalData.data) {
        modifySettings.mutateAsync({
          ...formFields,
          isActive,
          notificationSettingsId: modalData.data.notificationSettingsId,
          timeLag,
        }).then(onCancel);
      } else {
        createSettings.mutateAsync({
          ...formFields,
          isActive,
          timeLag,
        }).then(onCancel);
      }
    });
  };

  const handleValuesChange = (_: Common.KeyValue, allFields: Common.KeyValue) => {
    const {
      dealerId,
      partnerId,
      notificationConditionId,
    } = allFields;

    const isDisabledBtn = [
      dealerId,
      partnerId,
      notification,
      notificationConditionId,
    ].filter((item) => !item).length > 0;

    setIsDisabledOkButton(isDisabledBtn);
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={onCancel}
      className={className()}
      title="Настройки уведомлений"
      okText="Сохранить"
      cancelText="Отменить"
      width={850}
      onOk={onSubmit}
      destroyOnClose
      afterClose={form.resetFields}
      okButtonProps={{
        disabled: isDisabledOkButton,
        loading: createSettings.isLoading || modifySettings.isLoading,
      }}
    >
      <Form
        form={form}
        name="wrap"
        layout="vertical"
        colon={false}
        onValuesChange={handleValuesChange}
      >
        <DealerInfo disabled={isEditModalState} isModalVisible={isModalVisible} />
        <NotificationInfo disabled={isEditModalState} />
      </Form>
    </Modal>
  );
};

export default NotificationSettingsModal;
