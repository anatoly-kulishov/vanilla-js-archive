import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from "prop-types";
import SelectMultiple from '@horizonlime/react-native-select-multiple';
import {SelectMultipleStyles} from "../../styles";
import skillsData from "../../mock/skillsData";
import {THEME} from "../../theme";
import {AppButton} from "../../components/ui/AppButton";

const Skills = props => {
    const {navigation} = props;
    const [selectedSkills, setSelectedSkills] = useState([]);

    useEffect(() => console.log(selectedSkills), [selectedSkills]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <SelectMultiple
                    items={skillsData}
                    selectedItems={selectedSkills}
                    onSelectionsChange={setSelectedSkills}
                    style={styles.FlatList}
                    rowStyle={styles.rowStyle}
                    labelStyle={styles.labelStyle}
                />
                <View style={{marginTop: 15}}>
                    <AppButton onPress={navigation.goBack} bgColor={THEME.MAIN_COLOR}>Save</AppButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(SelectMultipleStyles);

Skills.propTypes = {
    navigation: PropTypes.object
}

export default Skills;
