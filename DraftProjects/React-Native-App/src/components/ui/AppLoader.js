import React from 'react';
import {ActivityIndicator, View, StyleSheet, Platform} from 'react-native';
import {THEME} from "../../theme";

export const AppLoader = () => (
    <View style={styles.center}>
        <ActivityIndicator size={Platform.OS === 'ios' ? "large" : 55} color={THEME.MAIN_COLOR}/>
    </View>
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#fafafa'
    },
});