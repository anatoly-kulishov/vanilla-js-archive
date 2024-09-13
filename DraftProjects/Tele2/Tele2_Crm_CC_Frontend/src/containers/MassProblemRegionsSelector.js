import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MassProblemRegionProps } from 'constants/massProblems'
import RegionsSelector from 'components/RegionsSelector'

const mapStateToProps = state => ({
  regions: state.massProblems.massProblemServiceState.regions,
  isLoading: state.massProblems.massProblemServiceState.isRegionsLoading
})

class MassProblemRegionsSelector extends PureComponent {
  static propTypes = {
    // external props
    value: PropTypes.arrayOf(PropTypes.number), // [ BranchId ]
    onChange: PropTypes.func,
    // container props
    regions: PropTypes.arrayOf(
      MassProblemRegionProps
    ).isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  render () {
    return (
      <RegionsSelector {...this.props} />
    )
  }
}

export default connect(mapStateToProps)(MassProblemRegionsSelector)
