import React from 'react';
import PropTypes from 'prop-types';
import './NoResultInTable.scss';

const NoResultInTable = props => {
    const {colSpan} = props;
    return (
        <tr className="no-result">
            <td className="bg-warning" colSpan={colSpan}>
                Sorry, no results were found.
            </td>
        </tr>
    );
};

NoResultInTable.propTypes = {
    colSpan: PropTypes.number
}

export default NoResultInTable;