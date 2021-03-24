import React, { useEffect, useRef, useState } from 'react';
import Dialog from "react-native-dialog";
import { StyleSheet, Text, View ,Image, RefreshControl, StatusBar ,  Dimensions, TouchableOpacity,Platform,TextInput,Button} from 'react-native';
import { FlatList,} from 'react-native-gesture-handler';
import {apiCall} from '../assets/js/apiCall';
import {apiPost} from '../assets/js/apiPost';
import { colors } from '../assets/js/colors';
import {contains} from '../assets/js/filter';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import { Checkbox } from 'react-native-paper';



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
    const [allBeers,setAllBeers] = useState([]);
    const [refreshing,setRefreshing] = useState(false);
    const [overlay,setOverlay]= useState(false);
    const [currentItem,setCurrentItem]= useState();
    const [visible,setVisible] = useState(false);
    const [visibleDelete,setVisibleDelete] = useState(false);
    const [quantity,setQuantity] = useState();
    const [query,setQuery] = useState();

    
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [formattedDate,setFormattedDate] = useState("");

    const onChange = (event,selectedDate) => {
        const currentDate = selectedDate || date;
        
        setFormattedDate(format(currentDate, "MM/yyyy"));
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
      
    const onPressCheckbox = ()=>{
      if(show == false){
        setFormattedDate(format(date, "MM/yyyy"))
      }
      else if(show == true){
        setFormattedDate("");
      }
      setShow(!show);
      
    }
    <Checkbox.Android
                        status={show ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setShow(!show);
                        }}
                      />
    
      
    
     
    
    
    
  

  
    
    
    const editBeer = (currentBeer)=>{
      navigation.navigate('EditBeer',{beer:currentBeer});
    }
    const deleteBeer = (id)=>{
      const deleted ={
        beer_id: id
      }
      const options={
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(deleted)
    };
    apiPost(`/deleteBeer`,options).then(response=>{ 
      if(response != null)
      {
        setVisibleDelete(false);
        setOverlay(false);
        loadBeers();
      }
      else{
        alert("Er is iets misgegaan");
      }
    })
    }
    const showDialog = ()=>{
      setFormattedDate("");
      setVisible(true);
      setShow(false);
      
    }
    const handleCancel = () => {
      setVisible(false);
      setOverlay(true);
    };
    const showDelete = ()=>{
      setVisibleDelete(true);
    }
   

  
    const SaveToStock = async()=>{
  
        
        
      const stock ={
        beer_id: currentItem._id,
        quantity: quantity,
        expirationDate : formattedDate
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
      setVisible(false);
    }
    const Overlay = ()=> {

      
     
      
      return(
        <View style={{position:"absolute",alignSelf:"center",width:"100%",height:"100%",backgroundColor: 'rgba(0,0,0,0.6)',justifyContent: 'center', alignItems: 'center'}}>
        
        <View style={{position:"absolute",alignSelf:"center",width:"80%",height:"30%",backgroundColor:colors.tertiary,borderColor:"white",borderWidth:2,borderRadius:10}}>
        
            <View style={{flex:3,flexDirection:"row",alignItems:"center"}}>
            <TouchableOpacity style={{position:"absolute",top:5,right:10}} onPress={()=>{setOverlay(false)}}>
            <Text style={{fontSize:30,color:"white"}}>X</Text>
        </TouchableOpacity>
                <TouchableOpacity style={{flex:1}} onLongPress={showDelete}>
                  <Image style={styles.overlayImage} source={{uri:currentItem.beer_img}}/></TouchableOpacity>
                <View style={{flex:3, flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{padding:2, fontWeight:"bold"}}>{currentItem.beer_name}</Text>
                    <Text style={{padding:2}}>{currentItem.beer_percentage}</Text>
                    <Text style={{padding:2}}>{currentItem.beer_type}</Text>
                </View>
           </View>
            <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",justifyContent:"space-evenly"}}>
                <TouchableOpacity onPress={()=>{
                                    showDialog();
                                    setOverlay(false);}}>
                                    <Text style={{...styles.overlayButton}}>Toevoegen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    editBeer(currentItem)}} >
                    <Text style={{...styles.overlayButton}}>Aanpassen</Text>
                </TouchableOpacity>
               
            </View>
        </View>
        </View>
      )
    }
    
    const wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      }

    const loadBeers = ()=>{
        apiCall("dranken-lijst").then(data=>{
      
            setAllBeers(data);
            setBeers(formatData(data,numColumns));
         
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
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadBeers();
        setQuery("")
        wait(1000).then(() => setRefreshing(false));
      }, []);

    

    useEffect(()=>{
      navigation.addListener('focus',()=>{
           loadBeers();
           setQuery("")
           setOverlay(false);
       })

       
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

    const handleSearch = (text)=>{
      const formatQuery = text.toLowerCase();
      setQuery(text);
      setBeers(formatData(contains(allBeers,formatQuery),numColumns));
      
    }
   
    

    
  
    return(
        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <FlatList ListHeaderComponent={<TextInput style={{height: 40 ,padding: 10,margin:2, backgroundColor:"white",borderRadius:5}} clearButtonMode="always"  placeholder="Search"  onChangeText={text=>handleSearch(text)} />} 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  data={beers} renderItem={renderItem} keyExtractor={(item)=>{return item._id}} numColumns={numColumns}/>

            {overlay?<Overlay currentItem={currentItem}></Overlay>:<View></View>}
            {visible?
              <Dialog.Container visible={visible}>
                <Dialog.Title>Stock</Dialog.Title>
                <Dialog.Description>
                  Geef in hoeveel je wilt toevoegen aan stock!
                </Dialog.Description>
                <Dialog.Input onChangeText={(text)=>{setQuantity(text)}} style={styles.dialogInput}></Dialog.Input>
                <View style={{flexDirection:'row',alignItems:"center",justifyContent:"center"}}>
                      
                      <Checkbox.Android
                        status={show ? 'checked' : 'unchecked'}
                        onPress={() => {
                          onPressCheckbox();
                        }}
                      />
                      <Text>Vervaldatum :</Text>
                      {show && (
                    
                        <DateTimePicker
                        style={{backgroundColor:'white',width:'50%'}}
                          testID="dateTimePicker"
                          value={date}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={onChange}
                        />
                      )}
                    </View>
                
                <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                <Dialog.Button style={styles.dialogButton} label="Cancel" onPress={handleCancel} />
                <Dialog.Button style={styles.dialogButton} label="Voeg toe" onPress={SaveToStock} />
                </View>
              </Dialog.Container>
            :<View></View>}
            {visibleDelete?
              <Dialog.Container visible={visibleDelete}>
                <Dialog.Title>Verwijderen</Dialog.Title>
                <Dialog.Description>
                  Ben je zeker dat je {currentItem.beer_name} wilt verwijderen?
                </Dialog.Description>
                
               
                
                <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                <Dialog.Button style={styles.dialogButton} label="Cancel" onPress={()=>{setVisibleDelete(false);setOverlay(true);}} />
                <Dialog.Button style={styles.dialogButton} label="Verwijder" onPress={()=>{deleteBeer(currentItem._id)}} />
                </View>
              </Dialog.Container>
            :<View></View>}
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
        height: Dimensions.get('window').width/numColumns
        ,borderRadius:5,borderColor:'white',borderWidth:2
        
       
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
        textAlign:"center",
        elevation: 12,
        
      }
      ,overlayText:{
        fontSize:20,
        color:"white",
        paddingBottom:10,
      
      },
      dialogInput:{
        ...Platform.select({
          android:{borderColor:'rgba(0,0,0,0.1)',borderWidth:1,borderRadius:5}
        })
      },
      dialogButton:{
        ...Platform.select({
          ios:{padding:10,paddingBottom:15,color:colors.tertiary},
          android:{borderWidth:1,borderColor:"rgba(0,0,0,0.1)",padding:10,borderRadius:5,backgroundColor:colors.primary,color:colors.tertiary}
          
        })
      }
  });