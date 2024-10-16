import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import axios from 'axios';

const ClockManager = () => {
  const [clockIn, setClockIn] = useState(false);
  const userId = 1;

  const clockInOut = async () => {
    const currentTime = new Date().toISOString();

    const payload = {
      clock: {
        user_id: userId,
        status: !clockIn,
        time: currentTime,
      },
    };

    try {
      await axios.post('https://time-manager-par2-58868fe31538.herokuapp.com/api/clocks', payload);
      setClockIn(!clockIn);
    } catch (error) {
      console.error('Error updating clock status:', error);
    }
  };

  return (
    <View>
      <Text>Gestion des horaires pour l'utilisateur {userId}</Text>
      <Button title={clockIn ? 'Pointer Sortie' : 'Pointer Entrée'} onPress={clockInOut} />
    </View>
  );
};

export default ClockManager
