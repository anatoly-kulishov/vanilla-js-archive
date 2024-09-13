import React from 'react'
import { Dropdown, Menu as DropdownMenu } from 'antd'
import PropTypes from 'prop-types'
import createdStore from 'utils/createdStore'
import MoreIcon from 'components/Icons/MoreIcon'
import HeaderButton from './HeaderButton'
import { get } from 'lodash'

export default function LinksDropdown ({ links }) {
  const getParameters = link => {
    const { parameters } = link
    const store = createdStore.getState()

    const query = new URLSearchParams()
    parameters &&
      parameters.forEach(parameter => {
        query.set(parameter.name, get(store, parameter.stateValuePath, ''))
      })
    return parameters?.length ? `?${query}` : ''
  }

  return (
    <Dropdown
      overlay={
        <DropdownMenu>
          {links.map((link, index) => (
            <DropdownMenu.Item key={index}>
              <a href={link.path + getParameters(link)} target={link.target}>
                {link.text}
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu>
      }
    >
      <HeaderButton icon={<MoreIcon />} />
    </Dropdown>
  )
}

LinksDropdown.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      path: PropTypes.string,
      target: PropTypes.string,
      parameters: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          stateValuePath: PropTypes.string
        })
      )
    })
  )
}
