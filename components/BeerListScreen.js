import React, { useEffect, useState } from 'react';
import {View,Text} from 'react-native'
import {Ionicons} from '@expo/vector-icons';

import BeerList from './BeerList';
import EditScreen from './EditBeerScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {colors} from '../assets/js/colors'

const Stack = createStackNavigator();


export default ()=>{
    const options ={headerStyle:{backgroundColor:colors.primary},headerTintColor:'white'};
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} name="Bierlijst" component={BeerList}/>
            <Stack.Screen options={options} name="EditBeer" component={EditScreen}/>
        </Stack.Navigator>
    )
}