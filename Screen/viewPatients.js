import { StyleSheet, View, FlatList, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { globalUsername } from '../Screen/loginInScreen';

// Constants
const TEST_TYPES = {
  BLOOD_TEST: 'Blood Test',
  BLOOD_PRESSURE: 'Blood Pressure',
  BLOOD_SUGAR: 'Blood Sugar',
  CHOLESTEROL_TEST: 'Cholesterol Test'
};

export default function ViewPatients({ route, navigation }) {    
    const API_URL = 'http://localhost:3000';
    const [allpatients, setPatientTable] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    
    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPatients(allpatients);
        } else {
            const filtered = allpatients.filter(patient =>
                patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                patient.age?.toString().includes(searchQuery)
            );
            setFilteredPatients(filtered);
        }
    }, [searchQuery, allpatients]);

    const renderImages = useCallback((patient) => {
        const hasBloodPressure = patient.test?.some(test => 
            test.testType === TEST_TYPES.BLOOD_PRESSURE
        );
        const hasBloodSugar = patient.test?.some(test => 
            test.testType === TEST_TYPES.BLOOD_SUGAR
        );

        return (
            <View style={styles.imagesRow}>
                {hasBloodPressure && (
                    <Image 
                        source={require('../assets/bloodpressure.png')} 
                        style={styles.iconImage} 
                    />
                )}
                {hasBloodSugar && (
                    <Image 
                        source={require('../assets/bloodsugar.png')} 
                        style={styles.iconImage} 
                    />
                )}
            </View>
        );
    }, []);

    const renderPatientRow = useCallback(({ item, index }) => (
        <TouchableOpacity 
            style={[
                styles.row,
                index % 2 === 0 ? styles.evenRow : styles.oddRow
            ]}
            onPress={() => {
                console.log('Patient clicked:', item);
                navigation.navigate('viewPatientsDetails', { patient: item });
            }}
        >
            <View style={[styles.cell, styles.nameColumn]}>
                <Text style={styles.cellText} numberOfLines={1}>
                    {item.name}
                </Text>
            </View>
            <View style={[styles.cell, styles.ageColumn]}>
                <Text style={styles.cellText}>
                    {item.age}
                </Text>
            </View>
            <View style={[styles.cell, styles.departmentColumn]}>
                <Text style={styles.cellText} numberOfLines={1}>
                    {item.department}
                </Text>
            </View>
            <View style={[styles.cell, styles.iconsColumn]}>
                {renderImages(item)}
            </View>
        </TouchableOpacity>
    ), [navigation, renderImages]);


    const Header = () => (
        <View style={styles.horizontal}>
            <View style={styles.usernameStyle}>
                <Text style={styles.boldLargeText}>Welcome</Text>
                <Text style={styles.boldLargeText}>Dr. {globalUsername}</Text>
                <Text style={styles.boldText}>Prince of Wales Hospital</Text>
            </View>
            <Image 
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
        </View>
    );

    // Search bar component
    const SearchBar = () => (
        <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
                <Image 
                    source={require('../assets/search-icon.png')}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search patients"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    clearButtonMode="while-editing"
                />
            </View>
            {searchQuery.length > 0 && (
                <Text style={styles.searchResultsText}>
                    {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''} found
                </Text>
            )}
        </View>
    );

    // Table header component
    const TableHeader = () => (
        <View style={[styles.row, styles.header]}>
            <Text style={[styles.headerCell, styles.nameColumn]}>Patient Name</Text>
            <Text style={[styles.headerCell, styles.ageColumn]}>Age</Text>
            <Text style={[styles.headerCell, styles.departmentColumn]}>Department</Text>
            <Text style={[styles.headerCell, styles.iconsColumn]}>Status</Text>
        </View>
    );

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

    return (
        <View style={styles.container}>
            <Header />
            
            <SearchBar />
            
            <View style={styles.tableContainer}>
                <TableHeader />
                <FlatList
                    data={filteredPatients}
                    renderItem={renderPatientRow}
                    keyExtractor={(item, index) => 
                        item.id ? item.id.toString() : `patient-${index}`
                    }
                    showsVerticalScrollIndicator={false}
                    style={styles.flatList}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                {searchQuery ? 'No patients found matching your search' : 'No patients available'}
                            </Text>
                        </View>
                    }
                /> 
            </View>

            <TouchableOpacity 
                style={styles.addPatientButton}
                onPress={() => navigation.navigate('addPatients')}
            >
                <Text style={styles.addPatientButtonText}>+ Add New Patient</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    usernameStyle: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: 50,
        paddingLeft: 8,
    },
    boldLargeText: {
        fontWeight: '800',
        fontSize: 32,
        padding: 4,
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    boldText: {
        fontWeight: '700',
        fontSize: 20,
        padding: 4,
        color: '#4a5568',
        letterSpacing: -0.3,
    },
    // Search bar styles
    searchContainer: {
        marginHorizontal: 8,
        marginTop: 16,
        marginBottom: 8,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
        tintColor: '#64748b',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1e293b',
        padding: 0,
    },
    clearButton: {
        padding: 4,
        marginLeft: 8,
    },
    clearButtonText: {
        fontSize: 18,
        color: '#64748b',
        fontWeight: 'bold',
    },
    searchResultsText: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 8,
        marginLeft: 4,
        fontStyle: 'italic',
    },
    tableContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        overflow: 'hidden',
        marginTop: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    row: { 
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderBottomColor: '#e2e8f0', 
        minHeight: 60, 
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#f8fafc',
        borderBottomWidth: 2,
        borderBottomColor: '#e2e8f0',
        minHeight: 56,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    evenRow: { 
        backgroundColor: '#ffffff' 
    },
    oddRow: { 
        backgroundColor: '#f8fafc' 
    },
    nameColumn: {
        flex: 1.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ageColumn: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    departmentColumn: {
        flex: 1.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconsColumn: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: {
        paddingHorizontal: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCell: {
        color: '#1e293b',
        fontWeight: '700',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center',
        letterSpacing: 0.2,
    },
    cellText: {
        fontSize: 15,
        color: '#374151',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '500',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'flex-start',
    },
    logo: {
        width: 50, 
        height: 50, 
        marginBottom: 20, 
        marginTop: 40
    },
    addPatientButton: {
        backgroundColor: '#007AFF',
        marginHorizontal: 8,
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#0066cc',
    },
    addPatientButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    imagesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        paddingHorizontal: 8,
    },
    iconImage: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});