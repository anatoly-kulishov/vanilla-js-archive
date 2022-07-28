import React from 'react';
import {StyleSheet, View, TextInput,} from 'react-native';
import {THEME} from "../../theme";
import {AppText} from "./AppText";

export const AppTextarea = props => {
    const {label, placeholder, value, onChange, marginBottom = 24, style = {}} = props;
    return (
        <View>
            {label && <AppText style={{...styles.subTitle, marginBottom: 10}}>{label}</AppText>}
            <View style={{...styles.textAreaContainer, marginBottom: marginBottom}}>
                <TextInput
                    style={{...styles.textArea, ...style}}
                    placeholder={placeholder}
                    placeholderTextColor={THEME.PLACEHOLDER_COLOR}
                    numberOfLines={10}
                    multiline={true}
                    value={value}
                    onChangeText={onChange}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textAreaContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: THEME.BORDER_MAIN_COLOR
    },
    textArea: {
        height: 150,
        textAlignVertical: "top"
    }
})