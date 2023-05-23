import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../common/utils";
import { colors } from "../constants/colors";
import { icons } from "../constants/icons";
import { ACTION_TYPE } from "../constants/type.interface";
import { translate } from "../locale";
import { goBack, navigate } from "../navigation/navigate";
import { ScreenNames } from "../navigation/screen";
import {
  ChangeQuantity,
  DeleteDistributorCart,
  selectDistributorCart,
} from "../redux/slice/Cart/distributor-cart";
import { CartProductType } from "../redux/type/Cart/cart";
import { getReadyProduct } from "../view/cart/components/utils";
import AlertConfirm from "./AlertConfirm";
import InputQuantity from "./InputQuantity";

interface TProdcut {
  data: CartProductType;
  isView?: boolean;
  type?: string;
  onPassQuantity?: (val: number) => void;
  payment?: boolean;
}
export default function ProductCart({ data, ...props }: TProdcut) {
  const dispatch = useDispatch();
  const { retailerCartId } = useSelector(selectDistributorCart);

  const [isReady, setIsReady] = useState<boolean>(true);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    setIsReady(getReadyProduct(data));
  }, []);

  const onChangeQuantity = (quantity: number) => {
    if (quantity > 0) {
      if (props.type !== ACTION_TYPE.BUYNOW) {
        dispatch(
          ChangeQuantity({
            distributorCartId: data?.distributorCartId || "",
            distributorCartItemId: data?.distributorCartItemId || "",
            productId: data?.productId || "",
            quantity: quantity,
            quantityReady: data?.quantityReady || 0,
          })
        );
      } else {
        props.onPassQuantity?.(quantity);
      }
    }
  };

  const onDelete = () => {
    setIsDelete(false);

    if (props.type !== ACTION_TYPE.BUYNOW) {
      dispatch(DeleteDistributorCart(data?.distributorCartItemId || ""));
    } else {
      // goBack();

      props.navigation.goBack();
    }
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

  return (
    <View style={[styles.container]}>
      <View style={styles.boxImage}>
        {renderLabel()}
        <TouchableOpacity
          onPress={() =>
            navigate(
              ScreenNames.ProductDetails as never,
              {
                id: data.productId,
              } as never
            )
          }
        >
          <Image
            source={{ uri: data?.image?.[0] }}
            resizeMode="cover"
            style={[
              styles.image,
              !isReady && {
                opacity: 0.4,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.boxInfo}>
        <TouchableOpacity
          onPress={() =>
            navigate(
              ScreenNames.ProductDetails as never,
              {
                id: data.productId,
              } as never
            )
          }
        >
          <Text
            style={[
              styles.txtProduct,
              !isReady && {
                opacity: 0.4,
              },
            ]}
            numberOfLines={3}
          >
            {data?.productName}
          </Text>
        </TouchableOpacity>
        {!!data?.code ? (
          <Text
            style={[
              styles.txtProvider,
              !isReady && {
                opacity: 0.4,
              },
            ]}
          >
            {translate("productNumber", { code: data?.code })}
          </Text>
        ) : null}

        <View
          style={[
            styles.viewPrice,
            !isReady && {
              opacity: 0.4,
            },
          ]}
        >
          <Text style={styles.txtPrice}>{formatNumber(data?.price || 0)}đ</Text>
        </View>
        {!props?.isView ? (
          <View style={styles.bottom}>
            <View
              pointerEvents={!isReady ? "none" : "auto"}
              style={
                !isReady && {
                  opacity: 0.4,
                }
              }
            >
              <InputQuantity
                disableChange={
                  props.payment || props.type === ACTION_TYPE.BUYNOW
                }
                onChangeText={(text: number) => onChangeQuantity(text)}
                value={data?.quantity || 1}
                onDelete={onDelete}
              />
            </View>
            <TouchableOpacity onPress={() => setIsDelete(true)}>
              <Text style={styles.txtDel}>{translate("delete")}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={[styles.txtProvider, { color: colors.primary }]}>
            {translate("number_product", { number: data?.quantity })}
          </Text>
        )}
      </View>
      <AlertConfirm
        modalVisible={isDelete}
        content={translate("wanna_delete_cart_item")}
        confirm={() => onDelete()}
        cancel={() => {
          setIsDelete(false);
        }}
        statusNoti="false"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
  },
  boxImage: {
    width: 75,
    height: 75,
    // backgroundColor: "#C4C4C4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  boxInfo: { paddingLeft: 8, flex: 1 },
  txtProduct: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_1F1F1F,
  },
  txtProvider: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.c_48484A,
    marginTop: 4,
  },
  viewVar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.c_DEDEDE,
    width: 120,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginTop: 7,
    marginBottom: 10,
  },
  txtVar: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.c_656565,
  },
  viewPrice: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  txtPrice: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_48484A,
    marginRight: 5,
  },
  viewSale: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 23,
    height: 14,
    backgroundColor: colors.c_EC4037,
    borderRadius: 1,
  },
  txtSale: {
    color: colors.c_ffffff,
    fontSize: 7,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  txtDel: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.primary,
  },
  viewLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.c_C7C7CC,
    width: 50,
    zIndex: 100,
  },
  txtLabel: {
    fontSize: 10,
    lineHeight: 15,
    color: "white",
    textAlign: "center",
  },
});
