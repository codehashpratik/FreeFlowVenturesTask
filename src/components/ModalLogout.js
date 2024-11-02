import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {Colors, Fonts, Icons} from '../themes/Themes';
import normalize from '../utils/normalize';
import {useDispatch} from 'react-redux';
import {logOutSuccess} from '../redux/reducer/AuthReducer';
// import {logoutRequest} from '../redux/reducer/AuthReducer';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const ModalLogout = ({isLogOut = false, onBackdropPress = () => {}}) => {
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);
  return (
    <Modal
      isVisible={isLogOut}
      backdropOpacity={0.5}
      animationIn={'zoomIn'}
      animationOut={'slideOutDown'}
      animationInTiming={700}
      animationOutTiming={800}
      onBackButtonPress={() => onBackdropPress()}
      onBackdropPress={() => onBackdropPress()}
      style={{
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        margin: 0,
        padding: 0,
      }}>
      <View
        style={{
          width: '90%',
          height: '33%',
          backgroundColor: 'white',
          position: 'absolute',
          alignSelf: 'center',
          // bottom: 0,
          borderTopLeftRadius: normalize(15),
          borderTopRightRadius: normalize(15),
          paddingHorizontal: normalize(15),
          paddingVertical: normalize(30),
          borderBottomLeftRadius: normalize(15),
          borderBottomRightRadius: normalize(15),
        }}>
        <View
          style={{
            height: normalize(65),
            width: normalize(65),
            borderColor: Colors.orange,
            backgroundColor: 'white',
            borderRadius: normalize(100),
            alignSelf: 'center',
            marginBottom: normalize(15),
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: 'blue',
            elevation: normalize(9),
          }}>
          <View
            style={{
              height: normalize(58),
              width: normalize(58),
              borderColor: Colors.orange,
              backgroundColor: Colors.white,
              borderRadius: normalize(100),
              shadowColor: 'blue',
              elevation: normalize(5),
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Icons.logout}
              style={{
                height: normalize(25),
                width: normalize(25),
                resizeMode: 'contain',
                tintColor: Colors.smoke,
                marginRight: normalize(4),
              }}
            />
          </View>
        </View>
        <Text
          style={{
            fontFamily: Fonts.Roboto_Medium,
            fontSize: normalize(12),
            alignSelf: 'center',
            color: Colors.black,
          }}>
          Are You Sure You Want To
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Roboto_Medium,
            fontSize: normalize(12),
            alignSelf: 'center',
            color: Colors.black,
          }}>
          Logout?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: normalize(10),
          }}>
          <TouchableOpacity
            onPress={() => {
              const token = AuthReducer.isToken;
              firestore().collection('users').doc(token).update({
                status: isOnline,
              });
              dispatch(logOutSuccess());
            }}
            style={{
              height: normalize(30),
              width: normalize(75),
              backgroundColor: Colors.orange,
              borderRadius: normalize(7),
              justifyContent: 'center',
              marginHorizontal: normalize(5),
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto_Medium,
                fontSize: normalize(8),
                color: Colors.white,
                textAlign: 'center',
              }}>
              LOGOUT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onBackdropPress()}
            style={{
              height: normalize(30),
              width: normalize(75),
              backgroundColor: Colors.white,
              borderRadius: normalize(7),
              justifyContent: 'center',
              marginHorizontal: normalize(5),
              borderWidth: 1,
              borderColor: Colors.orange,
            }}>
            <Text
              style={{
                fontFamily: Fonts.Roboto_Medium,
                fontSize: normalize(8),
                color: Colors.orange,
                textAlign: 'center',
              }}>
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLogout;
