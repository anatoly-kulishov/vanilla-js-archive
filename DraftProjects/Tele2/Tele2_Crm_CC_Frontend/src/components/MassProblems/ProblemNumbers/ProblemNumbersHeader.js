import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip, Form } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

export default class ProblemNumbersHeader extends Component {
  static propTypes = {
    isIssuesMsisdnOn: PropTypes.bool,
    addMsisdns: PropTypes.func,
    removeMsisdns: PropTypes.func
  }

  render () {
    const {
      isIssuesMsisdnOn,
      addMsisdns,
      removeMsisdns
    } = this.props

    return (
      <ProblemForm>
        {isIssuesMsisdnOn && (
          <Wrapper>
            Проблемные номера
            <IconWrapper>
              <Form.Item>
                <Tooltip placement='bottomRight' title='Добавить несколько проблемных номеров'>
                  <AddIcon onClick={addMsisdns} />
                </Tooltip>
              </Form.Item>
              <Form.Item>
                <Tooltip placement='bottomRight' title='Удалить проблемные номера'>
                  <DeleteIcon onClick={removeMsisdns} />
                </Tooltip>
              </Form.Item>
            </IconWrapper>
          </Wrapper>
        )}
      </ProblemForm>
    )
  }
}

const ProblemForm = styled(Form)`
  margin-top: 30px;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
`
const IconWrapper = styled.div`
  display: flex;
`
const DeleteIcon = styled(MinusCircleOutlined)`
  font-size: 22px;
  margin: 0 0 5px 5px;
`
const AddIcon = styled(PlusCircleOutlined)`
  font-size: 22px;
  color: #44caff;
  margin: 0 0 5px 10px;
`
