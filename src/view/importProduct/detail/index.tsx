import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatNumber } from "../../../common/utils";
import Alerts from "../../../componets/Alerts";
import ButtonCT from "../../../componets/ButtonCT";
import { GradientView } from "../../../componets/GradientView";
import { colors } from "../../../constants/colors";
import {
  IconBasketFavorite,
  IconBasketRemove,
  IconBoxRibbon,
  IconShopSVG,
  IconWallet43,
  IconSquarePin1,
} from "../../../constants/icons";
import { DateFomart } from "../../../constants/untils";
import { translate } from "../../../locale";
import { navigate } from "../../../navigation/navigate";
import { ScreenNames } from "../../../navigation/screen";
import { useAppDispatch } from "../../../redux/hooks";
import {
  GetDetailOrder,
  GetReasonCancelOrderImport,
  handleOrderImportId,
  resetOrderImportState,
  selectOrderImport,
} from "../../../redux/slice/Sales/order-import";
import { OrderImportProductType } from "../../../redux/type/Sales/order-import";
import { AddressComponent } from "../components/AddressComponent";
import { CancelOrderComponent } from "../components/CancelOrderComponent";
import { ProductItemOrder } from "../components/ProductItemOrder";
import { RePurchaseComponent } from "../components/RePurchaseComponent";
import { RePurchaseOrderItemModal } from "../components/RePurchaseOrderItemModal";

