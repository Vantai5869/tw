/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { StatusBar, StyleSheet, Text, View, TextInput } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import RootNavigation from "./src/navigation";
import codePush from "react-native-code-push";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NotificationListener,
  requestUserPermission,
} from "./src/common/pushnotification_helper";
import messaging from "@react-native-firebase/messaging";

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

async function checkApplicationPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    // console.log('User has notification permissions enabled.');
  } else if (
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    // console.log('User has provisional notification permissions.');
  } else {
    // console.log('User has notification permissions disabled');
  }
}

const App: () => Node = () => {
  const [firstInstallApp, setFirstInstallApp] = useState("");
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.allowFontScaling = false;
  (TextInput as any).defaultProps = {
    ...((TextInput as any).defaultProps || {}),
    allowFontScaling: false,
  };
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    const checkAppLaunch = async () => {
      const firstLaunchs = await AsyncStorage.getItem("firstLaunch");
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        setFirstInstallApp("Home");
      } else if (firstLaunchs === "first") {
        setFirstInstallApp("Login");
      } else {
        setFirstInstallApp("Splash");
      }
    };
    checkAppLaunch();
    async function fetchData() {
      await messaging().requestPermission({
        provisional: true,
      });
      checkApplicationPermission();
      // Get the device token
      messaging()
        .getToken()
        .then((token) => {
          // console.log('token ne : ', token);
          AsyncStorage.setItem("DeviceToken", token);
          // return saveTokenToDatabase(token);
        });
      return messaging().onTokenRefresh((token) => {
        // console.log('refresh token : ', token);
        AsyncStorage.setItem("DeviceToken", token);
      });
    }
  }, []);
  return (
    <>
      <StatusBar translucent barStyle="dark-content" backgroundColor={"#fff"} />
      <Provider store={store}>
        <View style={styles.container}>
          {firstInstallApp ? <RootNavigation firts={firstInstallApp} /> : null}
        </View>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default codePush(codePushOptions)(App);
