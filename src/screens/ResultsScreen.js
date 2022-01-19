import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Chart from '../components/Chart';
import {getResults} from '../api/MusicPoll';

const ResultsScreen = () => {
  const [results, setResults] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const res = await getResults();
        setResults(res);
      })();
    }, []),
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resultados</Text>
      <Chart results={results} />
    </ScrollView>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 15,
  },
});
