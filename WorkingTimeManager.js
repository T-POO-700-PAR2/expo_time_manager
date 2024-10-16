// WorkingTimeManager.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const WorkingTimeManager = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [workingTimeId, setWorkingTimeId] = useState(null);

  const createWorkingTime = async () => {
    try {
      await axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times', {
        working_time: {
          start: new Date(startTime).toISOString(),
          end: new Date(endTime).toISOString(),
          user_id: 1,
        },
      });
      console.log('Temps de travail créé');
    } catch (error) {
      console.error('Erreur lors de la création du temps de travail:', error);
    }
  };

  const updateWorkingTime = async () => {
    try {
      await axios.put(`https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times/${workingTimeId}`, {
        working_time: {
          start: new Date(startTime).toISOString(),
          end: new Date(endTime).toISOString(),
        },
      });
      console.log('Temps de travail mis à jour');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du temps de travail:', error);
    }
  };

  const deleteWorkingTime = async () => {
    try {
      await axios.delete(`https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times/${workingTimeId}`);
      console.log('Temps de travail supprimé');
    } catch (error) {
      console.error('Erreur lors de la suppression du temps de travail:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Heure de début (YYYY-MM-DDTHH:MM:SSZ)"
        value={startTime}
        onChangeText={setStartTime}
        style={styles.input}
      />
      <TextInput
        placeholder="Heure de fin (YYYY-MM-DDTHH:MM:SSZ)"
        value={endTime}
        onChangeText={setEndTime}
        style={styles.input}
      />
      <Button title="Ajouter un temps de travail" onPress={createWorkingTime} />
      <Button title="Mettre à jour un temps de travail" onPress={updateWorkingTime} />
      <Button title="Supprimer un temps de travail" onPress={deleteWorkingTime} />
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

export default WorkingTimeManager;
