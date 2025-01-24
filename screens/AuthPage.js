import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { findUserByUsername, insertUser } from '../utils/database';

// Component for handling user authentication (login and signup)
const AuthPage = ({ navigation }) => {
  // State management for login/signup toggle and form fields
  const [isLogin, setIsLogin] = useState(true);
  // Login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Signup form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Handle user login
  const handleLogin = async () => {
    try {
      const user = await findUserByUsername(username);
      if (user && user.password === password) {
        navigation.navigate('Homepage', {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          avatarPath: user.avatarPath || 'man' // Include default avatar if none set
        });
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    }
  };

  // Handle user signup
  const handleSignup = async () => {
    // Validate all fields are filled
    if (!firstName || !lastName || !username || !password || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Attempt to create new user
      await insertUser(firstName, lastName, username, password, email);
      Alert.alert(
        'Success',
        'Account created successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Clear form and switch to login view on success
              setFirstName('');
              setLastName('');
              setEmail('');
              setUsername('');
              setPassword('');
              setIsLogin(true);
            }
          }
        ]
      );
    } catch (error) {
      // Handle specific error cases
      if (error.message === 'Email already registered') {
        Alert.alert('Error', 'This email is already registered');
      } else if (error.message === 'Username already taken') {
        Alert.alert('Error', 'This username is already taken');
      } else {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Circular Logo Container */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo-placeholder-image.png')} // Make sure to add your logo image in assets folder
          // Or use a placeholder URL:
          // source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      
      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={[styles.toggleText, isLogin && styles.activeToggleText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.toggleButton, !isLogin && styles.activeToggle]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={[styles.toggleText, !isLogin && styles.activeToggleText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {isLogin ? (
        // Login Form
        <View style={styles.formContainer}>
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
          <TouchableOpacity 
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Signup Form
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
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
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7E8CC',
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#fff',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#F6C8C8',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F6C8C8',
    padding: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  toggleButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 5,
  },
  activeToggle: {
    backgroundColor: '#FFFFFF',
  },
  toggleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  activeToggleText: {
    color: '#F6C8C8',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  forgotPassword: {
    color: '#007BFF',
    marginBottom: 20,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#F6C8C8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AuthPage; 