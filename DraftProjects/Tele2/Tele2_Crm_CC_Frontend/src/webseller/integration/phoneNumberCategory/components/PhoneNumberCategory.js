import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getTypeCard } from 'webseller/helpers'
import { fetchPhoneNumberCategory } from '../reducer'
import { selectPhoneNumberCategory } from '../selectors'
import { Col } from 'antd'

const PhoneNumberCategory = () => {
  const dispatch = useDispatch()

  const category = useSelector(selectPhoneNumberCategory)

  useEffect(() => {
    const { isClientCategory } = getTypeCard(true)
    if (isClientCategory) dispatch(fetchPhoneNumberCategory())
  }, [])

  return (
    <>
      {category ? (
        <Col span={12}>
          <Title>Категория номера</Title>
          <span>{category}</span>
        </Col>
      ) : null}
    </>
  )
}

export default PhoneNumberCategory

const Title = styled.div`
  color: #8e97a0;
`
