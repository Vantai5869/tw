import { CommonActions, useNavigation } from "@react-navigation/native"
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../../../../constants/colors"
import { EmailSend, EmailRound1, EmailRound2 } from "../../../../constants/icons"
import { translate } from "../../../../locale"
import { ScreenNames } from "../../../../navigation/screen"

function RegisterSuccess() {
  const navigation = useNavigation();
  const redirectLogin = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: ScreenNames.Login }]
    });
    navigation.dispatch(resetAction);
  }
  return (
    <View style={styles.registerSuccess}>
      <View style={styles.iconSuccess}>
        <View style={styles.makeIconWrapper}>
          <View style={styles.makeIcon}>
            <View style={styles.iconSend}>
              <EmailSend />
            </View>
            <View style={styles.iconRound1}>
              <EmailRound1 />
            </View>
            <View style={styles.iconRound2}>
              <EmailRound2 />
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.registerTitle}>{translate("register_success")}</Text>
      <Text style={styles.registerTextEmail}>
        <Text>{translate("An email has been sent, please check")}{"\n"}{translate("your inbox")}</Text>
      </Text>
      <TouchableOpacity style={styles.registerBack} onPress={() => redirectLogin()} >
        <Text style={styles.registerTextBack} >{translate("back_to_login")}</Text>
      </TouchableOpacity>
    </View >
  )
}

const styles = StyleSheet.create({
  registerSuccess: {
    position: "relative",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  makeIconWrapper: {
    // top: -80
  },
  makeIcon: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  iconSend: {
    position: "absolute",
  },
  iconRound1: {
    position: "absolute",
  },
  iconRound2: {
    position: "absolute",
  },
  iconSuccess: {
    height: 232
  },
  registerTitle: {
    fontFamily: 'Inter',
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: colors.c_000000,
    marginBottom: 16,
  },
  registerTextEmail: {
    fontFamily: 'Inter',
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    color: colors.c_636366,
    marginBottom: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_blue,
    backgroundColor: colors.c_blue,
    width: "100 %"
  },
  registerBack: {
    position: "absolute",
    bottom: 60,
  },
  registerTextBack: {
    fontFamily: 'Roboto',
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    color: colors.c_000000,
    textTransform: "uppercase"
  }
})

export default RegisterSuccess