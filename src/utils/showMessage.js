import {View, Text} from 'react-native';
import React from 'react';
import Toast from 'react-native-simple-toast';

const showMessage = message => {
  Toast.show(message, Toast.LONG, Toast.TOP);
};

export default showMessage;
