import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, Button, FlatList, View, ScrollView, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native'
import Header from './header/Header'

const Height = Dimensions.get("screen").height;
 const black = "pink"
export default function Search({setCityName}) {
  const [city, setCity] = useState('')
  const [cities, setCities] = useState([])
  useEffect (() =>{
      if(!city.trim()){
        setTimeout(() => {
          setCities([])
        }, 500);
        console.log("empty city")
      }
  },[city])
  const getCities = (text) => {
    fetch(`https://www.ventusky.com/ventusky_mesta.php?q=${text}&lang=en`)
    .then(item=> item.json()) 
    .then(citydata=>{
    setCities(citydata)})
    setCity(text);
  }
  const Item = ({title}) => (
    <TouchableOpacity onPress={async ()=>
      { 
        await AsyncStorage.setItem('city', title);
        setCityName(title);
        setCity(title);
        setCities([]);
      }} 
      style={styles.item}>
      <Text style={styles.itemTitle}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.inputField}>
            <TextInput caretHidden={true} cursorColor={"white"} color="white" value={city} onChangeText={text => getCities(text)} placeholderTextColor={'#ffaabb'} placeholder='Enter your city...'/>
          </View>
          {cities.length !==0?
            <ScrollView style={styles.list}>
              <FlatList
                scrollEnabled
                initialNumToRender={0}
                nestedScrollEnabled
                data={cities}
                maxToRenderPerBatch={5}
                renderItem={({item}) =>
                <Item title={item.address.city} />
                }
                keyExtractor={(item,index) => index}
              />
            </ScrollView>
            :
            <></>
          }
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    color:'black',
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer:{
    position: 'relative',
  },
  inputField:{
    color:'black',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#7580FF',
    paddingHorizontal: 10,
  },
  list:{
    borderColor:'#7580FF',
    borderWidth: .5,
    top: 50,
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'visible',
    flexWrap: 'nowrap',
    width: 160
  },
  item:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: .3,
    borderBottomColor: '#7580FF'
  },
  itemTitle:{
    color:'black',
  }
})
