import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const LineChartComponent = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [10, 20, 30, 40, 50, 60, 70],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View>
      <Text>Line Chart</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
      />
    </View>
  );
};

export default LineChartComponent;
