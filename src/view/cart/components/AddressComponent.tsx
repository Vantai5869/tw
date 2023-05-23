import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconMap from "../../../assets/icons/map-marked-color.svg";
import { colors } from "../../../constants/colors";
import { IconAngleRight, icons } from "../../../constants/icons";
import { TAddressObject } from "../../../constants/type.interface";
import { translate } from "../../../locale";
import {
  onPickUpAddress,
  selectAddress,
} from "../../../redux/slice/Shipping/address";

import {
  CreateAddress,
  selectProfile,
  addressDetail,
  resetAddressDetail,
} from "../../../redux/slice/Profile/profile";
import { AddressType } from "../../../redux/type/Shipping/address";
import DeliveryAddress from "../../profile/address";
import { getAddress } from "./utils";
import { ScreenNames } from "../../../navigation/screen";

interface Props {
  data: TAddressObject | AddressType;
}

export const AddressComponent = React.memo<Props>(({ ...props }) => {
  const dispatch = useDispatch();
  const { typeRadio } = useSelector(selectProfile);

  const [address, setAddress] = useState<TAddressObject | AddressType>();
  const [isVisible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeRadio) {
      setVisible(true);
    }
  }, [typeRadio]);
  useEffect(() => {
    setAddress(props.data);
  }, [props.data]);

  const onSelect = (dataSelect: TAddressObject) => {
    setAddress(dataSelect);
    dispatch(onPickUpAddress(dataSelect));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
        activeOpacity={0.8}
        style={styles.view}
      >
        <IconMap
          width={32}
          height={32}
          style={styles.iconLeft}
          fill={colors.c_636366}
          color={colors.c_667403}
        />
        <View
          style={[styles.boxInfo, !address?.id && { alignItems: "center" }]}
        >
          {!!address?.id ? (
            <View style={styles.boxText}>
              <Text style={styles.txtName}>{address?.name}</Text>
              {address?.phoneNumber ? (
                <Text style={styles.txtContent}>{address?.phoneNumber}</Text>
              ) : null}
              <Text style={styles.txtContent}>
                {getAddress(address as any)}
              </Text>
            </View>
          ) : (
            <Text
              style={[
                styles.txtName,
                { marginLeft: 14, color: "#000", flex: 1 },
              ]}
            >
              {translate("select_address")}
            </Text>
          )}
          <IconAngleRight width={16} height={16} fill={colors.c_636366} />
        </View>
      </TouchableOpacity>

      <Modal visible={isVisible} animationType="slide">
        <SafeAreaView style={{ paddingVertical: 15, flex: 1 }}>
          <View style={styles.mdHeader}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                // props.navigation.navigate(ScreenNames.Cart);
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
          <DeliveryAddress
            typeRadio={true}
            checked={address}
            onChange={(data: TAddressObject) => onSelect(data)}
            onClose={() => {
              setVisible(false);
            }}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
  },
  iconLeft: {},
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
function data(data: any) {
  throw new Error("Function not implemented.");
}
