import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, Fonts, Icons} from '../../themes/Themes';
import normalize from '../../utils/normalize';
import CustomTextinput from '../../components/CustomTextinput';
import Button from '../../components/Button';
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../../redux/reducer/AuthReducer';
import auth from '@react-native-firebase/auth';
import showMessage from '../../utils/showMessage';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passRef = useRef();
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validation() {
    if (email == '') {
      showMessage('Please enter email');
    } else if (password == '') {
      showMessage('Please enter password');
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          showMessage('Login Successfull!');
          let token = auth().currentUser.uid;
          dispatch(signInSuccess(token));

          console.log(token);
        })

        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            showMessage('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            showMessage('That email address is invalid!');
          }

          console.error(error);
          showMessage(
            'The supplied auth credential is incorrect, malformed or has expired',
          );
        });
    }
  }

  useEffect(() => {
    if (validateEmail(email) && password) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [email, password]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
        <Image
          source={Icons.LoginImg}
          style={{
            height: normalize(200),
            width: normalize(200),
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: normalize(40),
          }}
        />
        <Image
          source={Icons.dots}
          style={{
            height: normalize(10),
            width: normalize(30),
            alignSelf: 'center',
            resizeMode: 'contain',
            marginTop: normalize(10),
            marginBottom: normalize(10),
          }}
        />

        <CustomTextinput
          placeholder={'Enter email address'}
          value={email}
          onChangeText={e => setEmail(e)}
          onSubmitEditing={() => {
            passRef.current.focus();
          }}
        />
        <CustomTextinput
          placeholder={'Create login password'}
          value={password}
          onChangeText={e => setPassword(e)}
          secureTextEntry={true}
          refer={passRef}
          onSubmitEditing={() => {
            confirmPassRef.current.focus();
          }}
        />
        <Button
          title="Signup"
          color={status ? Colors.orange : Colors.smoke}
          onPress={() => {
            validation();
          }}
        />
        <Text
          style={{
            fontFamily: Fonts.Roboto_Regular,
            fontSize: normalize(11),
            textAlign: 'center',
            marginRight: normalize(50),
          }}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignUp');
          }}
          style={{
            // height: normalize(21),
            // width: normalize(60),
            // backgroundColor: Colors.white,
            position: 'absolute',
            right: normalize(60),
            bottom: normalize(30),
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.Roboto_Regular,
              fontSize: normalize(11),
              color: Colors.orange,
            }}>
            Signup now!
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: normalize(30),
            width: '100%',
            backgroundColor: Colors.white,
            // marginTop: normalize(5),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={Icons.info}
            style={{
              height: normalize(10),
              width: normalize(10),
              resizeMode: 'contain',
              marginLeft: normalize(17),
            }}
          />
          <Text
            style={{
              fontSize: normalize(9),
              marginLeft: normalize(4),
              color: Colors.smoke,
            }}>
            You accept the{' '}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: Colors.orange,
                fontSize: normalize(9),
              }}>
              terms and conditions
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: normalize(9),
              marginHorizontal: normalize(4),
              color: Colors.smoke,
            }}>
            and
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: Colors.orange,
                fontSize: normalize(9),
              }}>
              terms and conditions
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: normalize(9),
            marginLeft: normalize(35),
            position: 'absolute',
            bottom: normalize(-4),
            left: normalize(-3),
            color: Colors.smoke,
          }}>
          of app by registering it
        </Text>
      </ScrollView>
    </View>
  );
};

export default Login;
