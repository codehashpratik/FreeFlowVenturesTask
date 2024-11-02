import {View, Text} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';
import SignUp from './src/screens/auth/SignUp';
import CustomTextinput from './src/components/CustomTextinput';
import Login from './src/screens/auth/Login';
import Home from './src/screens/main/Home';
import NavigationHandler from './src/navigation/NavigationHandler';

const App = () => {
  return <NavigationHandler />;
};

export default App;
