import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'

export default function BloodSugarTest({ onSugarLevel }) {
    const [selectedValue, setSelectedValue] = useState(80); 
    
    const numbers = Array.from({ length: 251 }, (_, i) => i + 50);
    
    return (
        <View style={styles.container}>
            <Text style={styles.selectedValueText}>{selectedValue} mg/dL</Text>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {numbers.map((number) => (
                    <TouchableOpacity
                        key={number}
                        style={[
                            styles.numberItem,
                            selectedValue === number && styles.numberItemSelected
                        ]}
                        onPress={() => {
                            setSelectedValue(number);
                            onSugarLevel(number);
                        }}
                    >
                        <Text style={[
                            styles.numberText,
                            selectedValue === number && styles.numberTextSelected
                        ]}>
                            {number}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    selectedValueText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    scrollView: {
        flex: 1,
    },
    numberItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    numberItemSelected: {
        backgroundColor: '#4CAF50',
    },
    numberText: {
        fontSize: 18,
        color: '#333',
    },
    numberTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
});