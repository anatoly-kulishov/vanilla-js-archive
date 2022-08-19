import React from 'react';
import {View} from "react-native";
import PropTypes from "prop-types";
import {Formik} from 'formik';
import {THEME} from "../../../theme";
import skillsData from "../../../mock/skillsData";
import {AppInput} from "../../../components/ui/AppInput";
import {AppButton} from "../../../components/ui/AppButton";
import {AppSelect} from "../../../components/ui/AppSelect";
import clothingSizeData from "../../../mock/clothingSizeData";
import {AppSelectLink} from "../../../components/ui/AppSelectLink";
import {PhotoPicker} from "../../../components/PhotoPicker";
import {AppCheckBox} from "../../../components/ui/AppCheckBox";

const PersonalInfoForm = props => {
    const {onSubmit, navigation} = props;

    const initialValues = {
        newPassword: '',
        repeatedNewPassword: '',
        idNumber: '',
        bankAccount: '',
        streetAddress: '',
        zipCode: '',
        city: '',
        clothingSize: '',
        skills: '',
        isSelected: false
    }

    return (
        <View>
            <View>
                <View>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={values => onSubmit(values)}>
                        {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
                            <View>
                                <View style={{marginBottom: 35}}>
                                    <AppInput label="Password"
                                              value={values.newPassword}
                                              onBlur={handleBlur('newPassword')}
                                              onChange={handleChange('newPassword')}
                                              secureTextEntry
                                              subText="At least 8 characters, with letters and numbers"
                                              placeholder="Enter new password"/>
                                    <AppInput label="Password"
                                              value={values.repeatedNewPassword}
                                              onBlur={handleBlur('repeatedNewPassword')}
                                              onChange={handleChange('repeatedNewPassword')}
                                              secureTextEntry
                                              placeholder="Enter new password"
                                              marginBottom={0}/>
                                </View>
                                <View>
                                    <AppInput label="ID number"
                                              value={values.idNumber}
                                              onBlur={handleBlur('idNumber')}
                                              onChange={handleChange('idNumber')}
                                              placeholder="e.g. 221100-111X"/>
                                    <AppInput label="Bank account"
                                              value={values.bankAccount}
                                              onBlur={handleBlur('bankAccount')}
                                              onChange={handleChange('bankAccount')}
                                              subText="Some description if needed"
                                              placeholder="Bank account number"/>
                                    <AppInput label="Katuosoite"
                                              value={values.streetAddress}
                                              onBlur={handleBlur('streetAddress')}
                                              onChange={handleChange('streetAddress')}
                                              placeholder="esim Veräjämäenpolku 3"/>
                                    <AppInput label="Postinumero"
                                              value={values.zipCode}
                                              onBlur={handleBlur('zipCode')}
                                              onChange={handleChange('zipCode')}
                                              placeholder="esim 00002"/>
                                    <AppInput label="Kaupunki"
                                              value={values.city}
                                              onBlur={handleBlur('city')}
                                              onChange={handleChange('city')}
                                              placeholder="esim Helsinki"/>
                                </View>
                                <View>
                                    <AppSelect label="Vaatekoko"
                                               data={clothingSizeData}
                                               selectedValue={values.clothingSizeData}
                                               setSelectedValue={handleChange('clothingSizeData')}/>
                                </View>
                                <View>
                                    <AppSelectLink label="Skills"
                                                   data={skillsData}
                                                   selectedValue={values.skills}
                                                   setSelectedValue={handleChange('skills')}
                                                   redirect={() => navigation.navigate("Skills")}
                                                   placeholder="Select"/>
                                </View>
                                <View>
                                    <PhotoPicker label="Profiilikuva"
                                                 data={skillsData}
                                                 selectedValue={handleChange('skills')}
                                                 placeholder="Browse photos"/>
                                </View>
                                <View>
                                    <AppCheckBox label="I agree with something. Okay."
                                                 value={values.isSelected}
                                                 handleChange={nextValue => setFieldValue('isSelected', nextValue)}
                                                 onPressCallback={() => navigation.navigate('Agreement')}
                                                 marginBottom={0}/>
                                </View>
                                <View style={{marginTop: 15, marginBottom: 30}}>
                                    <AppButton onPress={handleSubmit} bgColor={THEME.MAIN_COLOR}>Jatka</AppButton>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </View>
    )
}

PersonalInfoForm.propTypes = {
    navigation: PropTypes.object,
    onSubmit: PropTypes.func
}

export default PersonalInfoForm;
