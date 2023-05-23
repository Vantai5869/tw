import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants/colors";
import {
  IconAddCircle,
  IconAngleLeft,
  IconProfile,
  IconSetting,
} from "../../constants/icons";
import { MEDIA } from "../../constants/media";
import { ScreenNames } from "../../navigation/screen";
import ButtonBoder from "../../componets/ButtonBoderCT";
import Button from "../../componets/Button";
import { translate } from "../../locale/index";
import ButtonCT from "../../componets/ButtonCT";
import { useSelector, useDispatch } from "react-redux";
import { Logout, selectLogin } from "../../redux/slice/Authen/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "../../redux/hooks";

export default function Profile({ ...props }) {
  const token = AsyncStorage.getItem("accessToken");

  const dispatch = useAppDispatch();

  const onLogin = () => {
    props.navigation.navigate(ScreenNames.Login);
  };
  const onSignup = () => {
    props.navigation.navigate(ScreenNames.Register);
  };
  const Logouts = () => {
    dispatch(Logout(""));
  };
  return (
    <SafeAreaView style={styles.containerSAV}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <IconAngleLeft
            width={18}
            height={18}
            fill={colors.c_000000}
            stroke={colors.c_000000}
          />
        </TouchableOpacity>
        <Text style={styles.txtHeader}>Thông tin nhà phân phối</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate(ScreenNames.SettingProfile);
          }}
        >
          <IconSetting
            width={18}
            height={18}
            // fill={colors.c_000000}
            stroke={colors.c_000000}
          />
        </TouchableOpacity>
      </View>
      {token ? (
        <View style={{ flex: 16 }}>
          <View style={styles.infoView}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(ScreenNames.EditProfile);
              }}
            >
              <Image source={MEDIA.IMAGE_LOGO} style={styles.imageLogo} />
            </TouchableOpacity>
            <View style={styles.infoDetail}>
              <Text style={styles.txtNameUser}>Nguyễn Hoàng Anh</Text>
              <View style={styles.viewTypeUser}>
                <Text style={styles.txtTypeUser}>
                  {translate("distributor")}
                </Text>
              </View>
              <Text style={styles.txtPhoneUser}>091 2345 678</Text>
            </View>
          </View>
          <View style={styles.reportView}>
            <View style={styles.reportHeader}>
              <Text style={styles.txtReportHeader}>{translate("report")}</Text>
            </View>
            <View style={styles.viewAllSellDetail}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  backgroundColor: colors.c_007AFF,
                }}
              />
              <View style={styles.viewSellDetail}>
                <Text style={styles.txtReportTitle}>Doanh số bán hàng</Text>
                <Text style={styles.txtReportMoney}>10.223.000đ</Text>
              </View>
            </View>
            <View style={styles.viewAllSellDetailImport}>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  backgroundColor: colors.c_FEB336,
                }}
              />
              <View style={styles.viewSellDetail}>
                <Text style={styles.txtReportTitle}>
                  Tổng tiền hàng đã nhập
                </Text>
                <Text style={styles.txtReportMoneyImport}>10.223.000đ</Text>
              </View>
            </View>
            <View style={styles.detailCard}>
              <View style={styles.totalProfit}>
                <View>
                  <Text style={styles.now}>Hiện tại</Text>
                  <Text style={styles.titleProfit}>Doanh số bán hàng</Text>
                </View>
                <Text style={styles.textMoney}>12.123.000đ</Text>
              </View>
              <View style={styles.totalProduct}>
                <View>
                  <Text style={styles.now}>Hiện tại</Text>
                  <Text style={styles.titleProfit}>Tổng sản phẩm đã bán</Text>
                </View>
                <Text style={styles.textMoney}>3000</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.detailReport}
              onPress={() => {
                props.navigation.navigate(ScreenNames.ReportNavigator);
              }}
            >
              <Text style={styles.txtDetailReport}>
                {translate("view_report")}
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            textButton={translate("logout")}
            styleBackground={styles.btnBuy}
            styleText={styles.txtBuy}
            onPress={() => Logouts()}
          />
        </View>
      ) : (
        <View style={styles.containerViewNotLogin}>
          <View style={styles.viewNotLogin}>
            <View style={styles.iconNotLogin}>
              <IconProfile width={26} height={26} />
            </View>
            <Text style={styles.textNotLogin}>
              {translate("you_did_not_login_yet")}
            </Text>
          </View>
          <View style={styles.wrapBtn}>
            <ButtonCT
              textButton={translate("login")}
              onPress={onLogin}
              styleBackground={[styles.btnBg]}
              styleText={styles.btnText}
              style={{ paddingVertical: 14 }}
            />
            <ButtonBoder
              textButton={translate("signup")}
              onPress={onSignup}
              style={styles.btnDarkBg}
              styleText={styles.btnDarkText}
              boderColor={colors.primary}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerSAV: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    backgroundColor: colors.c_ffffff,
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    // borderWidth: 1,
  },
  infoView: {
    flex: 2,
    flexDirection: "row",
    // borderWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  reportView: {
    flex: 14,
  },
  infoDetail: {
    paddingHorizontal: 17,
  },
  imageLogo: {
    width: 64,
    height: 64,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: colors.c_000_012,
  },
  txtHeader: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: colors.c_1F1F1F,
  },
  reportHeader: {
    height: 33,
    backgroundColor: colors.c_000_012,
    // textAlign: "center",
    justifyContent: "center",
  },
  txtReportHeader: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    marginHorizontal: 24,
    color: colors.c_3A3A3C,
  },
  txtPhoneUser: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: colors.c_636366,
  },
  txtNameUser: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: colors.c_48484A,
  },
  txtTypeUser: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: colors.c_ffffff,

    textAlign: "center",
  },
  viewTypeUser: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    height: 21,
    // width: 57,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  viewAllSellDetail: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    marginHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.c_000_012,
  },
  viewAllSellDetailImport: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    marginHorizontal: 24,
    // borderBottomWidth: 1,
    // borderBottomColor: colors.c_000_012,
  },
  viewSellDetail: {
    paddingHorizontal: 16,
  },
  txtReportTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
  },
  txtReportMoney: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.c_007AFF,
  },
  txtReportMoneyImport: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.c_FEB336,
  },
  totalProfit: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 16,
    borderBottomColor: colors.c_000_012,
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalProduct: {
    flexDirection: "row",
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailCard: {
    // borderWidth: 1,
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: colors.c_secondary,
    paddingLeft: 12,
    paddingRight: 19,
    // paddingVertical: 16,
  },
  detailReport: {
    justifyContent: "center",
    alignItems: "center",
  },
  txtDetailReport: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.c_secondary,
    marginTop: 24,
    borderRadius: 8,
    color: colors.primary,
  },
  textMoney: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.c_48484A,
  },
  now: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "400",
    color: colors.c_4B4B4B,
  },
  titleProfit: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: colors.c_4B4B4B,
  },
  wrapBtn: { paddingHorizontal: 24, paddingTop: 10, paddingVertical: 20 },
  btnBg: {
    backgroundColor: colors.primary,
    marginBottom: 12,
  },
  btnText: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
    color: colors.c_ffffff,
  },

  btnDarkBg: {
    // marginBottom: 10,
    backgroundColor: colors.c_ffffff,
    borderColor: colors.primary,
    marginVertical: 12,
  },
  btnDarkText: {
    color: colors.primary,
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
  },
  containerViewNotLogin: {
    flex: 16,
  },
  textNotLogin: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: colors.c_48484A,
  },
  iconNotLogin: {
    width: 43,
    height: 43,
    borderRadius: 43,
    backgroundColor: colors.c_a6ba1a,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  viewNotLogin: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  btnBuy: {
    paddingVertical: 15,
    textAlign: "center",
    backgroundColor: colors.primary,
    marginHorizontal: 24,
    marginBottom: 20,
  },
  txtBuy: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_ffffff,
  },
});
