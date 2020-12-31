import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View ,Image, RefreshControl, StatusBar ,  Dimensions, TouchableOpacity,Alert} from 'react-native';
import { FlatList,} from 'react-native-gesture-handler';

import {apiCall} from '../assets/js/apiCall';
import {apiPost} from '../assets/js/apiPost';
import { colors } from '../assets/js/colors';

const Beer = (props)=>{
    
  return(
      
      <View style={{alignItems:"center"}} >
          <Text style={{color:"white"}}>{props.name}</Text>
          {/* <Text>{props.type}</Text>
          <Text>{props.percentage}</Text> */}
         
          <Image  style={styles.image} source={{uri:props.image}}></Image>
          
      </View>
  )
}




const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };

const numColumns = 3 ;
export default ({navigation})=>{
    const [beers,setBeers] = useState([]);
    const [refreshing,setRefreshing] = useState(false);
    const [overlay,setOverlay]= useState(false);
    const [currentItem,setCurrentItem]= useState();
    
    let quantity;
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
    
    /* const deleteItem=(item)=>{
      console.log(item._id)
      apiCall(`deleteBeer/${item._id}`).then((response)=>{
        console.log(response);
        if(response == "true"){
          navigation.navigate("Bierlijst")
        }
        else{alert("Er iets mis gegaan, probeer zo meteen nog eens!");}
      })
    }

    const deleteAlert = (item)=>{
      Alert.alert(
        `Verwijder ${item.beer_name}`,
        `Bent u zeker dat u ${item.beer_name} wilt verwijderen uit de lijst?`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {deleteItem(item)}
          }
        ]
      );
    } */

    const SaveToStock = async(aantal)=>{

      quantity = aantal;
      
      const stock ={
        beer_id: currentItem._id,
        quantity: quantity
      }
    
      const options={
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(stock)
    };
    
      apiPost('stock',options).then(response=>{
        if(response == "true"){
            alert("Is succesvol toegevoegd!");
        }
        else if(response == "false"){
            alert("Er iets mis gegaan, probeer zo meteen nog eens!");
           
        }
        else{alert(response)};
      })
      
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadBeers();
        wait(1000).then(() => setRefreshing(false));
      }, []);

    const Overlay = ()=> {
      return(
        <View style={{position:"absolute",alignSelf:"center",width:"100%",height:"100%",backgroundColor: 'rgba(0,0,0,0.6)',justifyContent: 'center', alignItems: 'center'}}>
              <View style={{position:"absolute",alignSelf:"center",width:"80%",height:"25%",backgroundColor:colors.tertiary,borderColor:"white",borderWidth:2}}>
                <View style={{flex:1,alignItems:"center",justifyContent:"center",paddingTop:40}}>
                  <TouchableOpacity style={{position:"absolute",top:5,right:10}} onPress={()=>{setOverlay(false)}}>
                    <Text style={{fontSize:20,color:"white",}}>X</Text>
                  </TouchableOpacity>
                  <View style={{flex:1,flexDirection:"row"}}>
                    <View style={{flex:2,alignItems:"center"}}><Image source={{uri:currentItem.beer_img}} style={styles.overlayImage}/></View>
                    <View style={{flex:3}}>
                      <View style={{flex:2}}>
                        <Text style={styles.overlayText}>{currentItem.beer_name} {currentItem.beer_percentage}</Text>
                        <Text style={styles.overlayText}>{currentItem.beer_type}</Text>
                      </View>
                  
                      <TouchableOpacity onPress={
                        ()=>{
                          Alert.prompt(
                            "Aantal",
                            "Voer hier de aantal flessen dat je hebt voor dit bier?",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              {
                                text: "OK",
                                onPress: (aantal) => {SaveToStock(aantal)}
                              }
                            ]
                          );
                        }} style={{flex:1,alignItems:"flex-start"}}>
                        <Text style={{...styles.overlayButton}}>Add to stock</Text>
                      </TouchableOpacity>
                      
                      
                      
                      </View>
                  </View>
                </View>
              </View>
            </View>
      )
    }

    useEffect(()=>{
      navigation.addListener('focus',()=>{
           loadBeers();
       })
       loadBeers();
    },[])
    const renderItem = ({item})=>{
      if (item.empty === true) {
          return <View style={[styles.item, styles.itemInvisible]} />;
        }
      return (
      <TouchableOpacity style={styles.item} /* onLongPress={()=>{deleteAlert(item)}} */ onPress={()=>{setOverlay(true);setCurrentItem(item)}}>
        <Beer name={item.beer_name}/*  percentage={item.beer_percentage} type={item.beer_type} */ image={item.beer_img} key={item._id}/>
      </TouchableOpacity>)
      
    }

    return(
        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  data={formatData(beers,numColumns)} renderItem={renderItem} keyExtractor={(item)=>{return item._id}} numColumns={numColumns}/>

            {overlay?<Overlay></Overlay>:<View></View>}
        
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
        
      },
      image:{
          width:70,height:70,resizeMode:'contain'
      },
      overlayImage:{
        width:100,height:100,resizeMode:'contain'
    },
      item: {
        backgroundColor: colors.tertiary,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 3,
        height: Dimensions.get('window').width/numColumns,
        
       
      },
      itemInvisible: {
        backgroundColor: 'transparent',
      },
      overlayButton:{
        borderColor:"white",
        borderWidth:1,
        padding:5,
        borderRadius:5,
        backgroundColor:colors.primary,
        color:"white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 12,
        
      }
      ,overlayText:{
        fontSize:20,
        color:"white",
        borderBottomWidth:10
      }
  });