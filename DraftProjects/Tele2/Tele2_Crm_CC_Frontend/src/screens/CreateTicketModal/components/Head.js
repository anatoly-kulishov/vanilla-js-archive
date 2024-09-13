import React, { Fragment, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import RatingMenu from 'containers/RatingMenu'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import PropTypes from 'prop-types'
import { NavLink, useLocation } from 'react-router-dom'
import { Alert } from 'antd'
const { createTicketFeatureId } = ratingFeatureIds

const Head = ({ changeModalVisibility, checkCoveragesData, checkMTPByServiceIdData }) => {
  const location = useLocation()

  const changeVisibility = useCallback(() => changeModalVisibility(), [changeModalVisibility])

  const locationSearch = location?.search
  const checkCoveragesAlert = useMemo(() => {
    const { isCheckError, checkResult } = checkCoveragesData
    const noCheckCondition = checkResult === null && isCheckError === false
    const checkOkCondition =
      checkResult?.IsBlocked === false &&
      checkResult?.isCoverageRestrictions === false &&
      checkResult?.isFaults === false
    if (noCheckCondition || checkOkCondition) {
      return null
    } else if (isCheckError) {
      return (
        <NavLink onClick={changeVisibility} to={`/card/coverage${locationSearch}`}>
          <Alert type='error' showIcon message='Создание ТТ невозможно без проверки ограничений' />
        </NavLink>
      )
    } else if (checkResult?.isCoverageRestrictions) {
      return (
        <NavLink onClick={changeVisibility} to={`/card/coverage${locationSearch}`}>
          <Alert
            type='error'
            showIcon
            message='Создание ТТ невозможно с текущим уровнем покрытия выбранного местоположения'
          />
        </NavLink>
      )
    } else if (checkResult?.isCoverageRestrictions === false && checkResult?.isFaults) {
      return (
        <Alert
          type='warning'
          showIcon
          message={
            <span>
              Обрати внимание на ограничения по адресу абонента: есть открытые{' '}
              <NavLink onClick={changeVisibility} to={`/card/mass-problems${locationSearch}`}>
                МТП
              </NavLink>
              /
              <NavLink onClick={changeVisibility} to={`/card/coverage${locationSearch}`}>
                Аварии/проблемные зоны
              </NavLink>
            </span>
          }
        />
      )
    }
  }, [changeVisibility, checkCoveragesData])

  const checkMTPAlert = useMemo(() => {
    const { isCheckMTPError, checkMTPResult } = checkMTPByServiceIdData

    if (checkMTPResult?.length > 0 && !isCheckMTPError) {
      return (
        <Alert
          type='warning'
          showIcon
          message={
            <NavLink onClick={changeVisibility} to={`/card/mass-problems${locationSearch}`}>
              Обрати внимание на ограничения по адресу абонента: есть открытые МТП
            </NavLink>
          }
        />
      )
    }
  }, [changeVisibility, checkMTPByServiceIdData])

  return (
    <Fragment>
      <Container>
        <Box>Параметры создания заявки</Box>
        {checkCoveragesAlert && <AlertWrapper>{checkCoveragesAlert}</AlertWrapper>}
        {checkMTPAlert && <AlertWrapper>{checkMTPAlert}</AlertWrapper>}
      </Container>
      <RatingWrapper>
        <RatingMenu currentFeatureId={createTicketFeatureId} />
      </RatingWrapper>
    </Fragment>
  )
}

export default Head

Head.propTypes = {
  changeModalVisibility: PropTypes.func,
  checkCoveragesData: PropTypes.object,
  checkMTPByServiceIdData: PropTypes.object
}

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  padding-right: 60px;
`

const Box = styled.span`
  font-weight: bold;
`

const RatingWrapper = styled.div`
  position: absolute;
  right: 60px;
  top: 17px;
`

const AlertWrapper = styled.span`
  font-family: 'T2_Rooftop_Regular';

  a {
    color: black;
  }
`
