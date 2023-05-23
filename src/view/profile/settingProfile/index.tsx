import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors } from "../../../constants/colors";
import {
  IconAddCircle,
  IconAngleLeft,
  IconAngleRight,
  IconLogout,
  IconSetting,
} from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import { navigate } from "../../../navigation/navigate";
import { ScreenNames } from "../../../navigation/screen";
import { selectLogin } from "../../../redux/slice/Authen/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../redux/slice/Authen/login";
import { resetRadioAddress } from "../../../redux/slice/Profile/profile";
import { translate } from "../../../locale";
import { useAppDispatch } from "../../../redux/hooks";
import AlertConfirm from "../../../componets/AlertConfirm";

export default function SettingProfile({ ...props }) {
  const dispatch = useAppDispatch();
  // const { token } = useSelector(selectLogin);

  // const { user } = useSelector(selectAccount);

  const [isLogout, setIsLogout] = useState<boolean>(false);

  const token = AsyncStorage.getItem("accessToken");

  // const [user, setUser] = useState(true);

  const accountMenus = [
    {
      label: translate("edit_profile"),
      // screen: ScreenNames.EditProfile,
    },
    {
      label: translate("delivery_address"),
      screen: ScreenNames.DeliveryAddress,
    },
  ];

  const appMenus = [
    {
      label: translate("language"),
      screen: ScreenNames.Language,
    },
  ];

  const termMenus = [
    {
      label: translate("term_and_service"),
      // screen: ScreenNames.Term,
    },
    {
      label: translate("sercurity_policy"),
      // screen: ScreenNames.Term,
    },
    {
      label: translate("shipping_policy"),
      // screen: ScreenNames.Term,
    },
    {
      label: translate("refund_policy"),
      // screen: ScreenNames.Term,
    },
  ];
  const onHandleLink = (screen: string, title?: string) => {
    if (screen) {
      props.navigation.navigate(screen, { title });
    }
  };

  const onLogout = async () => {
    setIsLogout(false);
    dispatch(Logout(""));
  };

  const onConfirmLogout = () => {
    setIsLogout(true);
  };
  const onDeliveryAddress = () => {
    props.navigation.navigate(ScreenNames.DeliveryAddress);
    dispatch(resetRadioAddress(null));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.headerView}>
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
        <TouchableOpacity>
          <IconSetting
            width={18}
            height={18}
            // fill={colors.c_000000}
            stroke={colors.c_000000}
          />
        </TouchableOpacity>
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.wrapper}
      >
        {!!token ? (
          <>
            <View style={[styles.viewHorizontal, styles.blockTitle]}>
              <Text style={styles.txtTitle}>{translate("accounts")}</Text>
            </View>
            <View style={[styles.viewHorizontal]}>
              {accountMenus?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item?.label}
                    onPress={() => {
                      onHandleLink(item?.screen);
                    }}
                    activeOpacity={0.8}
                    style={[
                      styles.wrapItem,
                      index === accountMenus?.length - 1 && styles.noBorder,
                    ]}
                  >
                    <View style={styles.viewLabel}>
                      <Text style={styles.txtLabel}> {item?.label} </Text>
                    </View>
                    <IconAngleRight
                      width={16}
                      height={16}
                      fill={colors.c_000000}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        ) : null}

        <View style={[styles.viewHorizontal, styles.blockTitle]}>
          <Text style={styles.txtTitle}>{translate("application")}</Text>
        </View>
        <View style={[styles.viewHorizontal]}>
          {appMenus?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item?.label}
                onPress={() => {
                  onHandleLink(item?.screen);
                }}
                activeOpacity={0.8}
                style={[
                  styles.wrapItem,
                  index === appMenus?.length - 1 && styles.noBorder,
                ]}
              >
                <View style={styles.viewLabel}>
                  <Text style={styles.txtLabel}> {item?.label} </Text>
                </View>
                <IconAngleRight width={16} height={16} fill={colors.c_000000} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.viewHorizontal, styles.blockTitle]}>
          <Text style={styles.txtTitle}>{translate("term_app")}</Text>
        </View>
        <View style={[styles.viewHorizontal]}>
          {termMenus?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item?.label}
                onPress={() => {
                  onHandleLink(item?.screen, item?.label);
                }}
                activeOpacity={0.8}
                style={[
                  styles.wrapItem,
                  !token && index === termMenus?.length - 1 && styles.noBorder,
                ]}
              >
                <View style={styles.viewLabel}>
                  <Text style={styles.txtLabel}> {item?.label} </Text>
                </View>
                <IconAngleRight width={16} height={16} fill={colors.c_000000} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.viewHorizontal}>
          {!!token ? (
            <TouchableOpacity
              onPress={onConfirmLogout}
              style={[styles.wrapItem, styles.noBorder]}
              activeOpacity={0.8}
            >
              <View style={styles.viewLabel}>
                <Text style={[styles.txtLabel, { color: colors.c_FF3B30 }]}>
                  {translate("logout")}
                </Text>
              </View>
              <IconLogout width={22} height={22} />
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
      <AlertConfirm
        modalVisible={isLogout}
        content={translate("confirm_logout")}
        confirm={() => onLogout()}
        cancel={() => setIsLogout(false)}
      />
    </SafeAreaView>
    // <SafeAreaView style={styles.containerSAV}>
    //   <View style={styles.headerView}>
    //     <TouchableOpacity
    //       onPress={() => {
    //         props.navigation.goBack();
    //       }}
    //     >
    //       <IconAngleLeft
    //         width={18}
    //         height={18}
    //         fill={colors.c_000000}
    //         stroke={colors.c_000000}
    //       />
    //     </TouchableOpacity>
    //     <Text style={styles.txtHeader}>Thông tin nhà phân phối</Text>
    //     <TouchableOpacity>
    //       <IconSetting
    //         width={18}
    //         height={18}
    //         // fill={colors.c_000000}
    //         stroke={colors.c_000000}
    //       />
    //     </TouchableOpacity>
    //   </View>

    //   <View style={styles.reportView}>
    //     {token ? (
    //       <View>
    //         <View style={styles.reportHeader}>
    //           <Text style={styles.txtReportHeader}>Tài khoản</Text>
    //         </View>
    //         <TouchableOpacity style={styles.itemSettingBorder}>
    //           <Text style={styles.titleSetting}>Sửa hồ sơ</Text>
    //           <IconAngleRight
    //             width={20}
    //             height={20}
    //             stroke={colors.c_000000}
    //             fill={colors.c_000000}
    //           />
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //           onPress={onDeliveryAddress}
    //           style={styles.itemSetting}
    //         >
    //           <Text style={styles.titleSetting}>Địa chỉ giao hàng</Text>
    //           <IconAngleRight
    //             width={20}
    //             height={20}
    //             stroke={colors.c_000000}
    //             fill={colors.c_000000}
    //           />
    //         </TouchableOpacity>
    //       </View>
    //     ) : null}

    //     <View style={styles.reportHeader}>
    //       <Text style={styles.txtReportHeader}>Ứng dụng</Text>
    //     </View>
    //     <TouchableOpacity style={styles.itemSetting}>
    //       <Text style={styles.titleSetting}>Ngôn ngữ</Text>

    //       <IconAngleRight
    //         width={20}
    //         height={20}
    //         stroke={colors.c_000000}
    //         fill={colors.c_000000}
    //       />
    //     </TouchableOpacity>
    //     <View style={styles.reportHeader}>
    //       <Text style={styles.txtReportHeader}>Điều khoản Tinwin</Text>
    //     </View>
    //     <TouchableOpacity style={styles.itemSettingBorder}>
    //       <Text style={styles.titleSetting}>Điều khoản dịch vụ</Text>
    //       <IconAngleRight
    //         width={20}
    //         height={20}
    //         stroke={colors.c_000000}
    //         fill={colors.c_000000}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.itemSettingBorder}>
    //       <Text style={styles.titleSetting}>Chính sách bảo mật</Text>
    //       <IconAngleRight
    //         width={20}
    //         height={20}
    //         stroke={colors.c_000000}
    //         fill={colors.c_000000}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.itemSettingBorder}>
    //       <Text style={styles.titleSetting}>Chính sách vận chuyển</Text>
    //       <IconAngleRight
    //         width={20}
    //         height={20}
    //         stroke={colors.c_000000}
    //         fill={colors.c_000000}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={token ? styles.itemSettingBorder : styles.itemSetting}
    //     >
    //       <Text style={styles.titleSetting}>
    //         Chính sách trả hàng / hoàn tiền
    //       </Text>
    //       <IconAngleRight
    //         width={20}
    //         height={20}
    //         stroke={colors.c_000000}
    //         fill={colors.c_000000}
    //       />
    //     </TouchableOpacity>
    //     {token ? (
    //       <TouchableOpacity
    //         onPress={() => dispatch(Logout(""))}
    //         style={styles.itemSetting}
    //       >
    //         <Text style={styles.titleLogout}>Đăng xuất</Text>
    //         <IconLogout width={20} height={20} stroke={colors.light_red} />
    //       </TouchableOpacity>
    //     ) : null}
    //   </View>
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  // containerSAV: {
  //   paddingTop: Platform.OS === "android" ? 40 : 0,
  //   flex: 1,
  //   backgroundColor: colors.c_ffffff,
  // },
  headerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    // borderWidth: 1,
  },
  // infoView: {
  //   flex: 2,
  //   flexDirection: "row",
  //   // borderWidth: 1,
  //   paddingHorizontal: 24,
  //   paddingTop: 20,
  // },
  // reportView: {
  //   flex: 14,
  // },
  // infoDetail: {
  //   paddingHorizontal: 17,
  // },
  // imageLogo: {
  //   width: 64,
  //   height: 64,
  //   borderRadius: 64,
  //   borderWidth: 1,
  //   borderColor: colors.c_000_012,
  // },
  // txtHeader: {
  //   fontSize: 18,
  //   lineHeight: 22,
  //   fontWeight: "700",
  //   color: colors.c_1F1F1F,
  // },
  // reportHeader: {
  //   height: 33,
  //   backgroundColor: colors.c_000_012,
  //   // textAlign: "center",
  //   justifyContent: "center",
  // },
  // txtReportHeader: {
  //   fontSize: 12,
  //   lineHeight: 14,
  //   fontWeight: "500",
  //   marginHorizontal: 24,
  //   color: colors.c_3A3A3C,
  // },
  // txtPhoneUser: {
  //   fontSize: 12,
  //   lineHeight: 14,
  //   fontWeight: "500",
  //   color: colors.c_636366,
  // },
  // txtNameUser: {
  //   fontSize: 14,
  //   lineHeight: 18,
  //   fontWeight: "600",
  //   color: colors.c_48484A,
  // },
  // txtTypeUser: {
  //   fontSize: 12,
  //   lineHeight: 14,
  //   fontWeight: "500",
  //   color: colors.c_ffffff,

  //   textAlign: "center",
  // },
  // viewTypeUser: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: colors.primary,
  //   height: 21,
  //   width: 57,
  //   borderRadius: 10,
  //   marginTop: 4,
  //   marginBottom: 8,
  // },
  // viewAllSellDetail: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingVertical: 17,
  //   marginHorizontal: 24,
  //   borderBottomWidth: 1,
  //   borderBottomColor: colors.c_000_012,
  // },
  // viewAllSellDetailImport: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   paddingVertical: 17,
  //   marginHorizontal: 24,
  //   // borderBottomWidth: 1,
  //   // borderBottomColor: colors.c_000_012,
  // },
  // viewSellDetail: {
  //   paddingHorizontal: 16,
  // },
  // txtReportTitle: {
  //   fontSize: 16,
  //   lineHeight: 22,
  //   fontWeight: "400",
  // },
  // txtReportMoney: {
  //   fontSize: 20,
  //   lineHeight: 24,
  //   fontWeight: "600",
  //   color: colors.c_007AFF,
  // },
  // txtReportMoneyImport: {
  //   fontSize: 20,
  //   lineHeight: 24,
  //   fontWeight: "600",
  //   color: colors.c_FEB336,
  // },
  // totalProfit: {
  //   flexDirection: "row",
  //   borderBottomWidth: 1,
  //   paddingVertical: 16,
  //   borderBottomColor: colors.c_000_012,
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  // totalProduct: {
  //   flexDirection: "row",
  //   paddingVertical: 16,
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  // detailCard: {
  //   // borderWidth: 1,
  //   marginHorizontal: 24,
  //   borderRadius: 8,
  //   backgroundColor: colors.c_secondary,
  //   paddingLeft: 12,
  //   paddingRight: 19,
  //   // paddingVertical: 16,
  // },
  // detailReport: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // txtDetailReport: {
  //   paddingHorizontal: 14,
  //   paddingVertical: 8,
  //   backgroundColor: colors.c_secondary,
  //   marginTop: 24,
  //   borderRadius: 8,
  //   color: colors.primary,
  // },
  // textMoney: {
  //   fontSize: 20,
  //   lineHeight: 24,
  //   fontWeight: "600",
  //   color: colors.c_48484A,
  // },
  // now: {
  //   fontSize: 10,
  //   lineHeight: 15,
  //   fontWeight: "400",
  //   color: colors.c_4B4B4B,
  // },
  // titleProfit: {
  //   fontSize: 12,
  //   lineHeight: 14,
  //   fontWeight: "500",
  //   color: colors.c_4B4B4B,
  // },
  // itemSetting: {
  //   height: 56,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   // paddingHorizontal: 24,
  //   marginHorizontal: 24,
  //   alignItems: "center",
  // },
  // itemSettingBorder: {
  //   height: 56,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   // paddingHorizontal: 24,
  //   marginHorizontal: 24,
  //   alignItems: "center",
  //   borderBottomWidth: 1,
  //   borderBottomColor: colors.c_000_012,
  // },
  // titleSetting: {
  //   fontSize: 16,
  //   lineHeight: 22,
  //   fontWeight: "400",
  //   color: colors.c_3A3A3C,
  // },
  // titleLogout: {
  //   fontSize: 16,
  //   lineHeight: 22,
  //   fontWeight: "400",
  //   color: colors.light_red,
  // },

  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  wrapper: {
    paddingTop: 10,
    // paddingHorizontal: 24,
  },
  wrapItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.c_000_01,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noBorder: { borderBottomColor: "transparent" },
  viewLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  txtLabel: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_3A3A3C,
    flex: 1,
  },

  viewHorizontal: { paddingHorizontal: 24 },
  blockTitle: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    paddingVertical: 10,
  },
  txtTitle: {
    lineHeight: 14,
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_3A3A3C,
  },
});
