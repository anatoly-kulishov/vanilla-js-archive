import {
  FC, useMemo, useState,
} from 'react';
import {
  Button, Card, Table as AntdTable,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';

import cn from '@t2crm/wfm-utils/lib/utils/cn';
import Toolbar from 'components/Toolbar';
import AdminPanelNamespace from 'types/adminPanel';
import Common from '@t2crm/wfm-utils/lib/types/common';

import DeleteButton from 'components/DeleteButton';
import Filters from './Filters';
import Modal from './Modal';
import './styles.less';

const className = cn('admin-panel');

const AdminPanel: FC<AdminPanelNamespace.AdminPanelProps> = ({
  filtersProps: {
    filtersKey,
    filterItems,
    filtersMap,
    updateActiveFilters,
  },
  modalProps: {
    onModalOk,
    modalTitle,
    modalItems,
    CustomModal,
  },
  tableProps: {
    cardTitle,
    columns,
    dataSource,
    loading,
    rowKey,
    pagination,
    onChange,
    useEditAction,
    useDeleteAction,
    isShowToolbar = true,
    onConfirmDelete,
  },
}) => {
  const [modalData, setModalData] = useState<AdminPanelNamespace.ModalData>({
    state: AdminPanelNamespace.ModalState.Close,
    data: null,
  });

  const handleRowSelect = (record: Record<string, any>) => {
    setModalData({
      state: AdminPanelNamespace.ModalState.Edit,
      data: record,
    });
  };

  const columnsWithActions: ColumnsType<any> = useMemo(() => {
    if (useEditAction || useDeleteAction) {
      return [
        ...columns as ColumnsType,
        {
          title: 'Действия',
          width: '10%',
          align: 'center',
          render: (_, record) => (
            <>
              {useEditAction && (
                <Button
                  title="Редактировать"
                  type="text"
                  icon={<EditOutlined id="edit" size={40} />}
                  onClick={() => handleRowSelect(record)}
                />
              )}
              {useDeleteAction && onConfirmDelete && (
                <DeleteButton onDelete={() => onConfirmDelete(record)} />
              )}
            </>
          ),
        },
      ];
    }

    return columns ?? [];
  }, [columns, onConfirmDelete, useDeleteAction, useEditAction]);

  const handleModalClose = () => {
    setModalData({
      state: AdminPanelNamespace.ModalState.Close, data: null,
    });
  };

  const handleModalOk = async (fields: Common.KeyValue) => {
    if (typeof onModalOk === 'function') {
      onModalOk(fields).then(handleModalClose);
    }
  };

  const handleAdd = () => {
    setModalData({
      state: AdminPanelNamespace.ModalState.Add, data: null,
    });
  };

  return (
    <div className={className()}>

      <Filters
        filtersKey={filtersKey}
        filterItems={filterItems}
        filtersMap={filtersMap}
        updateActiveFilters={updateActiveFilters}
      />

      <div className={className('grid')}>
        <Card
          className={className('card')}
          title={cardTitle}
          extra={isShowToolbar && (
            <Toolbar
              buttons={[
                {
                  title: 'Добавить',
                  actionType: 'add',
                  onClick: handleAdd,
                },
              ]}
            />
          )}
        >
          <AntdTable
            columns={columnsWithActions}
            dataSource={dataSource}
            loading={loading}
            rowKey={rowKey}
            onRow={(record) => ({
              onDoubleClick: () => useEditAction && handleRowSelect(record),
            })}
            sticky
            pagination={pagination}
            onChange={onChange}
          />
        </Card>
      </div>

      {CustomModal ? (
        <CustomModal
          modalData={modalData}
          onCancel={handleModalClose}
        />
      ) : (
        <Modal
          title={modalTitle}
          modalItems={modalItems ?? []}
          modalData={modalData}
          onOk={handleModalOk}
          onCancel={handleModalClose}
          formLayout="vertical"
        />
      )}
    </div>
  );
};

export default AdminPanel;
