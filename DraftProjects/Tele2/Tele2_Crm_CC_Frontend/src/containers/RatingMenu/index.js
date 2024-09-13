import { connect } from 'react-redux'

import RatingMenu from './RatingMenu'

import { getLikes, createLike } from 'reducers/likes/likesReducer'

const mapStateToProps = state => ({
  ...state.likes
})

const mapDispatchToProps = {
  getLikes,
  createLike
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatingMenu)
