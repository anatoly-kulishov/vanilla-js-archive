/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Badge } from 'antd'
import { Icon } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'

const GroupIcon = ({ icon, record, count, toggleModal, ...rest }) => {
  const handleClick = () => {
    toggleModal && toggleModal({
      isToggled: true,
      record: record
    })
  }

  return (
    <GroupCountButton onClick={handleClick} {...rest}>
      <StyledBadge
        showZero
        count={count}
      >
        <StyledIcon type={icon} />
      </StyledBadge>
    </GroupCountButton>
  )
}

export default GroupIcon

GroupIcon.propTypes = {
  icon: PropTypes.string,
  record: PropTypes.object,
  count: PropTypes.number,
  toggleModal: PropTypes.func
}

const GroupCountButton = styled.div`
  cursor: pointer;
  text-align: center;
`
const StyledIcon = styled(Icon)`
  font-size: 20px;
`
const StyledBadge = styled(Badge)`
  z-index: 1;
  .ant-scroll-number {
    background-color: ${props => props.count === 0 ? 'grey' : '#40bfee'}
  }
`
