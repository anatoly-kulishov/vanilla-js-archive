import React from 'react';
import PropTypes from 'prop-types';
import Today from "./Today";
import EmptyDay from "./EmptyDay";
import JobLogMissing from "./JobLogMissing";
import JobLogFilled from "./JobLogFilled";
import FullyAvailable from "./FullyAvailable";
import NotAvailable from "./NotAvailable";
import PartlyAvailable from "./PartlyAvailable";
import NotAvailableSickLeave from "./NotAvailableSickLeave";
import NotAvailableOtherReason from "./NotAvailableOtherReason";
import NewJobOffer from "./NewJobOffer";
import MultipleJobOffer from "./MultipleJobOffer";
import AcceptedJobOffer from "./AcceptedJobOffer";
import OfferIgnored from "./OfferIgnored";
import OfferDeclined from "./OfferDeclined";
import SelectedDay from "./SelectedDay";

const DayComponent = props => {
    const {date, state, marking, onDayPress} = props;

    switch (marking) {
        case 'today': {
            return <Today date={date} state={state} onPressCallback={() => null}/>
        }
        case 'JobLogMissing': {
            return <JobLogMissing date={date} state={state} onPressCallback={() => null}/>
        }
        case 'JobLogFilled': {
            return <JobLogFilled date={date} state={state} onPressCallback={() => null}/>
        }
        case 'FullyAvailable': {
            return <FullyAvailable date={date} state={state} onPressCallback={onDayPress}/>
        }
        case 'PartlyAvailable': {
            return <PartlyAvailable date={date} state={state} onPressCallback={() => null}/>
        }
        case 'NotAvailable': {
            return <NotAvailable date={date} state={state} onPressCallback={() => null}/>
        }
        case 'NotAvailableSickLeave': {
            return <NotAvailableSickLeave date={date} state={state} onPressCallback={() => null}/>
        }
        case 'NotAvailableOtherReason': {
            return <NotAvailableOtherReason date={date} state={state} onPressCallback={() => null}/>
        }
        case 'NewJobOffer': {
            return <NewJobOffer date={date} state={state} onPressCallback={() => null}/>
        }
        case 'MultipleJobOffer': {
            return <MultipleJobOffer date={date} state={state} onPressCallback={() => null}/>
        }
        case 'AcceptedJobOffer': {
            return <AcceptedJobOffer date={date} state={state} onPressCallback={() => null}/>
        }
        case 'OfferIgnored': {
            return <OfferIgnored date={date} state={state} onPressCallback={() => null}/>
        }
        case 'OfferDeclined': {
            return <OfferDeclined date={date} state={state} onPressCallback={() => null}/>
        }
        case 'selectedDay': {
            return <SelectedDay date={date} state={state} onPressCallback={() => null}/>
        }
        default: {
            return <EmptyDay date={date} state={state} onPressCallback={onDayPress}/>
        }
    }
}

DayComponent.propTypes = {
    date: PropTypes.any,
    state: PropTypes.any,
    marking: PropTypes.any,
    navigation: PropTypes.object,
}

export default React.memo(DayComponent)
