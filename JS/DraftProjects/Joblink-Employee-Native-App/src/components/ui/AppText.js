import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {THEME} from "../../theme";

export const AppText = props => {
    const {style, children, onPressCallback} = props;
    return <Text onPress={onPressCallback} style={{...styles.default, ...style}}>{children}</Text>
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Inter-Regular',
        color: THEME.TEXT_MAIN_COLOR
    },
});
