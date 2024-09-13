import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Skeleton } from 'antd'

export default function SmartGisSection ({ title, isVisible, isLoading, alignment, actions, children, ...rest }) {
  SmartGisSection.propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
    alignment: PropTypes.oneOf(['vertical', 'horizontal']),
    actions: PropTypes.arrayOf(PropTypes.elementType),

    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool
  }

  SmartGisSection.defaultProps = {
    isVisible: true,
    isLoading: false,
    alignment: 'vertical',
    actions: []
  }

  return (
    <Skeleton loading={isLoading}>
      <Wrapper hidden={!isVisible} alignment={alignment} {...rest}>
        <SectionHeader>
          <SectionTitle hidden={!title}>{title}</SectionTitle>
          <SectionActions>{actions}</SectionActions>
        </SectionHeader>
        <div>{children}</div>
      </Wrapper>
    </Skeleton>
  )
}

const Wrapper = styled.section`
    margin-bottom: 20px;
  /* :not(:last-child) {
  } */
  ${({ alignment }) =>
    alignment === 'horizontal' &&
    css`
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-end;
      justify-content: space-between;
      > :first-child {
        white-space: nowrap;
        margin-right: 5px;
        margin-bottom: 0;
      }
    `}
`

const SectionHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
`

const SectionTitle = styled.h4`
  margin: 0;
`

const SectionActions = styled.div`
  > button:not(:last-child) {
    margin-right: 20px;
  }
`
