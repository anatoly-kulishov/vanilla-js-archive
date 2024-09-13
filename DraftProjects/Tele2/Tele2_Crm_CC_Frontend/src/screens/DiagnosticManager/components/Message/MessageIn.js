import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Collapse } from 'antd'
import { WARNING, ERROR, INFO } from 'constants/diagnosticManagerMessageTypes'
import { WHAT_TO_DO_TEXT } from 'constants/diagnosticManagerStrings'
import HtmlRender from 'components/HtmlRender'

export default function MessageIn (props) {
  MessageIn.propTypes = {
    stepName: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    items: PropTypes.array,
    details: PropTypes.string
  }
  const { stepName, text, type, items, details } = props

  function getBackGroundColor (type) {
    switch (type.toUpperCase()) {
      case INFO:
        return 'rgb(255, 255, 255)'
      case WARNING:
        return 'rgb(255, 244, 206)'
      case ERROR:
        return 'rgb(253, 231, 233)'
      default:
        return 'rgb(255, 255, 255)'
    }
  }

  return (
    <Wrapper color={getBackGroundColor(type)} isHuge={Array.isArray(items)}>
      <MainMessageWrapper>
        <SubName>{stepName}</SubName>
        <Text><HtmlRender value={text} /></Text>
        {Array.isArray(items) && (
          <MessageCollapse>
            {items.map(message =>
              message.map((messageItem, index) =>
                <ItemPanel IsHighlighted={messageItem[0].IsHighlighted} header={messageItem[0].FieldValue} key={index}>
                  {messageItem.map(item => {
                    const { Key, FieldHead, FieldValue } = item
                    return (
                      <Fragment key={Key}>
                        <SubItemHead>{FieldHead}</SubItemHead>
                        <div>{FieldValue}</div>
                      </Fragment>
                    )
                  })}
                </ItemPanel>
              )
            )}
          </MessageCollapse>
        )}
      </MainMessageWrapper>
      {
        details &&
        <MessageDetails>
          <SubName>{WHAT_TO_DO_TEXT}</SubName>
          <HtmlRender value={details} />
        </MessageDetails>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  white-space: pre-line;
  margin-bottom: 15px;
  text-align: left;
  ${({ isHuge }) =>
    isHuge
      ? css`
          width: 85%;
          @media (max-width: 1300px) {
            width: 95%;
          }
          @media (max-width: 1300px) {
            width: 100%;
          }
        `
      : css`
          width: 65%;
          @media (max-width: 1300px) {
            width: 75%;
          }
          @media (max-width: 1300px) {
            width: 85%;
          }
        `}
  ${({ color }) =>
    css`
      background: ${color};
    `}
  border-radius: 10px;
  .rdw-editor-main {
    padding: 0px !important;
  }
  .public-DraftStyleDefault-ol {
    margin: 0;
  }
`
const SubName = styled.div`
  color: #696f76;
  font-size: 9px;
`
const Text = styled.div`
  color: black;
  padding-bottom: 5px;
`
const ItemPanel = styled(Collapse.Panel)`
  ${({ IsHighlighted }) => IsHighlighted && `
    .ant-collapse-header {
      font-weight: bold;
    }
  `}
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 8px;
  }
  .ant-collapse-content {
    background: unset;
    border: 0;
  }
`
const MainMessageWrapper = styled.div`
  padding: 10px;
`
const MessageCollapse = styled(Collapse)`
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  border: 0;
  .ant-collapse-item {
    border-bottom: 0;
  }
`
const MessageDetails = styled.div`
  padding: 3px 10px;
  background: rgba(0, 0, 0, 0.05);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: inset 0 3px 5px -5px #333;
  font-size: 0.73rem;
`
const SubItemHead = styled.div`
  color: black;
`
