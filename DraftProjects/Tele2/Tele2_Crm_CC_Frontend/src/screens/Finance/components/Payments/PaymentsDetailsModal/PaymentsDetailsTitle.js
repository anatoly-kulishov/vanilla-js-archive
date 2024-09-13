/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import { Popconfirm, Popover } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import styled from 'styled-components'
import { isNull } from 'lodash'
import { checkRight } from 'utils/helpers'
import { PaydCommentsProps } from 'constants/compensationsPropTypes'
import CommentEditing from './CommentEditing'

const PaymentsDetailsTitle = ({
  form,
  record: {
    DocumentId: documentId,
    IsBillingPeriod: isBillingPeriod,
    IsOwner: isOwner,
    Type: type,
    DeleteDate: deleteDate,
    IsCurrentHandling: isCurrentHandling
  },
  user,
  record,
  handleCancelCompensation,
  handleModifyComment,
  isEditControlsVisibled,
  setEditControlsVisible,
  paydComments,
  fetchPaydComments
}) => {
  PaymentsDetailsTitle.propTypes = {
    isEditControlsVisibled: PropTypes.objectOf(
      PropTypes.shape({
        isEditPopconfirmVisible: PropTypes.bool,
        isEditPopoverVisible: PropTypes.bool
      })
    ),
    setEditControlsVisible: PropTypes.func,
    handleCancelCompensation: PropTypes.func,
    handleModifyComment: PropTypes.func,
    record: PropTypes.objectOf(
      PropTypes.shape({
        DocumentId: PropTypes.number,
        IsBillingPeriod: PropTypes.bool,
        IsOwner: PropTypes.bool,
        Type: PropTypes.string,
        DeleteDate: PropTypes.instanceOf(moment),
        IsCurrentHandling: PropTypes.bool
      })
    ),
    user: PropTypes.objectOf(),
    form: PropTypes.objectOf(),
    paydComments: PropTypes.arrayOf(PaydCommentsProps),
    fetchPaydComments: PropTypes.func
  }

  const isPaydCompCancel = checkRight(user, 'CC:PaydCompCancel')
  const isPaydCompCancelAll = checkRight(user, 'CC:PaydCompCancelAll')

  const isPaydCompModify = checkRight(user, 'CC:PaydCompModify')
  const isPaydCompModifyAll = checkRight(user, 'CC:PaydCompModifyAll')

  const isEnrollment = type === 'Компенсационное зачисление'
  const commonFirstCheckCondition = isBillingPeriod || !!isOwner === false || !isEnrollment || !isNull(deleteDate) || !isCurrentHandling
  const commonSecondCheckCondition = isBillingPeriod || !isEnrollment || !isNull(deleteDate)

  const isDeletePaymentDisabled = (!isPaydCompCancel || commonFirstCheckCondition) && (!isPaydCompCancelAll || commonSecondCheckCondition)
  const isEditPaymentDisable = (!isPaydCompModify || commonFirstCheckCondition) && (!isPaydCompModifyAll || commonSecondCheckCondition)

  return (
    <PaymentsTitleWrapper>
      Платеж {documentId}
      <div>
        <Popover
          title='Изменение комментария'
          placement='bottom'
          content={
            <CommentEditing
              record={record}
              form={form}
              paydComments={paydComments}
              isEditControlsVisibled={isEditControlsVisibled}
              setEditControlsVisible={setEditControlsVisible}
              handleModifyComment={handleModifyComment}
              fetchPaydComments={fetchPaydComments}
            />}
          trigger='click'
          visible={isEditControlsVisibled.isEditPopoverVisible}
        >
          <EditPaymentIcon
            isEditPaymentDisable={isEditPaymentDisable}
            onClick={() => setEditControlsVisible({ ...isEditControlsVisibled, isEditPopoverVisible: true })}
          />
        </Popover>
        <Popconfirm
          title={`Удалить платёж ${documentId}`}
          placement='bottom'
          onConfirm={handleCancelCompensation}
          disabled={isDeletePaymentDisabled}
        >
          <DeletePaymentIcon isDeletePaymentDisabled={isDeletePaymentDisabled} />
        </Popconfirm>
      </div>
    </PaymentsTitleWrapper>
  )
}

export default PaymentsDetailsTitle

const PaymentsTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`
const EditPaymentIcon = styled(EditOutlined)`
  font-size: 20px;
  margin-right: 15px;
  cursor: ${props => props.isEditPaymentDisable ? 'disabled' : 'pointer'};
  opacity: ${props => props.isEditPaymentDisable ? '0.5' : '1'};
  pointer-events: ${props => props.isEditPaymentDisable ? 'none' : 'unset'};
  transition: transform 0.03s ease-out;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.97);
  }
`

const DeletePaymentIcon = styled(DeleteOutlined)`
  font-size: 20px;
  margin-right: 40px;
  cursor: ${props => props.isDeletePaymentDisabled ? 'disabled' : 'pointer'};
  opacity: ${props => props.isDeletePaymentDisabled ? '0.5' : '1'};
  pointer-events: ${props => props.isDeletePaymentDisabled ? 'none' : 'unset'};
  transition: transform 0.03s ease-out;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.97);
  }
`
