import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

export default function BloodPressureTest({ onBloodPressure }){
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    
    const handleDiastolicChange = (value) => {
        if (value === '') {
            onBloodPressure(`${systolic}/${value}`);
            setDiastolic(value);
            return;
        }
        
        
        const systolicNum = systolic === '' ? -Infinity : parseInt(systolic);
        
        if ((systolic === '' || parseInt(value) < systolicNum)  && !(!/^\d+$/.test(value))) {
            onBloodPressure(`${systolic}/${value}`);
            setDiastolic(value);
        }
    };

    const handleSystolicChange = (value) => {

        
        if (value === '') {
            onBloodPressure(`${value}/${diastolic}`);
            setSystolic(value);
            return;
        }
        if (value > 300){
            return
        }
                
        const diastolicNum = diastolic === '' ? Infinity : parseInt(diastolic);
        
        if ((diastolic === '' || parseInt(value) < diastolicNum) && !(!/^\d+$/.test(value))) {
            onBloodPressure(`${value}/${diastolic}`);
            setSystolic(value);
        }
    };
    
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Blood Pressure Test</Text>
                <Text style={styles.subHeaderText}>Enter systolic and diastolic readings</Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Systolic (mmHg)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="120"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={systolic}
                        onChangeText={handleSystolicChange}
                    />
                </View>

                <View style={styles.slashContainer}>
                    <Text style={styles.slash}>/</Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Diastolic (mmHg)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="80"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                        value={diastolic}
                        onChangeText={handleDiastolicChange}
                    />
                </View>
            </View>

            <View style={styles.readingContainer}>
                <Text style={styles.readingLabel}>Current Reading:</Text>
                <Text style={styles.readingValue}>
                    {systolic || '--'} / {diastolic || '--'} mmHg
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f9fa',
    },
    header: {
        marginBottom: 25,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
    subHeaderText: {
        fontSize: 14,
        color: '#666',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 25,
        gap: 10,
    },
    inputGroup: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    slashContainer: {
        paddingBottom: 10,
        marginBottom: 5,
    },
    slash: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    readingContainer: {
        backgroundColor: '#e8f5e9',
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
        alignItems: 'center',
    },
    readingLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    readingValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2e7d32',
    },
});