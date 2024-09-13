/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DOMPurify from 'dompurify'
import { ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM, MassProblemListProps } from 'constants/massProblems'
import { getChanneledMtpValue } from '../helpers'

const MassProblemDescription = props => {
  const { record, onCellClick, requestedServiceChannelInterface } = props

  const whatHappens = getChanneledMtpValue(
    record,
    ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.WhatHappens,
    requestedServiceChannelInterface
  )
  const parsedWhatHappens = getChanneledMtpValue(
    record,
    ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.ParsedWhatHappens,
    requestedServiceChannelInterface
  )

  const answer = getChanneledMtpValue(
    record,
    ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.Answer,
    requestedServiceChannelInterface
  )
  const parsedAnswer = getChanneledMtpValue(
    record,
    ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.ParsedAnswer,
    requestedServiceChannelInterface
  )

  return (
    <Wrapper>
      <Fragment>
        <Header>Города</Header>
        <RegionsText>{record.ProblemArea}</RegionsText>
      </Fragment>
      <DescriptionItem>
        <Header>Что происходит</Header>
        {whatHappens ? (
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(whatHappens) }} />
        ) : (
          <div>{parsedWhatHappens}</div>
        )}
      </DescriptionItem>
      {(answer || parsedAnswer) && (
        <DescriptionItem>
          <Header>Стандартный ответ</Header>
          {answer ? (
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }} />
          ) : (
            <div>{parsedAnswer}</div>
          )}
        </DescriptionItem>
      )}
      {(record.ParsedWhatToControl || record.ParsedRecomendation) && (
        <DescriptionItem>
          <ShortFormText onClick={() => onCellClick(record)}>
            Выполни проверку из поля "Что проверять", предоставь решение из поля "Рекомендации"
          </ShortFormText>
        </DescriptionItem>
      )}
    </Wrapper>
  )
}

export default MassProblemDescription

MassProblemDescription.propTypes = {
  record: PropTypes.instanceOf(MassProblemListProps),
  onCellClick: PropTypes.func
}

const Wrapper = styled.div`
  max-height: 300px;
  overflow: auto;
  padding: 10px 0 10px 0;
`
const DescriptionItem = styled.div`
  padding-top: 10px;
`
const Header = styled.label`
  font-weight: bold;
`
const RegionsText = styled.div`
  word-break: break-word;
`
const ShortFormText = styled.div`
  cursor: pointer;
  font-weight: bold;
  color: #f5222d;
`
