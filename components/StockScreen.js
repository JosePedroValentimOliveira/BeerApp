import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Image, RefreshControl, StatusBar} from 'react-native';
import { FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {apiCall} from '../assets/js/apiCall';
import { colors } from '../assets/js/colors';

import Detail from './DetailScreen';






const stockList =({navigation})=>{
    const [refreshing,setRefreshing] = useState(false);
    const [stock,setStock] = useState([]);

    const Beer = (props)=>{
        
        return(
            
            <TouchableOpacity onPress={()=>{navigation.navigate("Detail",{beer:props.beer});}} style={{backgroundColor:colors.tertiary,margin:2,padding:5,flex:1,flexDirection:"row"}}>
                
                <View style={{flex:1}}>
                  <Image style={styles.image} source={{uri:props.beer.beer_img}}/>
                </View>
                <View style={{flex:2,justifyContent:"center",alignItems:"center"}}>
                  <Text style={{color:"white",paddingTop:6,paddingBottom:6}}>{props.beer.beer_name}</Text>
                  <Text style={{color:"white",paddingBottom:6}}>{props.beer.beer_percentage}</Text>
                  <Text style={{color:"white"}}>{props.beer.beer_type}</Text>
                  <Text></Text>
                </View>
    
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"white",fontSize:30}}>{props.beer.stock}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const renderItem = ({item})=>{
        return <Beer beer={item} key={item._id}/>
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadBeers();
        wait(1000).then(() => setRefreshing(false));
      }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const loadBeers = async ()=>{
        apiCall("stock").then(data=>{
            
            setStock(data);
        });
    }

    useEffect(()=>{
        navigation.addListener('focus',()=>{
             loadBeers();
         })
         loadBeers();
      },[])
    return(
        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  data={stock} renderItem={renderItem} keyExtractor={(item)=>{return item._id}} />
        </View>
    )
}

const Stack = createStackNavigator();
const options ={headerStyle:{backgroundColor:colors.primary},headerTintColor:colors.tertiary};
export default ({navigation})=>{

    return(
      
        <Stack.Navigator >
            <Stack.Screen options={{headerShown: false}} name="Mijn Bieren" component={stockList}/>
            <Stack.Screen name="Detail" component={Detail} options={options}/>
        </Stack.Navigator>
        
    )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding:5
        
      },
      image:{
          width:70,height:70,resizeMode:'contain'
      },
      
      itemInvisible: {
        backgroundColor: 'transparent',
      },
  });