import { StyleSheet, View , FlatList, Image, Text, TouchableOpacity} from 'react-native';
import { use, useEffect , useState,} from 'react';
import { globalUsername } from '../Screen/loginInScreen';

export default function viewPatients({route, navigation}) {    
    const API_URL = 'http://localhost:3000';

    const [ allpatients, setPatientTable] = useState([]);
    
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch(`${API_URL}/patients`);
            const result = await response.json();

            if (response.ok || result.success) {
                setPatientTable(result || []);
                console.log('Patients fetched successfully:', result);
            } else {
                console.error('Failed to fetch patients:', result.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };


    //Need to add test and make patient cliable
    return (
        <View style={styles.container}>
            <View style = { styles.horizontal}>
                <View style={styles.usernameStyle}>
                    <Text style = {styles.boldLargeText} >Welcome</Text>
                    <Text style = {styles.boldLargeText} >Dr. {globalUsername}</Text>
                    <Text style = {styles.boldText} >Prince of Whales Hospital</Text>
                </View>
                <Image source ={require('../assets/logo.png')}
                       style={{width: 50, height: 50, marginBottom: 20, marginTop:40}} />
                     
            </View>
            <View style={styles.tableContainer}>
                <View style = {[styles.row, styles.header]}>
                    <Text style={[styles.boldText, styles.headerCell, styles.column]}>Patient Name</Text>
                    <Text style={[styles.boldText, styles.headerCell, styles.column]}>Age</Text>
                    <Text style={[styles.boldText, styles.headerCell, styles.column]}>Department</Text>
                </View>
                <FlatList
                    data={allpatients}
                    renderItem={
                        ({ item, index }) => (
                             <TouchableOpacity 
                            style={[
                                styles.row,
                                index % 2 === 0 ? styles.evenRow : styles.oddRow
                            ]}
                            onPress={() => {
                                console.log('Patient clicked:', item);
                                navigation.navigate('viewPatientsDetails', {patient: item});
                            }}
                        >
                            <Text style={[styles.cell, styles.column, styles.cellText]}>{item.name}</Text>
                            <Text style={[styles.cell, styles.column, styles.cellText]}>{item.age}</Text>
                            <Text style={[styles.cell, styles.column, styles.cellText]}>{item.deparment}</Text>
                        </TouchableOpacity>)
                    }
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                /> 
            </View>

            {/* Improved Add Patient Button */}
            <TouchableOpacity 
                style={styles.addPatientButton}
                onPress={() => {
                    navigation.navigate('addPatients');
                }}
            >
                <Text style={styles.addPatientButtonText}>+ Add New Patient</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    usernameStyle: {
        alignSelf: 'flex-start',
        justifyContent: 'leading',
        paddingTop: 30,
        
    },
    boldLargeText: {
        fontWeight: 'bold',
        fontSize: 30,
        padding: 5
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 23,
        padding: 5
    },
    tableContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 20, // Added margin to separate from button
    },
    row: { 
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderBottomColor: '#dee2e6', 
        minHeight: 50, 
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 2,
        borderBottomColor: '#dee2e6',
    },
    evenRow: { 
        backgroundColor: '#ffffff' 
    },
    oddRow: { 
        backgroundColor: '#f8f9fa' 
    },
    column: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        justifyContent: 'center',  
    },
    headerCell: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    cellText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        borderColor: 'lightgray',
        justifyContent: 'space-between',
        padding: 30,
    },
    // Improved Add Patient Button Styles
    addPatientButton: {
        backgroundColor: '#007AFF',
        marginHorizontal: 20,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    addPatientButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});