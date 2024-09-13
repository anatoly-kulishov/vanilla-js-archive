/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Tabs = (props) => {
  Tabs.propTypes = {
    activeTab: PropTypes.object,
    onChangeTab: PropTypes.func
  }
  const { activeTab, onChangeTab } = props
  return (
    <Wrapper>
      <Item onClick={() => onChangeTab('reasons')} isActive={activeTab === 'reasons'}>Причины обращения</Item>
      <Item onClick={() => onChangeTab('sms')} isActive={activeTab === 'sms'}>SMS</Item>
      {/* <Item onClick={() => onChangeTab('emails')} isActive={activeTab === 'emails'}>E-mail</Item> */}
    </Wrapper>
  )
}

export default Tabs

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

const Item = styled.div`
  font-size: 14px;
  color: ${props => props.isActive ? '#fff' : '#000'};
  background-color: ${props => props.isActive ? '#48bfec' : '#fff'};
  border: ${props => props.isActive ? '1px solid #48bfec' : '1px solid #e5e5e5'};
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    color: #48bfec;
  }
`
