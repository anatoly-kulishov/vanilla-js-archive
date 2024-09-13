/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import MassProblemDescription from '../../components/MassProblemDescription'
import MassProblemNoteButton from 'components/MassProblems/MassProblemNoteButton'
import { numSorter, stringSorter, isoDateSorter } from 'utils/helpers'
import { ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM, MassProblemMsisdnStatusProps } from 'constants/massProblems'
import { getChanneledMtpValue } from 'screens/MassProblemsOperator/helpers'

const Column = Table.Column

const formatIsoDate = value => (value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : '')

const localeEmptyText = { emptyText: 'Данные о массовых проблемах в данном регионе не найдены' }

const propTypes = {
  expandedRowKeys: PropTypes.array.isRequired,
  onExpandedRowsChange: PropTypes.func.isRequired,
  onCellClick: PropTypes.func.isRequired,
  registerMtpNote: PropTypes.func.isRequired,
  personalAccount: PropTypes.object.isRequired,
  isNoteCreating: PropTypes.bool,
  handlingId: PropTypes.number,
  msisdn: PropTypes.object,
  email: PropTypes.object,
  deleteInteraction: PropTypes.func,
  interactions: PropTypes.object,
  fetchSubscriberInfo: PropTypes.func,
  changeMsisdnStatusArray: PropTypes.func,
  msisdnStatusArray: PropTypes.arrayOf(MassProblemMsisdnStatusProps).isRequired,
  regionProblems: PropTypes.object,
  personalAccountState: PropTypes.object,
  isLoadingInteractions: PropTypes.bool,
  isWebSeller: PropTypes.bool
}

const MassProblemsTable = props => {
  const {
    handlingId,
    msisdn,
    email,
    deleteInteraction,
    interactions,
    expandedRowKeys,
    onExpandedRowsChange,
    onCellClick,
    registerMtpNote,
    personalAccountState: { personalAccount },
    isNoteCreating,
    fetchSubscriberInfo,
    msisdnStatusArray,
    changeMsisdnStatusArray,
    regionProblems: { Problems: problems, MaxInteractionIssuesMsisdn: maxInteractionIssuesMsisdn },
    isLoadingInteractions,
    requestedServiceChannelInterface,
    isWebSeller
  } = props

  return (
    <MassProblemsGrid
      locale={localeEmptyText}
      dataSource={problems}
      pagination={false}
      rowKey='ProblemId'
      expandable={!isWebSeller ? {
        expandedRowKeys: expandedRowKeys,
        onExpandedRowsChange: onExpandedRowsChange,
        expandedRowRender: record => (
          <MassProblemDescription
            record={record}
            onCellClick={onCellClick}
            requestedServiceChannelInterface={requestedServiceChannelInterface}
          />
        )
      } : undefined}
      rowClassName={(value, _record) =>
        value.RowBackColor === '#FFF1F0' ? 'red' : value.RowBackColor === '#F5FFF0' ? 'green' : 'white'
      }
    >
      <Column
        dataIndex='ProblemId'
        title='Номер'
        width='10%'
        showSorterTooltip={false}
        sorter={(cur, next) => numSorter(cur.ProblemId, next.ProblemId)}
        render={(value, record) => <ProblemsLabel onClick={() => onCellClick(record)}>{value}</ProblemsLabel>}
      />
      <Column
        dataIndex='StartDateTime'
        title='Время начала'
        width='10%'
        sorter={(cur, next) => isoDateSorter(cur.StartDateTime, next.StartDateTime)}
        render={(value, record) => (
          <ProblemsLabel onClick={() => onCellClick(record)}>{formatIsoDate(value)}</ProblemsLabel>
        )}
      />
      {!isWebSeller && (
        <Column
          dataIndex='ProblemShortType'
          title='Тип'
          width='10%'
          sorter={(cur, next) => stringSorter(cur.ProblemShortType, next.ProblemShortType)}
          render={(value, record) => <ProblemsLabel onClick={() => onCellClick(record)}>{value}</ProblemsLabel>}
        />
      )}
      <Column
        title='Название'
        width={isWebSeller ? '80%' : '65%'}
        render={(_, record) => (
          <ProblemsLabel onClick={() => onCellClick(record)}>
            {getChanneledMtpValue(record, ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.Name, requestedServiceChannelInterface)}
          </ProblemsLabel>
        )}
        sorter={(cur, next) =>
          stringSorter(
            getChanneledMtpValue(cur, ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.Name, requestedServiceChannelInterface),
            getChanneledMtpValue(next, ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.Name, requestedServiceChannelInterface)
          )
        }
      />
      {!isWebSeller && (
        <Column
          width='5%'
          render={(value, record) =>
            handlingId && (
              <MassProblemNoteButton
                value={value}
                record={record}
                interactions={interactions}
                handlingId={handlingId}
                deleteInteraction={deleteInteraction}
                msisdn={msisdn}
                email={email}
                registerMtpNote={registerMtpNote}
                personalAccount={personalAccount}
                isNoteCreating={isNoteCreating || isLoadingInteractions}
                fetchSubscriberInfo={fetchSubscriberInfo}
                changeMsisdnStatusArray={changeMsisdnStatusArray}
                msisdnStatusArray={msisdnStatusArray}
                maxInteractionIssuesMsisdn={maxInteractionIssuesMsisdn}
              />
            )
          }
        />
      )}
    </MassProblemsGrid>
  )
}

MassProblemsTable.propTypes = propTypes

export default MassProblemsTable

const MassProblemsGrid = styled(Table)`
  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    word-break: unset;
  }
  .ant-table-row.red.ant-table-row-level-0 {
    background: #fff1f0;
  }
  .ant-table-row.green.ant-table-row-level-0 {
    background: #f5fff0;
  }
  .ant-table-row.white.ant-table-row-level-0 {
    background: white;
  }
  .ant-table-expanded-row.ant-table-expanded-row-level-1 {
    background: white;
    td {
      padding: 0;
    }
  }
`
const ProblemsLabel = styled.div`
  cursor: pointer;
`
