import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import PropTypes from "prop-types";
import PersonalInfoEditForm from "./PersonalInfoEditForm";

const PersonalInfoEdit = props => {
    const {navigation, profile} = props;
    const onSubmitHandler = (values) => console.log(values);

    return (
        <ScrollView style={styles.container}>
            <PersonalInfoEditForm
                data={profile}
                onSubmit={onSubmitHandler}
                navigation={navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    }
})

PersonalInfoEdit.propTypes = {
    navigation: PropTypes.object,
    profile: PropTypes.object
}

export default PersonalInfoEdit;