const OrderDetail = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const { order } = useSelector(selectOrderImport);
  const status = order?.status?.toString();
  const [isView, setIsView] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isRePurchase, setRePurchase] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetReasonCancelOrderImport(""));
    dispatch(GetDetailOrder(props?.route?.params?.id || ""));
  }, []);

  const onComingSoon = () => Alert.alert("Coming Soon");

  const onRePurchase = () => {
    dispatch(handleOrderImportId({ id: props?.route?.params?.id || "" }));
    setRePurchase(true);
  };

  const onCancel = () => {
    dispatch(handleOrderImportId({ id: props?.route?.params?.id || "" }));
    setIsModal(true);
  };

  const renderStatus = useMemo(() => {
    if (status === "1") {
      return (
        <View>
          <ButtonCT
            styleText={[styles.textRight]}
            textButton={translate("cancel_order")}
            style={[styles.buttonRight]}
            onPress={() => onCancel()}
          />
          <ButtonCT
            styleText={styles.textRight}
            textButton={translate("payment_now")}
            style={styles.buttonRight}
            onPress={onComingSoon}
          />
        </View>
      );
    }

    if (status === "2" || status === "3") {
      return (
        <ButtonCT
          styleText={styles.textRight}
          textButton={translate("cancel_order")}
          style={styles.buttonRight}
          onPress={() => onCancel()}
        />
      );
    }
    if (status === "4") {
      return (
        <ButtonCT
          styleText={styles.textRight}
          textButton={translate("delivered")}
          style={styles.buttonRight}
        />
      );
    }

    if (status === "5") {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ paddingRight: 4, flex: 1 }}>
            <ButtonCT
              styleText={[styles.textRight]}
              textButton={translate("label_review")}
              style={[styles.buttonRight]}
              onPress={() =>
                navigate(
                  ScreenNames.RateOrderImportScreen as never,
                  {
                    orderId: order?.id,
                    productRatings: order?.orderDetails,
                  } as never
                )
              }
            />
          </View>
          <View style={{ paddingLeft: 4, flex: 1 }}>
            <ButtonCT
              styleText={styles.textRight}
              textButton={translate("repurchase")}
              style={styles.buttonRight}
              onPress={() => onRePurchase()}
            />
          </View>
        </View>
      );
    }

    if (status === "0") {
      return (
        <ButtonCT
          styleText={styles.textRight}
          textButton={translate("repurchase")}
          style={styles.buttonRight}
          onPress={() => onRePurchase()}
        />
      );
    }

    return (
      <ButtonCT
        styleText={styles.textRight}
        textButton={translate("payment_now")}
        style={styles.buttonRight}
      />
    );
  }, [status]);

  const renderBadge = useMemo(() => {
    if (["1", "2", "3", "4"].includes(status || "")) {
      return (
        <View style={styles.viewBadge}>
          <GradientView style={styles.iconBadge}>
            <IconBoxRibbon width={18} height={18} stroke={"white"} />
          </GradientView>
          <Text style={styles.txtBadge}>
            {translate("label_order_" + status)}
          </Text>
        </View>
      );
    }

    if (status === "5") {
      return (
        <View style={styles.viewBadge}>
          <GradientView style={styles.iconBadge}>
            <IconBasketFavorite width={20} height={20} stroke={"white"} />
          </GradientView>
          <Text style={styles.txtBadge}>{translate("label_order_5")}</Text>
        </View>
      );
    }

    if (status === "0") {
      return (
        <View style={styles.viewBadge}>
          <GradientView style={styles.iconBadge}>
            <IconBasketRemove width={18} height={18} stroke={"white"} />
          </GradientView>
          <View>
            <Text style={styles.txtBadge}>{translate("label_order_0")}</Text>
            <TouchableOpacity
              onPress={() => {
                setIsModal(true);
                setIsView(true);
              }}
            >
              <Text style={[styles.txtBadge, styles.txtViewReason]}>
                {translate("view_reason")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.viewBadge}>
        <GradientView style={styles.iconBadge}>
          <IconBoxRibbon width={18} height={18} stroke={"white"} />
        </GradientView>
        <Text style={styles.txtBadge}>{translate("label_order_2")}</Text>
      </View>
    );
  }, [status]);

  const dateFormat = DateFomart.fulltimeSlash;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.wrapBadge}>{renderBadge}</View>
          <View style={styles.wrapAddress}>
            <View style={styles.viewTitleAddress}>
              <Text style={styles.txtTitleAddress}>
                {translate("address_receive")}
              </Text>
            </View>
            <View style={styles.viewAddress}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {order?.shippingAddress ? (
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginTop: 2 }}>
                      <IconSquarePin1 width={24} height={24} />
                    </View>
                    <View style={{ paddingLeft: 10, width: "90%" }}>
                      <Text style={styles.textNameAddress}>
                        {order?.shippingAddress?.name}
                      </Text>
                      <Text style={styles.textAddress}>
                        {order?.shippingAddress?.phoneNumber}
                      </Text>
                      <Text style={styles.textAddress} numberOfLines={3}>
                        {order?.shippingAddress?.specificAddress},{" "}
                        {order?.shippingAddress?.wardName},{" "}
                        {order?.shippingAddress?.districtName},{" "}
                        {order?.shippingAddress?.provinceName}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.wrapProducts}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(ScreenNames.SupplierScreen)
              }
              style={styles.store}
            >
              <IconShopSVG
                width={21}
                height={21}
                fill={colors.c_48484A}
                stroke={colors.c_48484A}
              />
              <Text style={styles.txtStore}>{order?.supplierName}</Text>
            </TouchableOpacity>
            {order?.orderDetails?.map((product: OrderImportProductType) => (
              <TouchableOpacity
                key={product.productId}
                onPress={() =>
                  props.navigation.navigate(ScreenNames.ProductDetails, {
                    id: product.productId,
                  })
                }
              >
                <ProductItemOrder product={product} />
              </TouchableOpacity>
            ))}
            <View style={[styles.wrapTotalPrice, { marginTop: 15 }]}>
              <Text style={styles.txtLabel}>{translate("total_price")}</Text>
              <Text style={[styles.txtPrice]}>
                {formatNumber(order?.totalPrice || 0)}đ
              </Text>
            </View>
            <View style={styles.wrapTotalPrice}>
              <Text style={styles.txtLabel}>{translate("shipping_fees")}</Text>
              <Text style={[styles.txtPrice]}>
                {formatNumber(order?.shippingFee || 0)}đ
              </Text>
            </View>

            <View style={[styles.wrapTotalPrice]}>
              <Text style={styles.txtLabel}>{translate("total_price")}</Text>
              <Text style={[styles.txtPrice, styles.txtActive]}>
                {formatNumber(order?.totalPay || 0)}đ
              </Text>
            </View>
          </View>

          <View style={styles.viewTitleAddress}>
            <Text style={styles.txtTitleAddress}>
              {translate("payment_method")}
            </Text>
          </View>
          <View style={styles.viewShippingType}>
            <IconWallet43 stroke={colors.primary} />
            <Text style={[styles.txtShippingType]}>
              {order?.paymentType === 2
                ? translate("online")
                : translate("cod")}
            </Text>
          </View>

          <View style={styles.bottom}>
            <View style={[styles.center, styles.viewOrderNumber]}>
              <Text
                style={styles.txtOrderNumber}
                ellipsizeMode="middle"
                numberOfLines={1}
              >
                {translate("orderNumber", { code: order?.orderNumber })}
              </Text>
            </View>

            <View style={[styles.between, styles.wrapTime]}>
              <Text style={styles.txtTime}>{translate("order_time")}</Text>
              <Text style={[styles.txtTime]}>
                {formatDate(order?.creationTime || "", dateFormat)}
              </Text>
            </View>

            {!!order?.paymentTime &&
            order?.paymentType &&
            order?.paymentType !== 1 ? (
              <View style={[styles.between, styles.wrapTime]}>
                <Text style={styles.txtTime}>
                  {translate("order_time_payment")}
                </Text>
                <Text style={[styles.txtTime]}>
                  {formatDate(order?.paymentTime || "", dateFormat)}
                </Text>
              </View>
            ) : null}

            {status === "4" ? (
              <View style={[styles.between, styles.wrapTime]}>
                <Text style={styles.txtTime}>
                  {translate("order_time_ets")}
                </Text>
              </View>
            ) : null}

            {!!order?.shippingTime && status === "5" ? (
              <View style={[styles.between, styles.wrapTime]}>
                <Text style={styles.txtTime}>
                  {translate("order_time_shipping")}
                </Text>
                <Text style={[styles.txtTime]}>
                  {formatDate(order?.shippingTime || "", dateFormat)}
                </Text>
              </View>
            ) : null}

            {status === "0" ? (
              <>
                {!!order?.cancelTime ? (
                  <View style={[styles.between, styles.wrapTime]}>
                    <Text style={styles.txtTime}>
                      {translate("order_time_cancel")}
                    </Text>
                    <Text style={[styles.txtTime]}>
                      {formatDate(order?.cancelTime || "", dateFormat)}
                    </Text>
                  </View>
                ) : null}

                {!!order?.cancelType ? (
                  <View style={[styles.between, styles.wrapTime]}>
                    <Text style={styles.txtTime}>
                      {translate("cancel_author")}
                    </Text>
                    <Text style={[styles.txtTime]}>
                      {translate("cancel_type_" + order?.cancelType)}
                    </Text>
                  </View>
                ) : null}

                {!!order?.reason ? (
                  <View style={[styles.between, styles.wrapTime]}>
                    <Text style={styles.txtTime}>
                      {translate("cancel_reason")}
                    </Text>
                    <Text style={[styles.txtTime]}>{order?.reason}</Text>
                  </View>
                ) : null}
              </>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.viewStatus}>{renderStatus}</View>
      </View>
      <CancelOrderComponent
        id={order?.id || ""}
        visible={isModal}
        setIsModal={() => {
          setIsModal(false);
          setIsView(false);
        }}
        type="DETAIL"
        reason={order?.reason || ""}
        isView={isView}
      />
      <RePurchaseOrderItemModal
        id={order?.id || ""}
        visible={isRePurchase}
        setIsModal={() => {
          setRePurchase(false);
          dispatch(resetOrderImportState(""));
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 5,
    borderColor: colors.c_F3F3F3,
  },
  store: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtStore: {
    color: colors.c_48484A,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    // marginVertical: 15,
    borderBottomColor: colors.c_F3F3F3,
    borderBottomWidth: 1,
    paddingTop: 24,
    paddingBottom: 10,
  },
  textName: {
    color: colors.c_48484A,
    fontSize: 16,
  },
  masp: {
    color: colors.c_48484A,
    fontSize: 12,
    marginTop: 5,
  },
  price: {
    color: colors.c_48484A,
    fontSize: 16,
    fontWeight: "500",
  },
  qty: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 12,
  },
  right: {
    paddingLeft: 18,
    flex: 1,
  },
  viewStatus: {
    paddingBottom: 12,
    paddingTop: 2,
    paddingHorizontal: 24,
  },

  buttonRight: {
    backgroundColor: colors.c_FC832D,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 10,
  },
  textRight: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 14,
  },
  //NEW
  between: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapPrice: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: colors.c_F3F3F3,
    borderTopWidth: 1,
  },
  txtTotalQuantity: {
    color: colors.c_9B9B9B,
    fontSize: 12,
  },
  viewTotalPrice: {},
  txtTotalPrice: {
    color: colors.primary,
    fontWeight: "500",
    fontSize: 14,
  },
  txtTotalPriceLabel: {
    color: colors.c_48484A,
  },
  actionView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderTopColor: colors.c_F3F3F3,
    borderTopWidth: 1,
  },
  innerAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txtAction: {
    fontWeight: "500",
    fontSize: 12,
    color: colors.c_AEAEB2,
    marginRight: 4,
  },

  wrapBadge: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
  },

  viewBadge: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.c_secondary,
    backgroundColor: colors.c_secondary,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txtBadge: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.c_1F1F1F,
    marginLeft: 13,
  },
  wrapProducts: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  wrapAddress: {
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 5,
  },
  viewAddress: { paddingHorizontal: 24, paddingVertical: 20 },
  viewTitleAddress: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  txtTitleAddress: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.c_3A3A3C,
  },

  wrapTotalPrice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 1,
  },
  txtLabel: {
    lineHeight: 22,
    fontSize: 16,
    color: colors.c_48484A,
  },
  txtPrice: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "400",
    color: colors.c_48484A,
  },
  txtActive: {
    fontWeight: "600",
  },
  viewLine: {
    width: 134,
    height: 5,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  viewShippingType: {
    paddingHorizontal: 24,
    paddingVertical: 17,
    // paddingBottom: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  txtShippingType: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.c_3A3A3C,
    marginLeft: 9,
  },
  bottom: {
    borderTopColor: "rgba(0, 0, 0, 0.05)",
    borderTopWidth: 5,
    paddingVertical: 20,
    paddingHorizontal: 27,
  },
  viewOrderNumber: {
    backgroundColor: colors.c_secondary,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  txtOrderNumber: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.primary,
  },
  wrapTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 1,
  },
  txtTime: {
    fontWeight: "500",
    fontSize: 12,
    color: colors.c_8E8E93,
  },
  txtViewReason: {
    color: colors.c_007AFF,
    fontSize: 12,
    marginTop: 2,
  },
  textAddress: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: colors.c_48484A,
  },
  textNameAddress: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.primary,
    fontWeight: "600",
  },
});

export default memo(OrderDetail);
