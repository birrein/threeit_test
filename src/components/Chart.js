import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Chart = ({results}) => {
  const barStyles = num => {
    const sortedResults = results.sort((a, b) => b.votes - a.votes);
    const maxVotes = sortedResults[0].votes;
    const width = (num / maxVotes) * 100;

    return {
      width: `${width}%`,
    };
  };

  return (
    <View style={styles.content}>
      {results ? (
        results.map((item, index) => (
          <View key={index} style={styles.block}>
            <View style={styles.blockTitle}>
              <Text style={styles.statName}>{item.genre}</Text>
            </View>
            <View style={styles.blockInfo}>
              <Text style={styles.number}>{item.votes}</Text>
              <View style={styles.bgBar}>
                <View style={[styles.bar, barStyles(item.votes)]}></View>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text>Nadie ha llenado la encuesta</Text>
      )}
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 5,
  },
  block: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  blockTitle: {
    width: '30%',
  },
  statName: {
    fontSize: 12,
    color: '#6b6b6b',
  },
  blockInfo: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    width: '12%',
    fontSize: 12,
  },
  bgBar: {
    backgroundColor: '#dedede',
    width: '88%',
    height: 5,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bar: {
    height: 5,
    borderRadius: 20,
    backgroundColor: '#ff3e3e',
  },
});
