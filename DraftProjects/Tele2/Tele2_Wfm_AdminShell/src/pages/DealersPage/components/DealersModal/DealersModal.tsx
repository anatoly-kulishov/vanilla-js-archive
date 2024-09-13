import {
  FC, useCallback, useState,
} from 'react';
import {
  Col, Form, Input, Modal, Row, Spin,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useQuery } from 'react-query';
import isNil from 'lodash.isnil';

import AddressForm from 'components/AddressForm';
import CustomSelect from 'components/CustomSelect';
import useDictionaries from 'hooks/useDictionaries';
import Common from '@t2crm/wfm-utils/lib/types/common';
import { getDealerById } from 'utils/api/dealers';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { onlyNumbers, requiredRule } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import './styles.less';
import ContactsForm from 'components/ContactsForm';
import DealersRequest from 'types/requests/dealers';
import getAddress from 'components/AddressForm/helpers';
import getContacts from 'components/ContactsForm/helpers';
import PartnerSelect from 'components/PartnerSelect';
import useDealersMutations from './hooks/useDealersMutations';

const className = cn('dealers-modal');

const { Item } = Form;

type Props = {
  selectedDealerId: number | null;
  updateDealersList: () => void;
  onCloseModal: () => void;
  isVisible: boolean;
};

const DealersModal: FC<Props> = ({
  selectedDealerId,
  updateDealersList,
  onCloseModal,
  isVisible,
}) => {
  const [form] = useForm();

  const {
    statuses,
    regions,
    positions,
    addressTypes,
    contactTypes,
  } = useDictionaries([
    'statuses',
    'regions',
    'positions',
    'address-types',
    'contact-types',
  ], undefined, isVisible);

  const {
    createDealerMutation,
    modifyDealerMutation,
  } = useDealersMutations(updateDealersList);

  const [isDisabledOkButton, setIsDisabledOkButton] = useState(true);

  const {
    isFetching: isDealerDataFetching,
    data: dealerData,
  } = useQuery({
    queryKey: ['dealer', selectedDealerId],
    queryFn: () => getDealerById(selectedDealerId as number)
      .then(({ data }) => {
        form.setFieldsValue({
          ...data,
          partner: {
            value: data?.partnerId,
            label: data.partner,
          },
        });
        setIsDisabledOkButton(false);
        return data;
      }),
    enabled: selectedDealerId !== null,
  });

  const onSubmit = useCallback(() => {
    form.validateFields().then(() => {
      const fields = form.getFieldsValue();
      const isContactsTouched = form.isFieldsTouched(['contacts-owners-list']);
      const isAddressTouched = form.isFieldsTouched(['address-form-list']);

      const params: DealersRequest.CreateOrModifyParams = {
        id: +fields.id,
        partnerId: fields.partner.value,
        partner: fields.partner.label,
        regionId: fields.regionId,
        name: fields.name,
        fullName: fields.fullName,
        statusId: fields.statusId,
        address: isAddressTouched ? getAddress(fields) : dealerData?.address ?? [],
        contacts: isContactsTouched ? getContacts(fields) : dealerData?.contacts ?? [],
      };
      if (fields.channelId) {
        params.channelId = +fields.channelId;
      }

      if (selectedDealerId) {
        modifyDealerMutation.mutateAsync(params).then(onCloseModal);
      } else {
        createDealerMutation.mutateAsync(params).then(onCloseModal);
      }
    });
  }, [
    createDealerMutation,
    dealerData,
    form,
    modifyDealerMutation,
    onCloseModal,
    selectedDealerId,
  ]);

  const onValuesChange = useCallback((_, values: Common.KeyValue) => {
    const {
      name,
      fullName,
      regionId,
      partner,
      statusId,
      id,
    } = values;

    const isDisabledBtn = !fullName || !name || !id
     || isNil(regionId) || isNil(partner?.value) || isNil(statusId);
    setIsDisabledOkButton(isDisabledBtn);
  }, []);

  return (
    <Modal
      open={isVisible}
      className={className()}
      title="Дилер"
      okText="Сохранить"
      cancelText="Отменить"
      onCancel={onCloseModal}
      onOk={onSubmit}
      width={900}
      destroyOnClose
      afterClose={form.resetFields}
      okButtonProps={{
        disabled: isDisabledOkButton,
        loading: createDealerMutation.isLoading || modifyDealerMutation.isLoading,
      }}
    >
      {isDealerDataFetching ? (
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
                className={className('field')}
                name="id"
                label="ИД дилера"
                rules={[requiredRule, onlyNumbers]}
              >
                <Input allowClear disabled={!!selectedDealerId} />
              </Item>
            </Col>

            <Col span={12}>
              <Item
                name="partner"
                className={className('field')}
                label="Наименование организации партнера"
                rules={[requiredRule]}
              >
                <PartnerSelect
                  placeholder="Выберите партнера"
                  disabled={!!selectedDealerId}
                  labelInValue
                />
              </Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={12}>
              <Item
                className={className('field')}
                name="name"
                label="Краткое наименование дилера"
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
                name="fullName"
                label="Полное наименование дилера"
                rules={[requiredRule]}
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
                rules={[requiredRule]}
              >
                <CustomSelect
                  options={statuses.data}
                  loading={statuses.isFetching}
                />
              </Item>
            </Col>

            <Col span={8}>
              <Item
                className={className('region')}
                name="regionId"
                label="Регион"
                rules={[requiredRule]}
              >
                <CustomSelect
                  options={regions.data}
                  loading={regions.isFetching}
                />
              </Item>
            </Col>
            <Col span={8}>
              <Item
                className={className('field')}
                name="channelId"
                label="Канал"
                rules={[onlyNumbers]}
              >
                <Input allowClear />
              </Item>
            </Col>
          </Row>

          <AddressForm
            addressTypes={addressTypes.data ?? []}
            initialAddresses={dealerData?.address}
          />
          <ContactsForm
            positions={positions.data ?? []}
            contactTypes={contactTypes.data ?? []}
            contacts={dealerData?.contacts}
          />
        </Form>
      )}
    </Modal>
  );
};

export default DealersModal;
