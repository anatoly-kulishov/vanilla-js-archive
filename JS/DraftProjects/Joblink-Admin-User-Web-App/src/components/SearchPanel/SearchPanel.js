import React from 'react';
import {useSelector} from "react-redux";
import PropTypes from 'prop-types';
import store from "../../store";
import './SearchPanel.scss';

const SearchPanel = props => {
    const {type, selector, placeholder, className} = props;
    const term = useSelector(selector);

    const onSearchChange = (e) => {
        const term = e.target.value;
        store.dispatch({
            type,
            payload: term
        });
    };

    return (
        <div className="search-panel">
            <button className="search-panel__button" type="button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M1 10.5C1 5.25332 5.25332 1 10.5 1C15.7467 1 20 5.25332 20 10.5C20 12.7631 19.2086 14.8414 17.8875 16.4733L21.5607 20.1464C21.9512 20.537 21.9512 21.1701 21.5607 21.5607C21.1701 21.9512 20.537 21.9512 20.1464 21.5607L16.4733 17.8875C14.8414 19.2086 12.7631 20 10.5 20C5.25332 20 1 15.7467 1 10.5ZM10.5 3C6.35788 3 3 6.35788 3 10.5C3 14.6421 6.35788 18 10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35788 14.6421 3 10.5 3ZM6.96447 6.46442C7.86823 5.56072 9.11959 5 10.5 5C11.8804 5 13.1318 5.56072 14.0355 6.46444C14.426 6.85497 14.426 7.48813 14.0355 7.87866C13.645 8.26918 13.0118 8.26918 12.6213 7.87866C12.0773 7.33468 11.3287 7 10.5 7C9.67131 7 8.92267 7.33468 8.37863 7.87868C7.98809 8.26919 7.35493 8.26917 6.96442 7.87863C6.57391 7.48809 6.57393 6.85493 6.96447 6.46442Z"
                          fill="#A1A1AA"/>
                </svg>
            </button>
            <input type="text"
                   className={`form-control search-panel__input ${className}`}
                   placeholder={placeholder ? placeholder : 'Search by name...'}
                   value={term}
                   onChange={onSearchChange}
            />
        </div>
    );
};

SearchPanel.propTypes = {
    type: PropTypes.string,
    selector: PropTypes.func,
    placeholder: PropTypes.string,
}

export default SearchPanel
