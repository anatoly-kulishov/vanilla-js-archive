import PropTypes from 'prop-types'

export default PropTypes.shape({
  MessageTechId: PropTypes.number,
  Id: PropTypes.number,
  ConversationId: PropTypes.number,
  From: PropTypes.string,
  DisplayFrom: PropTypes.string,
  To: PropTypes.string,
  DisplayTo: PropTypes.string,
  HasAttachments: PropTypes.bool,
  CreatedOn: PropTypes.string,
  Subject: PropTypes.string,
  IsIncoming: PropTypes.bool,
  StatusId: PropTypes.number,
  User: PropTypes.string,
  UserFullName: PropTypes.string,
  Channel: PropTypes.string,
  Body: PropTypes.string,
  UniqueBody: PropTypes.string,
  Cc: PropTypes.string,
  Bcc: PropTypes.string,
  Attachments: PropTypes.string
})
