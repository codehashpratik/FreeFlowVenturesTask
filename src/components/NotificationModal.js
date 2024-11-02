import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Colors, Fonts, Icons} from '../themes/Themes';
import normalize from '../utils/normalize';

const NotificationModal = ({
  isNotification = false,
  onBackdropPress = () => {},
}) => {
  return (
    <Modal
      isVisible={isNotification}
      backdropOpacity={0.5}
      animationIn="slideInDown"
      animationOut="slideOutUp"
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={onBackdropPress}
      onBackdropPress={onBackdropPress}
      hideModalContentWhileAnimating={true}
      style={{
        justifyContent: 'flex-start',
        margin: 0,
      }}>
      <View
        style={{
          width: '100%',
          height: normalize(120),
          backgroundColor: 'white',
          borderBottomLeftRadius: normalize(15),
          borderBottomRightRadius: normalize(15),
          paddingHorizontal: normalize(15),
          paddingVertical: normalize(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={Icons.Notification}
            style={{
              height: normalize(25),
              width: normalize(25),
              resizeMode: 'contain',
              marginLeft: normalize(7),
            }}
          />
          <Text
            style={{
              fontFamily: Fonts.Roboto_Regular,
              color: Colors.orange,
              fontSize: normalize(12),
              marginLeft: normalize(7),
            }}>
            You're poked by
          </Text>
        </View>
        <View
          style={{
            height: normalize(60),
            width: '100%',
            backgroundColor: Colors.white,
            marginVertical: normalize(7),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Icons.user}
            style={{
              height: normalize(50),
              width: normalize(50),
              marginLeft: normalize(10),
            }}
          />
          <View
            style={{
              height: normalize(40),
              width: '70%',
              backgroundColor: Colors.white,
              marginLeft: normalize(15),
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto_Medium,
                fontSize: normalize(13),
                color: Colors.black,
                marginLeft: normalize(5),
              }}>
              User name
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Roboto_Regular,
                fontSize: normalize(10),
                color: Colors.smoke,
                marginLeft: normalize(5),
              }}>
              Username@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;
