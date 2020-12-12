import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons, AntDesign} from '@expo/vector-icons';

import StockScreen from './StockScreen';
import LogoutScreen from './LogoutScreen';
import {colors} from '../assets/js/colors';

const Tab = createBottomTabNavigator();
export default ()=>{
    return (
        <Tab.Navigator tabBarOptions={{activeBackgroundColor:colors.primary,inactiveBackgroundColor:colors.primary, activeTintColor:colors.secondary}} >
            <Tab.Screen name="MijnBieren" title='Mijn Bieren' component={StockScreen} options={{tabBarIcon:({color,size})=>(<Ionicons name="ios-beer" size={size} color={color}/>)}}/>
            <Tab.Screen name="Bierlijst" component={LogoutScreen}  options={{tabBarIcon:({color,size})=>(<AntDesign name="pluscircle" size={size} color={color} />)}}/>
        </Tab.Navigator>)
}