import  React,{Component} from 'react';

import { View,Text, FlatList,TouchableOpacity,Modal,StyleSheet,Pressable} from 'react-native';
import { ListItem, Avatar,SearchBar,Button,Header,Icon,Input } from "react-native-elements";

class Equipo extends Component{

    
    render() {
      
        return (
            <View>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' },onPress: () => {this.props.navigation.openDrawer();} }}
                    centerComponent={{ text: 'Tarjetas', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />

                 <Text style={styles.titulo}>Presentado por: </Text>
                 <Text  style={styles.nombre}>Segundo Ustariz</Text>
            </View>
        );
      }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize:20
  },
  nombre: {
   
  }
});

export default Equipo;