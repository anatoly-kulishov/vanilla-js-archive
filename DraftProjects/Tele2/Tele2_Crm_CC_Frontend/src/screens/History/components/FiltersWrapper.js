/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Button as antdButton } from 'antd'

import Tools from 'components/Tools'
import useKeyPress from 'hocs/useKeyPress'
import useHistoryContext from 'screens/History/HistoryContext/useHistoryContext'

export default function FiltersWrapper ({ children }) {
  FiltersWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
  }

  const { flags, methods } = useHistoryContext()
  const { isHistoryFilterVisible } = flags
  const { toggleHistoryFilterVisibility } = methods

  const { onSubmit, onClear } = children.props

  const handleSubmit = () => {
    onSubmit()
  }

  const handleClear = () => {
    onClear()
  }

  const searchPress = useKeyPress('Enter', isHistoryFilterVisible)

  useEffect(() => {
    searchPress && handleSubmit()
  }, [searchPress])

  return (
    <Wrapper>
      <Header>
        <Tools onFilterClick={toggleHistoryFilterVisibility} onRefreshClick={handleSubmit} />
      </Header>
      <Content
        isFiltersOpen={isHistoryFilterVisible}
      >
        {children}
        <Footer>
          <Button type='primary' onClick={handleSubmit}>
            Найти
          </Button>
          <Button onClick={handleClear}>Очистить</Button>
        </Footer>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  padding: 5px 10px;
  background-color: #fff;
`

const Content = styled.div`
  display: ${props => props.isFiltersOpen ? css`initial` : css`none`};
`

const Footer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 5px;
  justify-content: flex-end;
  border-top: 1px solid #e4e4e9;
`

const Button = styled(antdButton)`
  :first-child {
    margin-right: 20px;
  }
`
