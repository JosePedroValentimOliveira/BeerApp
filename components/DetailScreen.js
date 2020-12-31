import React, {  useState, useEffect } from 'react';
import { StyleSheet, Text,TextInput, View ,Image,Alert} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';

import {apiCall} from '../assets/js/apiCall';
import { colors } from '../assets/js/colors';




export default ({navigation, route})=>{
    const {beer} = route.params;
    const [stock,setStock]= useState(beer.stock);
    useEffect(()=>{
        navigation.setOptions({title:beer.beer_name})
      },[])

    const update = (beerId,quantity)=>{
    
    
        apiCall(`updateStock/${beerId}/${quantity}`).then(response=>{
          if(response == "true"){
              alert("Is succesvol aangepast!");
          }
          else if(response == "false"){
              alert("Er iets mis gegaan, probeer zo meteen nog eens!");
             
          }
          else{Alert.alert("Stock update",response)};
        })
  }
    return(
        <View style={styles.container}>
            
    
            <View style={{...styles.center,flex:4}}>
                <Image style={styles.image} source={{uri:beer.beer_img}}/>
            </View>
            <View style={{...styles.center,flex:1}}>
                
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{setStock(stock-1)}} style={{...styles.squareButton,backgroundColor:colors.tertiary, }}>
                        <Text style={{color:"white",fontSize:30}}>-</Text>
                    </TouchableOpacity>
                    <View  style={{...styles.squareButton,backgroundColor:colors.primary, }}>
                        <TextInput style={{color:"white"}} onEndEditing={(e)=>{setStock(parseInt(e.nativeEvent.text))}}>{stock}</TextInput>
                    </View>
                    
                    <TouchableOpacity onPress={()=>{setStock(stock+1)}} style={{...styles.squareButton,backgroundColor:colors.tertiary, }}>
                        <Text style={{color:"white",fontSize:30}}>+</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>{update(beer._id,stock)}}>
                    <Text style={{color:"white"}}>Update stock</Text>
                </TouchableOpacity>
            </View>
        
            
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding:5
        
        
      },image:{
        width:200,height:200,resizeMode:'contain'
    },
    center:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    squareButton:{
        width:60,
        height:60,
        padding:5,
        borderColor:"white",
        borderWidth:2,
        alignItems:"center",
        justifyContent:"center",
        margin:10
       
    },
    buttonContainer:{
        flex:2,
        alignItems:"stretch",
        justifyContent:"center"
    
    },
    button:{
        backgroundColor:colors.primary,
        borderColor:colors.secondary,
        alignSelf:"center",
        borderWidth:1,
        padding:7,
        width:"80%",
        borderRadius:12,
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 12,

    }
    })