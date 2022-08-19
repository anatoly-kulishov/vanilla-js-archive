import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from "prop-types";
import {Formik} from 'formik';
import {THEME} from "../../../theme";
import clothingSizeData from "../../../mock/clothingSizeData";
import {AppText} from "../../../components/ui/AppText";
import {AppInput} from "../../../components/ui/AppInput";
import {AppButton} from "../../../components/ui/AppButton";
import {AppSelect} from "../../../components/ui/AppSelect";
import {PhotoPicker} from "../../../components/PhotoPicker";

const PersonalInfoEditForm = props => {
    const {onSubmit, data, navigation} = props;

    const initialValues = {
        name: data?.firstName,
        surname: data?.lastName,
        phone: data?.phone,
        email: data?.email,
        idNumber: data?.idNumber,
        bankAccount: data?.bankAccount,
        address: data?.address_Street,
        zipCode: data?.address_ZipCode,
        city: data?.address_City,
        clothingSize: data?.clothingSize
    }

    return (
        <View>
            <View style={styles.head}>
                <PhotoPicker currentImageUrl={data?.photoUrl} active={true}/>
            </View>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    onSubmit(values);
                    navigation.goBack();
                }}>
                {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
                    <View>
                        <View style={{marginBottom: 32}}>
                            <AppInput label="Name"
                                      value={values.name}
                                      onBlur={handleBlur('name')}
                                      onChange={handleChange('name')}
                                      placeholder="Name"/>
                            <AppInput label="Surname"
                                      value={values.surname}
                                      onBlur={handleBlur('surname')}
                                      onChange={handleChange('surname')}
                                      placeholder="Surname"/>
                            <AppInput label="Phone"
                                      value={values.phone}
                                      onBlur={handleBlur('phone')}
                                      onChange={handleChange('phone')}
                                      placeholder="Phone"/>
                            <AppInput label="Email"
                                      value={values.email}
                                      onBlur={handleBlur('email')}
                                      onChange={handleChange('email')}
                                      placeholder="Email"/>
                            <View style={{marginBottom: 24}}>
                                <AppText style={styles.label}>Password</AppText>
                                <AppButton bgColor={THEME.SECONDARY_COLOR} color={THEME.MAIN_COLOR}>
                                    Send reset link to email
                                </AppButton>
                            </View>
                            <AppInput label="ID number"
                                      value={values.idNumber}
                                      onBlur={handleBlur('idNumber')}
                                      onChange={handleChange('idNumber')}
                                      placeholder="ID number"
                                      subText="Some description if needed"
                                      marginBottom={16}/>
                            <AppInput label="Bank account"
                                      value={values.bankAccount}
                                      onBlur={handleBlur('bankAccount')}
                                      onChange={handleChange('bankAccount')}
                                      placeholder="Bank account number"
                                      subText="Some description if needed"
                                      marginBottom={16}/>
                            <AppInput label="Address"
                                      value={values.address}
                                      onBlur={handleBlur('address')}
                                      onChange={handleChange('address')}
                                      placeholder="Address"/>
                            <AppInput label="Zip code"
                                      value={values.zipCode}
                                      onBlur={handleBlur('zipCode')}
                                      onChange={handleChange('zipCode')}
                                      placeholder="Zip code"/>
                            <AppInput label="City"
                                      value={values.city}
                                      onBlur={handleBlur('city')}
                                      onChange={handleChange('city')}
                                      placeholder="City"/>
                            <View>
                                <AppSelect label="Clothing size"
                                           data={clothingSizeData}
                                           selectedValue={values.clothingSize}
                                           setSelectedValue={handleChange('clothingSize')}
                                           marginBottom={0}/>
                            </View>
                        </View>
                        <View style={{marginBottom: 30}}>
                            <AppButton onPress={handleSubmit} bgColor={THEME.MAIN_COLOR}>Save</AppButton>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    head: {
        paddingVertical: 15,
    },
    imgBox: {
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginHorizontal: 'auto',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: THEME.BORDER_MAIN_COLOR,
        borderRadius: 50,
    },
    label: {
        fontSize: 15,
        marginLeft: 4,
        marginBottom: 6
    }
})

PersonalInfoEditForm.propTypes = {
    navigation: PropTypes.object,
    onSubmit: PropTypes.func,
    data: PropTypes.object
}

export default PersonalInfoEditForm;
