import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from './Navbar';
import WorkingTimes from './WorkingTimeManager';
import Teams from './Teams';
import Clock from './ClockManager';
import Login from './Login';
import Signup from './Signup';
import ProtectedRoute from './ProtectedRoute';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navbar />
      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="WorkingTimes">
          {() => (
            <ProtectedRoute>
              <WorkingTimes />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        <Stack.Screen name="Teams">
          {() => (
            <ProtectedRoute>
              <Teams />
            </ProtectedRoute>
          )}
        </Stack.Screen>

        <Stack.Screen name="Clock">
          {() => (
            <ProtectedRoute>
              <Clock />
            </ProtectedRoute>
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
