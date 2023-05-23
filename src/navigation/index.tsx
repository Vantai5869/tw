import React, { useState } from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import LoginNavigator from "./authen";
import TabNavigator from "./tab";
import { NavigatorName, ScreenNames } from "./screen";
import { navigationRef } from "./navigate";
import i18n, { translate } from "../locale/index";
import Order from "../navigation/order";
import ButtonBack from "../componets/ButtonBack";
import ImportProducts from "../view/importProduct";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../view/authen/login";
import Profile from "../view/profile";
import DeliveryAddress from "../view/profile/address";
import SettingProfile from "../view/profile/settingProfile";
import ButtonBackNew from "../componets/ButtonBackNew";
import CreateNewAddress from "../view/profile/address/create_new_address";
import AddressSelect from "../view/profile/address/address_select";
import AddressSelectRegister from "../view/authen/register/select_address";
import EditAddress from "../view/profile/address/edit_address";
import Register from "../view/authen/register";

import { IconAngleLeft, IconArrowLeft } from "../constants/icons";
import { colors } from "../constants/colors";
import ProductDetails from "../componets/ProductDetails";
import Purchase from "../view/importProduct/purchase";
import Report from "../view/report";
import ReportNavigator from "./report";
import ProductRatingScreen from "../view/product/rating";
import ProductRatingSupplier from "../view/importProduct/rating-of-supplier";
import LoadRegister from "../view/authen/loadRegister";
import RegisterStatus from "../view/authen/registerStatus";
import LanguagesSettingScreen from "../view/profile/settingProfile/language";

const Stack = createStackNavigator();

const RootNavigation = ({ ...props }) => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: true,
        gestureEnabled: false,
        // ...TransitionPresets.ModalPresentationIOS,
      }}
      initialRouteName={props?.firts === "Home" ? "Home" : "LoginNavigator"}
    >
      <Stack.Screen
        name={NavigatorName.LoginNavigator}
        component={() => <LoginNavigator firstLaunch={props?.firts} />}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerStyle: { backgroundColor: "transparent" },
        }}
      />
      <Stack.Screen
        name={NavigatorName.ImportProduct}
        component={ImportProducts}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        {...props}
        name={NavigatorName.Home}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ScreenNames.Profile}
        component={Profile}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
          headerTitle: i18n.t("retailer_infomation"),
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
      <Stack.Screen
        name={ScreenNames.ProductDetails}
        component={ProductDetails}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("product_details"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />
      <Stack.Screen
        name={ScreenNames.ProductRatingSupplier}
        component={ProductRatingSupplier}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("rating_of_supplier"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />

      <Stack.Screen
        name={ScreenNames.SettingProfile}
        component={SettingProfile}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("Thông tin nhà phân phối"),
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
      <Stack.Screen
        name={ScreenNames.DeliveryAddress}
        component={DeliveryAddress}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("delivery_address"),
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
      <Stack.Screen
        name={ScreenNames.CreateNewAddress}
        component={CreateNewAddress}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("new_address"),
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
      <Stack.Screen
        name={ScreenNames.AddressSelect}
        component={AddressSelect}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("new_address"),
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
      <Stack.Screen
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

      <Stack.Screen
        name={ScreenNames.EditAddress}
        component={EditAddress}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("edit_address"),
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
      <Stack.Screen
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
      <Stack.Screen
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
          headerTitle: "Đăng ký đại lý",
          headerLeft: () => (
            <View style={{ paddingLeft: 24 }}>
              <IconAngleLeft
                stroke={colors.c_000000}
                fill={colors.c_000000}
                width={20}
                height={20}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={ScreenNames.LoadRegister}
        component={LoadRegister}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: colors.c_ffffff,
          },
          headerTitleAlign: "center",
          headerTitle: "Đăng ký đại lý",
          headerLeft: () => (
            <View style={{ paddingLeft: 24 }}>
              <IconAngleLeft
                stroke={colors.c_000000}
                fill={colors.c_000000}
                width={20}
                height={20}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={ScreenNames.RegisterStatus}
        component={RegisterStatus}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: colors.c_ffffff,
          },
          headerTitleAlign: "center",
          headerTitle: "Đăng ký đại lý",
          headerLeft: () => (
            <View style={{ paddingLeft: 24 }}>
              <IconAngleLeft
                stroke={colors.c_000000}
                fill={colors.c_000000}
                width={20}
                height={20}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name={ScreenNames.ReportNavigator}
        component={ReportNavigator}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: false,
          headerStyle: {
            shadowColor: "transparent",
            backgroundColor: colors.c_ffffff,
          },
          headerTitleAlign: "center",
          headerTitle: "Đăng ký đại lý",
          headerLeft: () => (
            <View style={{ paddingLeft: 24 }}>
              <IconAngleLeft
                stroke={colors.c_000000}
                fill={colors.c_000000}
                width={20}
                height={20}
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
        })}
      />
      {/* <Stack.Screen
        name={ScreenNames.Report}
        component={Report}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("Báo cáo"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      /> */}

      <Stack.Screen
        name={ScreenNames.Perchase}
        component={Purchase}
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerTitle: i18n.t("purchase"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => (
            <ButtonBackNew onPress={() => navigationRef.goBack()} />
          ),
        }}
      />

      <Stack.Screen
        name={ScreenNames.ProductRatingScreen}
        component={ProductRatingScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: i18n.t(route?.params?.type),
          headerLeft: () => (
            <ButtonBack
              onPress={() => navigationRef.goBack()}
              leftIcon={
                <IconArrowLeft
                  width={24}
                  height={24}
                  style={{ marginLeft: 18 }}
                  stroke={colors.c_000000}
                  fill={colors.c_000000}
                />
              }
            />
          ),
          headerRight: () => (
            <Image
              source={{ uri: (route as any)?.params?.image }}
              style={styles.image}
            />
          ),
        })}
      />
      <Stack.Screen
        name={ScreenNames.Language}
        component={LanguagesSettingScreen}
        options={({ navigation }) => ({
          gestureEnabled: false,
          headerShown: true,
          headerStyle: {
            shadowColor: "transparent",
          },
          headerTitleAlign: "center",
          headerTitle: translate("language"),
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => <ButtonBack onPress={() => navigation.goBack()} />,
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.c_ffffff,
  },
  headerTitleStyle: {
    color: colors.c_000000,
    fontSize: 18,
  },
  icon: {
    width: 18,
    height: 18,
  },
  iconCloseSetting: {
    width: 13,
    height: 12,
  },
  image: {
    height: 32,
    width: 32,
    backgroundColor: colors.c_F2F2F2,
    marginRight: 24,
    borderRadius: 2,
  },
});

export default RootNavigation;
