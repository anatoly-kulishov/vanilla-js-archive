import React, {memo} from 'react';
import {useDispatch} from "react-redux";
import {View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {THEME} from "../../../../theme";
import {AppButton} from "../../../../components/ui/AppButton";
import Default from "./Default";
import {acceptOffer, declineOffer} from "../../../../store/actions/offersActions";

const NotResponded = ({data, jobEventId}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onAcceptOffer = () => {
        if(jobEventId) {
            dispatch(acceptOffer(jobEventId))
            navigation.goBack()
        } else {
            console.log('...')
        }
    }

    const onDeclineOffer = () => {
        dispatch(declineOffer(jobEventId))
        navigation.goBack()
    }

    return (
        <>
            <Default data={data}/>
            <View style={{marginBottom: 8}}>
                <AppButton onPress={onAcceptOffer}
                           bgColor={THEME.MAIN_COLOR}>Accept</AppButton>
            </View>
            <View style={{marginBottom: 5}}>
                <AppButton onPress={onDeclineOffer}
                           color={THEME.DANGER_COLOR}
                           bgColor={THEME.DANGER_BG_COLOR}>Decline</AppButton>
            </View>
        </>
    )
}

export default memo(NotResponded);
