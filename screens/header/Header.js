import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Header = () => {

  return (
    <Appbar.Header style={{justifyContent:"center", backgroundColor:"#7580FF"}} theme={{
        colors:{
            primary:"#66339A"
        },
    }}>
        <Title style={{color:"white"}}>Wind Mood</Title>
    <Appbar.Action icon="magnify" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
};

export default Header;