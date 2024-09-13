import PropTypes from 'prop-types'
import moment from 'moment'

const CreateTicketModalCategoriesProps = {
  CategoryId: PropTypes.number,
  CategoryName: PropTypes.string,
  IsActive: PropTypes.bool,
  IsDeleted: PropTypes.bool,
  IsCommentFree: PropTypes.bool,
  IsCommentRequired: PropTypes.bool,
  IsEscalationAllowed: PropTypes.bool,
  IsSmsAllowed: PropTypes.bool,
  RecNum: PropTypes.number,
  ShortName: PropTypes.string
}

const CreateTicketModalReasonsProps = {
  ...CreateTicketModalCategoriesProps,
  IsAllClientCategories: PropTypes.bool.isRequired,
  IsAllInteractionDirs: PropTypes.bool.isRequired,
  IsAllServiceChannels: PropTypes.bool.isRequired,
  IsClientReason: PropTypes.bool.isRequired,
  IsExpanded: PropTypes.bool.isRequired,
  IsNotForUse: PropTypes.bool.isRequired,
  IsOnlyOneCategory: PropTypes.bool.isRequired,
  IsRequired: PropTypes.bool.isRequired,
  ParentId: PropTypes.number.isRequired,
  ReasonId: PropTypes.number.isRequired,
  ReasonName: PropTypes.string.isRequired,
  RecNum: PropTypes.number.isRequired
}

const CreateTicketModalSelectedReasonProps = PropTypes.shape({
  ...CreateTicketModalCategoriesProps,
  IsAllClientCategories: PropTypes.bool.isRequired,
  IsAllInteractionDirs: PropTypes.bool.isRequired,
  IsAllServiceChannels: PropTypes.bool.isRequired,
  IsClientReason: PropTypes.bool.isRequired,
  IsExpanded: PropTypes.bool.isRequired,
  IsNotForUse: PropTypes.bool.isRequired,
  IsOnlyOneCategory: PropTypes.bool.isRequired,
  IsRequired: PropTypes.bool.isRequired,
  ParentId: PropTypes.number.isRequired,
  ReasonId: PropTypes.number.isRequired,
  ReasonName: PropTypes.string.isRequired,
  RecNum: PropTypes.number.isRequired
})

const CreateTicketModalSelectedCategoryProps = PropTypes.shape({
  CategoryId: PropTypes.number.isRequired,
  CategoryName: PropTypes.string.isRequired,
  IsCommentFree: PropTypes.bool.isRequired,
  IsCommentRequired: PropTypes.bool.isRequired,
  IsEscalationAllowed: PropTypes.bool.isRequired,
  IsSmsAllowed: PropTypes.bool.isRequired,
  ShortName: PropTypes.string.isRequired
})

const CreateTicketModalHandlingStateProps = PropTypes.shape({
  IsRepeated: PropTypes.bool,
  DisplayMessage: PropTypes.string,
  HasWarning: PropTypes.bool,
  Id: PropTypes.number,
  IsSuccess: PropTypes.bool,
  WarningMessage: PropTypes.string,
  checkRepeatedHandlingLoading: PropTypes.bool,
  closedHandling: PropTypes.bool,
  closedHandlingError: PropTypes.string,
  closedHandlingLoading: PropTypes.bool,
  isRepeatedHandlingChecked: PropTypes.bool,
  repeatedHandlingError: PropTypes.bool
})

const CreateTicketModalClientInfoStateProps = PropTypes.shape({
  AgentFullName: PropTypes.string,
  AgentIdentityDocument: PropTypes.string,
  BillingBranch: PropTypes.string,
  ClientCodeword: PropTypes.string,
  ClientName: PropTypes.string,
  ClientStatus: PropTypes.number,
  ClientStatusName: PropTypes.string,
  ClientTypeId: PropTypes.number,
  IsReceivables: PropTypes.bool,
  JurClientTypeId: PropTypes.number,
  ManagerFullName: PropTypes.string,
  ManagerIdentityDocument: PropTypes.string,
  ParentClientName: PropTypes.string,
  PersonalAccountId: PropTypes.number,
  RatePlanName: PropTypes.string,
  RemoteServiceEmailAddress: PropTypes.string
})

const CreateTicketModalContactLinesProps = {
  t2_ContactLinesId: PropTypes.string.isRequired,
  t2_bpmonlineid: PropTypes.string.isRequired.isRequired,
  t2_description: PropTypes.string.isRequired,
  t2_name: PropTypes.string.isRequired
}

const CreateTicketModalReasonsCategoriesParametersProps = {
  ParamName: PropTypes.string,
  ParamType: PropTypes.number,
  ParamValue: PropTypes.string
}

const CreateTicketModalTicketsStateProps = PropTypes.shape({
  addParamsList: PropTypes.object,
  addParamsListError: PropTypes.bool,
  categories: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalCategoriesProps)),
  contactLines: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalContactLinesProps)),
  createTicketError: PropTypes.bool,
  deleteFileError: PropTypes.bool,
  initialReasons: PropTypes.arrayOf(CreateTicketModalSelectedReasonProps),
  isAddParamsListLoading: PropTypes.bool,
  isCreateTicketLoading: PropTypes.bool,
  isDeleteFileLoading: PropTypes.bool,
  isReasonsCategoriesError: PropTypes.bool,
  isReasonsCategoriesLoading: PropTypes.bool,
  isTicketGridLoading: PropTypes.bool,
  reasons: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalReasonsProps)),
  isEscalationAllowed: PropTypes.bool,
  reasonsCategoriesParameters: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalReasonsCategoriesParametersProps)),
  ticketGridError: PropTypes.bool,
  isVisible: PropTypes.bool.isRequired,
  isValidatedCoordinateSmartGis: PropTypes.bool
})

const CoordinatesProps = PropTypes.shape({
  RecordId: PropTypes.number.isRequired,
  HandlingId: PropTypes.number.isRequired,
  Latitude: PropTypes.number,
  Longitude: PropTypes.number,
  Address: PropTypes.string,
  CreatedOn: PropTypes.instanceOf(moment).isRequired
})

export {
  CreateTicketModalTicketsStateProps,
  CreateTicketModalReasonsCategoriesParametersProps,
  CreateTicketModalContactLinesProps,
  CreateTicketModalClientInfoStateProps,
  CreateTicketModalHandlingStateProps,
  CreateTicketModalSelectedCategoryProps,
  CreateTicketModalSelectedReasonProps,
  CreateTicketModalCategoriesProps,
  CreateTicketModalReasonsProps,
  CoordinatesProps
}
