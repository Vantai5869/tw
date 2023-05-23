import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SafeViewLayout from "./SafeViewLayout";

const ContainerWithKeyboard = ({ ...props }) => {
  const onKeyboard = () => Keyboard.dismiss();
  return (
    <KeyboardAwareScrollView
      style={[styles.container]}
      {...props}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
      keyboardShouldPersistTaps="always"
    >
      <SafeViewLayout
        style={[
          props.safeAreaViewStyle,
          !!props.imageBackground && { backgroundColor: "transparent" },
        ]}
      >
        <TouchableWithoutFeedback
          onPress={() => onKeyboard()}
          style={styles.container}
        >
          <ImageBackground
            source={props.imageBackground}
            style={styles.imageBackground}
            resizeMode="cover"
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              {props.children}
            </ScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </SafeViewLayout>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
});

export default ContainerWithKeyboard;
