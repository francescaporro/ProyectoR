import  React,{Component} from 'react';

import { View,Text, FlatList,TouchableOpacity,Modal,StyleSheet,Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Avatar,SearchBar,Button,Header,Icon } from "react-native-elements";
import filter from 'lodash.filter';

import API from '../utils/api';

class Papelera extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          dataFull: [],
          data:[],
          search:"",
          modalVisible: false,
          detalleItem:[]
        };
      }

    componentDidMount() {
        this.getTarjetas(); 
    }
    getTarjetas = async () => {
        var tarjetas = await AsyncStorage.getItem("papelera");
        tarjetas = JSON.parse(tarjetas)
      
        this.setState({
            data:tarjetas,
            dataFull:tarjetas,
            loading: false,
            name:"",
            email:"",
            country:"",
            gender:"",
            phone:""
          });
    };

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };

    contains = ({ name, email }, query) => {
        const { first, last } = name
        if (first.includes(query) || last.includes(query) || email.includes(query)) {
          return true
        }
        return false
    }
        
    handleChangeText = (text) =>{
          
      const formattedQuery = text.toLowerCase();
      const data = filter(this.state.dataFull, user => {
        return this.contains(user, formattedQuery)
      })
      this.setState({ data, search: text })
        
    }  
    renderHeader = () => {
        return <SearchBar 
                placeholder="Buscar aqui..." 
                lightTheme round 
                value={this.state.search}
                onChangeText = {this.handleChangeText}                  
                />;
    }; 
    keyExtractor=(item, index) => index.toString()
    actionOnRow = (item) => {
        
        this.setModalVisible(true);
        this.setState({ name: item.name.first + " "+item.name.last });
        this.setState({ gender: item.gender });
        this.setState({ country: item.location.country });
        this.setState({ email: item.email });
        this.setState({ phone: item.phone });
    }
    remove = async item => {
      var data = filter(this.state.data, function(currentObject) {
        return currentObject.email !== item.email;
      });
      await AsyncStorage.setItem('papelera', JSON.stringify(data));
      this.setState({ data})
    };
    renderItem = ({ item }) => (
        <TouchableOpacity onPress={ () => this.actionOnRow(item)}>
        <ListItem bottomDivider >
          <Avatar title={item.name.first} source={item.picture.thumbnail && { uri: item.picture.thumbnail }}/>
          <ListItem.Content>
            <ListItem.Title>{item.name.first} {item.name.last}</ListItem.Title>
            <ListItem.Subtitle>{item.location.country}</ListItem.Subtitle>
          </ListItem.Content>
          <Button
            onPress={() => this.remove(item)}
            buttonStyle={
              {
                backgroundColor:"white"
              }
            }
            icon={
              <Icon
                name='close'
                type='evilicon'
                color='red'
              />
            }
          />
        </ListItem>
        </TouchableOpacity>
      )
    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }
      
    render() {
      const { modalVisible, detalleItem} = this.state;
      
        return (
            <View>
                 <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.modalText}>Name: {this.state.name}</Text>
                      <Text style={styles.modalText}>Genero : {this.state.gender}</Text>
                      <Text style={styles.modalText}>Email : {this.state.email}</Text>
                      <Text style={styles.modalText}>Phone : {this.state.phone}</Text>
                      <Text style={styles.modalText}>País: {this.state.country}</Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => this.setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Ocultar modal</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>

                <Header
                  leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' },onPress: () => {this.props.navigation.openDrawer();} }}
                  centerComponent={{ text: 'Papelera', style: { color: '#fff' } }}
                  rightComponent={{ icon: 'undo', color: '#fff' ,iconStyle: { color: '#fff' },onPress: () => {this.getTarjetas()} }}
                />
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
      }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Papelera;