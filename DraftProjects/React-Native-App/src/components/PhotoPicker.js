import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import SvgUri from "expo-svg-uri";
import PropTypes from 'prop-types';
import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";
import {AppText} from "./ui/AppText";

export const PhotoPicker = props => {
    const {label, onPick, active, currentImageUrl, placeholder = ""} = props;
    const [image, setImage] = useState("");

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            onPick(result.uri)
        }
    };

    const resetImage = async () => {
        setImage(null)
    }

    return (
        <View style={styles.default}>
            {label && <AppText style={{...styles.label}}>{label}</AppText>}
            <View style={styles.imgBox}>
                {active ? (<Image source={{uri: currentImageUrl}} style={styles.image}/>) : (
                    <View>
                        {image ? (<Image source={{uri: image}} style={styles.image}/>) : (
                            <SvgUri style={styles.image} source={require("../images/user-business.svg")}/>
                        )}
                    </View>
                )}
            </View>
            {image || active ? (
                <View style={styles.buttonsBox}>
                    <AppButton style={{width: 140, marginRight: 15}}
                               onPress={pickImage}
                               color={THEME.MAIN_COLOR}
                               bgColor={THEME.SECONDARY_COLOR}>Change photo</AppButton>
                    <AppButton
                        style={{width: 140}}
                        onPress={resetImage}
                        color={THEME.DANGER_COLOR}
                        bgColor={THEME.DANGER_BG_COLOR}>Delete</AppButton>
                </View>) : (
                <AppButton onPress={pickImage} bgColor={THEME.INPUT_MAIN_COLOR} color="#71717A">
                    {placeholder}
                </AppButton>
            )}
        </View>
    )
}

PhotoPicker.propTypes = {
    label: PropTypes.string,
    onPick: PropTypes.string,
    active: PropTypes.bool
}

const styles = StyleSheet.create({
    default: {
        marginBottom: 15,
    },
    imgBox: {
        marginTop: 15,
        alignItems: 'center',
    },
    label: {
        fontSize: 15,
        marginLeft: 4,
        marginBottom: 5,
        color: THEME.TEXT_MAIN_COLOR,
    },
    image: {
        width: 100,
        height: 100,
        marginHorizontal: 'auto',
        marginBottom: 15,

        borderRadius: 50,
    },
    buttonsBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
