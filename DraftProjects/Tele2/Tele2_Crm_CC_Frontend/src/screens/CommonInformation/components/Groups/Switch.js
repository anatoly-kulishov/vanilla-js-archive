/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import { Popconfirm, Switch as AntSwitch } from 'antd'

const Switch = ({ isGroup, record, paramsForDeleting, groupId, deleteGroup, isDeleteGroupUser }) => (
  <Popconfirm
    placement='topLeft'
    title={
      record.IsOwner
        ? 'Исключить инициатора? Это приведет к закрытию группы'
        : 'Исключить участника?'
    }
    onConfirm={() =>
      deleteGroup({
        isGroup,
        deleteParams: { ...paramsForDeleting, ...{ subscriberStatusId: record.SubscriberStatusId } },
        groupId
      })
    }
    okText='Да'
    cancelText='Нет'
    trigger={isDeleteGroupUser && record.SubscriberStatusId === 1 ? 'click' : 'none'}
  >
    <AntSwitch
      disabled={!isDeleteGroupUser || record.SubscriberStatusId !== 1}
      checked={record.SubscriberStatusId === 1}
      isOwner={record.IsOwner}
    />
  </Popconfirm>
)

export default Switch

Switch.propTypes = {
  record: PropTypes.object,
  paramsForDeleting: PropTypes.object,
  isDeleteGroupUser: PropTypes.bool,
  isGroup: PropTypes.bool,
  groupId: PropTypes.number,
  deleteGroup: PropTypes.func
}
