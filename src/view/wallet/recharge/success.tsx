import { CommonActions } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../common/utils";
import Button from "../../../componets/ButtonCT";
import ButtonBoder from "../../../componets/ButtonBoder";
import SafeViewLayout from "../../../componets/SafeViewLayout";
import { colors } from "../../../constants/colors";
import { MEDIA } from "../../../constants/media";
import { translate } from "../../../locale";
import { NavigatorName } from "../../../navigation/screen";

export default function TopupSuccess({ ...props }) {
  const handleClick = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: NavigatorName.Home },
        ],
      })
    );
  };

  const insets = useSafeAreaInsets();
  return (
    <SafeViewLayout style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ paddingTop: 40 }}>
          <View style={styles.flexCenter}>
            <Image source={MEDIA.IMAGE_LOGO} style={styles.logo} />
            <Image source={MEDIA.IMAGE_SUCCESS_TOPUP} style={styles.icon} />
          </View>
          <View style={{ paddingHorizontal: 60 }}>
            <Text style={styles.txtTitle}>
              + {formatNumber(props.route.params?.amount)} vnđ
            </Text>
            <Text style={styles.txtTitle2}>
              {translate("success_topup")}
            </Text>
            {/* <Text style={styles.txtCodeLabel}>{translate("your_order")}</Text> */}

            <View style={styles.flexCenter}>
              <View style={styles.viewCode}>
                <Text style={styles.txtCode}>
                {translate('Trading_code')}: {props.route.params?.paymentTransactionCode}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{ paddingHorizontal: 24,  paddingBottom: insets.bottom + 34 }}
      >
        {/* <ButtonBoder
          textButton={translate("to_home")}
          style={styles.btnContinue}
          styleText={styles.btnTextContinue}
          onPress={handleClick}
        /> */}
        <Button
          textButton={translate("to_home")}
          style={styles.btnLogin}
          styleText={styles.txtLogin}
          onPress={handleClick}
        />
      </View>
    </SafeViewLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    flex: 1,
  },
  flexCenter: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop:28
  },
  wrapImage: {},
  logo: { width: 111, height: 85, marginBottom: 30 },
  icon: { width: 232, height: 232, marginBottom: 30 },
  txtTitle: {
    fontSize: 19,
    lineHeight: 21,
    color: colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  txtTitle2: {
    fontSize: 19,
    lineHeight: 21,
    color: colors.primary,
    fontWeight: "600",
    textAlign: "center",
    marginTop:28
  },
  txtCodeLabel: {
    fontSize: 18,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 10,
    color: "#434343",
  },
  viewCode: {
    borderRadius: 6,
    backgroundColor:"rgba(113, 207, 248, 0.1)",
    paddingHorizontal: 17,
    paddingVertical: 8,
  },
  txtCode: { fontSize: 14, lineHeight: 17, color: colors.primary },
  btnContinue: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  btnTextContinue: { color: colors.primary },
  btnLogin: {
    backgroundColor: colors.primary,
    paddingVertical:16,
  },
  txtLogin: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
});
