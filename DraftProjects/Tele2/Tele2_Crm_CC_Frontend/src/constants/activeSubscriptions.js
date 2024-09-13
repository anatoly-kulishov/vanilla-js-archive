import PropTypes from 'prop-types'

const Subscription = {
  Id: PropTypes.number.isRequired,
  Key: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired,
  PaidDate: PropTypes.string.isRequired,
  PaymentCost: PropTypes.string.isRequired,
  PaymentPeriod: PropTypes.string,
  ProviderName: PropTypes.string.isRequired,
  RefundTime: PropTypes.string,
  ServiceDescription: PropTypes.string,
  ServiceNumber: PropTypes.string,
  SubscribeText: PropTypes.string,
  SubscriptionEndTime: PropTypes.string,
  SubscriptionStartTime: PropTypes.string,
  TotalPayment: PropTypes.string,
  TrafficType: PropTypes.string,
  UnsubscribeText: PropTypes.string
}

export const SubscriptionProps = PropTypes.shape(Subscription)

const PersonalAccountState = {
  oldSubscriptions: PropTypes.arrayOf(SubscriptionProps),
  activeSubscriptions: PropTypes.arrayOf(SubscriptionProps),
  isActiveSubscriptionsLoading: PropTypes.bool.isRequired,
  isActiveSuccess: PropTypes.bool.isRequired,
  activeSubscriptionsError: PropTypes.bool
}

export const ActiveSubscriptionsStateProps = PropTypes.shape(PersonalAccountState)
