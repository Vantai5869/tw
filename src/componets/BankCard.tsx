import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { DIMENSIONS } from "../common/utils";
import { colors } from "../constants/colors";
import {
  IconArrowRight,
  IconHide,
  IconHistory1,
  IconRecharge,
  IconReset,
  icons,
  IconView,
} from "../constants/icons";
import { MEDIA } from "../constants/media";
import i18n from "../locale";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenNames } from "../navigation/screen";
import { selectHome } from "../redux/slice/Home/home";
import { formatNumber } from "../view/wallet/recharge";
export default function BankCard({ ...props }) {
  const [showBlance, setShowBlance] = useState(true);
  const { listUserInfor, dataWallet } = useSelector(selectHome);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={MEDIA.IMAGE_BC}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <View style={styles.containerContent}>
          <View style={styles.info}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate(ScreenNames.Profile);
              }}
              style={styles.viewLogo}
            >
              <Image
                style={styles.iconUser}
                source={
                  listUserInfor.picture
                    ? { uri: listUserInfor.picture }
                    : MEDIA.IMAGE_LOGO
                }
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.centerInfo}>
              <Text style={styles.name}>{listUserInfor?.given_name}</Text>
              <Text style={styles.userType}>Đại lý</Text>
            </View>
            {/* <Image
              style={styles.iconExchange}
              source={icons.ICON_EXCHANGE_ALT_SOLID2}
              resizeMode="contain"
            /> */}
            <IconArrowRight
              style={styles.iconRefesh}
              stroke={colors.c_ffffff}
              fill={colors.c_ffffff}
            />
          </View>
          <View style={[styles.row, styles.wallet]}>
            <Text style={styles.userType}>{i18n.t("wallet_balance")}</Text>
            {/* <Image
              source={icons.ICON_EYE_OFF}
              style={styles.icon}
              resizeMode="contain"
            /> */}
            <TouchableOpacity
              onPress={() => setShowBlance(!showBlance)}
              style={styles.icon}
            >
              {/* <Image
                source={icons.ICON_EYE_OFF}
                style={styles.icon}
                resizeMode="contain"
              /> */}
              {!showBlance ? (
                // <IconView width={18} height={14} stroke={colors.c_ffffff} />
                <></>
              ) : (
                // <IconHide width={18} height={14} stroke={colors.c_ffffff} />
                <></>
              )}
            </TouchableOpacity>
          </View>
          <View style={[styles.row, styles.center]}>
            <Text style={styles.price}>
              {showBlance
                ? (formatNumber(dataWallet?.balance) || 0) + "đ"
                : "******"}
            </Text>
            {/* <Image
              source={icons.ICON_REFRESH}
              style={styles.iconRefesh}
              resizeMode="contain"
            /> */}
            {/* <IconReset style={styles.iconRefesh} /> */}
          </View>
          <View style={[styles.info, styles.card]}>
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                props.navigation.navigate(ScreenNames.RechargeWallet)
              }
            >
              {/* <Image
                source={icons.ICON_REFRESH}
                style={styles.iconRefesh}
                resizeMode="contain"
              /> */}
              <IconRecharge style={styles.iconRefesh} />
              <Text style={styles.text}>{i18n.t("recharge")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                props.navigation.navigate(ScreenNames.HistoryTinWinPay)
              }
            >
              {/* <Image
                source={icons.ICON_REFRESH}
                style={styles.iconRefesh}
                resizeMode="contain"
              /> */}
              <IconHistory1 style={styles.iconRefesh} />
              <Text style={styles.text}>{i18n.t("transaction_history")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  containerContent: {
    paddingTop: 20,
    paddingHorizontal: 18,
  },
  container: {
    height: 178,
    width: DIMENSIONS.width - 48,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.c_A6BA1A,
    borderRadius: 10,
  },
  imageStyle: {
    borderRadius: 10,
  },
  info: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconUser: {
    width: 34,
    height: 34,
    // borderRadius: 34,
    // backgroundColor: colors.c_ffffff,
    // borderWidth: 1,
  },
  viewLogo: {
    width: 34,
    height: 34,
    borderRadius: 34,
    backgroundColor: colors.c_ffffff,
    // borderWidth: 1,
  },
  iconExchange: {
    width: 17,
    height: 18,
    tintColor: colors.c_ffffff,
  },
  centerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.c_ffffff,
  },
  userType: {
    fontWeight: "500",
    fontSize: 12,
    color: colors.c_ffffff,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 18,
    height: 14,
    tintColor: colors.c_ffffff,
    marginLeft: 10,
  },
  wallet: {
    marginTop: 18,
    alignItems: "center",
  },
  price: {
    fontSize: 32,
    fontWeight: "600",
    color: colors.c_ffffff,
  },
  iconRefesh: {
    width: 16,
    height: 16,
    tintColor: colors.c_ffffff,
    marginLeft: 8,
  },
  center: {
    alignItems: "center",
  },
  card: {
    paddingVertical: 10,
    borderTopColor: colors.c_ffffff,
    borderTopWidth: 1,
    marginTop: 10,
  },
  text: {
    marginLeft: 8,
    fontWeight: "400",
    fontSize: 14,
    color: colors.c_ffffff,
  },
});
