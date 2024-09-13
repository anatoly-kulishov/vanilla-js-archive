/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Row, Col, Input, Select, Checkbox } from 'antd'
import RangePicker from 'components/RangePicker'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function TicketFilter ({
  filters: {
    ticketNumber,
    ticketCategory,
    ticketReason,
    ticketStatus,
    ticketsDatePeriodStart,
    ticketsDatePeriodFinish,
    ticketSearchForAllSubscribers
  },
  statusOptions,
  reasonOptions,
  categoryOptions,
  onFilterChange
}) {
  TicketFilter.propTypes = {
    filters: PropTypes.object,
    statusOptions: PropTypes.array,
    reasonOptions: PropTypes.array,
    categoryOptions: PropTypes.array,
    onFilterChange: PropTypes.func
  }

  const isFiltersDisabled = !!ticketNumber

  return (
    <MainTable>
      <StyledRow>
        <Col span={4}>
          <ContainerHolder>
            <TitleHolder>Номер заявки</TitleHolder>
            <ControlHolder>
              <TicketInput
                placeholder='TT7286079'
                value={ticketNumber}
                onChange={evt => onFilterChange({ ticketNumber: evt.currentTarget.value })}
                allowClear
              />
            </ControlHolder>
          </ContainerHolder>
        </Col>
        <Col span={6}>
          <ContainerHolder>
            <TitleHolder>Статус</TitleHolder>
            <ControlHolder>
              <StyledSelect
                allowClear
                showSearch
                labelInValue
                value={ticketStatus}
                placeholder='Все'
                optionFilterProp='children'
                disabled={isFiltersDisabled}
                onSelect={(value, option) => onFilterChange({ ticketStatus: { key: option.key, label: option.value } })}
              >
                {statusOptions}
              </StyledSelect>
            </ControlHolder>
          </ContainerHolder>
        </Col>
        <Col span={7}>
          <ContainerHolder>
            <TitleHolder>Причина обращения</TitleHolder>
            <ControlHolder>
              <StyledSelect
                allowClear
                showSearch
                labelInValue
                value={ticketReason}
                placeholder='Все'
                optionFilterProp='children'
                disabled={isFiltersDisabled}
                onSelect={(value, option) => onFilterChange({ ticketReason: { key: option.key, label: option.value } })}
              >
                {reasonOptions}
              </StyledSelect>
            </ControlHolder>
          </ContainerHolder>
        </Col>
        <Col span={7}>
          <ContainerHolder>
            <TitleHolder>Категория</TitleHolder>
            <ControlHolder>
              <StyledSelect
                allowClear
                showSearch
                labelInValue
                value={ticketCategory}
                placeholder='Все'
                optionFilterProp='children'
                disabled={isFiltersDisabled}
                onSelect={(value, option) =>
                  onFilterChange({ ticketCategory: { key: option.key, label: option.value } })
                }
              >
                {categoryOptions}
              </StyledSelect>
            </ControlHolder>
          </ContainerHolder>
        </Col>
        <Col span={16} />
      </StyledRow>

      <StyledRow>
        <Col>
          <ContainerHolder>
            <ControlHolder>
              <Checkbox
                onChange={event => onFilterChange({ ticketSearchForAllSubscribers: event.target.checked })}
                checked={ticketSearchForAllSubscribers}
                disabled={isFiltersDisabled}
              >
                Искать по всем абонентам ЛС
              </Checkbox>
            </ControlHolder>
          </ContainerHolder>
        </Col>
      </StyledRow>

      <StyledRow>
        <Col span={16}>
          <RangePicker
            limitMonth={3}
            value={{ from: ticketsDatePeriodStart, to: ticketsDatePeriodFinish }}
            onChange={({ from, to }) => onFilterChange({ ticketsDatePeriodStart: from, ticketsDatePeriodFinish: to })}
          />
        </Col>
      </StyledRow>
    </MainTable>
  )
}

const MainTable = styled.div`
  padding: 0 16px 0;
`
const ContainerHolder = styled.div`
  width: 100%;
`
const TitleHolder = styled.label`
  margin: 0;
  line-height: 36px;
  font-size: 14px;
  color: black;
  font-weight: normal;
`
const ControlHolder = styled.div`
  margin-right: 5px;
`

const TicketInput = styled(Input)`
  width: 100%;
  text-align: left;
  border-radius: 4px;
`
const StyledSelect = styled(Select)`
  width: 100%;
  text-align: left;
  border-radius: 100px;
  z-index: 0;
`

const StyledRow = styled(Row)`
  margin-bottom: 26px;
`
