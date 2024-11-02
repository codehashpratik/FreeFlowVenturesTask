import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/main/Home';
import PokeList from '../screens/main/PokeList';
import Editprofile from '../screens/main/Editprofile';
import {NavigationContainer} from '@react-navigation/native';
import CustomDrawerComponent from '../components/CustomDrawerComponent';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/auth/SignUp';
import Login from '../screens/auth/Login';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AuthSection() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function MainSection() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerComponent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Edit profile" component={Editprofile} />
      <Drawer.Screen name="Poke" component={PokeList} />
    </Drawer.Navigator>
  );
}

const NavigationHandler = () => {
  const AuthReducer = useSelector(state => state.AuthReducer);
  return (
    <NavigationContainer>
      {AuthReducer.isToken == null ? <AuthSection /> : <MainSection />}
    </NavigationContainer>
  );
};

export default NavigationHandler;
