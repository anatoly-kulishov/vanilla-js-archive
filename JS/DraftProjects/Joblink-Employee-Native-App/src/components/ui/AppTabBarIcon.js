import React from 'react';
import {Platform} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export const AppTabBarIcon = props => (
    <Ionicons size={Platform.OS === 'android' ? 21 : 25} style={{marginBottom: -5}} {...props} />
);

