import React, {memo} from 'react';
import {useSelector} from "react-redux";
import Select from 'react-select';
import PropTypes from 'prop-types';
import {selectTheme} from "../../theme";
import ErrorBoundary from "../ErrorBoundary";
import Order from "../Orders/Order";
import './Card.scss';

const Card = props => {
    const {title, selectOptions = false, children, selectFilterState, setSelectFilterState} = props;

    const orders = useSelector(state => state.orders.fetchedOrders);
    const unprocessedOrders = orders
        .filter(order => order.status === 'unprocessed')
        .map(order => <Order key={order.id} order={order}/>)

    const handleChange = selectedOption => {
        setSelectFilterState(selectedOption);
    };

    const CountElement = (
        <div className="card-subtitle">
            <span>{unprocessedOrders.length}</span> orders
        </div>
    );

    return (
        <ErrorBoundary>
            <div className="card">
                <div className="card-head">
                    <h5 className="card-title">{title}</h5>
                    <div className="card-subtitle text-center">
                        {selectOptions
                            ? <Select value={selectFilterState}
                                      defaultValue={selectFilterState[0]}
                                      onChange={handleChange}
                                      options={selectOptions}
                                      theme={selectTheme}/>
                            : CountElement}
                    </div>
                </div>
                {children}
            </div>
        </ErrorBoundary>
    )
}

Card.propTypes = {
    title: PropTypes.string,
    select: PropTypes.array,
    children: PropTypes.array,
}

export default memo(Card);
