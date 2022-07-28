import React, {useState} from 'react';
import PropTypes from 'prop-types';
import OldSchoolMenuLink from "../OldSchoolMenuLink";

const MenuItemHasChildren = props => {
    const {label, subMenu} = props;
    const [collapse, isCollapse] = useState(false)

    const onToggleSubMenu = () => {
        isCollapse(!collapse)
    }

    return (
        <li className="menu-item-has-children">
            <div onClick={onToggleSubMenu} className="link-box">
                <svg className={'drop-down ' + (collapse ? 'opened' : 'closed')} width="10" height="7"
                     viewBox="0 0 10 7"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1.33301L5 5.33301L1 1.33301L9 1.33301Z" fill="#A1A1AA" stroke="#A1A1AA"/>
                </svg>
                {label}
            </div>
            <ul className={'collapse ' + (collapse ? 'show' : 'hide')}>
                {subMenu.map(el =>
                    <li key={el.id}>
                        <OldSchoolMenuLink to={el.to} label={el.label}/>
                    </li>
                )}
            </ul>
        </li>
    )
}

MenuItemHasChildren.propTypes = {
    label: PropTypes.string,
    subMenu: PropTypes.array
}

export default MenuItemHasChildren;
