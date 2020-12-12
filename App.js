
import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignedInScreen from './components/SignedInScreen';
import SignedOutScreen from './components/SignedOutScreen';



const Stack = createStackNavigator();




export default function App() {
  const [isSignedIn,setSignedIn] = useState(false);
  const load = async()=>{
    try {
      let loggedIn = await AsyncStorage.getItem('@logged_in');
      if(loggedIn=="true")
        {setSignedIn(true)}
      else
        {setSignedIn(false)}
    } catch (error) {
      
    }
  };
   useEffect(()=>{
      
    load();
   },[])
  
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        { !isSignedIn ?<Stack.Screen name="SignedOut" component={SignedOutScreen}/> :<Stack.Screen name="SignedIn" component={SignedInScreen}/>}
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
