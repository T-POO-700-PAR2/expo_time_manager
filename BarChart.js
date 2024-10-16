// BarChart.js
import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const BarChartComponent = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [40, 39, 30, 35, 38],
      },
    ],
  };

  return (
    <View>
      <Text>Bar Chart</Text>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
        }}
      />
    </View>
  );
};

export default BarChartComponent;
