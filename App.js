import React from 'react'
import { StatusBar, Text, TouchableHighlight, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
  <AppNavigator />
  )
}

export default App;
