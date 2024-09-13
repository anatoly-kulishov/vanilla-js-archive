/* eslint-disable react/jsx-props-no-spreading */
import {
  FC,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  Form,
  Input,
  Typography,
  TimePicker,
  Select,
  Button,
  Popover,
  Spin,
  TimeRangePickerProps,
  TimePickerProps,
  FormProps,
} from 'antd';
import isNil from 'lodash.isnil';
import { CloseCircleTwoTone, PlusOutlined, DownCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { createPattern, setPattern } from 'utils/api/offices';

import './styles.less';
import ModalAddPatterns from 'types/modalAddPatterns';
import PatternsRequest from 'types/requests/patterns';

dayjs.extend(customParseFormat);

const { useForm, Item, List } = Form;
const { Paragraph, Text } = Typography;
const { RangePicker } = TimePicker;

const className = cn('step-create-pattern');

type LunchBreakType = {
  begin: string;
  end: string;
};

enum WorkFormat {
  dayOff = 'Выходной',
  workDay = 'Рабочий день',
}

const dayNames = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const workTypes = [
  { key: 0, value: WorkFormat.workDay, label: WorkFormat.workDay },
  { key: 1, value: WorkFormat.dayOff, label: WorkFormat.dayOff },
];

const getInitialWeekdaysState = () => (
  Array.from({ length: 7 }, (_, dayIndex) => ({
    name: dayNames[dayIndex],
    workType: WorkFormat.workDay,
    workTimeBegin: '09:00:00',
    workTimeEnd: '21:00:00',
  }))
);

const getInitialActiveWeekDays = () => Array.from({ length: 7 }, () => true);

/* eslint-disable react/require-default-props */
type CustomRangePickerProps = TimeRangePickerProps & {
  value?: LunchBreakType;
  onChange?: (dates: LunchBreakType, formatStrings: [string, string]) => void;
};

/* eslint-disable react/require-default-props */
type CustomTimePickerProps = TimePickerProps & {
  value?: string;
  onChange?: (dates: string, formatString: string) => void;
};

type FormChangeStateAction = Exclude<FormProps<PatternsRequest.NewPattern>['onValuesChange'], undefined>;

const defaultLunchBreak: LunchBreakType = {
  begin: '13:00:00',
  end: '14:00:00',
};

const CustomRangePicker: FC<CustomRangePickerProps> = ({ value, onChange, ...props }) => {
  const getValue = useCallback((newValue: CustomRangePickerProps['value']) => ([
    dayjs((newValue && newValue.begin) || '13:00:00', 'HH:mm:ss'),
    dayjs((newValue && newValue.end) || '14:00:00', 'HH:mm:ss'),
  ]), []);

  const [state, setState] = useState<(dayjs.Dayjs | undefined)[]>(getValue(value));

  useEffect(() => {
    setState(getValue(value));
  }, [value, getValue]);

  const handleOnChange: TimeRangePickerProps['onChange'] = (dates, titles) => {
    const newDates = [
      dates && dates[0] ? dayjs(dates[0].toDate()) : undefined,
      dates && dates[1] ? dayjs(dates[1].toDate()) : undefined,
    ];

    setState(newDates);

    if (onChange) {
      onChange(
        {
          begin: newDates[0] ? newDates[0].format('HH:mm:ss') : '',
          end: newDates[1] ? newDates[1].format('HH:mm:ss') : '',
        },
        titles,
      );
    }
  };

  return (
    <RangePicker
      {...props}
      // @ts-ignore
      value={state}
      onChange={handleOnChange}
    />
  );
};

const CustomTimePicker: FC<CustomTimePickerProps> = ({ value, onChange, ...props }) => {
  const [state, setState] = useState(value ? dayjs(value, 'HH:mm:ss') : undefined);

  useEffect(() => {
    setState(value ? dayjs(value, 'HH:mm:ss') : undefined);
  }, [value]);

  const handleOnChange: TimePickerProps['onChange'] = (date, formatString) => {
    const dayjsDate = date ? dayjs(date.toDate()) : undefined;

    setState(dayjsDate);

    if (onChange) {
      onChange(
        dayjsDate ? dayjsDate.format('HH:mm:ss') : '',
        formatString,
      );
    }
  };

  return (
    <TimePicker
      {...props}
      // @ts-ignore
      value={state}
      onChange={handleOnChange}
    />
  );
};

const StepCreatePattern: FC<ModalAddPatterns.StepProps> = ({
  onChangeStep,
  onClose,
  officeId,
}) => {
  const [formState] = useForm<PatternsRequest.NewPattern>();
  const officeModalForm = Form.useFormInstance();

  const [isDisabledSending, setisDisabledSending] = useState(true);
  const [processSaving, setProcessSaving] = useState(false);

  const [activeDays, setActiveDays] = useState(getInitialActiveWeekDays());

  const handleClonePlanToNextDays = useCallback((dayIndex: number) => {
    const state = formState.getFieldsValue();
    const cloningDayState = state.weekData[dayIndex];

    if (cloningDayState) {
      formState.setFieldsValue({
        ...state,
        weekData: state.weekData.map((data, index) => (
          index <= dayIndex ? data : { ...cloningDayState, name: data.name }
        )),
      });

      setActiveDays((oldActiveState) => oldActiveState.map((item, index) => (
        index <= dayIndex ? item : cloningDayState.workType === WorkFormat.workDay
      )));
    }
  }, [formState]);

  const handleValidateForm = useCallback<FormChangeStateAction>((changeValues, values) => {
    const isValidate = values.description && values.description.length;

    const newActiveDays = values.weekData.map((item) => item.workType === WorkFormat.workDay);

    setisDisabledSending(!isValidate);
    setActiveDays(newActiveDays);
  }, []);

  const getSavingFormState = useCallback(() => {
    const state = formState.getFieldsValue();

    return {
      ...state,
      weekData: state.weekData.map((day) => ({
        ...day,
        workTimeBegin: day.workType === WorkFormat.workDay ? day.workTimeBegin : undefined,
        workTimeEnd: day.workType === WorkFormat.workDay ? day.workTimeEnd : undefined,
        lunchBreaks: day.workType === WorkFormat.workDay ? day.lunchBreaks : [],
      })),
    };
  }, [formState]);

  const handleCreate = useCallback(() => {
    setProcessSaving(true);

    const newPattern = getSavingFormState();

    createPattern(newPattern)
      .then((response) => {
        if (!isNil(response) && !isNil(response.data)) {
          onChangeStep('save');
        } else {
          setProcessSaving(false);
        }
      })
      .finally(() => setProcessSaving(false));
  }, [getSavingFormState, onChangeStep]);

  const handleCreateAndSave = useCallback(() => {
    setProcessSaving(true);

    const newPattern = getSavingFormState();

    createPattern(newPattern)
      .then((response) => {
        if (!isNil(response?.data)) {
          const formValues = officeModalForm.getFieldsValue();

          setPattern(officeId, {
            WorkTimePatternId: response.data,
            Description: newPattern.description,
            officeCoordinateLatitude: +formValues?.officeCoordinateLatitude ?? undefined,
            officeCoordinateLongitude: +formValues?.officeCoordinateLongitude ?? undefined,
          })
            .then((responseSet) => {
              if (responseSet !== undefined) {
                onClose(response.data);
              }
            })
            .finally(() => setProcessSaving(false));
        } else {
          setProcessSaving(false);
        }
      })
      .catch(() => setProcessSaving(false));
  }, [getSavingFormState, officeModalForm, officeId, onClose]);

  return (
    <div className={className()}>
      <div className={className('body')}>
        <Spin size="large" spinning={processSaving}>
          <Form
            form={formState}
            name="createPattern"
            layout="vertical"
            onValuesChange={handleValidateForm}
          >
            <Item name="description" label="Описание" initialValue="">
              <Input maxLength={60} />
            </Item>
            <Paragraph>Информация по рабочей неделе:</Paragraph>
            <List name="weekData" initialValue={getInitialWeekdaysState()}>
              {(fields) => (
                fields.map(({ name, key, ...restField }) => (
                  <div key={key} className={className('work-time')}>
                    <Text strong className={className('day-name')}>{dayNames[key]}</Text>
                    <Item
                      {...restField}
                      name={[key, 'workType']}
                      className={className('select-work-type')}
                    >
                      <Select
                        options={workTypes}
                      />
                    </Item>
                    <Item
                      {...restField}
                      name={[key, 'workTimeBegin']}
                    >
                      <CustomTimePicker
                        minuteStep={30}
                        showNow={false}
                        showSecond={false}
                        allowClear={false}
                        placeholder="00:00"
                        disabled={!activeDays[key]}
                        format={(date) => date.format('H:mm')}
                      />
                    </Item>
                    <Item
                      {...restField}
                      name={[key, 'workTimeEnd']}
                    >
                      <CustomTimePicker
                        minuteStep={30}
                        showNow={false}
                        showSecond={false}
                        allowClear={false}
                        placeholder="23:00"
                        disabled={!activeDays[key]}
                        format={(date) => date.format('H:mm')}
                      />
                    </Item>
                    <div className={className('breaks')}>
                      <List
                        name={[key, 'lunchBreaks']}
                        initialValue={[]}
                      >
                        {(fieldsBreaks, { add, remove }) => (
                          <>
                            {fieldsBreaks.map(({ key: breakKey, ...breaksFiled }) => (
                              <div className={className('break')} key={`${key}-${breakKey}`}>
                                <Item
                                  {...breaksFiled}
                                  key={`${key}-${breakKey}`}
                                >
                                  <CustomRangePicker
                                    placeholder={['09:00', '23:00']}
                                    minuteStep={15}
                                    showNow={false}
                                    showSecond={false}
                                    clearIcon={false}
                                    disabled={!activeDays[key]}
                                    format={(date) => date.format('H:mm')}
                                  />
                                </Item>
                                <Button
                                  type="text"
                                  shape="circle"
                                  icon={<CloseCircleTwoTone color="gray" />}
                                  onClick={() => remove(breakKey)}
                                  disabled={!activeDays[key]}
                                />
                              </div>
                            ))}
                            <Item>
                              <Button
                                type="dashed"
                                onClick={() => add(defaultLunchBreak)}
                                block
                                icon={<PlusOutlined />}
                                disabled={!activeDays[key]}
                              >
                                Добавить перерыв
                              </Button>
                            </Item>
                          </>
                        )}
                      </List>
                    </div>
                    <Popover
                      content="Дублировать план до конца недели"
                    >
                      <Button
                        type="text"
                        shape="circle"
                        icon={<DownCircleOutlined color="gray" />}
                        onClick={() => handleClonePlanToNextDays(key)}
                      />
                    </Popover>
                  </div>
                ))
              )}
            </List>
          </Form>
        </Spin>
      </div>
      <div className={className('footer')}>
        <Button onClick={() => onChangeStep('save')}>Вернуться</Button>
        <Button
          disabled={isDisabledSending || processSaving}
          onClick={handleCreate}
          type="primary"
        >
          Сохранить
        </Button>
        <Button
          disabled={isDisabledSending || processSaving}
          onClick={handleCreateAndSave}
          type="primary"
        >
          Сохранить и применить
        </Button>
      </div>
    </div>
  );
};

export default StepCreatePattern;
