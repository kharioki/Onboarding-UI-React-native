import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default function OnboardingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Onboarding Screen</Text>
      <Button title="click here" onPress={() => navigation.navigate('Login')} />
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
