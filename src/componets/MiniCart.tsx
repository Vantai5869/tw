import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetFormatNumber } from "../common/utils";
import { colors } from "../constants/colors";
import { ShoppingCartBaseSVG } from "../constants/icons";
import { navigate } from "../navigation/navigate";
import { ScreenNames } from "../navigation/screen";
import {
  GetDistributorCart,
  selectDistributorCart,
} from "../redux/slice/Cart/distributor-cart";
import { getTotalQuantity } from "../view/cart/components/utils";

export const MiniCart = ({ ...props }) => {
  const dispatch = useDispatch();
  const { carts } = useSelector(selectDistributorCart);
  const number = getTotalQuantity(carts || []);

  useEffect(() => {
    dispatch(GetDistributorCart());
  }, []);

  const handleOpenCart = () => {
    navigate(ScreenNames.Cart as never, {} as never);
  };

  return (
    <TouchableOpacity style={styles.boxSortCart} onPress={handleOpenCart}>
      <ShoppingCartBaseSVG style={styles.iconCart} />
      <View style={[styles.viewNumber]}>
        <Text style={styles.txtNumber}>
          {resetFormatNumber(number.toString()) > 99 ? "99+" : number}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxSortCart: {
    marginLeft: 8,
    width: 43,
    height: 43,
    backgroundColor: colors.c_ffffff,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.c_0000001a,
    color: colors.c_ffffff,
  },
  iconCart: {
    width: 20,
    height: 20,
    tintColor: colors.c_ffffff,
  },
  viewNumber: {
    position: "absolute",
    backgroundColor: "#FCC22D",
    width: 13,
    height: 13,
    borderRadius: 13,
    top: 5,
    right: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  txtNumber: {
    fontSize: 6,
    fontWeight: "500",
    lineHeight: 12,
    color: colors.c_ffffff,
    textAlign: "center",
  },
});
