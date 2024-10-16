import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

const MultipleCharts = () => {
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/working_times?user_id=1');
        const data = response.data;

        if (data) {
          setBarData(formatBarChartData(data));
          setLineData(formatLineChartData(data));
          setPieData(formatPieChartData(data));
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const formatBarChartData = (data) => ({
    labels: data.map((item) => new Date(item.start).toLocaleDateString()),
    datasets: [
      {
        data: data.map((item) => new Date(item.end) - new Date(item.start)),
      },
    ],
  });

  const formatLineChartData = (data) => ({
    labels: data.map((item) => new Date(item.start).toLocaleDateString()),
    datasets: [
      {
        data: data.map((item) => new Date(item.end) - new Date(item.start)),
        strokeWidth: 2,
      },
    ],
  });

  const formatPieChartData = (data) =>
    data.map((item, index) => ({
      name: `Day ${index + 1}`,
      population: new Date(item.end) - new Date(item.start),
      color: ['#FF6384', '#36A2EB', '#FFCE56'][index % 3],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

  return (
    <View>
      <Text>Bar Chart</Text>
      {barData && (
        <BarChart
          data={barData}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      )}

      <Text>Line Chart</Text>
      {lineData && (
        <LineChart
          data={lineData}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
      )}

      <Text>Pie Chart</Text>
      {pieData && (
        <PieChart
          data={pieData}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      )}
    </View>
  );
};

export default MultipleCharts;
