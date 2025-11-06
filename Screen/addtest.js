import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function AddTests({ route, navigation }) {
    const { patient } = route.params;
    const [testType, setTestType] = useState('');
    const [testResult, setTestResult] = useState('');
    const API_URL = 'http://localhost:3000';

    const addTest = async () => {
        try {
            const newTest = {
                testType: testType,
                testResult: testResult,
            };

            const updatedPatient = {
                name: patient.name,
                age: patient.age,
                department: patient.department,
                tests: newTest
            };

            const response = await fetch(`${API_URL}/patients/${patient._id}/test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPatient),
            });
            
            const newPatient = await response.json();
            navigation.navigate('viewPatients');
            console.log('Patient Test added:', newPatient);
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add New Test</Text>
                <Text style={styles.headerSubtitle}>Enter test information below</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Test Type</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTestType}
                        value={testType}
                        placeholder="e.g., Blood Test, X-Ray, MRI"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Test Result</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        onChangeText={setTestResult}
                        value={testResult}
                        placeholder="Enter test results"
                        placeholderTextColor="#999"
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
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
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
        minHeight: 50,
    },
    textArea: {
        minHeight: 100,
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