import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import PropTypes from "prop-types";
import {THEME} from "../../theme";
import {AppTextBold} from "../../components/ui/AppTextBold";
import {AppText} from "../../components/ui/AppText";
import {AppButton} from "../../components/ui/AppButton";

const Agreement = props => {
    const {navigation} = props;

    return (
        <ScrollView style={styles.container}>
            <View style={{marginBottom: 35}}>
                <AppTextBold style={styles.title}>
                    Heading
                </AppTextBold>
                <AppText style={styles.desc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis arcu porta sit etiam. Nisl, nisl
                    augue laoreet pretium viverra gravida gravida habitasse consectetur. Sit tincidunt molestie maecenas
                    vel
                    euismod. At lorem diam augue sit vestibulum duis velit. Quisque gravida suscipit lorem feugiat
                    mattis
                    fermentum. Amet, vitae metus, aliquam pellentesque neque tincidunt lectus et. Metus, consequat in
                    duis
                    feugiat. Id laoreet elementum pulvinar mollis id ut at ipsum euismod. Diam mattis et, eu amet.
                    Praesent
                    pellentesque ut ac sit. Sollicitudin donec dis viverra aliquam feugiat sapien turpis. Enim suscipit
                    fames commodo sed. Quam velit dolor cursus eleifend quam risus aliquet.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis arcu porta sit etiam. Nisl, nisl
                    augue
                    laoreet pretium viverra gravida gravida habitasse consectetur. Sit tincidunt molestie maecenas vel
                    euismod. At lorem diam augue sit vestibulum duis velit.
                </AppText>
                <AppButton onPress={() => navigation.navigate('Profile')} bgColor={THEME.MAIN_COLOR}>
                    Valmis
                </AppButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        height: '100%',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 5
    },
    desc: {
        marginBottom: 15,
        fontSize: 16,
        lineHeight: 24
    }
});

Agreement.propTypes = {
    navigation: PropTypes.object
}

export default Agreement;

