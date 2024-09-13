import { connect } from 'react-redux'
import CheckPepStep from './CheckPepStep'

const mapStateToProps = state => ({
  msisdns: state.correctionData.pepMsisdns
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(CheckPepStep)
