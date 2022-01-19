import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export class AboutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Creado por Manuel Marín el 2022-01-18 para prueba técnica de 3IT.
        </Text>
      </View>
    );
  }
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
