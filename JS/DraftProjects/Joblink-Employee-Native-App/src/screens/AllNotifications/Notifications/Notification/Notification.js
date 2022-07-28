import React, {memo} from 'react';
import moment from "moment";
import {EventNotification, NewEventNotification} from "./Wrappers";

const Notification = props => {
    const {employee, navigation} = props;
    const type = employee.SentEmployees.type;
    const phase = employee.JobEvent.phase;
    const diffAtCurrentDay = moment(employee.JobEvent.start).diff(new Date(), 'days');

    const getOfferInfo = (JobEventId) => {
        navigation.navigate("JobOffer", {offer: employee, JobEventId: JobEventId})
    };

    if (!employee.length) {
        if (phase === 'offer' && type === 'not_responded' && diffAtCurrentDay > -1) {
            return <NewEventNotification {...employee} getInfo={getOfferInfo}/>
        } else if (type === 'accept' && phase === 'log' && diffAtCurrentDay > -30) {
            return <EventNotification {...employee} getInfo={getOfferInfo}/>
        }
    }

    return null;
}

export default memo(Notification);
