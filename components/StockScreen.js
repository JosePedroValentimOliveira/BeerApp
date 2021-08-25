import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Image, RefreshControl, StatusBar,TextInput} from 'react-native';
import { FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import {apiCall} from '../assets/js/apiCall';
import { colors } from '../assets/js/colors';
import {contains} from '../assets/js/filter';
import Detail from './DetailScreen';






const stockList =({navigation})=>{
    const [refreshing,setRefreshing] = useState(false);
    const [stock,setStock] = useState([]);
    const [allStock,setAllStock] = useState([]);
    const [query,setQuery] = useState("");
    const Beer = (props)=>{
       
        return(
            
            <TouchableOpacity onPress={()=>{navigation.navigate("Detail",{beer:props.beer});}} style={{backgroundColor:colors.tertiary,margin:6,flex:1,flexDirection:"row",borderRadius:10}}>
                

                {/* <View style={{flex:4,flexDirection:"column",alignItems:"center"}}>
                    <View style={{flex:1,width:"100%",alignItems:"center",justifyContent:"center"}}>
                        <Text style={{padding:6,fontSize:16,fontWeight:'bold'}}>{props.beer.beer_name}</Text>
                    </View>
                    <View style={{flex:4,margin:6}}> 
                        <Image style={styles.image} source={{uri:props.beer.beer_img}}/>
                    </View>
                    <View style={{flex:1,flexDirection:"row",width:"100%",alignItems:"center",justifyContent:"space-around",margin:6,fontWeight:'bold'}}>
                        
                        <Text style={{}}>{props.beer.beer_type}</Text>
                        <Text style={{}}>{props.beer.beer_percentage}</Text>
                        
                    </View>
                </View>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{fontSize:30}}>{props.beer.stock}</Text>
                </View> */}
                
                <View style={{flex:2,alignItems:"center",justifyContent:"center",backgroundColor:"#e3c068",borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                    <Image style={{...styles.image,margin:10}} source={{uri:props.beer.beer_img}}/>
                </View>
                <View style={{flex:5,flexDirection:"column"}}>
                    <View style={{flex:1,alignItems:"center",justifyContent:"center",padding:6}}>
                        <Text style={{fontSize:14,color:colors.white,fontWeight:"bold"}}>{props.beer.beer_name}</Text>
                    </View>
                    <View style={{flex:5,flexDirection:'row'}}>
                        <View style={{flex:3,flexDirection:"column",alignItems:"center",justifyContent:"space-evenly"}}>
                            <Text style={{}}>{props.beer.beer_type}</Text>
                            <Text style={{}}>{props.beer.beer_percentage}</Text>
                        </View>
                        <View style={{flex:2,alignItems:"center",justifyContent:"center"}}>
                            <Text style={{fontSize:30}}>{props.beer.stock}</Text>
                        </View>
                    </View>
                    
                </View>
                
                {/* <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                  <Image style={styles.image} source={{uri:props.beer.beer_img}}/>
                </View>
                <View style={{flex:3,justifyContent:"center",alignItems:"start"}}>
                  <Text style={{color:"white",paddingTop:6,paddingBottom:6}}>{props.beer.beer_name}</Text>
                  <Text style={{color:"white",paddingBottom:6}}>{props.beer.beer_percentage}</Text>
                  
                  <Text style={{color:"white"}}>{props.beer.beer_type}</Text>
                  <Text style={{color:"white"}}>{props.beer.expirationDate}</Text>
                 
                </View>
    
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"white",fontSize:30}}>{props.beer.stock}</Text>
                </View> */}
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
            setAllStock(data);
            setStock(data);
            setQuery("");
        });
    }
    const handleSearch = (text)=>{
        const formatQuery = text.toLowerCase();
        setQuery(text);
        setStock(contains(allStock,formatQuery));
    }

    useEffect(()=>{
        navigation.addListener('focus',()=>{
             loadBeers();
             
         })
         
      },[])
    return(
        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <FlatList 
                ListHeaderComponent={<TextInput style={{height: 40 ,padding: 10,margin:2, backgroundColor:"white",borderRadius:5}} clearButtonMode="always"  placeholder="Search"  onChangeText={text=>handleSearch(text)} />} 
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  data={stock} renderItem={renderItem} keyExtractor={(item)=>{return item._id}} />
        </View>
    )
}

const Stack = createStackNavigator();
const options ={headerStyle:{backgroundColor:colors.primary},headerTintColor:colors.tertiary};
export default ({navigation})=>{
    const options ={headerStyle:{backgroundColor:colors.primary},headerTintColor:'white'};
    return(
      
        <Stack.Navigator >
            <Stack.Screen options={{headerShown: false}} name="Mijn Bieren" component={stockList}/>
            <Stack.Screen name="Detail" component={Detail} options={options} options={options}/>
        </Stack.Navigator>
        
    )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding:5
        
      },
      image:{
          width:100,height:100,resizeMode:'contain'
      },
      
      itemInvisible: {
        backgroundColor: 'transparent',
      },
  });