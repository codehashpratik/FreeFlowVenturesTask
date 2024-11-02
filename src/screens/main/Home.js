import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Fonts, Icons} from '../../themes/Themes';
import normalize from '../../utils/normalize';
import Button from '../../components/Button';
import {useIsFocused} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import NotificationModal from '../../components/NotificationModal';

const Home = props => {
  const isFocused = useIsFocused();
  const [isOnline, setIsOnline] = useState(true);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    if (isFocused) {
      const token = AuthReducer.isToken;
      firestore().collection('users').doc(token).update({
        status: isOnline,
      });
    }
  }, [isFocused]);

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
          position: 'absolute',
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
        source={Icons.Notification}
        style={{
          height: normalize(100),
          width: normalize(100),
          alignSelf: 'center',
          marginTop: normalize(150),
        }}
      />
      <View
        style={{
          height: normalize(70),
          width: '100%',
          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: normalize(25),
          paddingHorizontal: normalize(40),
        }}>
        <Text
          style={{
            fontFamily: Fonts.Lato_Regular,
            fontSize: normalize(11),
            textAlign: 'center',
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem repellendus accusantium eos aliquam delectus quaerat
          earum non voluptates sequi ipsa!
        </Text>
      </View>
      <Button
        title="Let's poke !"
        onPress={() => {
          setIsNotification(true);
        }}
      />
      <NotificationModal
        isNotification={isNotification}
        onBackdropPress={() => setIsNotification(false)}
      />
    </View>
  );
};

export default Home;
