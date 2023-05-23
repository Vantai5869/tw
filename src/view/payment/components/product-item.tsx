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
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../../common/utils";
import Alerts from "../../../componets/Alerts";
import { GradientView } from "../../../componets/GradientView";
import { colors } from "../../../constants/colors";
import { IconCartArrowDown, icons } from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import { QUANTITY } from "../../../constants/untils";
import { translate } from "../../../locale";
import { ScreenNames } from "../../../navigation/screen";
import {
  AddDistributorCart,
  handleProductId,
  resetCartState,
  selectDistributorCart,
} from "../../../redux/slice/Cart/distributor-cart";
import { CartType } from "../../../redux/type/Cart/cart";
import { getReadyProduct, onBuyNow } from "../../cart/components/utils";
import ButtonCT from "./../../../componets/ButtonCT";
import { navigate } from "./../../../navigation/navigate";

interface Props {
  e?: any;
  i: number;
  isView?: boolean;
  type?: string;
  style?: StyleProp<ViewStyle>;
}
export const ProductCart = ({ e, i, isView, type, ...props }: Props) => {
  const data = e;

  const dispatch = useDispatch();
  const { addToCartSuccess, productId, errors } = useSelector(
    selectDistributorCart
  );

  const [quantity, setQuantity] = useState<number>(10);
  const [active, setActive] = useState<boolean>(false);

  const onAddToCart = () => {
    if (!getReadyProduct(data)) {
      return false;
    }
    setActive(true);
    dispatch(handleProductId(e?.id?.toString() || ""));
    dispatch(
      AddDistributorCart({
        productId: e.id.toString() || "",
        quantity,
      })
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
      <View
        style={[
          styles.productInfo,
          i > 0 && styles.line,
          i === 0 && { paddingTop: 0, paddingBottom: 20 },
          props.style,
        ]}
      >
        <View style={[styles.wrapperInfo]}>
          <View style={styles.boxImage}>
            {renderLabel()}
            <Image
              source={e.image?.[0] ? { uri: e.image?.[0] } : MEDIA.IMAGE_LOGO}
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
              {formatNumber(e?.price || 0)}đ/
              {e?.unit || translate("chiec")}
            </Text>
            {isView ? (
              <View>
                <View style={styles.quantity_wrap}>
                  <Text style={styles.productNumber}>
                    {/* {translate("number_product", {
                  number: formatNumber(quantity),
                })} */}
                    Số lượng:
                  </Text>
                  <Text
                    style={[styles.productNumber, { color: colors.c_3A3A3C }]}
                  >
                    {" " + e?.quantity}
                  </Text>
                </View>
                {type == "rate" ? (
                  <View style={{ alignItems: "flex-end" }}>
                    <ButtonCT
                      textButton={translate("review")}
                      styleText={styles.txtAccept}
                      onPress={() =>
                        navigate(
                          ScreenNames.ReviewOrderImport as never,
                          { id: e } as never
                        )
                      }
                      style={styles.btnContainer}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </View>
            ) : (
              <View style={[styles.flexBetween, { marginTop: 20 }]}>
                <View style={styles.flex}>
                  <TouchableOpacity
                    onPress={() =>
                      setQuantity((prev) => {
                        if (prev > 1) {
                          return prev - 1;
                        }
                        return prev;
                      })
                    }
                    style={styles.quantityBtn}
                  >
                    <Text style={styles.quantityBtnText}>-</Text>
                  </TouchableOpacity>
                  <View style={styles.viewQuantityText}>
                    <Text style={styles.quantityText}>
                      {formatNumber(quantity)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setQuantity((prev) => prev + 1)}
                    style={[styles.quantityBtn, styles.quantityBtnAdd]}
                  >
                    <Text
                      style={[
                        styles.quantityBtnText,
                        styles.quantityBtnAddText,
                      ]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={[
                    styles.flex,
                    !getReadyProduct(data) && {
                      opacity: 0.5,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.boxSortText}
                    onPress={() => onBuyNow(data, quantity)}
                  >
                    <Text style={styles.textBuyNow}>
                      {translate("buy_now")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      onAddToCart();
                    }}
                  >
                    <GradientView style={styles.boxSortCart}>
                      <IconCartArrowDown
                        width={24}
                        height={24}
                        fill={colors.c_ffffff}
                        style={styles.iconCart}
                      />
                    </GradientView>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      {productId === e.id.toString() && active ? (
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
};

const styles = StyleSheet.create({
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
    // flexDirection: "row",
    paddingVertical: 20,
  },
  wrapperInfo: {
    flexDirection: "row",
    marginVertical: 10,
  },
  boxImage: {
    marginTop: 4,
    width: 75,
    height: 75,
    position: "relative",
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
  },
  productId: {
    marginTop: 3,
    textTransform: "uppercase",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    color: colors.c_48484A,
  },
  productPrice: {
    marginTop: 10,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_1F1F1F,
  },
  quantity_wrap: {
    marginTop: 12,
    flexDirection: "row",
    // backgroundColor: "red",
    // alignItems: "center",
    // alignContent: "center",
  },
  productNumber: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    // textAlign: "center",
    color: colors.c_667403,
  },
  quantityBtn: {
    width: 20,
    height: 20,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.c_000_01,
  },
  quantityBtnAdd: { backgroundColor: colors.primary },
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
    backgroundColor: colors.c_blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  boxSortCart: {
    width: 46,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  iconCart: {
    width: 16,
    height: 16,
  },
  btnContainer: {
    height: 40,
    paddingVertical: 9,
    paddingHorizontal: 24,
  },
  txtAccept: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
  },
  viewLabel: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.c_000_005,
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
