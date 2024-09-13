import PropTypes from 'prop-types'

const ReasonShape = {
  ReasonId: PropTypes.number.isRequired,
  ParentId: PropTypes.number.isRequired,
  ReasonName: PropTypes.string.isRequired,
  MnemoCode: PropTypes.number
}

const ClientCategoryShape = {
  Id: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired
}

const ChannelShape = {
  Id: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired
}

export const ReasonProps = PropTypes.shape(ReasonShape)
export const ClientCategoryProps = PropTypes.shape(ClientCategoryShape)
export const ChannelProps = PropTypes.shape(ChannelShape)
