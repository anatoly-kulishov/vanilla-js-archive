import { FC, useMemo } from 'react';
import {
  Form,
  Input,
  Modal,
  ModalProps,
} from 'antd';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import RolesRequests from 'types/requests/roles';
import { ModalType } from '../../types';

const className = cn('load-offices');

const { Item, useForm } = Form;

type Props = ModalProps & {
  type: ModalType;
  onCreate: (params: RolesRequests.OperationParams | string) => Promise<void>;
  selectedRoleId?: number;
};

const AddOperation: FC<Props> = ({
  type,
  open,
  onCancel,
  title,
  onCreate,
  okButtonProps,
  selectedRoleId,
}) => {
  const [form] = useForm();
  const name = Form.useWatch('name', form);

  const isDisabledOkButton = useMemo(() => !name, [name]);

  const onSubmit = () => {
    form.validateFields().then(() => {
      const params = type === 'Operations' ? {
        roleId: selectedRoleId,
        operationName: name,
      } : name;
      onCreate(params);
    });
  };

  return (
    <div className={className()}>
      <Modal
        open={open}
        onCancel={onCancel}
        okText="Добавить"
        title={title}
        onOk={onSubmit}
        destroyOnClose
        afterClose={form.resetFields}
        okButtonProps={{
          disabled: isDisabledOkButton,
          loading: okButtonProps?.loading,
        }}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Item name="name" label="Введите название">
            <Input />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

AddOperation.defaultProps = {
  selectedRoleId: undefined,
};

export default AddOperation;
