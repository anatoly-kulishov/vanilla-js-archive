import { connect } from 'react-redux'

import WebSellerLayout from './WebSellerLayout'

const mapStateToProps = state => ({
  ...state.internal.userState
})

export default connect(mapStateToProps)(WebSellerLayout)
