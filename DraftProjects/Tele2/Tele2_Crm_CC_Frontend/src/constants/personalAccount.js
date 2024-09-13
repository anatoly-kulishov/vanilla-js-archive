import PropTypes from 'prop-types'

const PersonalAccount = {
  AdvertisingAgreement: PropTypes.bool,
  BillingBranchId: PropTypes.number,
  ClientId: PropTypes.number,
  ClientTypeId: PropTypes.number,
  ClientStatusId: PropTypes.number,
  Email: PropTypes.string,
  Msisdn: PropTypes.string,
  OwnerClientId: PropTypes.number,
  PersonalAccountId: PropTypes.number,
  SubscriberId: PropTypes.number,
  SubscriberStatus: PropTypes.number,
  SubClientId: PropTypes.string,
  SubClientTypeId: PropTypes.string,
  ClientCategory: PropTypes.string,

  BaseFunctionalParams: PropTypes.shape({
    ClientCategory: PropTypes.string,
    ClientCategoryId: PropTypes.string,
    ClientIP: PropTypes.string,
    InteractionDirectionId: PropTypes.string,
    AppMode: PropTypes.string,
    Message: PropTypes.string,
    LogMessage: PropTypes.string,
    ServiceChannelId: PropTypes.string,
    TarificationTypeId: PropTypes.number
  }),
  SubscriberFullInfo: PropTypes.shape({
    SubscriberClientInfo: PropTypes.shape({
      ClientId: PropTypes.number,
      PersonalAccountId: PropTypes.number,
      ParentClientId: PropTypes.number,
      OwnerClientId: PropTypes.number,
      BillingBranchId: PropTypes.number,
      Region: PropTypes.string,
      JurClientTypeId: PropTypes.number,
      JurClientTypeName: PropTypes.string,
      ClientTypeId: PropTypes.number,
      ClientTypeName: PropTypes.string,
      ClientStatusId: PropTypes.number,
      LinkedPersonalAccount: PropTypes.number,
      Enviroment: PropTypes.string
    }),
    SubscriberInfo: PropTypes.shape({
      Msisdn: PropTypes.string,
      AdvertisingAgreement: PropTypes.bool,
      SubscriberId: PropTypes.number,
      SubscriberStatus: PropTypes.string,
      SubscriberStatusId: PropTypes.number,
      SubscriberFullName: PropTypes.string,
      StatusChangeReason: PropTypes.string,
      FullDocument: PropTypes.string,
      RatePlanId: PropTypes.number,
      RateName: PropTypes.string,
      SubscriberTypeId: PropTypes.number,
      Password: PropTypes.string,
      SpkName: PropTypes.string,
      LoyalityCategoryId: PropTypes.number,
      ActivationDate: PropTypes.string,
      Email: PropTypes.string,
      CityPhone: PropTypes.string,
      WebCareLevelAccess: PropTypes.string
    }),
    USIProfile: PropTypes.shape({
      Iccid: PropTypes.string,
      Imsi: PropTypes.string,
      UType: PropTypes.string,
      Pin1: PropTypes.string,
      Pin2: PropTypes.string,
      Puk1: PropTypes.string,
      Puk2: PropTypes.string
    })
  }),
  ParentClientInfo: PropTypes.shape({
    ParentClientId: PropTypes.number,
    ParentClientType: PropTypes.string,
    ParentClientTypeId: PropTypes.number,
    ParentJurClientTypeId: PropTypes.number,
    ParentJurClientType: PropTypes.string,
    ClientStatus: PropTypes.number,
    ClientStatusName: PropTypes.string,
    ClientName: PropTypes.string,
    ParentClientName: PropTypes.string,
    ClientCodeword: PropTypes.string,
    BillingBranch: PropTypes.string,
    PersonalAccountId: PropTypes.number,
    RatePlanName: PropTypes.string,
    RemoteServiceEmailAddress: PropTypes.string,
    ParentManagerFullName: PropTypes.string,
    ParentManagerIdentityDocument: PropTypes.string,
    AgentFullName: PropTypes.string,
    AgentIdentityDocument: PropTypes.string,
    IsReceivables: PropTypes.bool,
    HasParent: PropTypes.bool
  }),
  SubscriberCounts: PropTypes.shape({
    SubscriberCount: PropTypes.number,
    SubscriberActiveCount: PropTypes.number,
    SubscriberPreparedCount: PropTypes.number,
    SubscriberBlockedCount: PropTypes.number,
    SubscriberClosedCount: PropTypes.number,
    SubscriberSuspendedCount: PropTypes.number,
    SubscriberTotalCount: PropTypes.number
  })
}

export const PersonalAccountShape = PropTypes.shape(PersonalAccount)

const PersonalAccountState = {
  personalAccount: PersonalAccountShape,
  personalAccountError: PropTypes.bool,
  isPersonalAccountLoading: PropTypes.bool
}

export const PersonalAccountStateProps = PropTypes.shape(PersonalAccountState)
