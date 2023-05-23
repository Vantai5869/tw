import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AddressItem } from "../../../componets/AddressItem";
import Button from "../../../componets/Button";
import SafeViewLayout from "../../../componets/SafeViewLayout";
import { colors } from "../../../constants/colors";
import { TAddressObject } from "../../../constants/type.interface";
import i18n from "../../../locale";
import { ScreenNames } from "../../../navigation/screen";
import {
  selectProfile,
  typeRadioAddress,
  resetRadioAddress,
  selectedAddress,
} from "../../../redux/slice/Profile/profile";
import { GetAddressList } from "../../../redux/slice/Profile/profile";
import MyCoolScrollViewComponent from "./MyScrollView";
import ButtonCT from "../../../componets/ButtonCT";
import { navigate } from "../../../navigation/navigate";

const DeliveryAddress = ({ ...props }) => {
  const dispatch = useDispatch();
  const { addressList, loading, typeRadio, selectedShippingAddress } =
    useSelector(selectProfile);
  const addresses = addressList?.items;

  const [address, setAddress] = useState<TAddressObject>(
    selectedShippingAddress
  );
  useEffect(() => {
    dispatch(
      GetAddressList({
        take: 20,
        skip: 0,
      })
    );
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={{ marginVertical: 25 }}
      />
    );
  }

  return (
    <SafeViewLayout style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.myScrollView}
      >
        <View style={styles.viewListAddress}>
          {addresses?.map((item: any, index: number) => (
            <View key={item.id}>
              <View
                style={[
                  styles.wrapItem,
                  { zIndex: 999 - index },
                  props.typeRadio && styles.line,
                ]}
              >
                <AddressItem
                  item={item}
                  typeRadio={typeRadio}
                  checked={address?.id}
                  onSelect={(data) => {
                    setAddress?.(data);
                  }}
                  props={props}
                />
              </View>
              {index === addresses.length - 1 && (
                <View style={{ height: 60 }}></View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.wrapBtn}>
        <ButtonCT
          textButton={i18n.t("add_new_address")}
          onPress={() => {
            props?.onClose?.();
            navigate(ScreenNames.CreateNewAddress as never, {} as never);
            // dispatch(typeRadioAddress(false));
            typeRadio
              ? dispatch(typeRadioAddress(true))
              : dispatch(typeRadioAddress(false));
          }}
          styleBackground={[styles.btnBg]}
          styleText={styles.btnText}
          style={{ paddingVertical: 14 }}
        />
        {typeRadio ? (
          <ButtonCT
            textButton={i18n.t("Xác nhận")}
            onPress={() => {
              // props.navigation.navigate(ScreenNames.Cart);
              props.navigation.goBack();
              dispatch(selectedAddress(address));
              dispatch(typeRadioAddress(false));
            }}
            style={[
              styles.btnBg,
              {
                marginTop: 15,
                backgroundColor: colors.c_000000,
                paddingVertical: 14,
              },
            ]}
            styleText={styles.btnText}
          />
        ) : null}
      </View>
    </SafeViewLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    paddingVertical: 15,
    flex: 1,
    // flexDirection: "column",
  },
  containerTouchable: {
    // paddingBottom: 50,
    flex: 1,
  },
  wrapItem: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: colors.c_000_012,
  },
  line: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.c_000_01,
  },

  wrapBtn: {
    paddingHorizontal: 24,
  },
  btnBg: {
    backgroundColor: colors.primary,
  },
  btnText: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
  myScrollView: {
    flex: 1,
  },
  viewListAddress: {
    paddingBottom: 20,
  },
});

export default DeliveryAddress;
