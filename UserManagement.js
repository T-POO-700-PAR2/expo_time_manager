// UserManagement.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newUser, setNewUser] = useState({ username: '', email: '', role: '' });

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('https://time-manager-par2-58868fe31538.herokuapp.com/api/users');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des utilisateurs', error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/users', { user: newUser });
      getAllUsers(); // refresh user list
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text>Gestion des utilisateurs</Text>
      <TextInput
        placeholder="Nom d'utilisateur"
        value={newUser.username}
        onChangeText={(text) => setNewUser({ ...newUser, username: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={newUser.email}
        onChangeText={(text) => setNewUser({ ...newUser, email: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Rôle"
        value={newUser.role}
        onChangeText={(text) => setNewUser({ ...newUser, role: text })}
        style={styles.input}
      />
      <Button title="Créer Utilisateur" onPress={createUser} />

      <TextInput
        placeholder="Rechercher un utilisateur..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.input}
      />

      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => <Text>{item.username} - {item.email} - {item.role}</Text>}
        />
      ) : (
        <Text>Aucun utilisateur trouvé.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default UserManagement;
