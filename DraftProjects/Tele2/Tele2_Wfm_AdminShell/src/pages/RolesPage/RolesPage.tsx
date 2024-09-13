import { FC, useMemo, useState } from 'react';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import RolesRequests from 'types/requests/roles';
import RolesContent from './components/RolesContent';
import OperationsContent from './components/OperationsContent';
import AddModal from './components/AddModal';
import './styles.less';
import useOperationMutations from './hooks/useOperationMutations';
import useRoleMutations from './hooks/useRoleMutations';
import { ModalState } from './types';

const className = cn('roles-page');

const RolesPage: FC = () => {
  const { createRoleMutation } = useRoleMutations();
  const { createOperationMutation } = useOperationMutations();

  const [selectedRoleId, setSelectedRoleId] = useState<number | undefined>(undefined);

  const [modal, setModal] = useState<ModalState>({
    visible: false,
    type: null,
  });

  const resetModalState = () => {
    setModal({ type: null, visible: false });
  };

  const modalTitle = useMemo(() => {
    if (!modal.type) {
      return '';
    }

    return modal.type === 'Operations' ? 'Добавление операции' : 'Добавление роли';
  }, [modal.type]);

  const createMutation = useMemo(() => (
    modal.type === 'Operations' ? createOperationMutation : createRoleMutation
  ), [modal.type, createOperationMutation, createRoleMutation]);

  const onCreate = async (params: RolesRequests.OperationParams | string) => {
    if (typeof params === 'string') {
      await createRoleMutation.mutateAsync(params).then(resetModalState);
    } else {
      await createOperationMutation.mutateAsync(params).then(resetModalState);
    }
  };

  return (
    <div className={className()}>
      <div className={className('wrapper')}>
        <RolesContent
          setModal={setModal}
          selectedRoleId={selectedRoleId}
          setSelectedRoleId={setSelectedRoleId}
        />
        <OperationsContent
          setModal={setModal}
          selectedRoleId={selectedRoleId}
        />
      </div>
      <AddModal
        type={modal.type}
        selectedRoleId={selectedRoleId}
        open={modal.visible}
        onCancel={resetModalState}
        title={modalTitle}
        onCreate={onCreate}
        okButtonProps={{ loading: createMutation?.isLoading ?? false }}
      />
    </div>
  );
};

export default RolesPage;
