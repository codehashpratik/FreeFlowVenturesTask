import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Colors, Fonts, Icons} from '../../themes/Themes';
import normalize from '../../utils/normalize';
import Button from '../../components/Button';
import NotificationModal from '../../components/NotificationModal';
import showMessage from '../../utils/showMessage';

const PokeList = props => {
  const [users, setUsers] = useState([]);
  const currentUserId = auth().currentUser.uid;
  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .where('status', '==', true)
      .onSnapshot(snapshot => {
        const onlineUsers = snapshot.docs
          .filter(doc => doc.id !== currentUserId)
          .map(doc => ({id: doc.id, ...doc.data()}));

        setUsers(onlineUsers);
      });

    return unsubscribe;
  }, [currentUserId]);

  const handlePokeAll = async () => {
    if (users.length > 0) {
      const updates = users.map(user => {
        const userRef = firestore().collection('users').doc(user.id);
        return userRef.update({
          pokes: firestore.FieldValue.increment(1), // Increment the pokes field by 1
        });
      });

      try {
        await Promise.all(updates); // Wait for all updates to complete
        showMessage('Poked Successfully');
        setIsNotification(true);
      } catch (error) {
        showMessage('Failed to poke users. Please try again.');
        console.error('Error updating pokes:', error);
      }
    } else {
      showMessage('No users available to poke.');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f5f6f9'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />

      <View
        style={{
          height: normalize(50),
          width: '100%',
          backgroundColor: Colors.white,
          marginBottom: normalize(10),
          shadowColor: Colors.black,
          elevation: normalize(4),
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.openDrawer()}
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

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={{
              height: normalize(60),
              width: '100%',
              backgroundColor: '#f5f6f9',
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
                backgroundColor: '#f5f6f9',
                marginLeft: normalize(15),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Roboto_Medium,
                  fontSize: normalize(13),
                  color: Colors.black,
                  marginLeft: normalize(5),
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.Roboto_Regular,
                  fontSize: normalize(10),
                  color: Colors.smoke,
                  marginLeft: normalize(5),
                }}>
                {item.email}
              </Text>
            </View>
          </View>
        )}
      />

      <View
        style={{
          height: normalize(90),
          width: '100%',
          backgroundColor: Colors.white,
          position: 'absolute',
          bottom: normalize(-1),
          borderTopRightRadius: normalize(25),
          borderTopLeftRadius: normalize(25),
          shadowColor: Colors.black,
          elevation: normalize(20),
        }}>
        <Button title="Poke all!" onPress={handlePokeAll} />
      </View>

      <NotificationModal
        isNotification={isNotification}
        onBackdropPress={() => setIsNotification(false)}
      />
    </View>
  );
};

export default PokeList;
