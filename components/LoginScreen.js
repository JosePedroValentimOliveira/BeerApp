import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Image, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import {colors} from '../assets/js/colors';
import {apiUrl} from '../assets/js/apiUrl';
import Toast, { BaseToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({navigation})=>{
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();

    //moet naar registerScreen
    const saveUser= async()=>{
        try {
            await fetch(`${apiUrl}/api/saveUser`,{
                method:'POST',
                headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({"username":username,"password":password})
            })
            .then(resp=>resp.json())
            .then(async(data)=>{
                console.log(data);
            });
        } catch (error) {
            console.log(error);
        }
    }
  
const login = async()=>{

            await fetch(`${apiUrl}/api/login`,{
                method:'POST',
                headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
                body: JSON.stringify({"username":username,"password":password})
            })
            .then(resp=>resp.json())
            .then(async(data)=>{
               console.log("--------------")
               console.log(data);
                
               
               
                  
            });
        
        }
    
    

    return(
        
        <KeyboardAvoidingView behavior="padding" style={styles.loginContainer}>
            <Image source={require('../assets/smets.png')} style={styles.logo}/>
            
            <View style={styles.form}>
            <TextInput placeholder="Username" keyboardType="default" placeholderTextColor={colors.secondary} selectionColor={colors.secondary} style={styles.textInput} onChangeText={(text)=>{setUsername(text)}} />
            <TextInput placeholder="Password"secureTextEntry={true}  placeholderTextColor={colors.secondary} selectionColor={colors.secondary} style={styles.textInput} onChangeText={(text)=>{setPassword(text)}} />
            <TouchableOpacity style={styles.container} onPress={()=>{login();  }}>
                <Text style={styles.text}>Login</Text>
                
            </TouchableOpacity>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </KeyboardAvoidingView >
        
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: colors.secondary,
        marginBottom:12,
        paddingVertical:12,
        borderRadius:4,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:colors.secondary
    },
    text:{
        color:colors.tertiary,
        textAlign:"center",
        height:20
    },
    textInput:{
        height:40,
        borderColor: colors.secondary,
        borderBottomWidth:StyleSheet.hairlineWidth,
        marginBottom:20,
        color:colors.secondary
    },
    logo:{
        flex:1,
        width:"60%",
        resizeMode:"contain",
        alignSelf:"center"
    },
    form:{
        flex:1,
        justifyContent:"center",
        width:"80%"
    }
    ,loginContainer:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:"center",
        justifyContent:"space-between"
    }
  });