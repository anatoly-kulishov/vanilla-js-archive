import React, {memo, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {View} from 'react-native';
import PropTypes from "prop-types";
import {AppText} from "../../../components/ui/AppText";
import {AppLoader} from "../../../components/ui/AppLoader";
import Notification from "./Notification";
import {getEmployeesIsLoading, getEmployees} from "../../../store/selectors/employees-selectors";

const Notifications = ({navigation}) => {
    // Selectors
    const isLoading = useSelector(getEmployeesIsLoading);
    const employees = useSelector(getEmployees);

    // States
    const [receivedOffers, setReceivedOffers] = useState(employees[0]?.ReceivedOffers);

    useEffect(() => {
        setReceivedOffers(employees[0]?.ReceivedOffers)
    }, [employees[0]?.ReceivedOffers])

    return (
        <View>
            {isLoading && <AppLoader/>}
            {!isLoading && (
                <View>
                    {receivedOffers && receivedOffers
                        .filter(el => (el.JobEvent.phase === 'offer' && el.SentEmployees.type === 'not_responded'))
                        .map(el => (
                            <Notification
                                key={el.id}
                                employee={el}
                                navigation={navigation}/>
                        ))}
                    {receivedOffers && receivedOffers
                        .filter(el => (el.JobEvent.phase !== 'offer' && el.SentEmployees.type !== 'not_responded'))
                        .map(el => (
                            <Notification
                                key={el.id}
                                employee={el}
                                navigation={navigation}/>
                        ))}
                    {!employees.length && (
                        <View>
                            <AppText style={{marginVertical: 15, fontSize: 18, textAlign: 'center'}}>
                                Not found
                            </AppText>
                        </View>
                    )}
                </View>
            )}
        </View>
    )
}

Notifications.propTypes = {
    navigation: PropTypes.object
}

export default memo(Notifications);
