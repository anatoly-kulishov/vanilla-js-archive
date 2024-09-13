import { connect } from 'react-redux'
import { submitPartiesRelation } from 'webseller/features/recreateClient/reducer'
import PartiesRelation from './PartiesRelation'

const mapStateToProps = null

const mapDispatchToProps = dispatch => ({
  toNextStep: payload => dispatch(submitPartiesRelation(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PartiesRelation)
