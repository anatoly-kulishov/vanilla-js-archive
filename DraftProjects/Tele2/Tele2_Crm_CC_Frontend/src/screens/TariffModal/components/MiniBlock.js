import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import moment from 'moment'

const renderBlocks = (fieldsTitle, fieldsValue, key) => {
  return (
    <SubCol span={24} key={key}>
      <Col span={10}>
        {fieldsTitle}
      </Col>
      <ValueCol span={14}>
        { fieldsValue !== null
          ? moment(fieldsValue, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid()
            ? moment(fieldsValue).format('DD.MM.YYYY, HH.mm')
            : fieldsValue
          : ''
        }
      </ValueCol>
    </SubCol>
  )
}

const MiniBlock = props => {
  MiniBlock.propTypes = {
    title: PropTypes.string,
    fieldsTitle: PropTypes.array,
    fieldsValue: PropTypes.array
  }

  return (
    <Wrapper>
      <TitleCol>{props.title}</TitleCol>
      {props.fieldsTitle.map((el, iter) => renderBlocks(el, props.fieldsValue[iter], iter))}
    </Wrapper>
  )
}

export default MiniBlock

const TitleCol = styled(Col)`
  font-weight: bold;
  font-size: 16px;
  color: #000;
  margin-top: 8px;

  @media (max-width: 1400px) {
    font-size: 14px;
  }
`

const SubCol = styled(Row)`
  line-height: 18px;
  font-size: 16px;
  margin-top: 6px;

  @media (max-width: 1400px) {
    font-size: 14px;
  }
`

const ValueCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
  text-align: right;
`

const Wrapper = styled.span`
  :nth-child(2n+1) {
    padding-right: 15px;
  }
  width: 50%;
`
