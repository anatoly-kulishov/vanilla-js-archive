import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SelectMultiple from '@horizonlime/react-native-select-multiple';
import {SelectMultipleStyles} from "../../styles";
import certificatesData from "../../mock/certificatesData";

const Certificates = () => {
    const [selectedCertificates, setSelectedCertificates] = useState([]);
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <SelectMultiple
                    items={certificatesData}
                    selectedItems={selectedCertificates}
                    onSelectionsChange={setSelectedCertificates}
                    style={styles.FlatList}
                    rowStyle={styles.rowStyle}
                    labelStyle={styles.labelStyle}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create(SelectMultipleStyles);

export default memo(Certificates);
