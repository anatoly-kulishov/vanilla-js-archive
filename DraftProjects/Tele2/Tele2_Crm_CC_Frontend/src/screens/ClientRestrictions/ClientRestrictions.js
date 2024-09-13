/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Collapse, Button, Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import Restriction from './components/Restriction'
const { Panel } = Collapse

export default class ClientRestrictions extends PureComponent {
  static propTypes = {
    clientRestrictions: PropTypes.array,
    isClientRestrictionsLoading: PropTypes.bool,
    fetchClientRestrictions: PropTypes.func.isRequired,
    changeClientRestriction: PropTypes.func.isRequired,
    removeAllClientRestrictions: PropTypes.func.isRequired,

    personalInfo: PropTypes.objectOf(
      PropTypes.shape({
        email: PropTypes.string,
        msisdn: PropTypes.string,
        clientId: PropTypes.number,
        handlingId: PropTypes.number,
        subscriberId: PropTypes.number,
        subscriberTypeId: PropTypes.string,
        subscriberStatusId: PropTypes.number,
        subscriberBranchId: PropTypes.number
      })
    )
  }

  componentDidMount = () => {
    this.onRefresh()
  }

  onRefresh = () => {
    const {
      fetchClientRestrictions,
      personalInfo: { msisdn }
    } = this.props
    fetchClientRestrictions({ msisdn })
  }

  handleRefreshRestrictions = evt => {
    evt.stopPropagation()
    this.onRefresh()
  }

  handleResetRestrictions = evt => {
    const { personalInfo, removeAllClientRestrictions } = this.props
    evt.stopPropagation()
    removeAllClientRestrictions({ ...personalInfo })
  }

  handleRestrictionToggle = (isActive, restrictionCode) => {
    const changeType = isActive ? 'Set' : 'Delete'
    const { personalInfo, changeClientRestriction } = this.props

    changeClientRestriction({
      ...personalInfo,
      restrictionCode,
      changeType
    })
  }

  render () {
    const { clientRestrictions, isClientRestrictionsLoading } = this.props
    const restrictionsList = clientRestrictions && clientRestrictions.map(restriction => (
      <Restriction restriction={restriction} onClick={this.handleRestrictionToggle} />
    ))

    const tools = (
      <Tools>
        <Button onClick={this.handleResetRestrictions}>Снять все запреты</Button>
        <RefreshIcon onClick={this.handleRefreshRestrictions} />
      </Tools>
    )

    return (
      <Wrapper>
        <Spin spinning={isClientRestrictionsLoading} tip='Получение клиентских ограничений'>
          <ClientRestrictionsCollapse bordered={false} defaultActiveKey={['1']}>
            <ClientRestrictionsPanel
              showArrow={false}
              header='Ограничения, устанавливаемые клиентом'
              key='1'
              extra={tools}
            >
              <Restrictions>{restrictionsList}</Restrictions>
            </ClientRestrictionsPanel>
          </ClientRestrictionsCollapse>
        </Spin>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin-right: 30px;
  background-color: transparent;
  .ant-collapse-header {
    font-size: 16px;
    font-family: T2HalvarBreit_ExtraBold;
  }
`

const ClientRestrictionsCollapse = styled(Collapse)`
  background-color: transparent;
  .ant-collapse-header {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }
`

const ClientRestrictionsPanel = styled(Panel)`
  background-color: white;
`

const Restrictions = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const Tools = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  > :first-child {
    margin-right: 10px;
  }
`

const RefreshIcon = styled(SyncOutlined)`
  font-size: 24px;
  cursor: pointer;
  transition: color 0.1s ease-out, transform 0.03s ease-out;
  color: black;
  :hover {
    color: #44caff;
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
`
