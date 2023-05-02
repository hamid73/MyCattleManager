import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ListOfTransaction = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icons/comingSoon.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default ListOfTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
