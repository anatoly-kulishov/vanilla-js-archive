import React, {memo} from 'react';
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, View} from 'react-native';
import {useDispatch} from "react-redux";
import {Formik} from 'formik';
import {THEME} from "../../../../theme";
import {JobStyles} from "../../../../styles";
import {AppText} from "../../../../components/ui/AppText";
import {AppButton} from "../../../../components/ui/AppButton";
import {AppTextarea} from "../../../../components/ui/AppTextarea";
import Default from "./Default";
import {submitJobLog} from "../../../../store/actions/offersActions";

const JobLog = ({data}) => {
    const offer = data;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <>
            <Default data={data}/>
            <Formik
                initialValues={{
                    jobEventId: offer.JobEventId,
                    comment: '',
                    rating: '',
                    start: offer?.JobEvent.start,
                    end: offer?.JobEvent.end,
                    lunchBreak: 30
                }}
                onSubmit={values => {
                    dispatch(submitJobLog(values))
                    navigation.goBack()
                }}>
                {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
                    <>
                        <View style={styles.section}>
                            <AppText style={styles.subTitle}>You rated jobLocationName as</AppText>
                            <View style={styles.box}>
                                <View style={styles.row}>
                                    <AppButton onPress={() => setFieldValue('rating', "good")}
                                               style={{minWidth: "47%", marginRight: "6%"}}
                                               bgColor={THEME.SECONDARY_COLOR}
                                               color={THEME.MAIN_COLOR}>Good</AppButton>
                                    <AppButton onPress={() => setFieldValue('rating', 'bad')}
                                               style={{minWidth: "47%"}}
                                               bgColor={THEME.DANGER_BG_COLOR}
                                               color={THEME.DANGER_COLOR}>Bad</AppButton>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <AppTextarea label="Your comment"
                                         placeholder="Free text placeholder here..."
                                         value={values.comment}
                                         onChange={handleChange('comment')}
                                         onBlur={handleBlur('comment')}
                                         marginBottom={5}
                            />
                        </View>
                        <View style={{marginBottom: 10}}>
                            <AppButton onPress={handleSubmit}
                                       style={{minHeight: 52}}
                                       bgColor={THEME.MAIN_COLOR}>Send</AppButton>
                        </View>
                    </>
                )}
            </Formik>
        </>
    )
}

const styles = StyleSheet.create(JobStyles);

export default memo(JobLog);
