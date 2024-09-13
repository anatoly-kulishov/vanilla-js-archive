/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useMemo } from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Footer = props => {
  const { isWebSeller, clearTicket, check, isCreateTicketLoading, changeModalVisibility, checkCoveragesData } = props

  const isDisabled = useMemo(() => {
    const { isCheckError, checkResult } = checkCoveragesData
    if (isCheckError) {
      return true
    } else if (checkResult?.isCoverageRestrictions) {
      return true
    }
    return false
  }, [checkCoveragesData])

  return (
    <Fragment>
      {!isWebSeller && (
        <Link to={`/card/coverage${location.search}`}>
          <StyledButton onClick={() => changeModalVisibility()}>Диагностика</StyledButton>
        </Link>
      )}
      <Button type='primary' htmlType='submit' onClick={check} loading={isCreateTicketLoading} disabled={isDisabled}>
        Отправить
      </Button>
      <Button onClick={clearTicket}>Очистить</Button>
    </Fragment>
  )
}

const StyledButton = styled(Button)`
  margin-right: 5px;
`
export default Footer

Footer.propTypes = {
  isWebSeller: PropTypes.bool,
  clearTicket: PropTypes.func,
  check: PropTypes.func,
  isCreateTicketLoading: PropTypes.bool,
  changeModalVisibility: PropTypes.func,
  checkCoveragesData: PropTypes.object
}
