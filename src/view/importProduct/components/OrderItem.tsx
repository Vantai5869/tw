import { take } from "lodash";
import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { DIMENSIONS, formatNumber, onComing } from "../../../common/utils";
import ButtonCT from "../../../componets/ButtonCT";
import { colors } from "../../../constants/colors";
import { IconDownArrow, IconShop } from "../../../constants/icons";
import i18n, { translate } from "../../../locale";
import { navigate } from "../../../navigation/navigate";
import { ScreenNames } from "../../../navigation/screen";
import { useAppDispatch } from "../../../redux/hooks";
import { resetCartState } from "../../../redux/slice/Cart/distributor-cart";
import {
  GetRePurchaseOrderImport,
  handleOrderImportId,
  resetOrderImportState,
  selectOrderImport,
} from "../../../redux/slice/Sales/order-import";
import {
  OrderImportProductType,
  OrderImportType,
} from "../../../redux/type/Sales/order-import";
import { getSumPrice, getSumQuantity } from "../../cart/components/utils";
import { CancelOrderComponent } from "./CancelOrderComponent";
import { RePurchaseOrderItemModal } from "./RePurchaseOrderItemModal";

interface TOrder {
  order: OrderImportType;
  status: string;
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  styleRow?: StyleProp<ViewStyle>;
}

