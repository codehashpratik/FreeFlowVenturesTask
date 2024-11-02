import {
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, Fonts, Icons} from '../../themes/Themes';
import normalize from '../../utils/normalize';
import CustomTextinput from '../../components/CustomTextinput';
import Button from '../../components/Button';
import showMessage from '../../utils/showMessage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [number, setNumber] = useState('');
  const emailRef = useRef();
  const numberRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const [status, setStatus] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePassword(pass) {
    var vp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return vp.test(pass);
  }

  function validation() {
    if (name == '') {
      showMessage('Please Enter Your Name');
    } else if (number == '') {
      showMessage('Please Enter Your Mobile Number');
    } else if (email == '') {
      showMessage('Please Enter Your email');
    } else if (!validateEmail(email)) {
      showMessage('Please Enter a valid email');
    } else if (password == '') {
      showMessage('Please Enter Your Password');
    } else if (!validatePassword(password)) {
      showMessage(
        'Password must contain Minimum eight characters, at least one letter and one number ',
      );
    } else if (password != confirmPassword) {
      showMessage('Confirm Password Mismatch');
    } else {
      const userData = {
        name: name,
        number: number,
        email: email,
        status: isOnline,
      };

      // console.log('Hello');
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          showMessage('User account created Successfully!');
          let userId = auth().currentUser.uid;
          firestore().collection('users').doc(userId).set(userData);
          props.navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            showMessage('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            showMessage('That email address is invalid!');
          }

          showMessage(error);
        });
    }
  }

  useEffect(() => {
    if (
      name &&
      number &&
      validateEmail(email) &&
      validatePassword(password) &&
      password === confirmPassword
    ) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [name, email, password, confirmPassword, number]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
        <Text
          style={{
            fontFamily: Fonts.Roboto_Regular,
            fontSize: normalize(23),
            marginTop: normalize(60),
            marginLeft: normalize(30),
            textAlign: 'left',
            marginBottom: normalize(20),
          }}>
          Hello !{'                                     '}
          Welcome to the app
        </Text>
        <CustomTextinput
          placeholder={'Enter your name'}
          value={name}
          onChangeText={e => setName(e)}
          onSubmitEditing={() => {
            numberRef.current.focus();
          }}
        />

        <View
          style={{
            height: normalize(60),
            width: '100%',
            backgroundColor: Colors.white,
            margin: normalize(1),
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              height: normalize(41),
              width: normalize(50),
              backgroundColor: Colors.white,
              marginLeft: normalize(20),
              borderRadius: normalize(7),
              shadowColor: Colors.black,
              elevation: normalize(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Icons.india}
              style={{
                height: normalize(20),
                width: normalize(35),
              }}
            />
          </View>
          <View
            style={{
              height: normalize(41),
              width: '70%',
              backgroundColor: Colors.white,
              marginLeft: normalize(7),
              borderRadius: normalize(7),
              shadowColor: Colors.black,
              elevation: normalize(2),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Lato_Regular,
                fontSize: normalize(12),
                marginLeft: normalize(10),
              }}>
              + 91
            </Text>
            <TextInput
              placeholder="Enter your mobile number"
              placeholderTextColor={Colors.smoke}
              ref={numberRef}
              value={number}
              onChangeText={e => {
                setNumber(e);
              }}
              maxLength={10}
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
              keyboardType="numeric"
              style={{
                height: '100%',
                width: '75%',
                backgroundColor: Colors.white,
                marginLeft: normalize(5),
                color: Colors.black,
                fontSize: normalize(12),
              }}
            />
          </View>
        </View>
        <CustomTextinput
          placeholder={'Enter email address'}
          value={email}
          onChangeText={e => setEmail(e)}
          refer={emailRef}
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
        <CustomTextinput
          placeholder={'Retype login password'}
          value={confirmPassword}
          secureTextEntry={true}
          onChangeText={e => setConfirmPassword(e)}
          refer={confirmPassRef}
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
          Already have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Login');
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
            Login now!
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

export default SignUp;
