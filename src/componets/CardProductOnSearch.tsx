import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DIMENSIONS, formatNumber } from "../common/utils";
import { colors } from "../constants/colors";
import { icons, IconStar } from "../constants/icons";
import { QUANTITY } from "../constants/untils";
import { translate } from "../locale";
import { navigate } from "../navigation/navigate";
import { ScreenNames } from "../navigation/screen";
import {
  AddDistributorCart,
  handleProductId,
  resetCartState,
  selectDistributorCart,
} from "../redux/slice/Cart/distributor-cart";
import { CartType } from "../redux/type/Cart/cart";
import { getReadyProduct, onBuyNow } from "../view/cart/components/utils";
import Alerts from "./Alerts";
import { GradientView } from "./GradientView";
import { RatingStar } from "./RatingStar";
interface TProduct {
  nameProduct: string;
  price: number;
  sold: number;
  sale?: number;
  source: any;
  id: number;
  data?: any;
}
export default function CardProductOnSearch({ data, ...props }: TProduct) {
  const dispatch = useDispatch();
  const { addToCartSuccess, productId, errors } = useSelector(
    selectDistributorCart
  );

  const [active, setActive] = useState<boolean>(false);

  const onAddToCart = () => {
    if (!getReadyProduct(data)) {
      return false;
    }
    setActive(true);
    dispatch(handleProductId(props.id.toString() || ""));
    dispatch(
      AddDistributorCart({
        productId: props.id.toString() || "",
        quantity: QUANTITY,
      })
    );
  };

  const onHandleLink = () => {
    navigate(ScreenNames.ProductByIndustry as never, { id: props.id } as never);
  };

  const renderLabel = () => {
    if (data?.isDeleted === true) {
      return (
        <View style={styles.viewLabel}>
          <Text style={styles.txtLabel}>{translate("product_del")}</Text>
        </View>
      );
    }

    if (data?.isOutOfStock === true || data?.distributorTotalQuantity === 0) {
      return (
        <View style={styles.viewLabel}>
          <Text style={styles.txtLabel}>{translate("out_of_stock")}</Text>
        </View>
      );
    }

    return null;
  };

  const onConfirmAlert = () => {
    setActive(false);
    dispatch(resetCartState(""));
  };

  return (
    <>
      <View style={[styles.container]}>
        <TouchableOpacity style={styles.boxImage} onPress={onHandleLink}>
          {renderLabel()}
          <Image
            source={{ uri: props.source?.[0] }}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.viewInfo}>
          <TouchableOpacity onPress={onHandleLink} style={{ marginBottom: 2 }}>
            <Text style={styles.txtProduct} numberOfLines={2}>
              {props.nameProduct}
            </Text>
          </TouchableOpacity>
          <Text style={styles.txtSold}>
            {translate("sold", { sold: props.sold || 0 })}
          </Text>
          <RatingStar
            ratingAvg={data?.ratingAvg || 0}
            wrapStarStyle={styles.boxStar}
            starStyle={styles.iconBox}
          />
          <View style={styles.wiewPrice}>
            <Text style={styles.txtPrice}>
              {formatNumber(props.price, ",")} đ
            </Text>
            {/* {props.sale && (
          <View style={styles.viewSale}>
            <Text style={styles.txtSale}>-{props.sale}%</Text>
          </View>
        )} */}
          </View>
        </View>
        <View
          style={[
            styles.buyNow,
            !getReadyProduct(data) && {
              opacity: 0.5,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.boxSortText}
            onPress={() => onBuyNow(data)}
          >
            <Text style={styles.textBuyNow}>{translate("buy_now")}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onAddToCart()}>
            <GradientView style={styles.boxSortCart}>
              <Image source={icons.ICON_ADD_CART} style={styles.iconCart} />
            </GradientView>
          </TouchableOpacity>
        </View>
      </View>
      {productId === props.id.toString() && active ? (
        <>
          <Alerts
            modalVisible={!!addToCartSuccess}
            content={addToCartSuccess || ""}
            confirm={() => onConfirmAlert()}
            statusNoti={"false"}
          />
          <Alerts
            modalVisible={!!errors}
            content={errors || ""}
            confirm={() => onConfirmAlert()}
            statusNoti={"false"}
          />
        </>
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: DIMENSIONS.width / 2 - 4.5 - 4.5 - 18.5,
    // marginBottom: 30,
    margin: 4.5,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    // borderTopWidth: 0,
    alignItems: "center",
  },
  viewRight: {
    // marginRight: 8,
  },
  boxImage: {
    width: DIMENSIONS.width / 2 - 4.5 - 4.5 - 18.5,
    height: ((DIMENSIONS.width / 2 - 4.5 - 4.5 - 18.5) * 3) / 4,
    marginBottom: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    // borderColor: "red",
  },
  txtProduct: {
    // padding: 13,
    paddingLeft: 13,
    paddingRight: 13,
    fontSize: 14,
    fontWeight: "bold",
    color: colors.c_1F1F1F,
    lineHeight: 17,
  },
  boxStar: {
    paddingLeft: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconBox: {
    marginRight: 3.88,
  },
  txtSold: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.c_868686,
    marginLeft: 13,
  },
  wiewPrice: {
    paddingLeft: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  txtPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(252, 131, 45, 1)",
    marginRight: 5,
  },
  viewSale: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 23,
    height: 14,
    backgroundColor: colors.c_FC832D,
    borderRadius: 1,
  },
  txtSale: {
    color: colors.c_ffffff,
    fontSize: 7,
  },
  buyNow: {
    flexDirection: "row",
    // justifyContent: "space-around",
    paddingLeft: 10,
    paddingBottom: 10,
  },
  textBuyNow: {
    fontSize: 12,
  },
  boxSortCart: {
    marginLeft: 10,
    width: 46,
    height: 32,
    backgroundColor: "rgba(253, 125, 0, 1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: colors.c_000_01,
  },
  boxSortText: {
    marginLeft: 10,
    width: 78,
    height: 32,
    fontWeight: "bold",
    backgroundColor: "rgba(252, 131, 45, 0.1)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    // borderWidth: 1,
    // borderColor: colors.c_000_01,
  },
  iconCart: {
    width: 16,
    height: 16,
  },
  viewInfo: { width: "100%", paddingHorizontal: 13 },
  viewLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "100%",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  txtLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: "white",
    textAlign: "center",
  },
});
