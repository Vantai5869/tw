import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Notification from "../../view/notification";
import { NavigatorName } from "../screen";
import { colors } from "../../constants/colors";
import i18n from "../../locale/index";

const Stack = createStackNavigator();

function NotificationStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NavigatorName.Notification}
        component={Notification}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerTitle: i18n.t("profile"),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomColor: colors.c_e0e0e0,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    color: colors.c_333333,
    fontSize: 18,
  },
});

export default NotificationStackScreen;
