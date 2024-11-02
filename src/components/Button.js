import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import normalize from '../utils/normalize';
import {Colors, Fonts} from '../themes/Themes';

const Button = ({
  title = 'Title',
  color = Colors.orange,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        height: normalize(44),
        width: '90%',
        backgroundColor: color,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: normalize(15),
        borderRadius: normalize(7),
        alignSelf: 'center',
      }}>
      <Text
        style={{
          color: Colors.white,
          fontSize: normalize(15),
          fontFamily: Fonts.Roboto_Medium,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
