import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default function SignupScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>
      <Button title="click here" onPress={() => alert('Button Clicked!!!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
