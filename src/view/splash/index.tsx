import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ImageBackground, Image, StyleSheet, Text } from 'react-native';
import { MEDIA } from '../../constants/media';
import { NavigatorName, ScreenNames } from "../../navigation/screen";

const Splash = ({ ...props }) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate(ScreenNames.Login);
    }, 3000);
  }, [])
  return (
    <View style={styles.container}>
      <ImageBackground
        source={MEDIA.IMAGE_SPLASH}
        style={styles.imageBackground}
        resizeMode="cover">
        <View style={styles.styleView} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  logoContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 80,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  styleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Splash;
