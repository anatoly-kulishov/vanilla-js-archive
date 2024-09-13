import { FC, useMemo } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col, Collapse, Form, Input, Row,
} from 'antd';
import CustomSelect from 'components/CustomSelect';
import Common from '@t2crm/wfm-utils/lib/types/common';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import Base from 'types/base';
import ContactTypesFormList from './ContactTypesFormList';
import './styles.less';

type Props = {
  positions: Common.Option[];
  contactTypes: Common.Option[];
  contacts: Base.Contacts[] | undefined;
};

const { Item } = Form;

const className = cn('contacts-form');

const ContactsForm: FC<Props> = ({
  positions,
  contactTypes,
  contacts,
}) => {
  const initialOwners = useMemo(() => {
    if (!contacts || !contacts.length) {
      return [];
    }

    const contactsSet = new Set();

    const result = contacts.reduce((accum: Common.KeyValue[], contact) => {
      if (!contactsSet.has(contact.owner)) {
        contactsSet.add(contact.owner);
        accum.push({
          owner: contact.owner,
          positionId: contact.positionId,
        });
      }
      return accum;
    }, []);
    return result;
  }, [contacts]);

  return (
    <Collapse ghost className={className('collapse-panel')}>
      <Collapse.Panel
        key="contacts-panel"
        header="Контактное лицо организации партнера"
      >
        <Form.List
          name="contacts-owners-list"
          initialValue={initialOwners}
        >
          {(contactsOwners, { add: addContactOwner, remove: removeContactOwner }) => (
            <>
              {contactsOwners.map((contactOwnerField) => (
                <div key={contactOwnerField.key}>
                  <Row gutter={32}>
                    <Col span={12}>
                      <Item
                        className={className('field')}
                        label="Должность"
                        name={[contactOwnerField.name, 'positionId']}
                      >
                        <CustomSelect
                          options={positions}
                          placeholder="Выберите должность"
                        />
                      </Item>
                    </Col>

                    <Col span={12}>
                      <Item
                        className={className('field')}
                        name={[contactOwnerField.name, 'owner']}
                        label="ФИО контактного лица"
                      >
                        <Input allowClear />
                      </Item>
                    </Col>
                  </Row>

                  <ContactTypesFormList
                    contactTypes={contactTypes}
                    contacts={contacts}
                    contactOwnerField={contactOwnerField}
                  />

                  {contactsOwners.length > 0 && (
                    <Form.Item>
                      <Button
                        type="dashed"
                        className={className('delete-btn')}
                        onClick={() => removeContactOwner(contactOwnerField.name)}
                        icon={<MinusCircleOutlined />}
                        danger
                      >
                        Удалить контактное лицо
                      </Button>
                    </Form.Item>
                  )}
                </div>
              ))}

              {contactsOwners.length < 3 && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={addContactOwner}
                    icon={<PlusOutlined />}
                    className={className('add-btn')}
                  >
                    Добавить контактное лицо
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

export default ContactsForm;
