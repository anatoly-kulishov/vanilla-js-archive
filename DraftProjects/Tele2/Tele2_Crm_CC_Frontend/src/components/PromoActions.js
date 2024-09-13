import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { bool, func } from 'prop-types'
import { Button as AntdButton, Popconfirm } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'

import promoPropType from 'constants/propTypes/promo/promoPropType'
import promoRightsPropType from 'constants/propTypes/promo/promoRightsPropType'
import promoAction from 'constants/promo/promoActions'

export default function PromoAction ({ promo, isCompensationActions, promoRights, handlePromo }) {
  const activate = useCallback(() => {
    handlePromo(promoAction.activate, promo)
  }, [promo])

  const cancel = useCallback(() => {
    handlePromo(promoAction.cancel, promo)
  }, [promo])

  const notify = useCallback(() => {
    handlePromo(promoAction.notify, promo)
  }, [promo])

  const { isReadyToActivate, isReadyToDelete } = useMemo(() => {
    let actionAvailablity = {
      isReadyToActivate: promoRights.isActivateRight && promo.IsReadyToActivate,
      isReadyToDelete: (promoRights.isCancelRight || promoRights.isAllCancelRight) && promo.IsReadyToDelete
    }
    if (isCompensationActions) {
      actionAvailablity = {
        isReadyToActivate: !promo.IsCancel,
        isReadyToDelete: !promo.IsCancel && ((promo.IsOwner && promo.IsCurrentHandling) || promoRights.isPaydCompCancelAll)
      }
    }
    return actionAvailablity
  }, [isCompensationActions, promo])

  return (
    <Wrapper>
      {isReadyToActivate &&
        <Popconfirm
          title='Активировать промокод'
          onConfirm={activate}
          onCancel={notify}
          okText='Активировать'
          cancelText='Отправить промокод в SMS'
        >
          <Button title='Активировать промокод' type='text' icon={<StyledPlusCircleIcon />} />
        </Popconfirm>
      }
      {isReadyToDelete &&
      <Popconfirm
        title='Отменить промокод'
        onConfirm={cancel}
        okText='Да'
        cancelText='Нет'
      >
        <Button title='Отменить промокод' type='text' icon={<StyledMinusCircleIcon />} />
      </Popconfirm>}
    </Wrapper>
  )
}

PromoAction.propTypes = {
  promo: promoPropType,
  promoRights: promoRightsPropType,
  handlePromo: func,
  isCompensationActions: bool
}

const Wrapper = styled.div`
  display: flex;
`
const Button = styled(AntdButton)`
  margin-bottom: 3px;
  width: 100%;
`

const StyledPlusCircleIcon = styled(PlusCircleOutlined)`
  position: absolute;
  left: 20px;
  top: 8px;
`

const StyledMinusCircleIcon = styled(MinusCircleOutlined)`
  position: absolute;
  left: 20px;
  top: 8px;
`
