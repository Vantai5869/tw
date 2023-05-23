import React, { useEffect } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetFormatNumber } from "../common/utils";
import { colors } from "../constants/colors";
import {
  // IconShoppingCart2 as IconCartWhite,
  IconShoppingCartBase,
  IconShoppingCartBaseWhite,
} from "../constants/icons";
import { navigate } from "../navigation/navigate";
import { ScreenNames } from "../navigation/screen";
import { selectDistributorCart } from "../redux/slice/Cart/distributor-cart";
import { getTotalQuantity } from "../view/cart/components/utils";
interface TCart {
  number?: number;
  onPress?: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
  styleImage?: StyleProp<ViewStyle>;
  isLight?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  styleNumber?: StyleProp<ViewStyle>;
}

export default function IconCart(props: TCart) {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectDistributorCart);
  const number = getTotalQuantity(cart || []);

  // useEffect(() => {
  //   dispatch(GetCart(""));
  // }, []);

  const onPress = () => {
    if (props.onPress?.()) {
      props.onPress?.();
    } else {
      navigate(ScreenNames.Cart as never, {} as never);
    }
  };
  const darkIcon = {
    width: props.iconWidth || 24,
    height: props.iconWidth || 24,
  };
  const lightIcon = {
    width: props.iconWidth || 26,
    height: props.iconWidth || 26,
  };
  return (
    <TouchableOpacity
      style={[{ position: "relative" }, props.style]}
      onPress={onPress}
    >
      <View
        style={[
          styles.viewImage,
          { ...darkIcon },
          props.isLight && {
            ...lightIcon,
          },
          props.styleImage,
        ]}
      >
        {props.isLight ? (
          <IconShoppingCartBaseWhite {...lightIcon} />
        ) : (
          <IconShoppingCartBase {...darkIcon} />
        )}
        <View style={[styles.viewNumber, props.styleNumber]}>
          <Text style={styles.txtNumber}>
            {resetFormatNumber(number) > 99 ? "99+" : number}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  viewImage: {
    position: "relative",
  },
  viewNumber: {
    position: "absolute",
    top: -2,
    right: -3,
    zIndex: 100,
    backgroundColor: "#FCC22D",
    width: 13,
    height: 13,
    borderRadius: 13,
  },
  txtNumber: {
    fontSize: 6,
    fontWeight: "500",
    lineHeight: 12,
    color: colors.c_ffffff,
    textAlign: "center",
  },
});
