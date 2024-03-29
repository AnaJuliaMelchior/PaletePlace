
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import  Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style/MainStyle';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Principal from './screens/Principal';
import Cadastro from './screens/Cadastro';


const Stack = createNativeStackNavigator ();

function MyStack() {
  return (
    <Stack.Navigator>

    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Principal" component={Principal} />
    <Stack.Screen name="Cadastro" component={Cadastro} />

    </Stack.Navigator>
  );


}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );

}