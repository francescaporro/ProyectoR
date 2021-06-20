import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from './src/screen/Home';
import List from './src/screen/List';
import API from './src/utils/api';

const Drawer = createDrawerNavigator();

class App extends Component {

  constructor(props){
    super(props)

  }
  async componentDidMount() {
    const fichas = await API.getFichas();
    await AsyncStorage.setItem('tarjetas', JSON.stringify(fichas));
    let json = []
    await AsyncStorage.setItem('papelera', JSON.stringify(json));
  }
  componentWillUnmount() {
    
  }


  render() {
    return (
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="List" component={List} />
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}



export default App;