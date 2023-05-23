import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import Button from "../../../componets/Button";
import { colors } from "../../../constants/colors";
import { MEDIA } from "../../../constants/media";
import { ScreenNames } from "../../../navigation/screen";
import ButtonBoder from "../../../componets/ButtonBoder";
import { DIMENSIONS } from "../../../common/utils";
import { IconTime } from "../../../constants/icons";

const loadRegister = ({ ...props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={MEDIA.IMAGE_LOGO}
          style={styles.iconTick}
          resizeMode="cover"
        />
        <View style={styles.boarding}>
          <IconTime width={DIMENSIONS.width - 120} height={DIMENSIONS.width - 120} />
        </View>
        <Text style={styles.textNoti}>
          Thông tin của bạn đang chờ phê duyệt
        </Text>
        {/* <Button
        textButton="Đăng nhập"
        styleBackground={styles.backgroundLogin}
        styleText={styles.textLogin}
    /> */}
      </View>
      <View style={styles.viewBottom}>
        <ButtonBoder
          textButton="Đăng nhập"
          boderColor={styles.borderRegister}
          styleText={styles.textBtn}
          onPress={() => props.navigation.navigate(ScreenNames.Login)}
        />
        <TouchableOpacity style={styles.textBottom}>
          <Text style={styles.textStatus}>
            Xem trạng thái phê duyệt{" "}
            <Text
              onPress={() =>
                props.navigation.navigate(ScreenNames.RegisterStatus)
              }
              style={styles.textRedirect}
            >
              tại đây
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    backgroundColor: colors.c_ffffff,
  },
  content: {
    // flex: 1,
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "red",
    marginBottom: 20,
  },
  boarding: {
    width: DIMENSIONS.width - 120,
    height: DIMENSIONS.width - 120,
    overflow: "hidden",
    marginBottom: 37,
    alignSelf: "center",
  },
  iconTick: {
    width: 92,
    height: 72,
    marginBottom: 36,
    alignSelf: "center",
  },
  textNoti: {
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: colors.primary,
    paddingHorizontal: 66,
  },
  backgroundLogin: {
    backgroundColor: colors.c_ec4037,
    position: "relative",
    bottom: 23,
  },
  textLogin: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  textStatus: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_8E8E93,
    // justifyContent: "center",
    // alignItems: "center",
  },
  textRedirect: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_667403,
  },
  borderRegister: {
    borderColor: colors.primary,
  },
  textBtn: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  viewBottom: {
    justifyContent: "center",
    // alignItems: "center",
  },
  textBottom: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    // borderWidth: 1,
  },
});

export default loadRegister;
