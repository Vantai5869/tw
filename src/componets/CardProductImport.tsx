import React, { useMemo, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { DIMENSIONS, formatNumber } from "../common/utils";
import { colors } from "../constants/colors";
import { translate } from "../locale";
import { navigate } from "../navigation/navigate";
import { ScreenNames } from "../navigation/screen";
import { resetCartState } from "../redux/slice/Cart/distributor-cart";
import {
  handleOrderImportId,
  resetOrderImportState,
} from "../redux/slice/Sales/order-import";
import { OrderImportType } from "../redux/type/Sales/order-import";
import { RePurchaseOrderItemModal } from "../view/importProduct/components/RePurchaseOrderItemModal";
import Button from "./Button";
import ButtonCT from "./ButtonCT";

interface Props {
  data: OrderImportType;
}

const CardProductImport = React.memo<Props>(({ data }) => {
  const dispatch = useDispatch();
  const status = data?.status?.toString() || "1";

  const [isModal, setIsModal] = useState<boolean>(false);
  const [isRePurchase, setRePurchase] = useState<boolean>(false);

  const onRePurchase = () => {
    dispatch(handleOrderImportId({ id: data?.id || "" }));
    setRePurchase(true);
  };

  const renderStatus = useMemo(() => {
    if (["2", "3"].includes(status)) {
      return (
        <ButtonCT
          styleText={styles.textRight}
          textButton={translate("cancel_order")}
          style={styles.buttonRight}
          onPress={() => {
            dispatch(handleOrderImportId({ id: data?.id || "" }));
            setIsModal(true);
          }}
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
          <ButtonCT
            styleText={[styles.textRight]}
            textButton={translate("label_review")}
            style={[styles.buttonRight, { marginRight: 8 }]}
            onPress={() =>
              navigate(
                ScreenNames.RateOrderImportScreen as never,
                {
                  orderId: data?.id,
                  productRatings: data?.orderDetails,
                } as never
              )
            }
          />
          <ButtonCT
            styleText={styles.textRight}
            textButton={translate("repurchase")}
            style={styles.buttonRight}
            onPress={() => onRePurchase()}
          />
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

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data?.orderDetails}
          horizontal={true}
          renderItem={({ item, index }) => (
            <View style={styles.productIMG}>
              <View style={styles.numberProduct}>
                <Text style={styles.textNumber}>x{item?.quantity || 0}</Text>
              </View>
              <Image
                source={{ uri: item?.image?.[0] || "" }}
                resizeMode="cover"
                style={styles.imageProduct}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 20 }}
        />
        <View style={styles.inforProduct}>
          <Text style={styles.titleInfor}>{translate("total_price")}</Text>
          <Text style={styles.valueInfor}>
            {formatNumber(data?.totalPrice || 0)}đ
          </Text>
        </View>
        <View style={styles.inforProduct}>
          <Text style={styles.titleInfor}>{translate("shippingFees")}</Text>
          <Text style={styles.valueInfor}>
            {formatNumber(data?.shippingFee || 0)}đ
          </Text>
        </View>
        <View style={styles.inforProduct}>
          <Text style={styles.titleInforPayment}>
            {translate("total_payment")}
          </Text>
          <Text style={styles.valueInforPayment}>
            {formatNumber(data?.totalPay || 0)}đ
          </Text>
        </View>
        {/* <Text style={styles.timeReviceProduct}>
      Nhận hàng vào ngày 26/03 - 28/03
    </Text> */}
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
      <RePurchaseOrderItemModal
        id={data?.id || ""}
        visible={isRePurchase}
        setIsModal={() => {
          setRePurchase(false);
          dispatch(resetCartState(""));
          dispatch(resetOrderImportState(""));
        }}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  productIMG: {
    width: (DIMENSIONS.width - 60) / 4,
    height: (DIMENSIONS.width - 60) / 4,
    position: "relative",
    marginRight: 10,
    backgroundColor: colors.c_F3F3F3,
  },
  imageProduct: {
    // resizeMode: "cover",
    width: (DIMENSIONS.width - 60) / 4,
    height: (DIMENSIONS.width - 60) / 4,
    borderRadius: 4,
  },
  numberProduct: {
    width: 26,
    height: 26,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: colors.c_a6ba1a,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    position: "absolute",
    top: -10,
    right: -5,
    zIndex: 10,
  },
  textNumber: {
    fontSize: 10,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
  inforProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: colors.c_F3F4F6,
  },
  titleInfor: {
    fontSize: 16,
    color: colors.c_48484A,
    fontWeight: "400",
  },
  valueInfor: {
    fontSize: 16,
    color: colors.c_48484A,
    fontWeight: "400",
  },
  titleInforPayment: {
    fontSize: 16,
    color: colors.c_48484A,
    fontWeight: "600",
  },
  valueInforPayment: {
    fontSize: 16,
    color: colors.c_48484A,
    fontWeight: "600",
  },
  timeReviceProduct: {
    fontSize: 12,
    color: colors.c_8E8E93,
    fontWeight: "400",
    marginTop: 15,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 15,
  },
  txtBtnOutline: {
    color: colors.primary,
  },
  txtBtn: {
    color: colors.c_ffffff,
  },
  buttonRight: {
    backgroundColor: colors.c_FC832D,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  textRight: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 14,
  },
  viewStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopColor: colors.c_F3F3F3,
    borderTopWidth: 1,
    paddingTop: 20,
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
    color: "#9B9B9B",
    fontSize: 12,
    fontWeight: "400",
  },
});

export default CardProductImport;
