import React, { PureComponent } from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { fetchUser } from 'reducers/internal/userReducer'
import PropTypes from 'prop-types'

class ErrorPage extends PureComponent {
  static propTypes = {
    userState: PropTypes.object,
    isAuthError: PropTypes.bool,
    isNotAccess: PropTypes.bool,
    fetchUser: PropTypes.func
  }
  componentDidMount = () => {
    const { userState } = this.props
    if (userState.userError && !userState.isUserLoading) {
      fetchUser()
    }
  }

  render () {
    const { isAuthError, isNotAccess, fetchUser } = this.props
    if (isAuthError) {
      return (
        <Container>
          <Table>
            <RowBold onClick={() => fetchUser()}>Ошибка авторизации</RowBold>
            <RowRegular>Обратитесь к администратору системы, чтобы получить доступ</RowRegular>
          </Table>
        </Container>
      )
    } else if (isNotAccess) {
      return (
        <Container>
          <Table>
            <RowBold >Недостаточно прав</RowBold>
            <RowRegular>Обратитесь к администратору системы, чтобы получить доступ</RowRegular>
          </Table>
        </Container>
      )
    } else {
      return (<Container>
        <Table>
          <RowBold >404</RowBold>
          <RowRegular>Такой страницы не существует</RowRegular>
        </Table>
      </Container>)
    }
  }
}

const mapStateToProps = state => ({
  userState: state.internal.userState
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ErrorPage))

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: white;
  color: black;
  text-align: center;
`
const Table = styled.div`
  margin-left: 15px;
`
const RowBold = styled.div`
  font-size: 48px;
  font-family: T2HalvarBreit_ExtraBold;
  padding-top: 180px;
  &:hover {
    cursor: pointer;
  }
`
const RowRegular = styled.div`
  font-size: 24px;
  font-family: T2_DisplaySerif_Regular;
`
