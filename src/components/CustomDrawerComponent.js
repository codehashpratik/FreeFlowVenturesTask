import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Colors, Fonts, Icons} from '../themes/Themes';
import normalize from '../utils/normalize';
import Picker from './Picker';
import {getImageFromGallery} from '../utils/helper';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import ModalLogout from './ModalLogout';
import firestore from '@react-native-firebase/firestore';

const CustomDrawerComponent = props => {
  const {state, descriptors, navigation} = props;
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLogOut, setIsLogOut] = useState(false);
  const [users, setUsers] = useState([]);
  const currentUserId = auth().currentUser.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      // Uncomment this line if you want to filter by online status
      .where('status', '==', true)
      .onSnapshot(snapshot => {
        const onlineUsers = snapshot.docs
          .filter(doc => doc.id !== currentUserId) // Exclude the current user
          .map(doc => ({id: doc.id, ...doc.data()}));
        setUsers(onlineUsers);
      });

    return unsubscribe; // Correctly clean up the listener on component unmount
  }, [currentUserId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.closeDrawer();
        }}
        style={{
          position: 'absolute',
          top: normalize(10),
          left: normalize(10),
        }}>
        <Image
          source={Icons.back}
          style={{
            height: normalize(35),
            width: normalize(55),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={{
          height: normalize(125),
          width: normalize(125),
          alignSelf: 'center',
          marginTop: normalize(55),
          borderRadius: normalize(100),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={imageUrl !== null ? imageUrl : Icons.user}
          style={{
            height: normalize(100),
            width: normalize(100),
            borderRadius: normalize(100),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={{
          position: 'absolute',
          right: normalize(55),
          top: normalize(136),
        }}>
        <Image
          source={Icons.editPic}
          style={{
            height: normalize(27),
            width: normalize(27),
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontFamily: Fonts.Roboto_Regular,
          fontSize: normalize(14),
          textAlign: 'center',
          marginTop: normalize(15),
          marginBottom: normalize(30),
        }}>
        User name
      </Text>

      <ScrollView>
        {state.routes.map((item, index) => {
          const {options} = descriptors[item.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : item.name;

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: item.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(item.name, item.params);
            }
          };
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress()}
              style={{
                height: normalize(40),
                width: '90%',
                backgroundColor: Colors.white,
                marginTop: normalize(15),
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: Colors.black,
                borderStyle: 'dotted',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: normalize(13),
                  fontFamily: Fonts.Roboto_Medium,
                  marginLeft: normalize(10),
                }}>
                {label}
              </Text>
              <Image
                source={Icons.Vector}
                style={{
                  height: normalize(13),
                  width: normalize(13),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          );
        })}

        {/* //-----logout button implemented manually and is not a part of a screen. */}
        <TouchableOpacity
          onPress={() => setIsLogOut(true)}
          style={{
            height: normalize(40),
            width: '90%',
            backgroundColor: Colors.white,
            marginTop: normalize(15),
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            borderBottomColor: Colors.black,
            borderStyle: 'dotted',
            borderBottomWidth: 1,
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: normalize(13),
              fontFamily: Fonts.Roboto_Medium,
              marginLeft: normalize(10),
            }}>
            Logout
          </Text>
          <Image
            source={Icons.Vector}
            style={{
              height: normalize(13),
              width: normalize(13),
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        {/* Custom picker is used just to change the picture but not implemented socially as 
        in order to use firebase authentication, firbase firestore and storage, i have to buy premium plans. */}

        <Picker
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          height={250}
          isTabLine={true}
          children={
            <View style={styles.v2}>
              <Text style={styles.t4}>Select Image</Text>

              {['Take Photo', 'Choose from Library...'].map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      if (index == 0) {
                        getImageFromCamera(img => {
                          setIsVisible(false);
                          if (img) {
                            setImageUrl({uri: img?.uri, cache: 'reload'});
                            setImagePath(img?.path);
                          }
                        });
                      } else {
                        getImageFromGallery(img => {
                          setIsVisible(false);
                          if (img) {
                            setImageUrl({uri: img?.uri, cache: 'reload'});
                            setImagePath(img?.path);
                          }
                        });
                      }
                    }}
                    style={[
                      {
                        backgroundColor: index == 0 ? 'white' : 'black',
                        borderColor: 'black',
                      },
                      styles.touch,
                    ]}>
                    <Image
                      source={
                        index == 0
                          ? {
                              uri: 'https://cdn-icons-png.flaticon.com/128/2951/2951086.png',
                            }
                          : {
                              uri: 'https://cdn-icons-png.flaticon.com/128/3342/3342137.png',
                            }
                      }
                      style={{
                        resizeMode: 'contain',
                        height: 22,
                        width: 22,
                        tintColor: index == 0 ? 'grey' : 'white',
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: index == 0 ? 10 : 10,
                        marginRight: index == 1 ? 10 : 0,
                        color: index == 0 ? 'black' : 'white',
                        fontSize: 16,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }
        />
        {users.length !== 0 && (
          <View
            style={{
              height: normalize(16),
              width: normalize(16),
              backgroundColor: Colors.green,
              borderRadius: normalize(100),
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: normalize(125),
              left: normalize(51),
            }}>
            <Text
              style={{
                color: Colors.white,
                textAlign: 'center',
              }}>
              {users.length}
            </Text>
          </View>
        )}

        <ModalLogout
          isLogOut={isLogOut}
          onBackdropPress={() => setIsLogOut(false)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  t4: {
    color: 'black',
    fontSize: 22,
    marginBottom: 10,
  },
  v2: {paddingVertical: 10, paddingHorizontal: 18},
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    marginVertical: 8,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  t1: {
    height: 350,
    width: '90%',
    borderRadius: 8,
    borderColor: 'grey',
    borderStyle: 'dashed',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomDrawerComponent;
