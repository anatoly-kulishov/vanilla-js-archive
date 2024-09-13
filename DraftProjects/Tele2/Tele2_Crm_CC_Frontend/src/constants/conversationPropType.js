import PropTypes from 'prop-types'

export default PropTypes.shape({
  ConversationId: PropTypes.number,
  User: PropTypes.string,
  UserFullName: PropTypes.string,
  From: PropTypes.string,
  DisplayFrom: PropTypes.string,
  ClientId: PropTypes.number,
  ClientName: PropTypes.string,
  Subject: PropTypes.string,
  StatusId: PropTypes.number,
  StatusName: PropTypes.string,
  ChannelId: PropTypes.number,
  ChannelName: PropTypes.string,
  ConversationTechId: PropTypes.string,
  CreatedOn: PropTypes.string,
  LastActivity: PropTypes.string
})
