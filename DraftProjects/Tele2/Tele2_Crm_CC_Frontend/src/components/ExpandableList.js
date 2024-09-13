/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import UnderlineButton from './Buttons/UnderlineButton'

export default function ExpandableList ({ items, collapsedSize, isInitiallyExpanded, onItemClick }) {
  ExpandableList.propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        labelText: PropTypes.string.isRequired,
        value: PropTypes.string
      })
    ),
    collapsedSize: PropTypes.number,
    isInitiallyExpanded: PropTypes.bool,
    onItemClick: PropTypes.func.isRequired
  }

  ExpandableList.defaultProps = {
    items: [],
    collapsedSize: 3,
    isInitiallyExpanded: false
  }

  const [isExpanded, setExpanded] = useState(isInitiallyExpanded)

  const itemsLength = items?.length ?? 0
  const isShowMoreButtonDisplayed = itemsLength > collapsedSize && !isExpanded

  const filteredListItems = isExpanded ? items : items?.slice(0, collapsedSize)
  const visibleListItems = filteredListItems?.map(item => {
    return (
      <UnderlineButton key={item.labelText} variant='secondary' onClick={() => onItemClick(item)}>
        {item.labelText}
      </UnderlineButton>
    )
  }) ?? []

  if (itemsLength) {
    return (
      <Wrapper>
        {visibleListItems}
        {isShowMoreButtonDisplayed && (
          <UnderlineButton variant='secondary' onClick={() => setExpanded(true)}>
            Ещё {items.length - collapsedSize}
          </UnderlineButton>
        )}
      </Wrapper>
    )
  }
  return <Placeholder>Пусто</Placeholder>
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  > button {
    :not(:last-child) {
      margin-right: 20px;
    }
  }
`

const Placeholder = styled.p`
  line-height: 2.3;
  margin-bottom: 0;
`
