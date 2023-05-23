import React, { useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconMap from "../../../assets/icons/map-marked-color.svg";
import { colors } from "../../../constants/colors";
import {
  IconAngleRight,
  icons,
  IconSquarePin1,
} from "../../../constants/icons";
import { translate } from "../../../locale";
import { getAddress } from "../../cart/components/utils";

interface Props {
  address: any;
  isView?: boolean;
}

export const AddressComponent = React.memo<Props>(({ isView, address }) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (isView) {
            return false;
          }
          setVisible((prev) => !prev);
        }}
        activeOpacity={0.8}
        style={styles.view}
      >
        <IconSquarePin1 width={24} height={24} style={styles.iconLeft} />
        <View style={styles.boxInfo}>
          <View style={styles.boxText}>
            <Text style={styles.txtName}>{address?.name}</Text>
            {address?.phoneNumber ? (
              <Text style={styles.txtContent}>{address?.phoneNumber}</Text>
            ) : null}
            <Text style={styles.txtContent}>{getAddress(address)}</Text>
          </View>
          {isView ? null : (
            <IconAngleRight width={16} height={16} fill={colors.c_636366} />
          )}
        </View>
      </TouchableOpacity>

      <Modal visible={isVisible} animationType="slide">
        <SafeAreaView style={{ paddingVertical: 15, flex: 1 }}>
          <View style={styles.mdHeader}>
            <TouchableOpacity
              onPress={() => {
                // setVisible((prev) => !prev);
              }}
              style={styles.mdBtnClose}
            >
              <Image
                source={icons.ICON_CLOSE}
                style={styles.iconClose}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.txtMdTitle}>
              {translate("address_receive")}
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
  },
  iconLeft: { marginTop: 5 },
  boxInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  boxText: {
    flex: 1,
    paddingLeft: 13,
    paddingRight: 30,
    textAlign: "left",
    justifyContent: "flex-start",
  },
  txtName: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_667403,
  },
  iconFlag: {
    width: 18,
    height: 18,
    marginLeft: 10,
    marginRight: 4,
  },
  txtDefault: {
    lineHeight: 12,
    fontSize: 10,
    color: colors.c_48484A,
  },
  txtContent: {
    lineHeight: 18,
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_48484A,
  },
  icon: {
    width: 18,
    height: 18,
    marginBottom: 15,
  },
  mdHeader: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txtMdTitle: {
    lineHeight: 22,
    fontSize: 18,
    fontWeight: "700",
    color: colors.c_1F1F1F,
  },
  mdBtnClose: { position: "absolute", left: 24 },
  iconClose: {
    width: 24,
    height: 24,
  },
});
