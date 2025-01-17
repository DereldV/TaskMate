import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './screens/Login';
import SignupPage from './screens/Signup';
import Homepage from './screens/Homepage';
import { initDatabase } from './utils/database';
import Account from './screens/Account';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase()
      .catch(error => console.error('Database initialization failed:', error));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Homepage" 
          component={Homepage}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Account" 
          component={Account}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
