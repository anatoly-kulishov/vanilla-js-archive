import { FC, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Form, Input, Modal, Spin,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';

import './styles.less';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { getCompanyGroupById } from 'utils/api/companyGroups';
import { requiredRule } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import CompanyGroupsRequests from 'types/requests/companyGroups';
import Common from '@t2crm/wfm-utils/lib/types/common';
import useCompanyGroupMutations from './hooks/useCompanyGroupMutations';

type Props = {
  selectedGroupId: number | null;
  isCompanyGroupsModalVisible: boolean;
  onCloseModal: () => void;
  updateCompanyGroupsList: () => void;
};

const className = cn('company-groups-modal');

const { Item } = Form;

const CompanyGroupsModal: FC<Props> = ({
  selectedGroupId,
  isCompanyGroupsModalVisible,
  onCloseModal,
  updateCompanyGroupsList,
}) => {
  const [form] = useForm();
  const {
    createCompanyGroupMutation,
    modifyCompanyGroupMutation,
  } = useCompanyGroupMutations(updateCompanyGroupsList);

  const [isDisabledOkButton, setIsDisabledOkButton] = useState(true);

  const { isLoading: isCompanyDataLoading } = useQuery({
    queryKey: ['company-group', selectedGroupId],
    queryFn: () => {
      if (!selectedGroupId) {
        return;
      }
      getCompanyGroupById(selectedGroupId)
        .then(({ data }) => {
          form.setFieldsValue({
            name: data.name,
            fullName: data.fullName,
          });
          setIsDisabledOkButton(false);
        });
    },
    enabled: selectedGroupId !== null,
  });

  const onSubmit = () => {
    form.validateFields().then(() => {
      if (selectedGroupId) {
        const params: CompanyGroupsRequests.ModifyCompanyGroupParams = {
          id: selectedGroupId,
          ...form.getFieldsValue(),
        };

        modifyCompanyGroupMutation.mutateAsync(params).then(onCloseModal);
      } else {
        const params: CompanyGroupsRequests.CreateCompanyGroupParams = form.getFieldsValue();
        createCompanyGroupMutation.mutateAsync(params).then(onCloseModal);
      }
    });
  };

  const onValuesChange = useCallback((_, values: Common.KeyValue) => {
    const { fullName } = values;
    setIsDisabledOkButton(!fullName);
  }, []);

  return (
    <Modal
      open={isCompanyGroupsModalVisible}
      onCancel={onCloseModal}
      className={className()}
      title="Группа компаний"
      okText="Сохранить"
      cancelText="Отменить"
      onOk={onSubmit}
      destroyOnClose
      afterClose={form.resetFields}
      okButtonProps={{
        disabled: isDisabledOkButton,
        loading: createCompanyGroupMutation.isLoading || modifyCompanyGroupMutation.isLoading,
      }}
    >
      {isCompanyDataLoading ? (
        <Spin size="large" className={className('spin')} />
      ) : (
        <Form
          form={form}
          name="wrap"
          layout="vertical"
          colon={false}
          onValuesChange={onValuesChange}
        >
          <Item
            className={className('field')}
            name="name"
            label="Краткое наименование группы компании"
          >
            <Input
              allowClear
            />
          </Item>
          <Item
            className={className('field')}
            name="fullName"
            label="Полное наименование группы компании"
            rules={[requiredRule]}
          >
            <Input
              allowClear
            />
          </Item>
        </Form>
      )}
    </Modal>
  );
};

export default CompanyGroupsModal;
