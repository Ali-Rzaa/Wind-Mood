import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, Button, FlatList, View, ScrollView } from 'react-native'
import Header from './header/Header'

export default function Search() {
  const [city, setCity] = useState('')
  const [cities, setCities] = useState([])
  const FetchCities = (text)=>{
    fetch(`https://www.ventusky.com/ventusky_mesta.php?q=${text}&lang=en`)
    .then(item=> item.json()) 
    .then(citydata=>
      setCities(citydata))
  }
  const onSubmit = () => {
  }
  const Item = ({title}) => (
    <View style={styles.item}>
      <Text onPress={()=> setCity(title)} style={styles.itemTitle}>{title}</Text>
    </View>
  );
  return (
    <ScrollView style={styles.container}>
        <Header></Header>
        <Text style={styles.heading}>Check Weather of your city</Text>
        <TextInput editable value={city} style={styles.inputField} onChangeText={text => FetchCities(text)} placeholderTextColor={'#ffaabb'} placeholder='Enter your city...' variant="outlined" />
        <FlatList
          nestedScrollEnabled
          data={cities}
          style={styles.list}
          renderItem={({item}) => <Item title={item.address.city} />}
          keyExtractor={item => item.address.city}
        />
        <Button
          // onPress={onSubmit}
          style={styles.checkButton}
          title="Check"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text style={{color:'black'}}>{city}</Text> 
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container:{
    color:'black',
  },
  heading:{
    textAlign:'center',
    justifyContent: "center",
    color:'black',
    fontSize:20,
    marginVertical:20
  },
  inputField:{
    color:'black',
    marginHorizontal: 20,
    borderWidth: .2,
    borderColor: '#7580FF',
  },
  checkButton:{
    width: '20%',
  },
  list:{
    marginHorizontal: 50,
    borderColor:'#7580FF',
    borderWidth: .5,
    height: 300,
    borderRadius:5,
    // backgroundColor:'black',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  item:{
    paddingVertical:10,
    paddingHorizontal:20,
    borderBottomWidth: .3,
    borderBlockColor: '#7580FF'
  },
  itemTitle:{
    color:'black',
    
  }
})
