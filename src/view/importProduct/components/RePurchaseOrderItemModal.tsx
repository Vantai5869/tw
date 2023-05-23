import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../../../componets/Alerts";
import Button from "../../../componets/ButtonCT";
import { colors } from "../../../constants/colors";
import { IconTimes } from "../../../constants/icons";
import { QUANTITY } from "../../../constants/untils";
import { translate } from "../../../locale";
import { navigate } from "../../../navigation/navigate";
import { ScreenNames } from "../../../navigation/screen";
import {
  AddListProductToCart,
  resetCartState,
  selectDistributorCart,
} from "../../../redux/slice/Cart/distributor-cart";
import {
  GetRePurchaseOrderImport,
  onOrderImportErrors,
  resetOrderImportState,
  selectOrderImport,
} from "../../../redux/slice/Sales/order-import";
import { resetDistributorStockInventory } from "../../../redux/slice/warehouses/distributor-stock-inventory";
import { ProductItemOrder } from "./ProductItemOrder";

type Props = {
  id: string;
  visible: boolean;
  setIsModal: () => void;
};

export const RePurchaseOrderItemModal = ({
  id,
  visible,
  setIsModal,
  ...props
}: Props) => {
  const dispatch = useDispatch();
  const { rePurchaseData, orderImportId, loadingRePurchase, errors } =
    useSelector(selectOrderImport);
  const {
    listProductToCartLoading,
    listProductToCartSuccess,
    errors: retailerCartErrors,
  } = useSelector(selectDistributorCart);

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    if (!!orderImportId && orderImportId === id) {
      dispatch(GetRePurchaseOrderImport(id));
    }
  }, [orderImportId]);

  const goToCart = () => {
    setActive(false);
    setIsModal();
    dispatch(resetCartState(""));
    dispatch(resetOrderImportState(""));
    navigate(
      ScreenNames.Cart as never,
      { ids: rePurchaseData?.retailerCartItemIds || [] } as never
    );
  };

  useEffect(() => {
    if (listProductToCartSuccess && orderImportId && orderImportId === id) {
      goToCart();
    }
  }, [listProductToCartSuccess]);

  const onSubmitCancel = () => {
    setActive(true);
    const body =
      rePurchaseData?.productItems
        ?.filter((el) => el.status === 1)
        ?.map((el) => {
          return {
            productId: el.productId || "",
            quantity: QUANTITY,
          };
        }) || [];

    if (rePurchaseData?.allProductReady) {
      goToCart();
    } else {
      if (body?.length > 0) {
        dispatch(AddListProductToCart(body));
      } else {
        dispatch(onOrderImportErrors("Không có sản phẩm phù hợp để mua lại"));
      }
    }
  };

  const onConfirmAlert = () => {
    setActive(false);
    dispatch(resetDistributorStockInventory(""));
    dispatch(resetOrderImportState(""));
    dispatch(resetCartState(""));
  };

  const onClose = () => {
    onConfirmAlert();
    setIsModal();
  };

  return (
    <Modal
      visible={visible}
      onTouchCancel={() => {
        onClose();
      }}
      transparent
      animationType="slide"
    >
      <View style={styles.containerModal}>
        <View style={styles.innerModal}>
          <View style={[styles.between, styles.heading]}>
            <Text style={styles.titleReason}>
              {translate("add_list_product_to_cart")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
            >
              <IconTimes width={20} height={20} fill={"#000000"} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            {loadingRePurchase ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={{ marginVertical: 25 }}
              />
            ) : rePurchaseData?.allProductReady ? (
              rePurchaseData?.productItems?.map((el) => {
                return (
                  <View key={el.productId}>
                    <ProductItemOrder
                      product={{ ...el, quantity: QUANTITY }}
                      isShowPrice={false}
                      styleRow={styles.rowProduct}
                    />
                  </View>
                );
              })
            ) : (
              <Text style={styles.titleNoProduct}>
                {translate("product_invalid")}
              </Text>
            )}
          </ScrollView>
          {rePurchaseData?.allProductReady ? (
            <Button
              styleText={styles.txtBtnCancel}
              textButton={translate("agree")}
              style={styles.btnCancel}
              onPress={() => onSubmitCancel()}
              loading={listProductToCartLoading}
            />
          ) : null}
        </View>
      </View>

      {orderImportId && orderImportId === id && active ? (
        <>
          <Alerts
            modalVisible={!!errors || !!retailerCartErrors}
            content={errors || retailerCartErrors || ""}
            confirm={() => onConfirmAlert()}
            statusNoti={"false"}
          />
        </>
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  between: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(18, 18, 18, 0.7)",
  },
  innerModal: {
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 26,
    width: "100%",
    flex: 1,
    minHeight: 400,
  },
  heading: {
    paddingBottom: 12,
    borderBottomColor: colors.c_F3F3F3,
    borderBottomWidth: 1,
  },
  titleReason: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.c_1F1F1F,
  },
  btnCancel: { marginTop: 40, paddingVertical: 14 },
  txtBtnCancel: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  rowProduct: { paddingTop: 12, paddingBottom: 12 },
  titleNoProduct: {
    fontSize: 16,
    color: colors.c_48484A,
    marginTop: 20,
  },
});
