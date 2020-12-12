import React from 'react';
import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({navigation})=>{
    return(
        <Button title='Logout' onPress={async()=>{
          await AsyncStorage.setItem('@logged_in',"false");
          navigation.navigate("SignedOut")
        }}></Button>
      )
}