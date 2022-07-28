import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Picker
} from 'react-native';
import {THEME} from "../../theme";
import {AppText} from "./AppText";

export const AppSelect = props => {
    const {label, data = [], selectedValue, setSelectedValue, marginBottom = 24, color = THEME.INPUT_MAIN_COLOR, inCorrect = true} = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const correctBorderColor = inCorrect ? THEME.BORDER_MAIN_COLOR : THEME.DANGER_COLOR;
    const correctTextColor = inCorrect ? THEME.TEXT_MAIN_COLOR : THEME.DANGER_COLOR;

    return (
        <Wrapper activeOpacity={0.7}>
            <View style={{marginBottom}}>
                <AppText style={{...styles.label, color: correctTextColor}}>{label}</AppText>
                <View style={{...styles.picker, backgroundColor: color, borderColor: correctBorderColor}}>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                        {data.map(el => (
                            <Picker.Item key={el.id} label={el.label} value={el.value}/>
                        ))}
                    </Picker>
                </View>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        marginLeft: 4,
        marginBottom: 5
    },
    picker: {
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#fafafa',
        borderColor: THEME.BORDER_MAIN_COLOR
    }
});
