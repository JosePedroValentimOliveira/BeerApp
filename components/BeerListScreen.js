import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Image, RefreshControl} from 'react-native';
import { FlatList} from 'react-native-gesture-handler';

import {apiCall} from '../assets/js/apiCall';

const Beer = (props)=>{
    return(
        <View style={{borderWidth:2,borderColor:"black",padding:15,margin:2, flexDirection:"row", justifyContent:"space-between"}}>
            <Text>{props.name}</Text>
            <Text>{props.type}</Text>
            <Text>{props.percentage}</Text>
            <Image style={styles.image} source={{uri:props.image}}></Image>
        </View>
    )
}

const renderItem = ({item})=>{

    return <Beer name={item.beer_name} percentage={item.beer_percentage} type={item.beer_type} image={item.beer_img} key={item._id}/>
}

export default ()=>{
    const [beers,setBeers] = useState([]);
    const [refreshing,setRefreshing] = useState(false);
    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const loadBeers = ()=>{
        apiCall("dranken-lijst").then(data=>{
            
            setBeers(data);
        });
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadBeers();
        wait(1000).then(() => setRefreshing(false));
      }, []);

    useEffect(()=>{
        loadBeers();
    },[])

    return(
        <View style={styles.container}>
            <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  data={beers} renderItem={renderItem} keyExtractor={(item)=>{return item._id}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding:10
      },
      image:{
          width:70,height:70,resizeMode:'contain'
      }
  });