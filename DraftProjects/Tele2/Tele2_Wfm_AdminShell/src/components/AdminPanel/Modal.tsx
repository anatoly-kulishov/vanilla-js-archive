import {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import { Form, Modal as AntModal } from 'antd';
import AdminPanelNamespace from 'types/adminPanel';
import FormItem from './FormItem';

const { useForm } = Form;

const Modal: FC<AdminPanelNamespace.ModalProps> = (props) => {
  const {
    modalData: { state, data },
    modalItems,
    title,
    onOk,
    onCancel,
    formLayout,
  } = props;
  const [form] = useForm();
  const isEditState = useMemo(() => state === AdminPanelNamespace.ModalState.Edit, [state]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [form, data, modalItems]);

  const actionName = useMemo(() => {
    switch (state) {
      case AdminPanelNamespace.ModalState.Add: return 'Добавление';
      case AdminPanelNamespace.ModalState.Edit: return 'Редактирование';
      default: return 'Изменить';
    }
  }, [state]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const handleOk = useCallback(() => {
    form.validateFields().then(() => {
      const fields = form.getFieldsValue();
      if (onOk) {
        onOk(isEditState ? { ...data, ...fields } : fields);
      }
    });
  }, [data, form, isEditState, onOk]);

  return (
    <AntModal
      title={title || `${actionName}`}
      open={state !== AdminPanelNamespace.ModalState.Close}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Сохранить"
      destroyOnClose
      afterClose={form.resetFields}
    >
      <Form layout={formLayout} form={form} colon={false}>
        {modalItems?.map((modalItem) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <FormItem {...modalItem} key={modalItem.formItemProps?.id} />
        ))}
      </Form>
    </AntModal>
  );
};

export default Modal;
