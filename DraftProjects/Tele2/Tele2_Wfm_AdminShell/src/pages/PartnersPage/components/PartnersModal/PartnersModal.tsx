import {
  FC, useCallback, useState,
} from 'react';
import {
  Col,
  Form, Input, Modal, Row, Spin,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useQuery } from 'react-query';
import isNil from 'lodash.isnil';

import CustomSelect from 'components/CustomSelect';
import ContactsForm from 'components/ContactsForm';
import AddressForm from 'components/AddressForm';
import useDictionaries from 'hooks/useDictionaries';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { requiredRule } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import { getPartnerById } from 'utils/api/partners';
import Common from '@t2crm/wfm-utils/lib/types/common';
import PartnersRequest from 'types/requests/partners';
import './styles.less';
import getAddress from 'components/AddressForm/helpers';
import getContacts from 'components/ContactsForm/helpers';
import usePartnersMutations from './hooks/usePartnersMutations';

type Props = {
  selectedPartnerId: number | null;
  isPartnersModalVisible: boolean;
  onCloseModal: () => void;
  updatePartnersList: () => void;
};

const className = cn('partners-modal');

const { Item } = Form;

const PartnersModal: FC<Props> = ({
  selectedPartnerId,
  isPartnersModalVisible,
  onCloseModal,
  updatePartnersList,
}) => {
  const [form] = useForm();
  const {
    statuses,
    companyGroups,
    juridicalTypes,
    positions,
    addressTypes,
    contactTypes,
  } = useDictionaries([
    'statuses',
    'company-groups',
    'juridical-types',
    'positions',
    'address-types',
    'contact-types',
  ], undefined, isPartnersModalVisible);

  const {
    createPartnerMutation,
    modifyPartnerMutation,
  } = usePartnersMutations(updatePartnersList);

  const [isDisabledOkButton, setIsDisabledOkButton] = useState(true);

  const {
    isLoading: isPartnersDataLoading,
    data: partnersData,
  } = useQuery({
    queryKey: ['company-group', selectedPartnerId],
    queryFn: () => getPartnerById(selectedPartnerId as number)
      .then(({ data }) => {
        form.setFieldsValue({
          ...data,
          companyGroup: {
            value: data?.companyGroupId,
            label: data.companyGroup,
          },
        });
        setIsDisabledOkButton(false);
        return data;
      }),
    enabled: selectedPartnerId !== null,
  });

  const onSubmit = () => {
    form.validateFields().then(() => {
      const fields = form.getFieldsValue();
      const isContactsTouched = form.isFieldsTouched(['contacts-owners-list']);
      const isAddressTouched = form.isFieldsTouched(['address-form-list']);

      const commonParams: PartnersRequest.CreateOrModifyPartnerParams = {
        id: fields.inn,
        name: fields.name,
        fullName: fields.fullName,
        juridicalTypeId: fields.juridicalTypeId,
        companyGroup: fields?.companyGroup?.label,
        companyGroupId: fields?.companyGroup?.value,
        ogrn: fields.ogrn,
        inn: fields.inn,
        statusId: fields.statusId,
        address: isAddressTouched ? getAddress(fields) : partnersData?.address ?? [],
        contacts: isContactsTouched ? getContacts(fields) : partnersData?.contacts ?? [],
      };

      if (selectedPartnerId) {
        commonParams.id = selectedPartnerId.toString();
        modifyPartnerMutation.mutateAsync(commonParams).then(onCloseModal);
      } else {
        createPartnerMutation.mutateAsync(commonParams).then(onCloseModal);
      }
    });
  };

  const onValuesChange = useCallback((_, values: Common.KeyValue) => {
    const {
      fullName,
      juridicalTypeId,
      statusId,
      inn,
    } = values;

    const isDisabledBtn = !fullName || isNil(juridicalTypeId)
    || isNil(statusId) || !inn;
    setIsDisabledOkButton(isDisabledBtn);
  }, []);

  return (
    <Modal
      open={isPartnersModalVisible}
      onCancel={onCloseModal}
      className={className()}
      title="Партнер"
      okText="Сохранить"
      cancelText="Отменить"
      onOk={onSubmit}
      width={900}
      destroyOnClose
      afterClose={form.resetFields}
      okButtonProps={{
        disabled: isDisabledOkButton,
        loading: createPartnerMutation.isLoading || modifyPartnerMutation.isLoading,
      }}
    >
      {isPartnersDataLoading ? (
        <Spin size="large" className={className('spin')} />
      ) : (
        <Form
          form={form}
          name="wrap"
          layout="vertical"
          colon={false}
          scrollToFirstError
          onValuesChange={onValuesChange}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Item
                name="companyGroup"
                className={className('field')}
                label="Наименование группы компаний"
              >
                <CustomSelect
                  options={companyGroups.data}
                  loading={companyGroups.isLoading}
                  placeholder="Выберите группу компаний"
                  labelInValue
                />
              </Item>
            </Col>

            <Col span={12}>
              <Item
                name="juridicalTypeId"
                className={className('field')}
                label="Юридический тип компании"
                required
                rules={[requiredRule]}
              >
                <CustomSelect
                  options={juridicalTypes.data}
                  loading={juridicalTypes.isLoading}
                  placeholder="Выберите тип"
                />
              </Item>
            </Col>

          </Row>

          <Row gutter={32}>
            <Col span={12}>
              <Item
                className={className('field')}
                name="fullName"
                label="Полное наименование организации партнера"
                required
                rules={[requiredRule]}
              >
                <Input
                  allowClear
                />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                className={className('field')}
                name="name"
                label="Краткое наименование организации партнера"
              >
                <Input
                  allowClear
                />
              </Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={8}>
              <Item
                name="statusId"
                className={className('field')}
                label="Статус"
                required
                rules={[requiredRule]}
              >
                <CustomSelect
                  options={statuses.data}
                  loading={statuses.isLoading}
                  placeholder="Выберите статус"
                />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                className={className('field')}
                name="inn"
                label="ИНН/ИД партнера"
                required
                rules={[requiredRule]}
              >
                <Input
                  allowClear
                  readOnly={!!selectedPartnerId}
                />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                className={className('field')}
                name="ogrn"
                label="ОГРН"
              >
                <Input
                  allowClear
                />
              </Item>
            </Col>
          </Row>
          <AddressForm
            addressTypes={addressTypes.data ?? []}
            initialAddresses={partnersData?.address}
          />
          <ContactsForm
            positions={positions.data ?? []}
            contactTypes={contactTypes.data ?? []}
            contacts={partnersData?.contacts}
          />
        </Form>
      )}
    </Modal>
  );
};

export default PartnersModal;
