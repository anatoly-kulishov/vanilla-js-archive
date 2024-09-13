import React, { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import ReactInputMask from 'react-input-mask'
import { EditOutlined } from '@ant-design/icons'
import { Button, Input, Title } from 'webseller/components'
import { denormalizeNumber } from 'webseller/helpers'
import { T2_ROOFTOP_REGULAR } from 'webseller/helpers/styles'

const isValidIcc = icc => icc?.length === 20

export default function SimInOrder ({ id, tariff, msisdn, icc, isLoadingAddSim, errorAddSim, addSimInOrder }) {
  const [isEditIccMode, setIsEditIccMode] = useState(!icc)

  const [newIcc, setNewIcc] = useState(icc)

  useLayoutEffect(() => {
    if (errorAddSim) {
      setIsEditIccMode(true)
    }
  }, [errorAddSim])

  const onClickEdit = () => {
    setIsEditIccMode(true)
  }

  const onChange = e => {
    const icc = e.target.value?.match(/\d+/g)?.join('') ?? ''
    setNewIcc(icc)
  }

  const onClickAdd = () => {
    addSimInOrder({ id, msisdn, tariff, icc: newIcc })
    setIsEditIccMode(false)
  }

  return (
    <Container>
      <Title bold fontSize={16} fontFamily={T2_ROOFTOP_REGULAR}>
        {tariff}
      </Title>
      <Title fontSize={14} fontFamily={T2_ROOFTOP_REGULAR}>
        {denormalizeNumber(msisdn)}
      </Title>
      <EditIccBlock>
        <ReactInputMask mask='99999999999999999999' value={newIcc} disabled={!isEditIccMode} onChange={onChange}>
          {inputProps => <Input {...inputProps} placeholder='ICC' disabled={!isEditIccMode} />}
        </ReactInputMask>
        {isEditIccMode ? (
          <Button type='primary' disabled={!isValidIcc(newIcc)} onClick={onClickAdd}>
            Добавить
          </Button>
        ) : (
          <Button type='text' icon={<EditOutlined />} loading={isLoadingAddSim} onClick={onClickEdit} />
        )}
      </EditIccBlock>
      {errorAddSim && <Error>{errorAddSim}</Error>}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: #f1f1f1;
`

const EditIccBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Error = styled.span`
  color: red;
`
