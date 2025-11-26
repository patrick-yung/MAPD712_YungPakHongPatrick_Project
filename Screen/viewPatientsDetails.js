import { StyleSheet, View, FlatList, Image, Text, ScrollView, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';



export default function ViewPatientsDetails({ route, navigation }) {
    const { patient } = route.params;
    const testTypes = [
        'Blood Test',
        'Blood Pressure',
        'Blood Sugar',
        'Cholesterol Test'
    ];
            const API_URL = 'http://localhost:3000';


    const deletePatient = async(patient) => {

        if(!patient.name){
            console.error('Patient Name is not provided')
            return;
        }
        try {
            const response = await fetch(`${API_URL}/patients/${patient.name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient),
            });
            navigation.navigate('viewPatients');


        } catch(error){
            console.error('Error delete patient:', error);
        }


    }

    const handleDeletePatient = () => {
        Alert.alert(
            "Delete Patient",
            `Are you sure you want to delete ${patient.name}? This action cannot be undone.`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        console.log('Deleting patient:', patient.name);
                         deletePatient(patient);
                        navigation.navigate('viewPatients');
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.patientCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Patient Information</Text>
                    <TouchableOpacity 
                        style={styles.deleteButton}
                        onPress={handleDeletePatient}
                    >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{patient.name}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Age:</Text>
                    <Text style={styles.value}>{patient.age}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Department:</Text>
                    <Text style={styles.value}>{patient.deparment}</Text>
                </View>
            </View>

            <View style={styles.testsSection}>
                <Text style={styles.sectionTitle}>Test Results</Text>
                <FlatList
                    data={patient.test || []}
                    renderItem={({ item, index }) => (
                        <View style={styles.testItem}>
                            <Text style={styles.testType}>{item.testType || `Test ${index + 1}`}</Text>
                            <Text style={styles.testResult}>{item.testResult || 'No result available'}</Text>
                            {item.date && <Text style={styles.testDate}>Date: {item.date}</Text>}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>No tests available</Text>
                        </View>
                    }
                />  
            </View>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                        navigation.navigate('viewPatients');
                    }}
                >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => {
                        navigation.navigate('addTest', {patient: patient});
                    }}
                >
                    <Text style={styles.editButtonText}>Add Patient Test</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#f8f9fa',
    },
    patientCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#007AFF',
        paddingBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#6c757d',
    },
    cancelButtonText: {
        color: '#6c757d',
        fontSize: 18,
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flex: 1,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    testsSection: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: '#007AFF',
        paddingBottom: 8,
    },
    testItem: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
    },
    testType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    testResult: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    testDate: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
});