import React,{Component} from 'react';
import {View,Text,Flatlist,StyleSheet,Alert,SafeAreaView} from 'react-native';
import axios from 'axios';
import {ListItem} from 'react-native-elements'

export default class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            list_data : [],
            url : "http://localhost : 5000/",
        }
    }
    componentDidMount(){
        this.getStars()
    }

    getStars = () => {
        const {url} = this.state;
        axios.get(url).then(response => {
            return this.setState({
                list_data : response.data.data,
            })
        }).catch(error => {
            Alert.alert(error.message)
        })
    }
    renderItems = ({item,index}) => {
        <ListItem key = {index} title = {"Stars : ${item.name}"} subtitle = {"distance : ${item.Distance}"} 
        titleStyle = {styles.title}  containerStyle = {styles.listContainer} bottomDivider chevron onPress = {() => 
        this.props.navigation.navigate("Details.js",{planet_name : item.name})} />
    }

    keyExtactor = (item,index) => index.toString();
    render(){
        const {list_data} = this.state;
        if (list_data.length === 0){
            return(
                <View style = {style.ViewContainer}>
                    <Text>Loading...</Text>
                </View>
            )
        }
        return(
            <View style = {styles.Container}>
                <SafeAreaView/>
                <View style = {styles.upperContainer}>
                    <Text style = {styles.headerText}>Stars's World</Text>
                </View>
                <View style = {styles.lowerContainer}>
                    <Flatlist keyExtactor = {this.keyExtactor} data = {this.state.list_data} renderItems = {this.renderItems} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
     container: { flex: 1, 
    backgroundColor: "#edc988" 
    },
    upperContainer: { 
        flex: 0.1, 
        justifyContent: "center", 
        alignItems: "center" 
    }, 
    headerText: {
         fontSize: 30,
          fontWeight: "bold",
           color: "#132743" 
        }, 
    lowerContainer: { 
        flex: 0.9 },
     emptyContainer: { 
         flex: 1,
          justifyContent: "center",
           alignItems: "center"
         },
     emptyContainerText: {
          fontSize: 20 },
     title: { 
         fontSize: 18, 
         fontWeight: "bold",
          color: "#d7385e" 
        },
     listContainer: { 
         backgroundColor: "#eeecda" 
        } 
    });