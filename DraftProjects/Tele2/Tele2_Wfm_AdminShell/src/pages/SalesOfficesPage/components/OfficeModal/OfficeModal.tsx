import {
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useShellContext } from '@t2crm/wfm-shell-context';
import { getEmployees } from 'utils/api/employees';
import PatternsResponse from 'types/response/patterns';
import useOfficeMutations from './useOfficeMutation';
import OfficeModalTemplate from './components/OfficeModalTemplate';

type Props = {
  selectedOfficeId: number | null;
  onCloseModal: () => void,
  isVisible: boolean,
};

const OfficeModal: FC<Props> = ({
  selectedOfficeId,
  onCloseModal,
  isVisible,
}) => {
  const { partnerId } = useShellContext();
  const [form] = useForm();
  const { modifyMangerEmployeeMutation, modifyOfficeMutation } = useOfficeMutations();
  const [isDisabledOkButton, setIsDisabledOkButton] = useState(true);
  const [currentPattern, setCurrentPattern] = useState<PatternsResponse.Patterns | null>(null);

  const handleClose = useCallback(() => {
    setIsDisabledOkButton(true);
    onCloseModal();
  }, [onCloseModal]);

  const { data: employees, isFetching: isEmployeesFetching } = useQuery({
    queryKey: ['employees', partnerId],
    queryFn: () => getEmployees(partnerId).then((response) => response.data),
    initialData: [],
    enabled: !!partnerId,
  });

  useEffect(() => {
    if (modifyMangerEmployeeMutation.isSuccess && modifyOfficeMutation.isSuccess) {
      handleClose();
    }
  }, [handleClose, modifyMangerEmployeeMutation.isSuccess, modifyOfficeMutation.isSuccess]);

  const onUpdatePattern = useCallback((newPattern: PatternsResponse.Patterns) => {
    setCurrentPattern(newPattern);
  }, [setCurrentPattern]);

  const onSubmit = useCallback(() => {
    form.validateFields().then((values) => {
      const managerId = values?.managerEmployee?.value;

      const manager = employees?.find(
        ({ employeeId }) => employeeId === managerId,
      );

      const officeCoordinateLatitude = values?.officeCoordinateLatitude
        ? parseFloat(values.officeCoordinateLatitude)
        : undefined;

      const officeCoordinateLongitude = values?.officeCoordinateLongitude
        ? parseFloat(values.officeCoordinateLongitude)
        : undefined;

      if (manager && selectedOfficeId) {
        modifyMangerEmployeeMutation.mutateAsync({
          email: manager?.email || '',
          name: manager?.name || '',
          employeeId: manager?.employeeId,
          personId: manager?.personId,
          officeId: selectedOfficeId,
        });

        modifyOfficeMutation.mutateAsync({
          officeId: selectedOfficeId,
          officeCoordinateLatitude,
          officeCoordinateLongitude,
          Description: currentPattern?.description,
          WorkTimePatternId: currentPattern?.id,
        });
      }
    });
  }, [
    form,
    employees,
    selectedOfficeId,
    modifyMangerEmployeeMutation,
    modifyOfficeMutation, currentPattern,
  ]);

  return (
    <Modal
      open={isVisible}
      title="Офис"
      okText="Сохранить"
      cancelText="Отменить"
      onCancel={handleClose}
      onOk={onSubmit}
      width={950}
      destroyOnClose
      afterClose={form.resetFields}
      zIndex={900}
      okButtonProps={{
        disabled: isDisabledOkButton,
        loading: modifyMangerEmployeeMutation.isLoading || modifyOfficeMutation.isLoading,
      }}
    >
      <OfficeModalTemplate
        form={form}
        selectedOfficeId={selectedOfficeId}
        setIsDisabledOkButton={setIsDisabledOkButton}
        employees={employees}
        isEmployeesFetching={isEmployeesFetching}
        onUpdatePattern={onUpdatePattern}
      />
    </Modal>
  );
};

export default OfficeModal;
