import { connect } from 'react-redux'
import PopoverSubscriptions from './PopoverSubscriptions'

const mapStateToProps = state => ({
  handlingId: state.internal.handlingState.Id,
  ...state.subscriptions.unsubscribe
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopoverSubscriptions)
