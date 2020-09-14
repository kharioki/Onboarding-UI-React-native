import React from 'react';
import {StyleSheet, Image, Text, View, Button} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default function OnboardingScreen({navigation}) {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/online-learning.png')} />,
          title: 'Online Learning',
          subtitle: 'Enjoy modern online learning.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/dev-learning.png')} />,
          title: 'Programming classes',
          subtitle: 'Amazing interactive programming classes',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/live-feedback.png')} />,
          title: 'Live Feedback',
          subtitle: 'Real-time feedback with trainers.',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
