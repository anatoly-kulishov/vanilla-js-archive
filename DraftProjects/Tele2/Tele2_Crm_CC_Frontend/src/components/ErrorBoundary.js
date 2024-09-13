import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = { error: null, errorInfo: null }

  componentDidCatch = (error, errorInfo) => {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render = () => {
    const { children } = this.props
    const { errorInfo, error } = this.state

    if (errorInfo) {
      return (
        <ErrorWrapper>
          <ErrorHeader>Что-то пошло не так</ErrorHeader>
          <div>
            Отправьте скришот ошибки и подробности ниже администратору и попробуйте обновить страницу.
          </div>
          <br />
          <div>{error && error.toString()}</div>
          <div>{errorInfo.componentStack}</div>
        </ErrorWrapper>
      )
    }
    return children
  }
}

export default ErrorBoundary

const ErrorWrapper = styled.div`
  padding: 35px;
`
const ErrorHeader = styled.h2`
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
`
