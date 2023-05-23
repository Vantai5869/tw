import React, { useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { formatNumber } from "../../../common/utils";
import { GradientView } from "../../../componets/GradientView";
import { colors } from "../../../constants/colors";
import { icons } from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import { translate } from "../../../locale";
import { AddDistributorCart } from "../../../redux/slice/Cart/distributor-cart";

interface Props {
  e?: any;
  i: number;
  style?: StyleProp<ViewStyle>;
}
export const ProductCartOrder = ({ e, i, ...props }: Props) => {
  const [quantity, setQuantity] = useState<number>(e?.quantity || 10);
  const [viewDetails, setViewDetails] = useState(false);

  return (
    <View style={styles.container}>
      {viewDetails ? (
        <TouchableOpacity onPress={() => setViewDetails(false)}>
          <View style={[styles.productInfo, i > 0 && styles.line, props.style]}>
            <View style={styles.boxImage}>
              <Image
                source={
                  e?.image?.[0] ? { uri: e?.image?.[0] } : MEDIA.IMAGE_LOGO
                }
                style={styles.productImg}
              />
            </View>
            <View style={styles.boxContent}>
              <Text
                style={styles.productName}
                numberOfLines={2}
                ellipsizeMode="clip"
              >
                {e?.productName}
              </Text>
              {e?.code ? (
                <Text style={styles.productId}>
                  {translate("productNumber", { code: e?.code })}
                </Text>
              ) : null}
              <Text style={styles.productPrice}>
                {formatNumber(e?.price || 0)}đ/{e?.unit || translate("chiec")}
              </Text>
              <Text style={styles.productNumber}>
                {translate("number_product_order")}
                <Text style={styles.numberQuantity}>
                  {formatNumber(quantity)}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.viewNotDetaisl}
          onPress={() => setViewDetails(true)}
        >
          <Text
            style={styles.productNames}
            numberOfLines={2}
            ellipsizeMode="clip"
          >
            {e?.productName}
          </Text>
          <Text style={styles.productNumbers}>
            {translate("number_product_order")}
            <Text style={styles.numberQuantitys}>{formatNumber(quantity)}</Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    borderTopWidth: 1,
    borderColor: colors.c_F3F4F6,
  },
  productInfo: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  boxImage: {
    marginTop: 4,
    width: 75,
    height: 75,
  },
  boxContent: {
    marginLeft: 18,
    flex: 1,
  },
  productImg: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.c_F3F3F3,
  },
  productName: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_1F1F1F,
    marginBottom: 6,
  },
  productId: {
    textTransform: "uppercase",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: colors.c_48484A,
    marginBottom: 6,
  },
  productPrice: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_1F1F1F,
    marginBottom: 12,
  },
  productNumber: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    color: colors.c_667403,
    // backgroundColor: "red",
  },
  numberQuantitys: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "400",
    marginTop: 4,
    color: colors.c_3A3A3C,
  },
  numberQuantity: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
    color: colors.c_000000,
  },
  productNumbers: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary,
  },
  productNames: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.c_1F1F1F,
    // width: "70%",
  },
  quantityBtn: {
    width: 20,
    height: 20,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  quantityBtnAdd: { backgroundColor: "#A2B705" },
  quantityBtnText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "600",
  },
  quantityBtnAddText: {
    color: "white",
  },
  viewQuantityText: { marginHorizontal: 8 },
  quantityText: {
    fontSize: 16,
    lineHeight: 22,
  },

  textBuyNow: {
    fontSize: 12,
  },
  boxSortText: {
    marginHorizontal: 10,
    width: 78,
    height: 32,
    fontWeight: "bold",
    backgroundColor: "rgba(102, 116, 3, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  boxSortCart: {
    width: 46,
    height: 32,
    backgroundColor: "rgba(253, 125, 0, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  iconCart: {
    width: 16,
    height: 16,
  },
  viewNotDetaisl: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});
