import {View, Text, Platform} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

const Picker = ({
  isVisible,
  setIsVisible,
  isTabLine,
  height = '30%',
  children,
  backdropOpacity = 0.3,
  backgroundColor = 'white',
  backdropColor = 'black',
}) => {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropTransitionOutTiming={0}
      avoidKeyboard={true}
      hideModalContentWhileAnimating={true}
      isVisible={isVisible}
      style={{
        width: '100%',
        alignSelf: 'center',
        margin: 0,
      }}
      animationInTiming={600}
      animationOutTiming={800}
      backdropOpacity={backdropOpacity}
      backdropColor={backdropColor}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}>
      <View
        style={{
          backgroundColor: backgroundColor,
          height: height,
          paddingVertical: 15,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        {isTabLine && (
          <View
            style={{
              height: Platform.isPad ? 8 : 4,
              width: Platform.isPad ? 75 : 50,
              backgroundColor: 'grey',
              alignSelf: 'center',
              borderRadius: 22,
              marginVertical: Platform.isPad ? 4 : 2,
            }}
          />
        )}
        {children}
      </View>
    </Modal>
  );
};

export default Picker;
