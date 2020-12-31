import React, { useState,useRef } from 'react';
import { StyleSheet,  View ,Image, ScrollView,TextInput, Dimensions,Text} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {apiCall} from '../assets/js/apiCall';
import {apiPost} from '../assets/js/apiPost';
import Toast from 'react-native-toast-message';
import {colors} from '../assets/js/colors';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';




export default ()=>{
    const [checked,setChecked] = useState("Blond");
    const [images,setImages] = useState();
    const [selectedImage,setSelectedImage] = useState();
    const [showImages,setShowImages]= useState(false);
    const [percentage,setPercentage]= useState("0");
    const [beerName,setBeerName] = useState("");
    const textInput = useRef();


    const postName = (name)=>{
        
       if (name.length > 0){
        apiCall(`getImages?beer_name=${name}`).then(data=>{setImages(data);setShowImages(true); });}
        
        
    }

    const refreshPage = ()=>{setChecked("Blond");setImages([]);setSelectedImage();setShowImages(false);setPercentage("0");setBeerName(); textInput.clear()};
    const saveBeer = ()=> {
       const beerObject = {
           beer_name: beerName,
           beer_img: selectedImage,
           beer_type: checked,
           beer_percentage: `${percentage}%`
       };
       
        const options={
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(beerObject)
        };

        apiPost('saveBeer',options).then(response=>{
            if(response == "true"){
                alert("Bestaat al");
            }
            else{
                alert("Toegevoegd");
                refreshPage();
            }
        })
    }
    
    return(
        //onsubmit editing van de naam van het bier kan er een call gedaan 
        //worden naar de foto's en kunnen die ondertussen al inladen eventueel met activtyindictator over de view waar de fotos worden ingeladen
    <View style={styles.screenContainer}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <View style={styles.inputContainer}>
            <Image style={styles.logo} source={require('../assets/smets.png')}></Image>
        </View>
    {/*Input fields and slider */}
    <View style={styles.inputContainer}>
        <TextInput style={styles.input} defaultValue={beerName}  onEndEditing={(event)=>{postName(event.nativeEvent.text);setBeerName(event.nativeEvent.text)}} placeholder="Naam van het bier" placeholderTextColor={colors.secondary}/>
        
        <View style={{flexDirection:"row"}}>
        <TextInput  onChangeText={text => setPercentage(text)} style={{color:"white",fontSize:30}} placeholder="0" keyboardType="numbers-and-punctuation" value={percentage} />
        <Text style={{color:"white",fontSize:30}}>%</Text></View>
    </View>
    
        
    {/*RadioButtons */}
    <View style={styles.radioContainer}>
        <RadioButton.Android
            
            color={colors.tertiary}
            value="Blond"
            status={ checked === 'Blond' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Blond')}
        />
        <Text style={{color:"white"}}>Blond</Text>
        <RadioButton.Android
            color={colors.tertiary}
            value="Donker"
            status={ checked === 'Donker' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Donker')}
        />
        <Text style={{color:"white"}}>Donker</Text>
        <RadioButton.Android
            color={colors.tertiary}
            value="Rood"
            status={ checked === 'Rood' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Rood')}
        />
        <Text style={{color:"white"}}>Rood</Text>
        <RadioButton.Android
            color={colors.tertiary}
            value="Amber"
            status={ checked === 'Amber' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('Amber')}
        />
        <Text style={{color:"white"}}>Amber</Text>
    </View>

    {/*Picture scrollview */}
    <View style={styles.scrollView}>
        {!showImages? <ActivityIndicator size="large"/> :
            <View style={{backgroundColor:colors.primary,height:"100%"}} >
            <ScrollView horizontal={true} style={{}}  >
             
            {images.map((item)=>(
                <TouchableHighlight key={item}  onPress={()=>{setSelectedImage(item)}}>
                    <Image style={[styles.image,item == selectedImage?styles.selected:{}]} source={{uri:item}}/>
                </TouchableHighlight>
            ))}
            </ScrollView>
            </View>
        }
    </View>

    {/*Button */}
    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>{saveBeer();}} style={styles.button}>
            <Text style={{color:"white"}}>Voeg toe</Text>
        </TouchableOpacity>
    </View>
</View>
    )
}

const styles = StyleSheet.create({
    screenContainer:{
        flex:1,
        backgroundColor:colors.primary,
        alignItems:"stretch",
        justifyContent:"center"
    },
    inputContainer:{
        flex:2,
        width:'80%',
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center"

    },
    radioContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
    },
    scrollView:{
        flex:2,
        alignItems:"center",
        justifyContent:"center"
    },
    buttonContainer:{
        flex:1,
        alignItems:"stretch",
        justifyContent:"center"
    
    },
    input:{
        width:"80%",
        borderColor:colors.secondary,
        borderWidth:2,
        padding:10,
        margin:5,
        color:colors.secondary
    },
    image:{
        width:100,height:100,resizeMode:"contain",borderWidth:1,borderColor:colors.secondary,alignSelf:"center",margin:1
    },
    logo:{
        width:120,height:120,resizeMode:"contain"
    },
    selected:{backgroundColor:colors.tertiary},
    button:{
        backgroundColor:colors.primary,
        borderColor:colors.secondary,
        alignSelf:"center",
        borderWidth:1,
        padding:7,
        width:"80%",
        borderRadius:12,
        alignItems:"center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 12,

    }

  });