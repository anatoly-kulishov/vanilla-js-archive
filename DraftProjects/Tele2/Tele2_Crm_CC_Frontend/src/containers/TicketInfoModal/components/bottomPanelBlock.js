/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import CardWithoutRoutes from 'components/CardWithoutRoutes'
import CommentsGridBlock from './сommentsGridBlock'
import FilesGridBlock from './filesGridBlock'
import PropTypes from 'prop-types'

const BottomPanelBlock = (props) => {
  BottomPanelBlock.propTypes = {
    historyTicketsState: PropTypes.object,
    ticketDeleteFile: PropTypes.func,
    isTicketCommentsLoading: PropTypes.bool,
    openTab: PropTypes.func,
    redirect: PropTypes.func
  }
  const { historyTicketsState, ticketDeleteFile, isTicketCommentsLoading, openTab, redirect } = props

  const menuItems = [
    {
      text: 'Комментарии',
      component: (
        <CommentsGridBlock
          historyTicketsState={historyTicketsState}
          isTicketCommentsLoading={isTicketCommentsLoading}
        />
      )
    },
    {
      text: 'Файлы',
      component: (
        <FilesGridBlock
          historyTicketsState={historyTicketsState}
          ticketDeleteFile={ticketDeleteFile}
        />
      )
    }
  ]

  return (
    <CardWithoutRoutes
      cardHeader={'История'}
      menuItems={menuItems}
      contentLoader={false}
      openTab={openTab}
      redirect={redirect}
    />
  )
}

export default BottomPanelBlock