const OrderItem = ({ order, status, onClose, ...props }: TOrder) => {
  const dispatch = useAppDispatch();
  const { loading, orderImportId, rePurchaseData, rePurchaseSuccess } =
    useSelector(selectOrderImport);

  const [takeNumber, setTake] = useState<number>(1);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isRePurchase, setRePurchase] = useState<boolean>(false);
  const [acitve, setActive] = useState<boolean>(false);

  const renderStatus = useMemo(() => {
    if (["2", "3"].includes(status)) {
      return (
        <ButtonCT
          styleText={styles.textRight}
          textButton={i18n.t("cancel_order")}
          style={styles.buttonRight}
          onPress={() => {
            dispatch(handleOrderImportId({ id: order?.id || "" }));
            setIsModal(true);
          }}
        />
      );
    }
    if (status === "4") {
      return (
        <ButtonCT
          styleText={styles.textRight}
          textButton={i18n.t("delivered")}
          style={styles.buttonRight}
          onPress={() => onComing()}
        />
      );
    }

    if (status === "5") {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ButtonCT
            styleText={[styles.textRight]}
            textButton={i18n.t("label_review")}
            style={[styles.buttonRight, { marginRight: 8 }]}
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
          <ButtonCT
            styleText={styles.textRight}
            textButton={i18n.t("repurchase")}
            style={styles.buttonRight}
            onPress={() => onRePurchase()}
            loading={loading}
          />
        </View>
      );
    }

    if (status === "0" || status === "REPURCHASE") {
      return (
        <ButtonCT
          styleText={styles.textRight}
          textButton={i18n.t("repurchase")}
          style={styles.buttonRight}
          onPress={() => onRePurchase()}
          loading={loading}
        />
      );
    }

    return (
      <ButtonCT
        styleText={styles.textRight}
        textButton={i18n.t("payment_now")}
        style={styles.buttonRight}
        onPress={() => onComing()}
      />
    );
  }, [status]);

  useEffect(() => {
    if (
      !!orderImportId &&
      orderImportId === order?.id &&
      rePurchaseSuccess &&
      acitve
    ) {
      dispatch(resetCartState(""));
      dispatch(resetOrderImportState(""));
      onClose?.();
      setRePurchase(false);
      setActive(false);
      if (rePurchaseData?.allProductReady) {
        navigate(
          ScreenNames.Cart as never,
          { ids: rePurchaseData?.retailerCartItemIds || [] } as never
        );
      } else {
        setRePurchase(true);
      }
    }
  }, [rePurchaseSuccess]);

  const onRePurchase = () => {
    setActive(true);
    dispatch(handleOrderImportId({ id: order?.id || "" }));
    dispatch(GetRePurchaseOrderImport(order?.id || ""));
  };

  const onGoDetail = () => {
    if (status === "REPURCHASE") {
      return false;
    }
    navigate(ScreenNames.OrderDetail as never, { id: order?.id } as never);
  };

  return (
    <>
      <View style={[styles.container, props.style]}>
        <TouchableOpacity
          onPress={onGoDetail}
          activeOpacity={0.9}
          style={styles.store}
        >
          <IconShop
            width={21}
            height={21}
            fill={colors.c_48484A}
            stroke={colors.c_48484A}
          />
          <Text style={styles.txtStore}>{order.supplierName}</Text>
        </TouchableOpacity>
        {take(order.orderDetails, takeNumber)?.map(
          (product: OrderImportProductType) => (
            <TouchableOpacity
              onPress={onGoDetail}
              activeOpacity={0.9}
              key={product.productId}
              style={[styles.row, props.styleRow]}
            >
              <Image
                source={{ uri: product.image?.[0] }}
                resizeMode="cover"
                style={styles.image}
              />
              <View style={styles.right}>
                <Text numberOfLines={3} style={styles.textName}>
                  {product.productName}
                </Text>
                <Text style={styles.masp}>
                  {translate("productNumber", {
                    code: product.code || "--",
                  })}
                </Text>
                <View
                  style={[
                    styles.between,
                    {
                      marginTop: 10,
                    },
                  ]}
                >
                  <Text style={styles.price}>
                    {formatNumber(product.price || 0, ",")}đ
                  </Text>
                  <Text style={styles.qty}>x{product.quantity || 0}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        )}
        {order.orderDetails &&
        order.orderDetails?.length > 1 &&
        takeNumber < order.orderDetails?.length ? (
          <View style={styles.actionView}>
            <TouchableOpacity
              onPress={() => setTake(order?.orderDetails?.length || 1)}
              style={styles.innerAction}
            >
              <Text style={styles.txtAction}>
                {translate("view_more_product")}
              </Text>
              <IconDownArrow width={10} height={14} stroke={colors.c_AEAEB2} />
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.wrapPrice}>
          <Text style={styles.txtTotalQuantity}>
            {translate("number_product", {
              number: getSumQuantity(order?.orderDetails || []),
            })}
          </Text>

          <Text style={styles.txtTotalPrice}>
            <Text style={styles.txtTotalPriceLabel}>
              {translate("total_payment")}{" "}
            </Text>{" "}
            {getSumPrice(order?.orderDetails || [], true)}đ
          </Text>
        </View>

        <View style={styles.viewStatus}>
          <View style={styles.left}>
            {status === "1" ? (
              <Text style={styles.date}>
                {translate("please_payment_order")}
              </Text>
            ) : null}
          </View>
          <View style={styles.status}>{renderStatus}</View>
        </View>
      </View>

      <CancelOrderComponent
        id={order?.id || ""}
        visible={isModal}
        setIsModal={() => setIsModal(false)}
        type="LIST"
      />

      <RePurchaseOrderItemModal
        id={order?.id || ""}
        visible={isRePurchase}
        setIsModal={() => {
          onClose?.();
          setRePurchase(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    borderBottomWidth: 5,
    paddingVertical: 15,
    marginBottom: 15,
    width: DIMENSIONS.width,
    marginLeft: -24,
    paddingHorizontal: 24,
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
    marginVertical: 15,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 10,
    borderTopColor: colors.c_F3F3F3,
    borderTopWidth: 1,
  },
  left: {
    marginVertical: 6,
    // flex: 2,
  },
  status: {
    // flex: 3,
    alignItems: "flex-end",
  },
  date: {
    color: colors.c_9B9B9B,
    fontSize: 12,
    fontWeight: "400",
  },
  progess: {
    marginTop: 6,
    color: colors.c_FF3B30,
    fontWeight: "400",
    fontSize: 12,
  },
  buttonRight: {
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  textRight: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 14,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textLeft: {
    color: colors.c_FC832D,
    fontWeight: "500",
    fontSize: 14,
  },
  buttonLeft: {
    paddingHorizontal: 10,
    marginLeft: 5,
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
});

export default memo(OrderItem);
