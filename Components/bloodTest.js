import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

export default function BloodTest({onSelectBloodType}){
    const [testType, setTestType] = useState(null);
    
    const bloodType = [
        'A+','A-',
        'B+','B-',
        'AB+','AB-',
        'O+','O-'
    ];
    
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Blood Type</Text>
                <Text style={styles.headerText}>Select</Text>
            </View>
            {bloodType.map((test) => (
                <TouchableOpacity
                    key={test}
                    style={styles.tableRow}
                    onPress={() => {
                        setTestType(test);
                        onSelectBloodType(test);

                    }}
                >
                    <Text style={styles.bloodTypeText}>{test}</Text>
                    <View style={[
                        styles.checkbox,
                        testType === test && styles.checkboxSelected
                    ]}>
                        {testType === test && (
                            <Text style={styles.checkmark}>✓</Text>
                        )}
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 2,
        borderBottomColor: '#333',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    bloodTypeText: {
        fontSize: 14,
        flex: 1,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    checkboxSelected: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    checkmark: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});