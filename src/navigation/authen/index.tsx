import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../view/authen/login";
import { ScreenNames } from "../screen";
import Splash from "../../view/splash";
import OnBoarding from "../../view/splash/onBoarding";
import { colors } from "../../constants/colors";
import i18n from "../../locale";
import { DIMENSIONS } from "../../common/utils";
import Register from "../../view/authen/register";
// import LoadRegister from "../../view/authen/loadRegister";
import LoadRegister from "../../view/authen/loadRegister";
import ButtonBack from "../../componets/ButtonBack";
import RegisterStatus from "../../view/authen/registerStatus";
import ForgotPasswordOTP from "../../view/authen/changePassword/otp";
import SetNewPassword from "../../view/authen/changePassword/set-new-password";
import ForgotPassword from "../../view/authen/changePassword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconAngleLeft, IconArrowLeft } from "../../constants/icons";

import ButtonBackNew from "../../componets/ButtonBackNew";
import AddressSelectRegister from "../../view/authen/register/select_address";
import RegisterSuccess from "../../view/authen/register/registerSuccess";

const Navigation = createStackNavigator();

function LoginNavigator({ ...props }) {
  return (
    <Navigation.Navigator initialRouteName={props?.firstLaunch}>
      {props?.firstLaunch === "Splash" ? (
        <Navigation.Screen
          name="Splash"
          component={Splash}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      ) : null}
      <Navigation.Screen
        name={ScreenNames.Login}
        component={Login}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: "transparent",
          },
          headerTitle: "",
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.Register}
        component={Register}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: colors.c_ffffff,
          },
          headerTitleAlign: "center",
          headerTitle: i18n.t("register_NPP"),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 24 }}
            >
              <IconAngleLeft
                stroke={colors.c_000000}
                fill={colors.c_000000}
                width={20}
                height={20}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Navigation.Screen
        name={ScreenNames.LoadRegister}
        component={LoadRegister}
        options={({ navigation }) => ({
          gestureEnabled: false,
          // headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: colors.c_ffffff,
          },
          headerTitle: "",
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.RegisterStatus}
        component={RegisterStatus}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: colors.c_ffffff,
          },
          headerTitle: i18n.t("approval_status"),
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: "center",
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.ForgotPassWord}
        component={ForgotPassword}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
          },
          headerTitle: i18n.t("send_again_password"),
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: "center",
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.ForgotPasswordOTP}
        component={ForgotPasswordOTP}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
          },
          headerTitle: i18n.t("enter_code"),
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: "center",
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.SetNewPassword}
        component={SetNewPassword}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
          },
          headerTitle: i18n.t("re_change_password"),
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.AddressSelectRegister}
        component={AddressSelectRegister}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("address"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
       <Navigation.Screen
        name={ScreenNames.RegisterSuccess}
        component={RegisterSuccess}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("register_NPP"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Navigation.Navigator>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: DIMENSIONS.width / 4,
    height: 60,
    marginLeft: 10,
  },
  headerStyle: {
    borderBottomColor: colors.c_e0e0e0,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    color: colors.c_333333,
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
  },
  icon: {
    width: 18,
    height: 18,
  },
});
export default LoginNavigator;
