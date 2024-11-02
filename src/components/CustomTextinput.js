import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import normalize from '../utils/normalize';
import {Colors, Icons} from '../themes/Themes';

const CustomTextinput = props => {
  const [isSecure, setIsSecure] = useState(false);

  function onChange(_value) {
    if (props.onChangeText) {
      props.onChangeText(_value);
    }
  }

  function onSubmit() {
    if (props.onSubmitEditing) {
      props.onSubmitEditing();
    }
  }

  useEffect(() => {
    if (props?.secureTextEntry == true) {
      setIsSecure(props?.secureTextEntry);
    }
  }, [props?.secureTextEntry]);
  return (
    <View
      style={{
        height: normalize(42),
        width: props?.width,
        backgroundColor: Colors.white,
        alignSelf: 'center',
        margin: normalize(9),
        borderRadius: normalize(7),
        justifyContent: 'center',
        alignItems: 'flex-start',
        shadowColor: Colors.black,
        elevation: normalize(2),
      }}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={Colors.smoke}
        value={props.value}
        onChangeText={onChange}
        returnKeyType={props?.returnKeyType}
        onSubmitEditing={onSubmit}
        keyboardType={props?.keyboardType}
        secureTextEntry={isSecure}
        ref={props?.refer}
        style={{
          height: '90%',
          width: '80%',
          backgroundColor: Colors.white,
          marginLeft: normalize(10),
          fontSize: normalize(12),
          textAlign: 'left',
        }}
      />
      {props?.secureTextEntry && (
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={{
            height: '100%',
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: normalize(10),
            position: 'absolute',
            right: normalize(-4),
          }}>
          <Image
            source={isSecure ? Icons.hidden : Icons.show}
            style={{
              width: 26,
              height: 26,
              resizeMode: 'contain',
              tintColor: Colors.black,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

CustomTextinput.PropTypes = {
  height: PropTypes.any,
  width: PropTypes.any,
  value: PropTypes.string,
  tintColor: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.any,
  title: PropTypes.string,
  onChangeText: PropTypes.func,
  keyboardType: PropTypes.func,
  secureTextEntry: PropTypes.string,
  returnKeyType: PropTypes.string,
  onSubmitEditing: PropTypes.func,
  marginV: PropTypes.number,
  marginH: PropTypes.number,
  marginR: PropTypes.number,
  marginL: PropTypes.number,
  marginB: PropTypes.number,
  marginS: PropTypes.number,
  marginE: PropTypes.number,
  marginT: PropTypes.number,
  padding: PropTypes.number,
  margin: PropTypes.number,
  paddingV: PropTypes.number,
  paddingH: PropTypes.number,
  paddingR: PropTypes.number,
  paddingL: PropTypes.number,
  paddingB: PropTypes.number,
  paddingS: PropTypes.number,
  paddingE: PropTypes.number,
  paddingT: PropTypes.number,
  backgroundColor: PropTypes.string,
  textAlign: PropTypes.string,
};

CustomTextinput.defaultProps = {
  title: 'Title',
  placeholder: 'Placeholder',
  keyboardType: 'default',
  width: '87.5%',
};

export default CustomTextinput;
