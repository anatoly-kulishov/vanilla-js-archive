import { FC } from 'react';
import { Form, FormProps } from 'antd';
import { Rule } from 'antd/lib/form';

import { Button, Input, Modal } from 'uiKit';
import { FieldsRegistartionAddress } from 'helpers/daData';
import { ValidationMessage } from 'helpers/form';
import { DaDataIntegrationService } from 'api/daDataIntegration/types';

const maxLengthRule: Rule = { max: 512, message: ValidationMessage.MAX_LENGTH };
const requiredRule: Rule = { required: true, message: ValidationMessage.REQUIRED };

type Props = {
  handleSubmit: (address: DaDataIntegrationService.Model.Address) => void;
  handleClose: VoidFunction;
};

const RegistrationAddressModal: FC<Props> = ({ handleSubmit, handleClose }) => {
  const [form] = Form.useForm();

  const onFinish: FormProps['onFinish'] = (address) => {
    const fullAddress = Object.values(address).filter(Boolean).join(', ');

    handleSubmit({
      ...address,
      [FieldsRegistartionAddress.FULL_ADDRESS]: fullAddress
    });
  };

  return (
    <Modal
      closable
      title="Адрес регистрации"
      width={'393px'}
      zIndex={1001}
      footer={
        <Button type="primary" onClick={form.submit}>
          Сохранить
        </Button>
      }
      onCancel={handleClose}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name={FieldsRegistartionAddress.POST_INDEX} rules={[maxLengthRule]}>
          <Input placeholder="Индекс" />
        </Form.Item>
        <Form.Item name={FieldsRegistartionAddress.REGION} rules={[maxLengthRule, requiredRule]}>
          <Input placeholder="Регион" />
        </Form.Item>
        <Form.Item name={FieldsRegistartionAddress.CITY} rules={[maxLengthRule, requiredRule]}>
          <Input placeholder="Населенный пункт" />
        </Form.Item>
        <Form.Item name={FieldsRegistartionAddress.STREET} rules={[maxLengthRule, requiredRule]}>
          <Input placeholder="Улица" />
        </Form.Item>
        <Form.Item name={FieldsRegistartionAddress.HOUSE} rules={[maxLengthRule, requiredRule]}>
          <Input placeholder="Дом, корпус, строение" />
        </Form.Item>
        <Form.Item name={FieldsRegistartionAddress.FLAT} rules={[maxLengthRule]}>
          <Input placeholder="Квартира" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegistrationAddressModal;
