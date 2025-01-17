import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { findUserByUsername, getAllUsers } from '../utils/database';

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      

      const user = await findUserByUsername(username);
      if (user && user.password === password) {
        navigation.navigate('Homepage', {
          firstName: user.firstName,
          lastName: user.lastName
        });
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Username" 
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Password" 
          secureTextEntry 
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  forgotPassword: {
    color: '#007BFF',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginPage;
