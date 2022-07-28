import React, {memo, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import {JobStyles} from "../../../styles";
import NotResponded from "./statement/NotResponded";
import Default from "./statement/Default";
import JobLog from "./statement/JobLog";

const checkOfferStatus = (jobEventId, offer) => {
    switch (offer?.SentEmployees?.type) {
        case 'accept': {
            if (offer.JobEvent.phase === 'log') {
                return <JobLog data={offer} jobEventId={jobEventId}/>
            } else {
                return <Default data={offer} jobEventId={jobEventId}/>
            }
        }
        case 'not_responded':
            return <NotResponded data={offer} jobEventId={jobEventId}/>
        default:
            return <Default data={offer} jobEventId={jobEventId}/>
    }
}

const Offer = ({route}) => {
    // States
    const [offer] = useState(route?.params?.offer);
    const [jobEventId] = useState(route?.params?.jobEventId);

    return (
        <ScrollView style={styles.container}>
            <View style={{paddingVertical: 16}}>
                {checkOfferStatus(jobEventId, offer)}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(JobStyles);

Offer.propTypes = {
    route: PropTypes.object,
    offer: PropTypes.object
}

export default memo(Offer);
