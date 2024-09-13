/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import Checkbox from 'components/Checkbox'
import PropTypes from 'prop-types'

class BranchCheckbox extends Component {
  static propTypes = {
    onSelectReasonCategory: PropTypes.func,
    reason: PropTypes.object
  }

  onCheckboxHover = hover => {
    const { reason } = this.props
    const reasonNode = document.querySelector(`#reason-${reason.ReasonId}`).firstChild

    if (hover) {
      reasonNode.style.background = '#48bfec'
    } else {
      reasonNode.style.background = 'unset'
    }
  }

  render () {
    const { onSelectReasonCategory } = this.props

    return (
      <div
        onMouseLeave={() => this.onCheckboxHover(false)}
        onMouseEnter={() => this.onCheckboxHover(true)}
      >
        <Checkbox isVisible onChange={onSelectReasonCategory} />
      </div>
    )
  }
}

export default BranchCheckbox
