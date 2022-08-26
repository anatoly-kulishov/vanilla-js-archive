import React from "react";
import PropTypes from 'prop-types';

const CompanyUsersLegend = props => {
    const {name, dataList} = props;
    return (
        <div className="locations">
            <div className="locations__head locations-box">
                <div className="locations__title">{name}</div>
            </div>
            <ul className="locations-list">
                {dataList.map(el =>
                    <li className="locations-box" key={el}>Name Surname {el}
                        <button className="locations-list__icon">
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.4167 16.3389C17.4152 16.5468 17.332 16.7458 17.1851 16.8929C17.0382 17.04 16.8392 17.1233 16.6313 17.125H2.36867C2.16031 17.1248 1.96056 17.0419 1.8133 16.8945C1.66605 16.7471 1.58333 16.5472 1.58333 16.3389V15.5417H15.8333V6.27917L9.5 11.9792L1.58333 4.85417V3.66667C1.58333 3.4567 1.66674 3.25534 1.81521 3.10687C1.96367 2.95841 2.16504 2.875 2.375 2.875H16.625C16.835 2.875 17.0363 2.95841 17.1848 3.10687C17.3333 3.25534 17.4167 3.4567 17.4167 3.66667V16.3389ZM3.51025 4.45833L9.5 9.84958L15.4898 4.45833H3.51025ZM0 12.375H6.33333V13.9583H0V12.375ZM0 8.41667H3.95833V10H0V8.41667Z"
                                    fill="#22C55E"/>
                            </svg>
                        </button>
                    </li>
                )}
            </ul>
        </div>
    );
}

CompanyUsersLegend.propTypes = {
    name: PropTypes.string,
    dataList: PropTypes.array
}

export default CompanyUsersLegend;
