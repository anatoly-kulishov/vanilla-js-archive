import { FC, useMemo } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col, Collapse, Form, Input, Row,
} from 'antd';

import CustomSelect from 'components/CustomSelect';
import Common from '@t2crm/wfm-utils/lib/types/common';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { requiredRule } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import Base from 'types/base';
import { getFullAddress, getFullAddressDependecies } from './AddressHelpers';
import './styles.less';

type Props = {
  initialAddresses: Base.Address[] | undefined;
  addressTypes: Common.Option[],
};

const className = cn('address-form');

const { Item } = Form;

const AddressForm: FC<Props> = ({
  addressTypes,
  initialAddresses,
}) => {
  const initialAddress = useMemo(() => {
    if (!initialAddresses || !Object.keys(initialAddresses).length) {
      return [];
    }
    return initialAddresses?.map((item) => ({
      addressTypeId: item.addressTypeId,
      regionName: item.regionName,
      cityName: item.cityName,
      streetName: item.streetName,
      houseName: item.houseName,
      flatName: item.flatName,
      entrance: item.entrance,
      floor: item.floor,
      intercom: item.intercom,
    }));
  }, [initialAddresses]);

  return (
    <Collapse ghost>
      <Collapse.Panel
        key="address-fields"
        header="Адрес организации партнера"
      >
        <Form.List
          name="address-form-list"
          initialValue={initialAddress}
        >
          {(addressFields, { add, remove }) => (
            <>
              {addressFields.map((field) => (
                <div key={field.key}>
                  <Row gutter={32}>
                    <Col span={8}>
                      <Item
                        name={[field.name, 'addressTypeId']}
                        className={className('field')}
                        label="Тип адреса"
                        required
                        rules={[requiredRule]}
                      >
                        <CustomSelect
                          options={addressTypes}
                          placeholder="Выберите тип адреса"
                        />
                      </Item>
                    </Col>
                    <Col span={8}>
                      <Item
                        className={className('field')}
                        name={[field.name, 'regionName']}
                        label="Регион"
                      >
                        <Input allowClear />
                      </Item>
                    </Col>

                    <Col span={8}>
                      <Item
                        className={className('field')}
                        name={[field.name, 'cityName']}
                        label="Город/Населенный пункт"
                        required
                        rules={[requiredRule]}
                      >
                        <Input allowClear />
                      </Item>
                    </Col>
                  </Row>

                  <Row gutter={32}>
                    <Col span={8}>
                      <Item
                        className={className('field')}
                        name={[field.name, 'streetName']}
                        label="Улица"
                        required
                        rules={[requiredRule]}
                      >
                        <Input allowClear />
                      </Item>
                    </Col>
                    <Col span={8}>
                      <Item
                        className={className('field')}
                        name={[field.name, 'houseName']}
                        label="Дом"
                        required
                        rules={[requiredRule]}
                      >
                        <Input allowClear />
                      </Item>
                    </Col>
                    <Col span={8}>
                      <Item
                        className={className('field')}
                        name={[field.name, 'flatName']}
                        label="Квартира"
                      >
                        <Input allowClear />
                      </Item>
                    </Col>
                  </Row>

                  <Row gutter={32}>
                    <Col span={8}>
                      <Item
                        className={className('field')}
                        name={[field.name, 'entrance']}
                        label="Подъезд"
                      >
                        <Input allowClear />
                      </Item>
                    </Col>
                    <Col span={8}>
                      <Item
                        className={className('field')}
                        name={[field.name, 'floor']}
                        label="Этаж"
                      >
                        <Input allowClear />
                      </Item>
                    </Col>
                    <Col span={8}>
                      <Item
                        className={className('field')}
                        name={[field.name, 'intercom']}
                        label="Домофон"
                      >
                        <Input allowClear />
                      </Item>
                    </Col>
                  </Row>
                  <Row className={className('full-address')}>
                    <Col span={24}>
                      <Item
                        dependencies={getFullAddressDependecies('address-form-list', field.name)}
                      >
                        {({ getFieldsValue }) => {
                          const address = getFieldsValue()?.['address-form-list']?.[field.name];
                          return (
                            <>
                              {address && (
                                <div
                                  className={className('full-address')}
                                >
                                  {`Полный адрес: ${getFullAddress(address)}`}
                                </div>
                              )}
                            </>
                          );
                        }}
                      </Item>
                    </Col>
                  </Row>
                  {addressFields.length > 0 && (
                  <Form.Item>
                    <Button
                      type="dashed"
                      className={className('delete-btn')}
                      onClick={() => remove(field.name)}
                      icon={<MinusCircleOutlined />}
                      danger
                    >
                      Удалить этот адрес
                    </Button>
                  </Form.Item>
                  )}
                </div>
              ))}

              {addressFields.length < 2 && (
                <Form.Item>
                  <Button
                    type="dashed"
                    className={className('add-btn')}
                    onClick={add}
                    icon={<PlusOutlined />}
                  >
                    Добавить адрес
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </Collapse.Panel>
    </Collapse>
  );
};

export default AddressForm;
