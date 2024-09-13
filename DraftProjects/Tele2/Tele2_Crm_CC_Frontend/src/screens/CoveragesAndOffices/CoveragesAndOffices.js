import PropTypes from 'prop-types'
import React, { useCallback, useMemo } from 'react'

import ExpandableTable from 'components/ExpandableTable'
import ExtendableCard from 'components/ExtendableCardPanel'
import { DiagnosticsProvider } from 'containers/SmartGisPanel/diagnosticsContext'
import CoverageFilters from 'screens/Coverage/containers/CoverageFilters'
import CoveragesAndOfficesTable from './components/CoveragesAndOfficesTable'
import FaultsTable from './components/FaultsTable'
import {
  massProblemsTableAdditionalColumns,
  massProblemsTableColumns
} from './components/MassProblemsTable/massProblemsTableData'
import {
  prolongedMassProblemsTableAdditionalColumns,
  prolongedMassProblemsTableColumns
} from './components/ProlongedMassProblemsTable/prolongedMassProblemsTableData'
import { spaTableAdditionalColumns, spaTableColumns } from './components/SpaTable/spaTableData'

import useDiagnostics from 'containers/SmartGisPanel/diagnosticsContext/useDiagnostics'
import { faultsColumns } from 'screens/Coverage/CoverageTables'
import CoveragesAndOfficesNoteButton from './components/CoveragesAndOfficesNoteButton/CoveragesAndOfficesNoteButton'
import { Spin } from 'antd'
import LoadingSpinner from 'components/LoadingSpinner'

const { ExtendableCardPanel, Card } = ExtendableCard

const RELATION_TYPES = { flag_crm: 'flag_crm', flag_faults: 'flag_faults', flag_spa: 'flag_spa', flag_mp: 'flag_mp' }

const CoveragesAndOfficesInner = props => {
  CoveragesAndOfficesInner.propTypes = {
    coveragesAndOffices: PropTypes.shape({
      flagCoverage: PropTypes.array,
      flagMp: PropTypes.array,
      flagFaults: PropTypes.array,
      flagSpa: PropTypes.array,
      flagCrm: PropTypes.array
    }),
    interactions: PropTypes.array,
    autoInteractionData: PropTypes.object,
    msisdn: PropTypes.string,

    createCoveragesAndOfficesNote: PropTypes.func,
    registerMtpNote: PropTypes.func,

    isCreateCoveragesAndOfficesNoteLoading: PropTypes.bool,
    isMtpNoteLoading: PropTypes.bool
  }

  const { watchers } = useDiagnostics()
  const {
    coveragesAndOffices,
    interactions,
    autoInteractionData,
    createCoveragesAndOfficesNote,
    registerMtpNote,
    isCreateCoveragesAndOfficesNoteLoading,
    isMtpNoteLoading,
    msisdn
  } = props

  const handleClickNote = useCallback(
    record => {
      const { RelationId, RelationType, ProblemId } = record
      const { latitude, longitude } = watchers.currentLocation

      const payload = {
        relationId: RelationId,
        relationType: RelationType,
        latitude,
        longitude,
        msisdn,
        ...autoInteractionData
      }

      const isCrmFlag = RelationType === RELATION_TYPES.flag_crm

      if (isCrmFlag) {
        registerMtpNote({ ...payload, ProblemId })
      } else {
        createCoveragesAndOfficesNote(payload)
      }
    },
    [autoInteractionData, watchers.currentLocation]
  )

  const isNoteCreating = isCreateCoveragesAndOfficesNoteLoading || isMtpNoteLoading

  const noteColumn = useMemo(
    () => ({
      render: record => (
        <CoveragesAndOfficesNoteButton record={record} interactions={interactions} onClick={handleClickNote} />
      ),
      width: '5%'
    }),
    [interactions, handleClickNote, isNoteCreating]
  )

  const hasData = useMemo(
    () =>
      Object.keys(coveragesAndOffices)
        .map(key => {
          const element = coveragesAndOffices[key]
          return !!element.length
        })
        .some(value => value === true),
    [coveragesAndOffices]
  )

  const columns = useMemo(
    () => ({
      massProblem: [...massProblemsTableColumns, noteColumn],
      prolongedMassProblem: [...prolongedMassProblemsTableColumns, noteColumn],
      faults: [...faultsColumns, noteColumn],
      spa: [...spaTableColumns, noteColumn]
    }),
    [noteColumn]
  )

  return (
    <ExtendableCardPanel>
      <Card title='Диагностика'>
        <CoverageFilters />
      </Card>
      <Card isHidden={!hasData}>
        <Card isNested isHidden={!coveragesAndOffices.flagCoverage.length} title='Покрытия и ограничения'>
          <CoveragesAndOfficesTable dataSource={coveragesAndOffices.flagCoverage} />
        </Card>
        <Spin spinning={isNoteCreating} indicator={<LoadingSpinner />}>
          <Card isNested isHidden={!coveragesAndOffices.flagMp.length}>
            <ExpandableTable
              dataSource={coveragesAndOffices.flagMp}
              columns={columns.prolongedMassProblem}
              additionalColumns={massProblemsTableAdditionalColumns}
              title='Длительные массовые проблемы'
            />
          </Card>
          <Card isNested isHidden={!coveragesAndOffices.flagCrm.length}>
            <ExpandableTable
              dataSource={coveragesAndOffices.flagCrm}
              columns={columns.massProblem}
              additionalColumns={prolongedMassProblemsTableAdditionalColumns}
              title='Массовые проблемы'
            />
          </Card>
          <Card isNested isHidden={!coveragesAndOffices.flagFaults.length}>
            <FaultsTable dataSource={coveragesAndOffices.flagFaults} columns={columns.faults} />
          </Card>
          <Card isNested isHidden={!coveragesAndOffices.flagSpa.length}>
            <ExpandableTable
              dataSource={coveragesAndOffices.flagSpa}
              columns={columns.spa}
              additionalColumns={spaTableAdditionalColumns}
              title='Проблемные зоны'
            />
          </Card>
        </Spin>
      </Card>
    </ExtendableCardPanel>
  )
}

const CoveragesAndOffices = props => (
  <DiagnosticsProvider>
    <CoveragesAndOfficesInner {...props} />
  </DiagnosticsProvider>
)

export default CoveragesAndOffices
