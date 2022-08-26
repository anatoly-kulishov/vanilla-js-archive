import React, {createRef} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    TextInput,
} from 'react-native';
import SvgUri from "expo-svg-uri";
import {THEME} from "../../theme";
import {AppText} from "./AppText";

export const AppInput = props => {
    const {
        label,
        placeholder,
        value,
        secureTextEntry,
        onChange,
        autoFocus,
        marginBottom = 24,
        inCorrect = true,
        color = THEME.INPUT_MAIN_COLOR,
        subText = null,
        multiline = false,
        style,
        onBlur,
    } = props;
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    const correctBorderColor = inCorrect ? THEME.BORDER_MAIN_COLOR : THEME.DANGER_COLOR;
    const correctTextColor = inCorrect ? THEME.TEXT_MAIN_COLOR : THEME.DANGER_COLOR;
    const inputRef = createRef();
    const showing = true;

    const onFocusInput = () => inputRef.current.focus();

    const defaultInput = (
        <TextInput style={{...styles.input, backgroundColor: color, borderColor: correctBorderColor, ...style}}
                   placeholder={placeholder}
                   placeholderTextColor={THEME.PLACEHOLDER_COLOR}
                   autoFocus={autoFocus}
                   value={value}
                   multiline={multiline}
                   onBlur={onBlur}
                   onChangeText={onChange}
                   ref={inputRef}/>
    )

    const passwordInput = (
        <View style={{...styles.input, backgroundColor: color, borderColor: correctBorderColor}}>
            <TextInput placeholder={placeholder}
                       placeholderTextColor={THEME.PLACEHOLDER_COLOR}
                       value={value}
                       autoFocus={autoFocus}
                       secureTextEntry={true}
                       onChangeText={onChange}
                       ref={inputRef}/>
            <TouchableNativeFeedback onPress={() => (showing ? this.hide() : this.show())}>
                <SvgUri style={styles.showIcon} source={require("../../images/view_show.svg")}/>
            </TouchableNativeFeedback>
        </View>
    )

    return (
        <Wrapper onPress={onFocusInput} activeOpacity={0.7}>
            <View style={{marginBottom}}>
                {label && <AppText style={{...styles.label, color: correctTextColor}}>{label}</AppText>}
                {secureTextEntry ? passwordInput : defaultInput}
                {subText && <AppText style={styles.desc}>{subText}</AppText>}
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    showIcon: {
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        right: 12,
        width: 24,
        height: 24,
    },
    input: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 4,
    },
    label: {
        fontSize: 15,
        marginLeft: 4,
        marginBottom: 5
    },
    desc: {
        marginTop: 2,
        marginHorizontal: 12,
        fontSize: 12,
        color: "#A1A1AA"
    }
});
