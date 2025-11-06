import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { React, use, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import viewPatients from './Screen/viewPatients';
import loginInScreen from './Screen/loginInScreen';
import addPatients from './Screen/addpatients';
import viewPatientsDetails from './Screen/viewPatientsDetails';
import addTests from './Screen/addtest';


export default function App() {

    const Stack = createNativeStackNavigator()

    const UserStack = () => {
      return (
        <Stack.Navigator initialRouteName="loginInScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="viewPatients" component={viewPatients} />
          <Stack.Screen name="loginInScreen" component={loginInScreen} />
          <Stack.Screen name="addPatients" component={addPatients} />
          <Stack.Screen name="viewPatientsDetails" component={viewPatientsDetails} />
          <Stack.Screen name="addTest" component={addTests}/>
            
        </Stack.Navigator>
      );
    }
    

  return (
    <NavigationContainer>
      <UserStack />
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  }
});
