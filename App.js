import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screen/Home';
import Papelera from './src/screen/Papelera';
import API from './src/utils/api';

const Drawer = createDrawerNavigator();

class App extends Component {

  constructor(props){
    super(props)

  }
   componentDidMount() {
    
  }
  componentWillUnmount() {
    
  }


  render() {
    return (
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Papelera" component={Papelera} />
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}



export default App;