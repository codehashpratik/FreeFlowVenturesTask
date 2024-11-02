import {View, Text, TouchableOpacity, StatusBar, Image} from 'react-native';
import React from 'react';
import {Colors, Fonts, Icons} from '../../themes/Themes';
import normalize from '../../utils/normalize';

const Editprofile = props => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View
        style={{
          height: normalize(50),
          width: '100%',
          backgroundColor: Colors.white,
          shadowColor: Colors.black,
          elevation: normalize(4),
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.openDrawer();
          }}
          style={{
            position: 'absolute',
            right: normalize(12),
            top: normalize(10),
          }}>
          <Image
            source={Icons.drawer}
            style={{
              height: normalize(30),
              width: normalize(30),
              resizeMode: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={Icons.dog}
        style={{
          height: normalize(200),
          width: normalize(200),
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: normalize(100),
        }}
      />
      <Text
        style={{
          fontFamily: Fonts.Roboto_Medium,
          fontSize: normalize(17),
          textAlign: 'center',
          marginTop: normalize(10),
          color: Colors.smoke,
        }}>
        Oops... We are Working on it
      </Text>
      <Text
        style={{
          fontFamily: Fonts.Lato_Regular,
          fontSize: normalize(14),
          textAlign: 'center',
          marginTop: normalize(5),
          color: Colors.black,
        }}>
        Feature will be available soon
      </Text>
    </View>
  );
};

export default Editprofile;
