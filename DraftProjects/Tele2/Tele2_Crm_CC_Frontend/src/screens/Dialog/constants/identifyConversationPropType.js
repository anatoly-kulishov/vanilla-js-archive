import PropTypes from 'prop-types'

export default PropTypes.shape({
  dsText: PropTypes.string,
  indentifiers: PropTypes.arrayOf(PropTypes.shape({
    From: PropTypes.string,
    ClientId: PropTypes.number,
    ClientName: PropTypes.string,
    BranchId: PropTypes.number,
    PersonalAccount: PropTypes.number,
    IsDs: PropTypes.bool
  }))
})
