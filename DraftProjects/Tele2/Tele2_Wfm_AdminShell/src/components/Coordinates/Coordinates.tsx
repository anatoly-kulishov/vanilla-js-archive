import {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import {
  Col, Form, Row, Typography,
} from 'antd';
import { MaskedInput as AntdMaskInput } from 'antd-mask-input';
import { Rule } from 'antd/lib/form';
import { ruleCoordinate } from '@t2crm/wfm-utils/lib/helpers/validationRules';
import { InputProps } from 'antd/lib/input';

import './styles.less';

type Props = {
  latitudeFieldName: string;
  longitudeFieldName: string;
  useAntdTitle?: boolean;
  disabled?: boolean;
};

type OnChangeEvent = Parameters<Exclude<InputProps['onChange'], undefined>>[0] & {
  maskedValue: string;
  unmaskedValue: string;
};

const { Item, useWatch, useFormInstance } = Form;
const { Title } = Typography;

const containsNumbers = (str: string = '') => str.match(/\d+/) !== null;

const cooridinateMask = '00.00000[0]';

const Coordinates: FC<Props> = (props) => {
  const {
    latitudeFieldName,
    longitudeFieldName,
    useAntdTitle = true,
    disabled,
  } = props;
  const form = useFormInstance();
  const latitude = useWatch([latitudeFieldName], form);
  const longtitude = useWatch([longitudeFieldName], form);

  const isEmptyLatitude = useMemo(() => !containsNumbers(latitude), [latitude]);
  const isEmptyLongtitude = useMemo(() => !containsNumbers(longtitude), [longtitude]);

  const requiredRule: Rule = useMemo(() => ({
    required: !isEmptyLatitude || !isEmptyLongtitude,
    message: 'Обязательное',
  }), [isEmptyLatitude, isEmptyLongtitude]);

  // валидируем поля координат при сбросе одной из них
  useEffect(() => {
    if (isEmptyLatitude) {
      form.validateFields([[longitudeFieldName]]);
    }

    if (isEmptyLongtitude) {
      form.validateFields([[latitudeFieldName]]);
    }
  }, [
    form,
    isEmptyLatitude,
    isEmptyLongtitude,
    latitude,
    latitudeFieldName,
    longitudeFieldName,
    longtitude]);

  const resetAndValidateField = useCallback((field: string) => {
    const { setFieldsValue, validateFields } = form;

    setFieldsValue({ [field]: undefined });
    validateFields([field]);
  }, [form]);

  const onChangeCoordinates = useCallback((ev: OnChangeEvent, type: 'long' | 'lat') => {
    const { value } = ev.target;

    if (containsNumbers(value)) {
      return;
    }
    // сброс координат
    if (type === 'lat') {
      resetAndValidateField(latitudeFieldName);
    }

    if (type === 'long') {
      resetAndValidateField(longitudeFieldName);
    }
  }, [latitudeFieldName, longitudeFieldName, resetAndValidateField]);

  return (
    <Row gutter={32}>
      <Col span={12}>
        {useAntdTitle && <Title level={4}>Широта</Title>}
        <Item
          name={latitudeFieldName}
          labelCol={{ span: 24 }}
          rules={[ruleCoordinate, requiredRule]}
          label={useAntdTitle ? '' : 'Широта'}
        >
          <AntdMaskInput
            allowClear
            placeholder="Введите широту"
            mask={[{ mask: cooridinateMask, lazy: false }]}
            onChange={(ev) => onChangeCoordinates(ev, 'lat')}
            disabled={disabled}
          />
        </Item>
      </Col>

      <Col span={12}>
        {useAntdTitle && <Title level={4}>Долгота</Title>}
        <Item
          name={longitudeFieldName}
          labelCol={{ span: 24 }}
          rules={[ruleCoordinate, requiredRule]}
          label={useAntdTitle ? '' : 'Долгота'}

        >
          <AntdMaskInput
            allowClear
            placeholder="Введите долготу"
            mask={[{ mask: cooridinateMask, lazy: false }]}
            onChange={(ev) => onChangeCoordinates(ev, 'long')}
            disabled={disabled}
          />
        </Item>
      </Col>
    </Row>
  );
};

Coordinates.defaultProps = {
  disabled: false,
  useAntdTitle: true,
};

export default Coordinates;
