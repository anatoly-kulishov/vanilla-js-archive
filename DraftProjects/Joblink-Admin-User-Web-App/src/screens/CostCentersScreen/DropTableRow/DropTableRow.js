import React, {memo, useState} from 'react';
import {useSelector} from "react-redux";
import {getAllCostCenters} from "../../../store/selectors/cost-centers-selectors";

const DropTableRow = props => {
    const {costCenter, onDelete, onRename} = props;

    // Selectors
    const allCostCenters = useSelector(getAllCostCenters);

    console.log(allCostCenters.filter(el => costCenter?.Locations.some(location => location.CostCenterId === el.id)))

    // States
    const [collapse, isCollapse] = useState(false);

    // Actions
    const onToggleSubMenu = () => isCollapse(!collapse);

    return (
        <tr key={costCenter?.id} className="tr-has-children">
            <td className="link-in">
                <span onClick={onToggleSubMenu}>
                    <span className="drop-down-frame link-el">
                        <svg className={'drop-down ' + (collapse ? 'opened' : 'closed')} width="10" height="7"
                             viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1.33301L5 5.33301L1 1.33301L9 1.33301Z" fill="#A1A1AA" stroke="#A1A1AA"/>
                        </svg>
                    </span>
                    {costCenter?.name}
                </span>
                <ul className={'custom-list color-green collapse ' + (collapse ? 'show' : 'hide m-0')}>
                    {costCenter?.Locations
                        .map(location =>
                            <li key={location.id}>
                                Company id {location.CompanyAccountId}
                            </li>
                        )}
                </ul>
            </td>
            <td className="link-in">
                <span onClick={onToggleSubMenu}>
                    {costCenter?.Locations.length} locations
                </span>
                <ul className={'custom-list collapse ' + (collapse ? 'show' : 'hide m-0')}>
                    {costCenter?.Locations?.map(el =>
                        <li key={el.id}>
                            {el.name}
                        </li>
                    )}
                </ul>
            </td>
            <td className="control-elements">
                <span onClick={() => onDelete(costCenter?.id)} className="delete mr-4">Delete</span>
                <span onClick={() => onRename(costCenter?.id)} className="rename">Rename</span>
            </td>
        </tr>
    );
}

export default memo(DropTableRow);
