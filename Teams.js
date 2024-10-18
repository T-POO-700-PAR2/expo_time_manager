// Teams.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    try {
      const response = await axios.get('https://time-manager-par2-58868fe31538.herokuapp.com/api/teams');
      setTeams(response.data.data);
    } catch (error) {
      console.error('Error fetching teams', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Liste des équipes</Text>
      {teams.length > 0 ? (
        <FlatList
          data={teams}
          keyExtractor={(team) => team.id.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      ) : (
        <Text>Aucune équipe trouvée.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Teams;
