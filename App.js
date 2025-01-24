import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthPage from './screens/AuthPage';
import Homepage from './screens/Homepage';
import Account from './screens/Account';
import { initDatabase } from './utils/database';

const Stack = createNativeStackNavigator();
const DB_VERSION = '1.1'; // Increment this when you make database schema changes

export default function App() {
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const currentVersion = await AsyncStorage.getItem('DB_VERSION');
        if (currentVersion !== DB_VERSION) {
          await initDatabase();
          await AsyncStorage.setItem('DB_VERSION', DB_VERSION);
        }
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };

    setupDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen 
          name="Auth" 
          component={AuthPage}
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
