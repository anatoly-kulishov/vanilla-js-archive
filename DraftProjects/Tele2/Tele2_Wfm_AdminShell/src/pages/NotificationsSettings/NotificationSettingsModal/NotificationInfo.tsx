import { FC } from 'react';
import {
  Row, Col, Input, Form,
} from 'antd';

import CustomSelect from 'components/CustomSelect';
import useDictionaries from 'hooks/useDictionaries';
import { requiredRule, maxNumbersCount, onlyNumbers } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import { MAX_TIME_LAG_LENGTH, notificationStatuses } from '../constants';

type Props = {
  disabled: boolean;
};

const { Item } = Form;

const NotificationInfo: FC<Props> = ({ disabled }) => {
  const { notificationConditions } = useDictionaries(['notification-conditions']);

  return (
    <div>
      <Row gutter={32}>
        <Col span={24}>
          <Item
            name="notificationConditionId"
            label="Условие"
            rules={[requiredRule]}
          >
            <CustomSelect
              options={notificationConditions.data}
              loading={notificationConditions.isFetching}
              disabled={disabled}
            />
          </Item>
        </Col>
      </Row>

      <Row gutter={32}>
        <Col span={12}>
          <Item
            name="timeLag"
            label="Временная задержка, мин"
            rules={[
              maxNumbersCount(MAX_TIME_LAG_LENGTH),
              onlyNumbers,
            ]}
          >
            <Input allowClear />
          </Item>
        </Col>

        <Col span={12}>
          <Item
            name="isActive"
            label="Статус"
            initialValue="false"
          >
            <CustomSelect
              options={notificationStatuses.filter(({ value }) => value !== 'all')}
            />
          </Item>
        </Col>
      </Row>
    </div>
  );
};

export default NotificationInfo;
