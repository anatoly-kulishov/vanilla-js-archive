import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from "prop-types";
import {Formik} from 'formik';
import {AppInput} from "../../../components/ui/AppInput";
import {AppButton} from "../../../components/ui/AppButton";
import {THEME} from "../../../theme";

const LoginForm = props => {
    const {onSubmit, navigation} = props;

    // Todo: Add validation!
    return (
        <View style={styles.form}>
            <Formik
                initialValues={{email: 'e1@gmail.com', password: 'password'}}
                onSubmit={values => onSubmit(values)}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                    <View>
                        <AppInput label="Email"
                                  onBlur={handleBlur('email')}
                                  onChange={handleChange('email')}
                                  value={values.email}
                                  placeholder="Syötä email"/>
                        <AppInput label="Salasana"
                                  value={values.password}
                                  onChange={handleChange('password')}
                                  secureTextEntry
                                  placeholder="Kirjoita salasana"/>
                        <View style={styles.submitButtonWrap}>
                            <View style={{marginBottom: 20}}>
                                <AppButton onPress={handleSubmit} bgColor={THEME.MAIN_COLOR}>
                                    Kirjaudu sisäänS
                                </AppButton>
                            </View>
                            <View>
                                <AppButton onPress={() => navigation.navigate('Password Reset')}
                                           color={THEME.MAIN_COLOR}
                                           bgColor={THEME.SECONDARY_COLOR}>
                                    Onko salasana kateissa?
                                </AppButton>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 50,
    },
    submitButtonWrap: {
        marginTop: 6,
    }
})

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
    navigation: PropTypes.object
}

export default LoginForm;
