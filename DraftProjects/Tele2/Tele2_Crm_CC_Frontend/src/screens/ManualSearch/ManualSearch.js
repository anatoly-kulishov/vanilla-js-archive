import React, { PureComponent, Fragment } from 'react'
import Card from 'components/Card'
import PropTypes from 'prop-types'
import Search from 'containers/Search'
import RatingMenu from 'containers/RatingMenu'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
const { manualSearchFeatureId } = ratingFeatureIds

export default class ManualSearch extends PureComponent {
  static propTypes = {
    fetchChannels: PropTypes.func,
    location: PropTypes.object,
    user: PropTypes.object
  }

  componentDidMount () {
    const { fetchChannels } = this.props

    fetchChannels({ isForManualSearch: true })
  }

  manualSearchAddition = [
    shouldRate(manualSearchFeatureId) && { content: <RatingMenu currentFeatureId={manualSearchFeatureId} /> }
  ]

  render () {
    const { location, user, isCreateOrder } = this.props
    const { isASSeller: isWebSellerView } = user

    return (
      <Fragment>
        {isWebSellerView ? (
          <Search isCreateOrder={isCreateOrder} />
        ) : (
          <Card header='Поиск' additional={this.manualSearchAddition} location={location} content={<Search />} />
        )}
      </Fragment>
    )
  }
}
