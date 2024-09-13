import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { MassProblemServiceProps } from 'constants/massProblems'
import { Select } from 'antd'

const mapStateToProps = state => ({
  services: state.massProblems.massProblemServiceState.services,
  isServicesLoading: state.massProblems.massProblemServiceState.isServicesLoading
})

class MassProblemsServiceSelector extends PureComponent {
  static propTypes = {
    // external props
    value: PropTypes.string, // ServiceId
    onChange: PropTypes.func,
    // container props
    services: PropTypes.arrayOf(
      MassProblemServiceProps
    ).isRequired,
    isServicesLoading: PropTypes.bool.isRequired,
    allowClear: PropTypes.bool
  }

  render () {
    const { services, isServicesLoading, allowClear, ...props } = this.props

    return (
      <StyledSelect
        disabled={isServicesLoading}
        optionFilterProp='children'
        allowClear={allowClear}
        showSearch
        {...props}
      >
        { allowClear &&
          <Select.Option value={null} key={null} />
        }
        { services.map(service => (
          <Select.Option value={service.Id} key={service.Id}>
            {service.Name}
          </Select.Option>
        ))}
      </StyledSelect>
    )
  }
}

export default connect(mapStateToProps)(MassProblemsServiceSelector)

const StyledSelect = styled(Select)`
  width: 100%;
`
