import React from 'react';
import {StyleSheet, Image, TouchableOpacity, View, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 8}} {...props}>
    <Text>Skip</Text>
  </TouchableOpacity>
);

const Next = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 8}} {...props}>
    <Text style={{fontSize: 16}}>Next</Text>
  </TouchableOpacity>
);

const Done = ({...props}) => (
  <TouchableOpacity style={{marginHorizontal: 8}} {...props}>
    <Text>Done</Text>
  </TouchableOpacity>
);

const Dots = ({selected}) => {
  let backgroundColor;

  backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

export default function OnboardingScreen({navigation}) {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
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
