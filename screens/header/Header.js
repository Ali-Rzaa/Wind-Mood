import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StatusBar, TextInput, StyleSheet, Image } from 'react-native';
import Search from '../Search'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { HStack, IconButton, Box, Icon, NativeBaseProvider, Text, View } from 'native-base';
import { appIcon } from '../../constant/source';


const Header = ({setCityName}) => {

  return (
    <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.400" />
      <HStack borderBottomLeftRadius={15} borderBottomRightRadius={15} bg="#7580FF" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
          <Image source={appIcon} style={{width:45,height:45}}/>
          <View ml='2'>
            <Text color="white" fontSize="20" fontWeight="bold">
              Wind Mood
            </Text>
            <Text color="white" fontSize="7" mt='-1.5' ml='1'>
              Check Weather in your area
            </Text>
          </View>
        </HStack>
        <HStack>
          <View style={styles.search}>
            <Search setCityName={setCityName}></Search>
            <IconButton icon={<Icon as={MaterialIcons} name="map-marker-radius" size="sm" color="white" />} />
          </View>
        </HStack>
      </HStack>
    </>
  );
};
const styles = StyleSheet.create({
  search:{
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'white',
    borderStyle: 'dashed',
    height: 40
  }
})
export default Header;