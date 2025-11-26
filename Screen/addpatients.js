import { StyleSheet, View, FlatList, Image, Text, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

export default function AddPatients({ route, navigation }) {

    const [names, setNames] = useState([]);
    const [age, setAge] = useState([]);
    const [deparment, setDepartment] = useState([]);

    const [oldpatient, setOldPatient] = useState({
        name: '',
        age: '',
        department: '',
        tests: []
    });
    const API_URL = 'http://localhost:3000';

    const addPatient = async (patient) => {
        if (!patient.name || !patient.age || !patient.deparment) {
            console.error('Patient must have a name, age and department');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/patients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient),
            });
            const newPatient = await response.json();
            setOldPatient(patient.name, patient.age, patient.deparment);
            navigation.navigate('viewPatients');

            console.log('Patient added:', newPatient);
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    }



    return (// JSX Object
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Add New Patient</Text>
                <Text style={styles.headerSubtitle}>Enter patient information below</Text>
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => {
                            setNames(value);
                        }
                        }
                        value={names}
                        placeholder="Enter patient name"
                        placeholderTextColor="#999"
                    />
                </View>
                

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => {
                            setAge(value);
                        }
                        }
                        value={age}
                        placeholder="Enter patient age"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Department</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => {
                            setDepartment(value);
                        }
                        }
                        value={deparment}
                        placeholder="Enter department"
                        placeholderTextColor="#999"
                    />
                </View>
            </View>
            
            {/* Buttons fixed to bottom */}
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
                    style={styles.addButton}
                    onPress={() => {
                        addPatient({ name: names, age: age, deparment: deparment });
                    }}
                >
                    <Text style={styles.addButtonText}>Add Patient</Text>
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
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    // Bottom button container
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
    usernameStyle: {
        alignSelf: 'flex-start',
        justifyContent: 'center',
        padding: 10,
    },
    boldLargeText: {
        fontWeight: 'bold',
        fontSize: 30,
        padding: 5
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 14,
        padding: 5
    },
});