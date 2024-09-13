import {
  FC,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from 'react';
import { useQuery } from 'react-query';
import {
  Form, Input, Skeleton, Spin, Typography,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import isNil from 'lodash.isnil';
import CustomSelect from 'components/CustomSelect';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import Common from '@t2crm/wfm-utils/lib/types/common';
import EmployeesResponse from 'types/response/employees';
import { getOfficeById, getPatternsForOffice } from 'utils/api/offices';
import getAddress from '@t2crm/wfm-utils/lib/utils/getAddress';
import useToggleModal from '@t2crm/wfm-utils/lib/hooks/useToggleModal';
import PatternsResponse from 'types/response/patterns';
import Coordinates from 'components/Coordinates';
import CoordinatesSkeleton from './CoordinatesSkeleton';
import ModalAddPatterns from '../ModalAddPatterns';
import './styles.less';

const className = cn('office-modal');

const { Text, Paragraph, Title } = Typography;

const { Item } = Form;

// @ts-ignore
const WorkHours = lazy(() => import('tele2_wfm_uilibraryapp/components/WorkHours'));
// // @ts-ignore
// const Coordinates = lazy(() => import('tele2_wfm_uilibraryapp/components/Coordinates'));

const WorkHoursSkeleton: FC = () => (
  <div className={className('work-hours-skeleton')}>
    <Skeleton.Input active style={{ height: 50 }} />
    <Skeleton.Input active style={{ height: 50 }} />
    <Skeleton.Input active style={{ height: 50 }} />
  </div>
);

type Props = {
  form: FormInstance,
  selectedOfficeId: number | null,
  setIsDisabledOkButton: (isDisabled: boolean) => void,
  employees: EmployeesResponse.Employee[] | undefined;
  isEmployeesFetching: boolean;
  onUpdatePattern: (newPattern: PatternsResponse.Patterns) => void;
};

const OfficeModalTemplate: FC<Props> = ({
  form,
  selectedOfficeId,
  setIsDisabledOkButton,
  employees,
  isEmployeesFetching,
  onUpdatePattern,
}) => {
  const {
    isVisible: isVisibleAddPatternsModal,
    toggleModal: toggleAddPatternsModal,
  } = useToggleModal();

  const {
    data: office,
    isFetching: isOfficeFetching,
    refetch: refetchOffice,
    isRefetching: isOfficeRefetching,
  } = useQuery({
    queryKey: ['office', selectedOfficeId],
    queryFn: () => getOfficeById(selectedOfficeId as number)
      .then(({ data }) => {
        const prevValues = form.getFieldsValue();
        form.setFieldsValue({
          ...data,
          officeCoordinateLatitude: (prevValues?.officeCoordinateLatitude
            || data.officeCoordinateLatitude)?.toString(),
          officeCoordinateLongitude: (prevValues?.officeCoordinateLongitude
             || data.officeCoordinateLongitude)?.toString(),
          managerEmployee: {
            value: data.managerEmployeeId,
          },
        });
        return data;
      }),
    enabled: selectedOfficeId !== null,
  });

  const {
    data: patterns,
    isFetching: isPatternsFetching,
    refetch: refetchPatterns,
    isRefetching: isPatternsRefetching,
  } = useQuery({
    queryKey: ['workTimePattern', office?.id, office?.workTimePatternId],
    enabled: (
      office !== undefined
      && office.workTimePatternId !== undefined && office.workTimePatternId !== null
    ),
    queryFn: () => getPatternsForOffice(office?.workTimePatternId as number).then((response) => {
      onUpdatePattern(response.data);
      return response.data;
    }),
  });

  const emplOptions: Common.Option[] = useMemo(
    () => employees?.map(({ name, employeeId, position }) => ({
      value: employeeId,
      label: [name, position].filter(Boolean).join(', '),
    })) || [], [employees],
  );

  const onValuesChange = useCallback((_, values: Common.KeyValue) => {
    const {
      managerEmployee,
    } = values;

    const isDisabledBtn = isNil(managerEmployee.value);
    setIsDisabledOkButton(isDisabledBtn);
  }, [setIsDisabledOkButton]);

  const closeAddPatternsModal = () => {
    toggleAddPatternsModal();
  };

  const refetchOfficePattern = () => {
    refetchOffice().then(() => refetchPatterns());
  };

  return (
    <div className={className()}>
      <Spin size="large" spinning={isOfficeFetching || isOfficeRefetching}>
        <Form
          form={form}
          onValuesChange={onValuesChange}
          colon={false}
        >
          <Paragraph className={className('data-line')}>
            <Text strong>{office?.id}</Text>
            {!!office?.area && (
              <>
                <span className={className('dot')} />
                <Text strong>
                  {office?.area}
                  м
                  <sup>2</sup>
                </Text>
              </>
            )}
            {office?.format && (
              <>
                <span className={className('dot')} />
                <Text strong>{office?.format}</Text>
              </>
            )}
          </Paragraph>
          <Title level={3} className={className('office-name')}>
            {office?.name}
          </Title>
          <Title level={4} className={className('patterns-title')}>Mенеджер</Title>
          {!office?.managerEmployeeId ? (
            <Paragraph className={className('missing-value')}>
              <span>
                <ExclamationCircleFilled className={className('error-icon')} />
                <Text>Данный сотрудник отсутствует</Text>
              </span>
            </Paragraph>
          ) : <></>}
          <Item
            name="managerEmployee"
            className={className('field')}
          >
            <CustomSelect
              options={emplOptions}
              loading={isEmployeesFetching}
              placeholder="Выберите менеджера"
              labelInValue
              getPopupContainer={(trigger) => trigger?.parentNode}
            />
          </Item>
          <div className={className('office-data', { not_pattern: isNil(office?.workTimePatternId) })}>
            <div className={className('patterns')}>
              <Paragraph className={className('data-line')}>
                <Title level={4} className={className('patterns-title')}>Режим работы</Title>
                <EditOutlined onClick={toggleAddPatternsModal} className={className('action-icon')} />
              </Paragraph>
              {isNil(office?.workTimePatternId) && (
                <>
                  <Paragraph className={className('missing-value')}>
                    <span>
                      <ExclamationCircleFilled className={className('error-icon')} />
                      <Text>График не соответствует шаблону</Text>
                    </span>
                  </Paragraph>
                  {office?.workTime && (
                    <Paragraph>{office?.workTime}</Paragraph>
                  )}
                </>
              )}
              {office?.id && (
                <ModalAddPatterns
                  update={refetchOfficePattern}
                  onClose={closeAddPatternsModal}
                  isVisible={isVisibleAddPatternsModal}
                  officeId={office.id}
                />
              )}
              {(isPatternsFetching || isPatternsRefetching) && <WorkHoursSkeleton />}
              {patterns && !isPatternsFetching && !isPatternsRefetching && (
                <Suspense fallback={<WorkHoursSkeleton />}>
                  <WorkHours weekdays={patterns.weekdays} className={className('work-hours')} />
                </Suspense>
              )}
            </div>
            <div className={className('office-info')}>
              {office?.branchName && (
                <div className={className('office-info-item')}>
                  <Title level={4}>Регион</Title>
                  <Paragraph>{office.branchName}</Paragraph>
                </div>
              )}
              {office?.address && (
                <div className={className('office-info-item')}>
                  <Title level={4}>Адрес</Title>
                  <Paragraph>{getAddress(office.address)}</Paragraph>
                </div>
              )}
              {office?.email && (
                <div className={className('office-info-item')}>
                  <Title level={4}>Контакты</Title>
                  <Paragraph>{office.email}</Paragraph>
                </div>
              )}
              <Suspense fallback={<CoordinatesSkeleton />}>
                <Coordinates
                  latitudeFieldName="officeCoordinateLatitude"
                  longitudeFieldName="officeCoordinateLongitude"
                />
              </Suspense>

              <Item name="workTimePatternId" hidden>
                <Input />
              </Item>

              <Item name="description" hidden>
                <Input />
              </Item>
            </div>
          </div>
        </Form>
      </Spin>
    </div>
  );
};

export default OfficeModalTemplate;
