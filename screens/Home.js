import React, { useEffect, useState } from 'react'
import { Text, ImageBackground, View, StyleSheet, AsyncStorage } from 'react-native'
import Header from './header/Header'
import { backgroundDay, backgroundNight } from '../constant/source'

export default function Home() {
  const [cityName,setCityName] = useState('')
  const [date,setDate] = useState('')
  const [background,setBackground] = useState('')
  const [colorScheme,setColorScheme] = useState('')
  const [weatherCondition,setWeatherCondition] = useState('')
  const [windDirection,setWindDirection] = useState('')
  const [weatherData,setWeatherData] = useState([])
  // { cloud_pct: 5,
  //   │ temp: 40,
  //   │ feels_like: 44,
  //   │ humidity: 32,
  //   │ min_temp: 40,
  //   │ max_temp: 40,
  //   │ wind_speed: 4.11,
  //   │ wind_degrees: 180,
  //   │ sunrise: 1691022472,
  //   └ sunset: 1691071398 }
  useEffect(async () => {
    var hours = new Date().getHours(); //Current Hours
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth(); //Current Month
    setCityName(await AsyncStorage.getItem('city'));
    if(date<10) {
      date='0'+date;
    }
    switch(month){
      case 1: 
        setDate(date+' January');
        break;
      case 2: 
        setDate(date+' Fabruary');
        break;
      case 3: 
        setDate(date+' March');
        break;
      case 4: 
        setDate(date+' April');
        break;
      case 5: 
        setDate(date+' May');
        break;
      case 6: 
        setDate(date+' Jun');
        break;
      case 7: 
        setDate(date+' July');
        break;
      case 8: 
        setDate(date+' August');
        break;
      case 9: 
        setDate(date+' September');
        break;
      case 10: 
        setDate(date+' Octobar');
        break;
      case 11: 
        setDate(date+' November');
        break;
      case 12: 
        setDate(date+' December');
        break;
    }
    if(hours>=19 && hours<=5)
    {
      setColorScheme(eval('styles.nightText'))
      setBackground(backgroundNight)} 
    else{
      setColorScheme(eval('styles.dayText'))
      setBackground(backgroundDay);
    }
  }, []);
  useEffect( () =>{
    if(cityName!=='') {
       getData()
    }
  },[cityName])
  const getData = async () => {
    await fetch(`https://api.api-ninjas.com/v1/weather?city=${cityName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'X-Api-Key': 'ejvYse6JpeE+ZW9XwvSSnw==PT07ClBmxlVq8E5n'
      }
    }).then(response => response.json())
    .then(data => {
      setWeatherData(data);
      switch(true)
      {
        case data.cloud_pct<10:
          setWeatherCondition('Clear');
          break;
        case data.cloud_pct<30:
          setWeatherCondition('Mostly Sunny');
          break;
        case data.cloud_pct<70:
          setWeatherCondition('Partly Cloudy');
          break;
        case data.cloud_pct<90:
          setWeatherCondition('Mostly Cloudy');
          break;
        case data.cloud_pct>90:
          setWeatherCondition('Cloudy');
          break;
      }
      Direction(data.wind_degrees);
  });
  function  Direction(degree){
    if (degree>337.5) setWindDirection('Northerly');
    if (degree>292.5) setWindDirection('North Westerly');
    if(degree>247.5) setWindDirection('Westerly');
    if(degree>202.5) setWindDirection('South Westerly');
    if(degree>157.5) setWindDirection('Southerly');
    if(degree>122.5) setWindDirection('South Easterly');
    if(degree>67.5) setWindDirection('Easterly');
    if(degree>22.5){ setWindDirection('North Easterly');}
    return 'Northerly';
}
  }
  return (
    <>
    <ImageBackground style={{flex: 1}} imageStyle={{opacity: 0.7}} source={background} resizeMode="cover">
      <Header setCityName={setCityName}></Header>
      {weatherData.length!==0?
        <>
        <Text style={[styles.temperatureText,colorScheme,{fontSize:18,marginLeft:20}]} >{date}</Text>
          <View style={[styles.temperatureBlock]}>
            <Text style={[styles.temperatureText,colorScheme,{fontSize:30}]} >{cityName}</Text>
            <Text style={[styles.temperatureText,colorScheme,{fontSize:75}]} >{weatherData.temp}<Text>°</Text></Text>
            <View style={{display:'flex',flexDirection:'row'}}>
              <Text style={[styles.temperatureText,colorScheme, {fontSize: 15,marginRight: 10}]} >Min: {weatherData.min_temp}<Text>°</Text></Text>
              <Text style={[styles.temperatureText,colorScheme, {fontSize: 15}]} >Max: {weatherData.max_temp}<Text>°</Text></Text>
            </View>
            <Text style={[styles.temperatureText,colorScheme]} >{weatherCondition}</Text>
          </View>
          <View style={styles.detailBlock}>
            <View style={{display:'flex', flexDirection:'row'}}>
              <View style={{alignItems:'flex-end', marginRight:20}}>
                <Text style={[styles.temperatureText,colorScheme,{fontWeight:'400'}]} >Humidity:</Text>
                <Text style={[styles.temperatureText,colorScheme,{fontWeight:'300'}]} >Wind Speed:</Text>
                <Text style={[styles.temperatureText,colorScheme,{fontWeight:'300'}]} >Wind Direction:</Text>
              </View>
              <View>
                <Text style={[styles.temperatureText,colorScheme]} > {weatherData.humidity}%</Text>
                <Text style={[styles.temperatureText,colorScheme]} > {weatherData.wind_speed}mph</Text>
                <Text style={[styles.temperatureText,colorScheme]} > {windDirection}</Text>
              </View>
            </View>
          </View>
        </>
      :
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <Text style={[styles.temperatureText,colorScheme,{fontSize:20,fontWeight:'bold'}]}>Please enter your city in Navbar</Text>
        </View>
      }
    </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  temperatureText:{
    marginTop:10,
    fontSize:20,
    fontFamily: 'sans-serif-thin',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  temperatureBlock:{
    justifyContent:'center', 
    flex:1, 
    alignItems:'center', 
    paddingTop:60
  },
  detailBlock:{ 
    flex:2, 
    alignItems:'center', 
    justifyContent:'center', 
    paddingTop:40
  },
  dayText:{
    color:'#7580FF',
    textShadowColor: '#f7f8fa',
  },
  nightText:{
    color:'#f7f8fa',
    textShadowColor: '#7580FF',
  }
})
