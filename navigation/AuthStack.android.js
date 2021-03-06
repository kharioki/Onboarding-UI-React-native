import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin } from '@react-native-community/google-signin';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });

    GoogleSignin.configure({
      webClientId: "86902252537-idj3nk8mkh0725on1nk3g2ldsqlsks6g.apps.googleusercontent.com",
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{header: () => null}}
        />
        <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{header: () => null}}
        />
        <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={({navigation}) => ({
              title: '',
              headerStyle: {
                backgroundColor: 'transparent',
                shadowColor: '#f9fafd',
                elevation: 0,  // for android
              },
              headerLeft: () => (
                <View style={{ marginLeft: 10 }}>
                  <FontAwesome.Button
                    name="long-arrow-left"
                    size={25}
                    backgroundColor="transparent"
                    color="#333"
                    onPress={() => navigation.navigate('Login')}
                  />
                </View>
              ),
            })}
        />
    </Stack.Navigator>
  );
}

export default AuthStack;