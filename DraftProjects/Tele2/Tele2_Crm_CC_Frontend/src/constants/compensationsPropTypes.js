import PropTypes from 'prop-types'
import moment from 'moment'

const PaydServiceTypesProps = PropTypes.shape({
  ServiceTypeId: PropTypes.number,
  ServiceTypeName: PropTypes.string,
  IsActive: PropTypes.bool,
  ModifiedBy: PropTypes.string,
  ModifiedOn: PropTypes.instanceOf(moment),
  CreatedBy: PropTypes.string,
  CreatedOn: PropTypes.instanceOf(moment)
})

const PaydServiceSizesProps = PropTypes.shape({
  ServiceSizeId: PropTypes.number,
  ServiceSize: PropTypes.string,
  IsActive: PropTypes.bool,
  ModifiedBy: PropTypes.string,
  ModifiedOn: PropTypes.instanceOf(moment),
  CreatedBy: PropTypes.string,
  CreatedOn: PropTypes.instanceOf(moment)
})

const PaydCommentsProps = PropTypes.shape({
  PaydCommentId: PropTypes.number,
  PaydCommentDescription: PropTypes.string,
  IsActive: PropTypes.bool,
  ModifiedBy: PropTypes.string,
  ModifiedOn: PropTypes.instanceOf(moment),
  CreatedBy: PropTypes.string,
  CreatedOn: PropTypes.instanceOf(moment)
})

const PaydTypesProps = PropTypes.shape({
  DocumentTypeId: PropTypes.number,
  PaydType: PropTypes.string
})

const AvailablePackagesProps = PropTypes.shape({
  ServiceId: PropTypes.number,
  ServiceName: PropTypes.string,
  ServiceTypeId: PropTypes.number,
  ServiceSizeId: PropTypes.number,
  ServiceType: PropTypes.string,
  ServiceSize: PropTypes.string
})

const CompensationsMessagesProps = PropTypes.shape({
  MessageType: PropTypes.string,
  MessageText: PropTypes.string
})

export {
  PaydServiceTypesProps,
  PaydServiceSizesProps,
  PaydCommentsProps,
  PaydTypesProps,
  AvailablePackagesProps,
  CompensationsMessagesProps
}
