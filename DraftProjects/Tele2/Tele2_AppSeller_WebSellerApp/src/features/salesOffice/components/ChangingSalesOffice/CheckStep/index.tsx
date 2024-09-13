import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { Input } from 'uiKit';
import actions from 'features/salesOffice/actions';
import selectors from 'features/salesOffice/selectors';
import Step from 'common/steps/components/Step';

type ValuesForm = {
  officeId: string;
};

const CheckStep: FC = () => {
  const isLoadingGetPotentialActiveSalesOffice = useSelector(
    selectors.selectIsLoadingGetPotentialActiveSalesOffice
  );

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const submitCheckingOffice = ({ officeId }: ValuesForm) => {
    dispatch(actions.getPotentialActiveSalesOfficeInfo({ officeId }));
  };
  const finishChangingOffice = () => {
    dispatch(actions.resetState());
  };

  return (
    <Step
      title="Торговая точка"
      textGoForward="Изменить торговую точку"
      textGoBack="Отменить"
      isLoadingGoForward={isLoadingGetPotentialActiveSalesOffice}
      handleGoForward={form.submit}
      handleGoBack={finishChangingOffice}>
      <Form<{ officeId: string }>
        style={{ width: '100%' }}
        form={form}
        onFinish={submitCheckingOffice}>
        <Form.Item
          name="officeId"
          rules={[
            { pattern: /^\d*$/, message: 'Недопустимое значение' },
            { required: true, message: 'Обязательный параметр' }
          ]}>
          <Input
            disabled={isLoadingGetPotentialActiveSalesOffice}
            suffix={
              <Tooltip
                zIndex={1002}
                title="Уточните номер вашей торговой точки у торгового представителя Tele2 или вашего дилера">
                <QuestionCircleOutlined style={{ color: 'grey' }} />
              </Tooltip>
            }
          />
        </Form.Item>
      </Form>
    </Step>
  );
};

export default CheckStep;
