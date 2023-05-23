import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DIMENSIONS, formatNumber } from "../common/utils";
import { colors } from "../constants/colors";
import { IconShoppingCarts } from "../constants/icons";
import {
  AddDistributorCart,
  handleProductId,
  resetCartState,
  selectDistributorCart,
} from "../redux/slice/Cart/distributor-cart";
import { GradientView } from "./GradientView";

import { useNavigation } from "@react-navigation/native";
import { QUANTITY } from "../constants/untils";
import { translate } from "../locale/index";
import { ScreenNames } from "../navigation/screen";
import { getReadyProduct, onBuyNow } from "../view/cart/components/utils";
import Alerts from "./Alerts";
import { RatingStar } from "./RatingStar";
import { ProductType } from "./CardProductManager";
import { useAppDispatch } from "../redux/hooks";

interface TPropsType {
  data: ProductType;
  marginBottom: boolean;
}

export default function CardProduct(props: TPropsType) {
  const data = props?.data;
  const productItemId = props?.data?.id?.toString() || "";
  const dispatch = useAppDispatch();
  const { addToCartSuccess, productId, errors } = useSelector(
    selectDistributorCart
  );
  const navigation = useNavigation();
  const [outOfStock, setOutOfStock] = useState(false);

  const [active, setActive] = useState<boolean>(false);

  const onAddToCart = () => {
    if (!getReadyProduct(data)) {
      setOutOfStock(true);
      return false;
    }
    setActive(true);
    dispatch(handleProductId(productItemId));
    dispatch(
      AddDistributorCart({
        productId: productItemId,
        quantity: QUANTITY,
      })
    );
  };

  const onHandleLink = () => {
    navigation.navigate(
      ScreenNames.ProductDetails as never,
      { id: data.productId ? data.productId : data.id } as never
    );
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
      <TouchableOpacity
        style={[
          styles.container,
          props.marginBottom ? styles.mb10 : styles.mb0,
        ]}
        onPress={onHandleLink}
      >
        <TouchableOpacity style={styles.boxImage} onPress={onHandleLink}>
          {renderLabel()}
          <Image
            source={props?.data?.source}
            resizeMode="cover"
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.viewInfo}>
          <TouchableOpacity onPress={onHandleLink} style={{ marginBottom: 2 }}>
            <Text style={styles.txtProduct} numberOfLines={2}>
              {props?.data?.name}
            </Text>
          </TouchableOpacity>

          <RatingStar
            ratingAvg={data?.ratingAvg || 0}
            wrapStarStyle={styles.boxStar}
            starStyle={styles.iconBox}
          />

          <View style={styles.wiewPrice}>
            <Text style={styles.txtPrice}>
              {formatNumber(props?.data?.price)} đ
            </Text>
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
          <TouchableOpacity onPress={onAddToCart}>
            <GradientView style={styles.boxSortCart}>
              <IconShoppingCarts
                width={21.53}
                height={20}
                fill={colors.c_ffffff}
              />
            </GradientView>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {productId === productItemId && active ? (
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
      <Alerts
        modalVisible={outOfStock}
        content={translate("out_of_stock_message")}
        confirm={() => setOutOfStock(false)}
        statusNoti={"false"}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: (DIMENSIONS.width - 60) / 2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.c_000_01,
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  boxImage: {
    width: (DIMENSIONS.width - 60) / 2,
    height: ((DIMENSIONS.width - 60) / 2) * 0.75,
    marginBottom: 10,
    borderRadius: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "red",
  },
  viewInfo: {
    paddingHorizontal: 13,
    width: "100%",
    flex: 1,
    // borderWidth: 1,
  },
  txtProduct: {
    // padding: 13,
    // paddingLeft: 13,
    // paddingRight: 13,
    height: 36,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: colors.c_grey,
  },
  boxStar: {
    // paddingLeft: 13,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  iconBox: {
    marginRight: 3.88,
  },
  txtSold: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.c_868686,
    // marginLeft: 13,
  },
  wiewPrice: {
    // paddingLeft: 13,
    flexDirection: "row",
    fontSize: 16,
    alignItems: "center",
    paddingBottom: 10,
  },
  txtPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
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
    paddingHorizontal: 13,
    paddingBottom: 15.84,
  },
  textBuyNow: {
    fontSize: 12,
    fontWeight: "500",
  },
  boxSortCart: {
    marginLeft: 10,
    // marginHorizontal: 5,
    width: (DIMENSIONS.width / 5 / 76) * 46,
    height: 32,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  boxSortText: {
    height: 32,
    width: DIMENSIONS.width / 5,
    fontWeight: "bold",
    backgroundColor: colors.c_blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
  },
  iconCart: {
    width: 16,
    height: 16,
  },
  mb10: {
    marginBottom: 10,
  },
  mb0: {
    marginBottom: 0,
  },
  viewLabel: {
    position: "absolute",
    top: 0,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
