import { FC } from 'react';
import { Form } from 'antd';

import CustomSelect from 'components/CustomSelect';
import useDictionaries from 'hooks/useDictionaries';
import { requiredRule } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import PartnerSelect from 'components/PartnerSelect';

type Props = {
  disabled: boolean;
  isModalVisible: boolean;
};

const { Item } = Form;

const DealerInfo: FC<Props> = ({ disabled, isModalVisible }) => {
  const form = Form.useFormInstance();
  const selectedPartnerId = Form.useWatch('partnerId', form);

  const { dealers } = useDictionaries(
    ['dealers'],
    selectedPartnerId ? { partnerId: selectedPartnerId } : undefined,
    isModalVisible,
  );

  const onChangePartner = () => {
    form.setFieldsValue({ dealerId: undefined });
  };

  return (
    <>
      <Item
        name="partnerId"
        label="Партнер"
        rules={[requiredRule]}
      >
        <PartnerSelect
          onChange={onChangePartner}
          disabled={disabled}
        />
      </Item>

      <Item
        name="dealerId"
        label="Дилер"
        rules={[requiredRule]}
      >
        <CustomSelect
          options={dealers.data}
          loading={dealers.isFetching}
          disabled={disabled}
        />
      </Item>
    </>
  );
};

export default DealerInfo;
