import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Image, RefreshControl,TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

import {colors} from '../assets/js/colors';





export default ()=>{
    const [choice,setChoice] = useState();


    return(
        //onsubmit editing van de naam van het bier kan er een call gedaan 
        //worden naar de foto's en kunnen die ondertussen al inladen eventueel met activtyindictator over de view waar de fotos worden ingeladen
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/smets.png')}/>
            
            <TextInput style={styles.input} placeholder="Naam van het bier" placeholderTextColor={colors.tertiary}/>
            <TextInput style={styles.input}  placeholder="Bierpercentage" placeholderTextColor={colors.tertiary}/>
            {/* <Dropdown menu/> */}
            <Picker itemStyle={{color:"white"}} mode="dropdown" style={styles.picker} selectedValue={choice} onValueChange={(itemValue)=>{setChoice(itemValue)}}>
                <Picker.Item label="Blond" value="Blond"/>
                <Picker.Item label="Donker" value="Donker"/>
                <Picker.Item label="Rood" value="Rood"/>
                <Picker.Item label="Amber" value="Amber"/>
            </Picker>
            <DropDownPicker items={[
                {label:"Blond" ,value:"Blond"},
                {label:"Donker", value:"Donker"},
                {label:"Rood", value:"Rood"},
                {label:"Amber", value:"Amber"}]}
                defaultIndex={0} 
                onChangeItem={(item)=>{setChoice(item)}}
            />
           
         <View style={{flexWrap:"wrap" ,flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"center"}}><Image style={styles.image1} source={require('../assets/smets.png')}/>
            <Image style={styles.image1} source={require('../assets/smets.png')}/>
            <Image style={styles.image1} source={require('../assets/smets.png')}/>
            <Image style={styles.image1} source={require('../assets/smets.png')}/>
            <Image style={styles.image1} source={require('../assets/smets.png')}/>
            <Image style={styles.image1} source={require('../assets/smets.png')}/></View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: '#2b434f',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
      }, 
      container1: {
        
        flex: 4,
        backgroundColor: '#2b434f',
        alignItems: 'center',
        justifyContent: 'center',
       
      },
      image:{
          
          width:200,height:200,resizeMode:'contain'
      },
      image1:{
          
          width:50,height:50,resizeMode:'contain'
      },
      picker:{width:"80%"},
      input:{width:"80%",borderWidth:1,borderColor:"#fff",height:40,padding:10,margin:10}
  });