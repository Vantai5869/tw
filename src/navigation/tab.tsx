import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { withTranslation } from "react-i18next";
import { colors } from "../constants/colors";
import { NavigatorName, ScreenNames } from "./screen";
import {
  IconBell,
  IconHomes,
  IconWareHouse,
  IconImportGoods,
  IconOrder,
  IconHomeActive,
  IconWareHouseActive,
  IconBellActive,
  IconOrderActive,
  IconImportGoodsActive,
} from "../constants/icons";
import OrderTab from "./order";
import NotificationTab from "./notification";
import i18n from "../locale/index";
import HomeTab from "./home";
// import ImportProducts from '../view/importProduct';
import ImportProductNavigator from "./importProduct";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WareHouseTab from "./warehouse";

const Tab = createBottomTabNavigator();
interface Props {
  state: any;
  descriptors?: any;
  navigation: any;
  route: any;
}

function MyTabBar({ state, descriptors, navigation, route }: Props) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };
        const renderIconMenu = () => {
          if (route.name === NavigatorName.Home) {
            return isFocused ? (
              <IconHomeActive width={19} height={19} />
            ) : (
              <IconHomes width={19} height={19} />
            );
          } else if (route.name === NavigatorName.WareHouse) {
            return isFocused ? (
              <IconWareHouseActive width={20.79} height={20.79} />
            ) : (
              <IconWareHouse width={20.79} height={20.79} />
            );
          } else if (route.name === NavigatorName.Notification) {
            return isFocused ? (
              <IconBellActive width={20.79} height={20.79} />
            ) : (
              <IconBell width={20.79} height={20.79} />
            );
          } else if (route.name === NavigatorName.Order) {
            return isFocused ? (
              <IconOrderActive width={19} height={19} />
            ) : (
              <IconOrder width={19} height={19} />
            );
          } else if (route.name === NavigatorName.ImportProduct) {
            return isFocused ? (
              <IconImportGoodsActive width={19} height={19} />
            ) : (
              <IconImportGoods width={19} height={19} />
            );
          }
        };

        return (
          <TouchableOpacity
            key={String(index)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.buttonNav}
          >
            <View
              style={[styles.viewButton, isFocused && styles.viewButtonBorder]}
            >
              <View style={{ marginBottom: 5 }}>{renderIconMenu()}</View>
              <Text style={isFocused ? styles.textNavSelected : styles.textNav}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabNavigator = React.memo((props: any) => {
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "";
    if (
      routeName !== NavigatorName.Home &&
      routeName !== NavigatorName.Order &&
      routeName !== NavigatorName.Notification &&
      routeName !== NavigatorName.ImportProduct &&
      routeName !== NavigatorName.WareHouse &&
      routeName !== ""
    ) {
      return false;
    }
    return true;
  };
  return (
    <Tab.Navigator
      initialRouteName={NavigatorName.Home}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.c_909090,
      }}
      tabBar={(rest: any) => <MyTabBar {...rest} />}
    >
      <Tab.Screen
        name={NavigatorName.Home}
        component={HomeTab}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          title: i18n.t("Trang chủ"),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={NavigatorName.WareHouse}
        component={WareHouseTab}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          title: i18n.t("Kho hàng"),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={NavigatorName.ImportProduct}
        component={ImportProductNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          title: i18n.t("Nhập hàng"),
          headerShown: false,
        })}
      />
      <Tab.Screen
        name={NavigatorName.Notification}
        component={NotificationTab}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          title: i18n.t("Thông báo"),
        })}
      />
      <Tab.Screen
        name={NavigatorName.Order}
        component={OrderTab}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          title: i18n.t("order"),
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    elevation: 5,
    backgroundColor: "white",
    paddingVertical: 17,
  },
  buttonNav: {
    flex: 1,
    backgroundColor: "white",
  },
  viewButton: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  textNav: {
    marginLeft: 5,
    fontWeight: "400",
    textAlign: "center",
    fontSize: 12,
    color: "#888888",
  },
  textNavSelected: {
    marginLeft: 10,
    fontWeight: "400",
    textAlign: "center",
    fontSize: 12,
    color: colors.primary,
  },
  viewButtonBorder: {},
});

export default withTranslation()(TabNavigator);
