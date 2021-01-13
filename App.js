
import React, { useEffect, useState } from 'react';
import { StyleSheet} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StockScreen from './components/StockScreen';
import AddScreen from './components/AddScreen';
import BeerListScreen from './components/BeerListScreen';


import {Ionicons, AntDesign,Feather} from '@expo/vector-icons';
import {colors} from './assets/js/colors';

const Tab = createBottomTabNavigator();




export default function App() {
  
  useEffect(()=>{},[])
  
  return (
 
    <NavigationContainer >
      <Tab.Navigator  tabBarOptions={{activeBackgroundColor:colors.primary,inactiveBackgroundColor:colors.primary, activeTintColor:colors.tertiary}} >
            <Tab.Screen name="MijnBieren" title='Mijn Bieren' component={StockScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="ios-beer" size={size} color={color}/>)}}/>
            <Tab.Screen name="Add Beer" component={AddScreen}  options={{tabBarIcon:({color,size})=>(<AntDesign name="pluscircle" size={size} color={color} />)}}/>
            <Tab.Screen name="Bierlijst" component={BeerListScreen} options={{tabBarIcon:({color,size})=>(<Feather name="list" size={size} color={color} />)}}/>

        </Tab.Navigator>
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
