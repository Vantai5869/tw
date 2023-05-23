import { CommonActions } from "@react-navigation/native";
import { isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { DIMENSIONS } from "../../common/utils";
import { colors } from "../../constants/colors";
import { IconCartArrowDown } from "../../constants/icons";
import { MEDIA } from "../../constants/media";
import { isAndroid } from "../../constants/untils";
import { translate } from "../../locale";
import { NavigatorName, ScreenNames } from "../../navigation/screen";
import { Logout } from "../../redux/slice/Authen/login";
import {
  GetReasonCancelOrderImport,
  resetOrderImportState,
} from "../../redux/slice/Sales/order-import";
import { ListOrder } from "./components/ListOrder";
import { RePurchaseComponent } from "./components/RePurchaseComponent";

export const ORDER_TABS = [
  {
    id: "1",
    label: translate("order_waiting_payment"),
  },
  {
    id: "2",
    label: translate("order_waiting"),
  },
  {
    id: "3",
    label: translate("order_prepare"),
  },
  {
    id: "4",
    label: translate("order_delivering"),
  },
  {
    id: "5",
    label: translate("order_delivered"),
  },
  {
    id: "0",
    label: translate("cancel"),
  },
];
const ImportProducts = ({ ...props }) => {
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("1");

  const handleImportProductBT = () => {
    props.navigation.navigate(ScreenNames.Perchase);
  };

  const onRePurchase = () => {
    setIsModal(true);
  };

  const onHandleTab = (id: string) => {
    setTab(id);
  };

  const returnTab = (isFixed?: boolean) => {
    return (
      <View
        style={[
          styles.wrapTab,
          isFixed && { paddingTop: insets.top + 20, backgroundColor: "white" },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.scrollTab, isFixed && { paddingBottom: 2 }]}
        >
          {ORDER_TABS?.map((t, index) => (
            <TouchableOpacity
              key={t?.id?.[0]}
              style={[
                styles.itemTab,
                index === ORDER_TABS?.length - 1 && {
                  paddingRight: 4,
                },
              ]}
              onPress={() => onHandleTab(t.id)}
            >
              <View
                style={[
                  styles.line,
                  tab === t.id && styles.lineActive,
                  index === ORDER_TABS?.length - 1 && {
                    right: 0,
                  },
                ]}
              />
              <Text
                style={[styles.txtTab, tab === t.id && styles.txtActiveTab]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(GetReasonCancelOrderImport(""));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ImageHeaderScrollView
          style={{ backgroundColor: "white" }}
          maxHeight={355}
          minHeight={isAndroid ? 120 : 105}
          renderForeground={() => (
            <View style={{ backgroundColor: "white" }}>
              <ImageBackground
                source={MEDIA.IMAGE_BG_IMPORTPD}
                style={[styles.bgImage, { paddingTop: insets.top + 15 }]}
              >
                <View style={styles.content}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate(ScreenNames.Profile);
                    }}
                  >
                    <Image
                      style={styles.iconUser}
                      source={MEDIA.IMAGE_LOGO}
                      // resizeMode="contain"
                    />
                  </TouchableOpacity>

                  <View style={styles.contentDL}>
                    <Text style={styles.userName}>Nguyễn Hoàng Anh</Text>
                    <TouchableOpacity
                      onPress={() => dispatch(Logout(""))}
                      style={styles.buttonDL}
                    >
                      <Text style={styles.textBT}>Nhà phân phối</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
              <View style={styles.contentImport}>
                <View style={styles.buttonImport}>
                  <TouchableOpacity
                    style={styles.importProductBT}
                    onPress={handleImportProductBT}
                  >
                    <View style={styles.viewImport}>
                      <IconCartArrowDown
                        width={38}
                        height={32}
                        fill={colors.c_ffffff}
                      ></IconCartArrowDown>
                    </View>
                    <Text style={styles.textND}>{translate("new_order")}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.importProductBTAgain}
                    onPress={onRePurchase}
                  >
                    <View style={styles.viewImports}>
                      <IconCartArrowDown
                        width={38}
                        height={32}
                        fill={colors.primary}
                      ></IconCartArrowDown>
                    </View>
                    <Text style={styles.textNDAgain}>Mua lại</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {returnTab()}
            </View>
          )}
          renderFixedForeground={() => returnTab(true)}
          maxOverlayOpacity={1}
          minOverlayOpacity={1}
        >
          <TriggeringView>
            <View style={{ flex: 1 }}>
              <ListOrder Status={tab} />
            </View>
          </TriggeringView>
        </ImageHeaderScrollView>
      </View>
      <RePurchaseComponent
        visible={isModal}
        setIsModal={() => {
          setIsModal(false);
          dispatch(resetOrderImportState(""));
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  bgImage: {
    width: "100%",
    height: 163,
    marginBottom: 19,
  },
  content: {
    // paddingTop: 73,
    paddingHorizontal: 24,
    flexDirection: "row",
  },
  iconUser: {
    width: 64,
    height: 64,
    borderRadius: 64,
    overflow: "hidden",
    backgroundColor: colors.c_ffffff,
  },
  contentDL: {
    paddingLeft: 17,
    paddingTop: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.c_ffffff,
  },
  buttonDL: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    // width: 57,
    marginTop: 6,
    paddingVertical: 3.5,
  },
  textBT: {
    fontSize: 12,
    color: colors.c_ffffff,
    fontWeight: "500",
    textAlign: "center",
  },
  contentImport: {
    // backgroundColor: "white",
    paddingHorizontal: 24,
  },
  buttonImport: {
    height: 107,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  importProductBT: {
    width: (DIMENSIONS.width - 56) / 2,
    height: "100%",
    alignContent: "center",
    backgroundColor: colors.primary,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 20,
  },
  viewImport: {
    width: 52,
    height: 52,
    overflow: "hidden",
    borderRadius: 52,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 4,
  },
  viewImports: {
    width: 52,
    height: 52,
    overflow: "hidden",
    borderRadius: 52,
    backgroundColor: colors.c_blue,
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 4,
  },
  textND: {
    color: colors.c_ffffff,
    fontSize: 12,
    fontWeight: "600",
  },
  importProductBTAgain: {
    width: (DIMENSIONS.width - 56) / 2,
    height: "100%",
    alignContent: "center",
    backgroundColor: colors.c_ffffff,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 20,
    borderColor: colors.primary,
    borderWidth: 1,
    borderStyle: "solid",
  },
  textNDAgain: {
    color: colors.c_7B7B80,
    fontSize: 12,
    fontWeight: "600",
  },
  wrapTab: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  scrollTab: {},
  itemTab: {
    paddingBottom: 18,
    paddingLeft: 4,
    paddingRight: 22,
    position: "relative",
    zIndex: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.c_D7D7D7,
  },
  line: {
    height: 2,
    backgroundColor: colors.c_D7D7D7,
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 18,
    zIndex: 100,
  },
  lineActive: {
    backgroundColor: colors.primary,
  },
  txtTab: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: "#636366",
    textAlign: "center",
  },
  txtActiveTab: { color: colors.primary },
  btnBack: {
    marginBottom: 10,
    backgroundColor: "rgba(225,255,255, 0.5)",
    width: 32,
    height: 32,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
});

export default ImportProducts;
