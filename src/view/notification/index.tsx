import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ContainerWithKeyboard from '../../componets/ContainerWithKeyboard';

const Notification = ({...props}) => {
  
  return (
    <ContainerWithKeyboard>
    </ContainerWithKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  }
});

export default Notification;
