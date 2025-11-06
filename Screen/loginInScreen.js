import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { React, use, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export let globalUsername = null;
export const setGlobalUsername = (username) => {
    globalUsername = username;
};


export default function LoginInScreen() {
    const navigation = useNavigation();
  var [username, setUsername] = useState("");
  var [Password, setPassword] = useState("");
  

  return (
    <View style={styles.container}>
      <Image source ={require('../assets/logo.png')}
       style={{width: 100, height: 100, marginBottom: 20, marginTop:40}} />
      <Text
      style={{fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 50,
    textAlign: 'center'}}
      >Welcome</Text>
      <View style={{width: '100%', marginTop: 50}}>
        <TextInput
          style = {[styles.loginInput, {marginBottom: 20}]}
          placeholder="Username" 
          value={username}
          onChangeText={setUsername}
          />
        <TextInput 
        style = {styles.loginInput}
        placeholder="Password" 
        value={Password}
        onChangeText={setPassword}
        secureTextEntry={true} />
      </View>

      <View style={{marginTop: 200}}>
        <TouchableOpacity
          // disabled = {!username}
          style={styles.loginInButton}
          onPress={() => {
            console.log("Login In Pressed");
            setGlobalUsername(username);
            navigation.navigate('viewPatients');
              }}>
            <Text style={styles.buttonText}>Login In</Text>
        </TouchableOpacity>
      </View>

      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 50,
    paddingTop: 100,
  },
  loginInput: {
     borderWidth: 2,
    borderColor: '#007AFF', // Blue border
    borderRadius: 15, // Rounded edges
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
  loginInButton: {
     backgroundColor: '#007AFF', 
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25, 
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
});
