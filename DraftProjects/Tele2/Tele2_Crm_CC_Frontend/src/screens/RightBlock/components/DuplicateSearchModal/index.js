/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Modal, Table, Button } from 'antd'

import { columns } from './constants'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { DUPLICATE_SEARCH_MODAL } from 'constants/logModalNames'

import { debounce } from 'lodash'

export default function DuplicateSearchModal ({
  replacementSimCard,
  handleVisibleDuplicateSearchModal,
  handleVisibleReplacementSimCardModal,
  changeSim
}) {
  const { isVisibleDuplicateSearchModal, validateSimProfile, isChangeSimLoading } = replacementSimCard

  const [selectedRow, setSelectedRow] = useState(null)

  const rowSelection = {
    selectedRowKeys: [selectedRow],
    onSelect: record => {
      onSelectRow(record)
    },
    onSelectAll: () => {
      setSelectedRow(null)
    }
  }

  const onSelectRow = record => {
    const selectRow = record.Icc
    setSelectedRow(selectRow)
  }

  const handleReturnReplacement = () => {
    handleCloseModal()
    handleVisibleReplacementSimCardModal()
  }

  const handleChangeSim = debounce(() => {
    changeSim({
      newIcc: selectedRow
    })
  }, 300, {
    'leading': true,
    'trailing': false
  })

  const showModal = () => {
    const { confirm } = Modal
    confirm({
      title: 'Замена SIM',
      content: 'Вы уверены что хотите заменить SIM?',
      onOk () {
        handleChangeSim()
      }
    })
  }

  const handleCloseModal = () => {
    handleVisibleDuplicateSearchModal()
    logIfEnabled({ type: MODAL_CLOSE, log: DUPLICATE_SEARCH_MODAL })
  }

  useEffect(() => {
    if (isVisibleDuplicateSearchModal) {
      logIfEnabled({ type: MODAL_OPEN, log: DUPLICATE_SEARCH_MODAL })
    }
  }, [isVisibleDuplicateSearchModal])

  return (
    <StyledModal
      title='Поиск дубликатов SIM-карты'
      visible={isVisibleDuplicateSearchModal}
      onCancel={handleCloseModal}
      footer={
        <Fragment>
          <Button
            type='primary'
            disabled={typeof selectedRow !== 'string'}
            onClick={showModal}
            loading={isChangeSimLoading}
          >
            Выбрать
          </Button>
          <Button type='primary' onClick={handleReturnReplacement}>
            Отмена
          </Button>
        </Fragment>
      }
      width={1000}
    >
      <StyledTable
        columns={columns}
        dataSource={validateSimProfile}
        pagination={false}
        scroll={{ y: 400 }} // eslint-disable-line
        rowSelection={rowSelection}
        rowKey='Icc'
        onRow={record => ({
          onClick: () => onSelectRow(record)
        })}
      />
    </StyledModal>
  )
}

DuplicateSearchModal.propTypes = {
  replacementSimCard: PropTypes.object,
  handleVisibleDuplicateSearchModal: PropTypes.func,
  handleVisibleReplacementSimCardModal: PropTypes.func,
  changeSim: PropTypes.func
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0px;
  }
`

const StyledTable = styled(Table)`
  .ant-table-fixed-header .ant-table-scroll .ant-table-header {
    margin-bottom: -17px !important;
  }
  :hover {
    cursor: pointer;
  }
`
