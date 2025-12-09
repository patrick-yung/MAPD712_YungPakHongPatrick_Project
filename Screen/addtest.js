import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import BloodTest from '../Components/bloodTest'
import BloodPressureTest from '../Components/bloodPressureTest';
import BloodSugarTest from '../Components/bloodSugarTest';

export default function AddTests({ route, navigation }) {
    const { patient } = route.params;
    const [testType, setTestType] = useState('');
    const [testResult, setTestResult] = useState('');
    const API_URL = 'http://localhost:3000';

    const testTypes = [
        'Blood Test',
        'Blood Pressure',
        'Blood Sugar',
        'Cholesterol Test'
    ];

    const addTest = async () => {
        try {
            // Get current date and time
            const now = new Date();
            
            const newTest = {
                testType: testType,
                testResult: testResult,
                testDate: now.toISOString() // ISO format timestamp
            };

            // Send the test data correctly
            const response = await fetch(`${API_URL}/patients/${patient._id}/test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tests: newTest  // Send test in 'tests' field
                }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const updatedPatient = await response.json();
            navigation.navigate('viewPatients');
            console.log('Patient Test added:', updatedPatient);
        } catch (error) {
            console.error('Error adding test:', error);
            // You might want to show an error message to the user here
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add New Test</Text>
                <Text style={styles.headerSubtitle}>Select test type and enter results</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Test Type</Text>
                    <Text style={styles.subLabel}>Select one test type:</Text>
                    
                    <ScrollView style={styles.checkboxContainer} showsVerticalScrollIndicator={false}>
                        {testTypes.map((test) => (
                            <TouchableOpacity
                                key={test}
                                style={styles.checkboxItem}
                                onPress={() => setTestType(test)}
                            >
                                <View style={[
                                    styles.checkbox,
                                    testType === test && styles.checkboxSelected
                                ]}>
                                    {testType === test && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </View>
                                <Text style={styles.checkboxLabel}>{test}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.componentContainer}>
                    {testType === 'Blood Test' && <BloodTest onSelectBloodType={(result) => setTestResult(result)} />}
                    {testType == 'Blood Pressure' && <BloodPressureTest onBloodPressure ={(result) => setTestResult(result)}></BloodPressureTest>}
                    {testType == 'Blood Sugar' && <BloodSugarTest onSugarLevel = {(result) => setTestResult(result)}> </BloodSugarTest>}
                </View>
            </View>
                
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.navigate('viewPatients')}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={addTest}
                >
                    <Text style={styles.addButtonText}>Add Test</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        marginBottom: 30,
        paddingTop: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    subLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    checkboxContainer: {
        maxHeight: 200,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    checkboxSelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    checkmark: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    componentContainer: {
        minHeight: 300,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        overflow: 'hidden',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6c757d',
    },
    cancelButtonText: {
        color: '#6c757d',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});