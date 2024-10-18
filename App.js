import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase';
import WorkingTimes from './WorkingTimeManager';
import Teams from './Teams';
import Clock from './ClockManager';
import Login from './Login';
import Signup from './Signup';
import ChartManager from './MultipleCharts';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  return user ? children : <AuthStack />;
};

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </Stack.Navigator>
);


const Logout = ({ navigation }) => {
  useEffect(() => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Déconnexion en cours...</Text>
    </View>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Chart">
      <Drawer.Screen name="Working Times" component={WorkingTimes} />
      <Drawer.Screen name="Chart" component={ChartManager} />
      <Drawer.Screen name="Teams" component={Teams} />
      <Drawer.Screen name="Clock" component={Clock} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <ProtectedRoute>
        <DrawerNavigation />
      </ProtectedRoute>
    </NavigationContainer>
  );
};

export default App;
