import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Cakes = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#555" />
      <Text style={styles.text}>Страница "Торты" находится в разработке</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Cakes;
