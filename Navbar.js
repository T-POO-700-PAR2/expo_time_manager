import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  if (!user) return null;

  return (
    <View style={styles.navbar}>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Working Times" onPress={() => navigation.navigate('WorkingTimes', { userId: 1 })} />
      <Button title="Teams" onPress={() => navigation.navigate('Teams')} />
      <Button title="User Profile" onPress={() => navigation.navigate('User')} />
      <Button title="Clock" onPress={() => navigation.navigate('Clock', { userId: 1 })} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#bababa',
    padding: 10,
  },
  button: {
    color: 'white',
  },
});

export default Navbar;
