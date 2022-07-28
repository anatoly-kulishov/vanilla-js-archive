import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {THEME} from "../../theme";
import {AppInput} from "../../components/ui/AppInput";
import {AppText} from "../../components/ui/AppText";
import {AppButton} from "../../components/ui/AppButton";

const PasswordReset = props => {
    const {navigation} = props;
    const [email, setEmail] = useState();
    const [validated, setValidated] = useState(true);

    const submitHandler = () => {
        if (!!email) {
            navigation.navigate('Reseted Successfully')
        } else {
            setValidated(false);
        }
    }

    return (
        <View style={styles.container}>
            <AppInput label="Email"
                      placeholder="Syötä email"
                      value={email}
                      onChange={setEmail}
                      marginBottom={5}
                      inCorrect={validated}/>
            <AppText style={styles.desc}>Kirjoita sähköpostiosoite, johon olet rekisteröitynyt</AppText>
            <View style={{marginVertical: 24}}>
                <AppButton onPress={submitHandler} bgColor={THEME.MAIN_COLOR}>
                    Nollaa salasana
                </AppButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        height: "100%",
        backgroundColor: '#fff'
    },
    desc: {
        paddingHorizontal: 12,
        fontSize: 12,
        color: "#A1A1AA",
    }
})

export default PasswordReset;
