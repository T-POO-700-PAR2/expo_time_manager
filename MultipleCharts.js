import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const MultipleCharts = () => {
  const [barData, setBarData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://time-manager-par2-58868fe31538.herokuapp.com/api/working_times?user_id=1');
        const data = response.data;

        if (Array.isArray(data.data)) {
          setBarData(formatBarChartData(data.data));
          setLineData(formatLineChartData(data.data));
          setPieData(formatPieChartData(data.data));
        } else {
          console.error('Les données reçues ne sont pas au format attendu.');
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
        data: data.map((item) => (new Date(item.end) - new Date(item.start)) / 3600000),
      },
    ],
  });

  const formatLineChartData = (data) => ({
    labels: data.map((item) => new Date(item.start).toLocaleDateString()),
    datasets: [
      {
        data: data.map((item) => (new Date(item.end) - new Date(item.start)) / 3600000),
        strokeWidth: 2,
      },
    ],
  });

  const formatPieChartData = (data) =>
    data.map((item, index) => ({
      name: `Jour ${index + 1}`,
      population: (new Date(item.end) - new Date(item.start)) / 3600000,
      color: ['#FF6384', '#36A2EB', '#FFCE56'][index % 3],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.chartTitle}>Graphique en barres</Text>
      {barData && (
        <BarChart
          data={barData}
          width={screenWidth - 32}
          height={220}
          chartConfig={styles.chartConfig}
          verticalLabelRotation={30}
        />
      )}

      <Text style={styles.chartTitle}>Graphique en lignes</Text>
      {lineData && (
        <LineChart
          data={lineData}
          width={screenWidth - 32}
          height={220}
          chartConfig={styles.lineChartConfig}
          bezier
        />
      )}

      <Text style={styles.chartTitle}>Graphique en secteurs</Text>
      {pieData && (
        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={220}
          chartConfig={styles.pieChartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  chartConfig: {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  },
  lineChartConfig: {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  },
  pieChartConfig: {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  },
});

export default MultipleCharts;
