import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { useDispatch } from "react-redux";
import { persistedStorage } from "../../../common/storage";
import { DIMENSIONS, formatDate } from "../../../common/utils";
import Button from "../../../componets/Button";
import { colors } from "../../../constants/colors";
import { ScreenNames } from "../../../navigation/screen";
import {
  IconDelete,
  IconNo,
  IconSubCirle,
  IconSuccess,
  IconTime,
  IconWait,
  IconYes,
} from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import i18n from "../../../locale";
import { useAppSelector } from "../../../redux/hooks";
import { RegisterStatusHandle } from "../../../redux/slice/Authen/register";
import ButtonCT from "../../../componets/ButtonCT";
import ButtonBoder from "../../../componets/ButtonBoderCT";
import ResilientAutoheightWebView from "../../../componets/ResilientAutoheightWebView";

const RegisterStatus = ({ ...props }) => {
  const { registerRes, registerStatus } = useAppSelector(
    (state: any) => state.registerReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const registerId = await persistedStorage?.getItem("registerId");
      const request = {
        id: registerId,
      };

      dispatch(RegisterStatusHandle(request));
    };
    fetchData();
  }, []);
  const onLogin = () => {
    props.navigation.navigate(ScreenNames.Login);
  };
  const onRegister = () => {
    props.navigation.navigate(ScreenNames.Register);
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        {registerStatus?.status === 0 ? (
          <IconNo width={232} height={232} />
        ) : registerStatus?.status === 1 || registerStatus?.status === 2 ? (
          <IconTime width={232} height={232} />
        ) : (
          <IconYes width={232} height={232} />
        )}
      </View>
      <View style={styles.viewContent}>
        <View style={styles.timeCreate}>
          <Text style={styles.textLeft}>{i18n.t("time_register")}</Text>
          <Text style={styles.textRight}>
            {formatDate(registerStatus?.creationTime)}
          </Text>
        </View>
        {registerStatus?.phone ? (
          <View style={styles.timeCreate}>
            <Text style={styles.textLeft}>{i18n.t("phone")}</Text>
            <Text style={styles.textRight}>{registerStatus?.phone}</Text>
          </View>
        ) : (
          <View style={styles.timeCreate}>
            <Text style={styles.textLeft}>{i18n.t("Email")}</Text>
            <Text style={styles.textRight}>{registerStatus?.email}</Text>
          </View>
        )}
        <View style={styles.statusConfirm}>
          <Text style={styles.textLeft}>{i18n.t("approval_status")}</Text>
          {registerStatus?.status === 0 ? (
            <View style={styles.statusRe}>
              <IconDelete width={28} height={28} fill={colors.c_FEB336} />
              <Text style={styles.textStatus}>{i18n.t("refuse")}</Text>
            </View>
          ) : registerStatus?.status === 1 || registerStatus?.status === 2 ? (
            <View style={styles.statusAwait}>
              <IconWait width={28} height={28} fill={colors.c_FEB336} />
              <Text style={styles.textStatus}>
                {i18n.t("awaiting_approval")}
              </Text>
            </View>
          ) : (
            <View style={styles.statusAppro}>
              <IconSuccess width={28} height={28} fill={colors.c_FEB336} />
              <Text style={styles.textStatus}>{i18n.t("approved")}</Text>
            </View>
          )}
        </View>
        {registerStatus?.status === 0 ? (
          <Text style={styles.textReason}>
            {i18n.t("reason_for_refusal")}
            <ResilientAutoheightWebView
              source={{
                html: registerStatus?.reason
              }}
            />
          </Text>
        ) : null}
      </View>
      <View style={styles.btnLoginView}>
        {registerStatus?.status === 0 ? (
          <ButtonBoder
            textButton="Đăng ký lại"
            // boderColor={styles.borderRegister}
            style={styles.borderRegister}
            styleText={styles.textRegister}
            onPress={onRegister}
          />
        ) : (
          <ButtonCT
            textButton="Đăng nhập"
            styleBackground={styles.backgroundLogin}
            styleText={styles.textLogin}
            onPress={onLogin}
            style={styles.btnLoginContainer}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 24,
  },
  viewImage: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStatus: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  viewContent: {
    flex: 4,
  },
  timeCreate: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  textLeft: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.c_8E8E93,
  },
  textRight: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    color: colors.c_636366,
  },
  statusConfirm: {
    paddingTop: 20,
  },
  statusRe: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
  statusAwait: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: "rgba(254, 179, 54, 0.1)",
  },
  statusAppro: {
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 11,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
  },
  textStatus: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
    color: colors.c_636366,
  },
  textReason: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_ff3b30,
  },
  backgroundLogin: {
    backgroundColor: colors.c_667403,
  },
  textLogin: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  btnLoginContainer: {
    width: DIMENSIONS.width - 24 * 2,
  },
  btnLoginView: {
    flex: 1,
  },
  borderRegister: {
    borderColor: colors.primary,
  },
  textRegister: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
});

export default RegisterStatus;
