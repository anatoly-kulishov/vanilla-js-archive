import { FC, useMemo } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Row, Form, Col, Button, Input,
} from 'antd';
import { MaskedInput as AntdMaskInput } from 'antd-mask-input';
import { FormListFieldData } from 'antd/lib/form/FormList';

import CustomSelect from 'components/CustomSelect';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import Common from '@t2crm/wfm-utils/lib/types/common';
import Base from 'types/base';
import { ruleEmail, rulePhoneNumber } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import ContactTypes from 'enums/contactsTypes';

type Props = {
  contacts: Base.Contacts[] | undefined;
  contactTypes: Common.Option[];
  contactOwnerField: FormListFieldData;
};

const { Item } = Form;

const className = cn('contacts-types');

const ContactTypesFormList: FC<Props> = ({
  contacts,
  contactTypes,
  contactOwnerField,
}) => {
  const form = Form.useFormInstance();

  const initialContactTypes = useMemo(() => {
    if (!contacts || !contacts.length) {
      return [];
    }
    const ownerName = form.getFieldValue('contacts-owners-list')[contactOwnerField.name]?.owner;

    return contacts
      .filter(({ owner }) => owner === ownerName)
      .map(({ typeId, data }) => ({
        contactType: typeId,
        contact: data,
      }));
  }, [contactOwnerField.name, contacts, form]);

  return (
    <Row key={contactOwnerField.key} gutter={32}>
      <Form.List
        name={[contactOwnerField.name, 'contact-types-list']}
        initialValue={initialContactTypes}
      >
        {(contactTypesList, { add: addContactType, remove: removeContactType }) => (
          <>
            {contactTypesList.map((contactType) => (
              <Col
                key={contactType.key}
                span={contactTypesList.length === 0 ? 0 : 12}
              >
                <Row gutter={16}>
                  <Col span={11}>
                    <Item
                      className={className('field')}
                      name={[contactType.name, 'contactType']}
                      label="Тип контакта"
                    >
                      <CustomSelect
                        options={contactTypes}
                      />
                    </Item>
                  </Col>
                  <Col span={12}>
                    <Row gutter={8}>
                      <Col span={21}>
                        <Item
                          dependencies={[[
                            'contacts-owners-list',
                            contactOwnerField.name,
                            'contact-types-list',
                            contactType.name,
                            'contactType'],
                          ]}
                        >
                          {({ getFieldValue }) => {
                            const ownerContactTypes = getFieldValue('contacts-owners-list')[contactOwnerField.name];

                            const {
                              'contact-types-list': {
                                [contactType.name]: {
                                  contactType: selectedContactType,
                                },
                              },
                            } = ownerContactTypes;

                            const isPhoneNumber = selectedContactType === ContactTypes.PhoneNumber;

                            return (
                              <Item
                                name={[contactType.name, 'contact']}
                                label={<span />}
                                rules={[isPhoneNumber ? rulePhoneNumber : ruleEmail]}
                                getValueFromEvent={(event) => (isPhoneNumber
                                  ? event.unmaskedValue
                                  : event.target.value)}
                              >
                                {isPhoneNumber ? (
                                  <AntdMaskInput
                                    allowClear
                                    disabled={!selectedContactType}
                                    placeholder="Контакт"
                                    mask={[
                                      {
                                        mask: '+7 (000) 000-00-00',
                                        lazy: false,
                                      },
                                    ]}
                                  />
                                ) : (
                                  <Input
                                    allowClear
                                    disabled={!selectedContactType}
                                    placeholder="Контакт"
                                    maxLength={Number.MAX_SAFE_INTEGER}
                                  />
                                )}
                              </Item>
                            );
                          }}
                        </Item>
                      </Col>

                      <Col span={3}>
                        <Item label={<span />}>
                          <MinusCircleOutlined
                            className={className('delete-btn')}
                            onClick={() => removeContactType(contactType.name)}
                          />
                        </Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            ))}

            {contactTypesList.length < 2 && (
              <Col span={12}>
                <Form.Item
                  label={contactTypesList.length === 0 ? '' : <span />}
                >
                  <Button
                    className={className('add-contact-type-btn')}
                    onClick={addContactType}
                    icon={<PlusOutlined />}
                  >
                    Добавить тип контакта
                  </Button>
                </Form.Item>
              </Col>
            )}
          </>
        )}
      </Form.List>
    </Row>
  );
};

export default ContactTypesFormList;
