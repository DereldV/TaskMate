import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from './screens/AuthPage';
import Homepage from './screens/Homepage';
import Account from './screens/Account';
import { initDatabase } from './utils/database';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initDatabase()
      .catch(error => console.error('Database initialization failed:', error));
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
