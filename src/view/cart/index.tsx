import { compact, uniq } from "lodash";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../../componets/Alerts";
import Button from "../../componets/ButtonCT";
import ButtonBoder from "../../componets/ButtonBoder";
import { CheckBox } from "../../componets/CheckBox";
import ProductCart from "../../componets/ProductCart";
import { colors } from "../../constants/colors";
import {
  IconAngleRight,
  IconMapMarker,
  IconShop,
  ShoppingCartCacnelSVG,
} from "../../constants/icons";
import { translate } from "../../locale";
import { ScreenNames } from "../../navigation/screen";
import {
  DeleteListCart,
  GetDistributorCart,
  resetCartState,
  selectDistributorCart,
} from "../../redux/slice/Cart/distributor-cart";
import {
  resetDistributorStockInventory,
  selectDistributorStockInventory,
  ValidateDistributorStockInventory,
} from "../../redux/slice/warehouses/distributor-stock-inventory";
import { DistributorStockInventoryReq } from "../../redux/type/warehouses/distributor-stock-inventory";

import {
  typeRadioAddress,
  selectProfile,
  resetRadioAddress,
  GetAddressList,
  selectedAddress,
} from "../../redux/slice/Profile/profile";
import {
  getCheckedCart,
  getInActiveItems,
  getReadyProduct,
  getSumPrice,
  getSumQuantity,
  getTotalPrice,
} from "./components/utils";
import { useAppDispatch } from "../../redux/hooks";

export default function Cart({ ...props }) {
  const dispatch = useAppDispatch();
  // const { shippingAddress, addresses } = useSelector(selectAddress);
  const { addressList, selectedShippingAddress } = useSelector(selectProfile);
  const { carts, loading, errors } = useSelector(selectDistributorCart);
  const { ValidateDistributorStockInventorySuccess, errors: validateErrors } =
    useSelector(selectDistributorStockInventory);
  const [checkedStore, setCheckedStore] = useState<string[]>([]);
  const [checkeds, setCheckeds] = useState<string[]>([]);
  const [errorText, setErrorText] = useState<string>();
  const [defaultShippingAddress, setShippingAddress] = useState(null);
  const paramsIds = props?.route?.params?.ids || [];

  useEffect(() => {}, [carts]);
  useEffect(() => {
    if (paramsIds && paramsIds?.length > 0) {
      setCheckeds(paramsIds);
    }
    dispatch(GetDistributorCart());
    dispatch(resetRadioAddress(null));
  }, []);

  useEffect(() => {
    dispatch(
      GetAddressList({
        take: 20,
        skip: 0,
      })
    );
  }, [carts]);
  useEffect(() => {
    if (
      addressList.totalCount > 0 &&
      selectedShippingAddress?.id === undefined
    ) {
      setShippingAddress(addressList?.items[0]);
      dispatch(selectedAddress(addressList?.items[0]));
    }
    if (addressList.totalCount > 0 && selectedShippingAddress?.id) {
      setShippingAddress(selectedShippingAddress);
    }
  }, [addressList, selectedShippingAddress]);

  // useEffect(() => {
  //   if (ValidateDistributorStockInventorySuccess) {
  //     dispatch(resetDistributorStockInventory(""));
  //     props.navigation.navigate(ScreenNames.Payment, {
  //       ids: checkeds,
  //     });
  //   }
  // }, [ValidateDistributorStockInventorySuccess]);

  const onValidateCarts = async () => {
    const newProducts = getCheckedCart(carts || [], checkeds);
    let params: DistributorStockInventoryReq[] = [];
    newProducts.forEach((e) => {
      e?.items?.forEach((item: any) => {
        params.push({
          productId: item?.productId,
          quantity: item?.quantity,
        });
      });
    });

    props.navigation.navigate(ScreenNames.Payment, {
      ids: checkeds,
      payment: true,
    });
  };

  const handleClickPayment = () => {
    if (!!checkeds?.length) {
      onValidateCarts();
    } else {
      setErrorText(translate("select_product_for_payment"));
    }
  };

  const getProductIdsOfSupplier = (supplierId: string) => {
    return (
      carts
        ?.filter((i: any) => i.supplierId === supplierId)?.[0]
        ?.items?.map((el: any) => el?.distributorCartItemId) || []
    );
  };
  const onCheckedStore = (el: any) => {
    const items = getProductIdsOfSupplier(el?.supplierId);

    if (checkedStore.includes(el?.supplierId)) {
      const ids = checkedStore?.filter((i) => i !== el?.supplierId);
      setCheckedStore(ids);
      const productIds = checkeds?.filter((i) => !items.includes(i));
      setCheckeds(productIds);
    } else {
      setCheckedStore([...checkedStore, el?.supplierId]);
      setCheckeds(uniq([...checkeds, ...items]));
    }
  };

  const onCheckItem = (supplierId: string, id: string) => {
    const productIds = getProductIdsOfSupplier(supplierId);

    if (checkeds.includes(id)) {
      const newIds = checkeds?.filter((i) => i !== id);
      setCheckeds(newIds);

      const newStoreIds = checkedStore?.filter((i) => i !== supplierId);
      setCheckedStore(newStoreIds);
    } else {
      const newIds = uniq([...checkeds, id]);
      setCheckeds(newIds);
      let flag: boolean[] = [];
      productIds?.forEach((el) => {
        if (newIds.includes(el)) {
          flag.push(true);
        } else {
          flag.push(false);
        }
      });
      const inFlag = compact(flag);
      if (inFlag.length === productIds?.length) {
        const newStoreIds = uniq([...checkedStore, supplierId]);
        setCheckedStore(newStoreIds);
      }
    }
  };

  const onDeleteInactive = () => {
    dispatch(
      DeleteListCart({
        id: "",
        ids: getInActiveItems(carts || []),
      })
    );
  };

  const onConfirmAlert = () => {
    dispatch(resetDistributorStockInventory(""));
    dispatch(resetCartState(""));
    setErrorText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.viewAddress}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(ScreenNames.DeliveryAddress);
              dispatch(typeRadioAddress(true));
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {defaultShippingAddress ? (
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginTop: 2 }}>
                  <IconMapMarker width={24} height={24} />
                </View>
                <View style={{ paddingLeft: 10, width: "90%" }}>
                  <Text style={styles.textNameAddress}>
                    {defaultShippingAddress?.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingTop: 5,
                    }}
                  >
                    <View style={{ paddingRight: 20 }}>
                      <Text style={styles.textAddress}>
                        {defaultShippingAddress?.phoneNumber}
                      </Text>
                      <Text style={styles.textAddress} numberOfLines={3}>
                        {defaultShippingAddress?.specificAddress},{" "}
                        {defaultShippingAddress?.wardName},{" "}
                        {defaultShippingAddress?.districtName},{" "}
                        {defaultShippingAddress?.provinceName}
                      </Text>
                    </View>
                    <IconAngleRight
                      width={16}
                      height={16}
                      stroke={colors.c_48484A}
                      fill={colors.c_48484A}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.textAddress}>
                  {translate("no_address")}
                </Text>
                <IconAngleRight
                  width={16}
                  height={16}
                  stroke={colors.c_000000}
                  fill={colors.c_000000}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        {carts?.length ? (
          <>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {carts.map((el: any, index: number) => {
                return (
                  <View style={styles.item} key={el.supplierId}>
                    <View style={styles.itemHead}>
                      <View style={styles.leftHead}>
                        <CheckBox
                          typeRadio={false}
                          checked={checkedStore.includes(el?.supplierId)}
                          onPress={() => onCheckedStore(el)}
                          style={{ marginRight: 10 }}
                        />
                        <IconShop
                          width={20.62}
                          height={20.62}
                          stroke={colors.c_48484A}
                          fill={colors.c_636366}
                        />
                        <View>
                          <Text style={styles.storeName}>
                            {el.supplierName}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate(
                            ScreenNames.SupplierScreen,
                            { id: el?.supplierId }
                          )
                        }
                      >
                        <IconAngleRight
                          width={16}
                          height={16}
                          fill={colors.c_636366}
                        />
                      </TouchableOpacity>
                    </View>

                    {el?.items?.map((e: any, i: number) => {
                      const isReady = getReadyProduct(e);
                      return (
                        <View key={e.id}>
                          <View style={styles.productInfo}>
                            <View
                              style={[
                                { marginTop: 10 },
                                !isReady && {
                                  opacity: 0,
                                },
                              ]}
                              pointerEvents={!isReady ? "none" : "auto"}
                            >
                              <CheckBox
                                typeRadio={false}
                                checked={checkeds.includes(
                                  e?.distributorCartItemId
                                )}
                                onPress={() => {
                                  if (isReady) {
                                    onCheckItem(
                                      el?.supplierId,
                                      e?.distributorCartItemId || ""
                                    );
                                  }
                                }}
                                style={{ marginRight: 10 }}
                              />
                            </View>
                            <View style={{ flex: 1 }}>
                              <ProductCart data={e} isView={false} />
                            </View>
                          </View>
                        </View>
                      );
                    })}
                    <View style={styles.wapperSum}>
                      <View style={[styles.rowFlex, styles.borderRow]}>
                        <Text style={styles.txtSumNumber}>
                          {translate("total_quantity")}
                        </Text>
                        <Text style={styles.txtSumNumber}>
                          {getSumQuantity(el?.items, true, true)}
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.rowFlex, styles.marginBottom]}>
                      <Text style={styles.txtCost}>
                        {translate("total_price")}
                      </Text>
                      <Text style={styles.txtCost}>
                        {getSumPrice(el?.items, true, true)}đ
                      </Text>
                    </View>
                    {index < carts.length - 1 && (
                      <Text style={styles.lineBigSpace}></Text>
                    )}
                  </View>
                );
              })}
              {getInActiveItems(carts || [])?.length > 0 ? (
                <View style={styles.btnRemove}>
                  <ButtonBoder
                    textButton={translate("remove_all_inactive")}
                    onPress={onDeleteInactive}
                    styleText={styles.txtBtnRemove}
                    boderColor={colors.primary}
                    loading={loading}
                  />
                </View>
              ) : null}
            </ScrollView>
            <View style={[styles.paddingHori, styles.bottom]}>
              <View style={styles.rowFlex}>
                <Text style={styles.txtCost}>{translate("total")}</Text>
                <Text style={styles.txtCost}>
                  {getTotalPrice(getCheckedCart(carts || [], checkeds))}đ
                </Text>
              </View>
              <Button
                textButton={translate("buy_product")}
                styleBackground={[styles.btnPaymentBg, styles.btnActive]}
                styleText={styles.btnPayment}
                onPress={handleClickPayment}
                loading={loading}
                style={[styles.btnPaymentBg, styles.btnActive]}
              />
            </View>
          </>
        ) : (
          <View style={styles.cartArea}>
            <View style={styles.cartImage}>
              <ShoppingCartCacnelSVG width={32} height={30} />
            </View>
            <Text style={styles.contentCart}>
              {translate("no_product_in_cart")}
            </Text>
          </View>
        )}
      </View>

      <Alerts
        modalVisible={!!errors || !!validateErrors || !!errorText}
        content={errors || validateErrors || errorText || ""}
        confirm={() => onConfirmAlert()}
        statusNoti="false"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    flex: 1,
  },
  scrollView: { flex: 1 },
  viewAddress: {
    width: "100%",
    paddingHorizontal: 26,
    paddingVertical: 15,
    borderBottomWidth: 5,
    borderBottomColor: colors.c_000_005,
  },
  item: {
    paddingHorizontal: 25,
  },
  itemHead: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeName: {
    marginLeft: 10.69,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  lineSpace: {
    borderBottomWidth: 1,
    borderColor: colors.c_F3F4F6,
    marginVertical: 24,
  },
  lineBigSpace: {
    height: 6,
    backgroundColor: colors.c_0000000d,
    marginVertical: 24,
  },
  productInfo: {
    paddingVertical: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.c_F3F4F6,
  },
  boxImage: {
    marginTop: 7,
    width: 75,
    height: 75,
    marginBottom: 10,
    // padding:7
    backgroundColor: colors.c_F3F3F3,
  },
  boxContent: {
    marginLeft: 18,
    flex: 1,
  },
  productImg: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  quantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  textNumber: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "400",
    color: colors.c_667403,
  },
  number: {
    marginHorizontal: 6,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_000_012,
    paddingHorizontal: 18.74,
    paddingVertical: 6,
    marginLeft: 8,
  },
  textDelete: {
    color: colors.c_FC832D,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
  },
  wapperSum: {
    marginTop: 36.75,
  },
  rowFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  borderRow: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: colors.c_F3F4F6,
    marginBottom: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
  txtSumNumber: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_48484A,
    fontWeight: "400",
  },
  txtCost: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_48484A,
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
  productAction: {
    marginTop: 23,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paddingHori: {
    paddingHorizontal: 25,
  },
  btnPayment: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_ffffff,
  },
  btnPaymentBg: {
    marginVertical: 15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    opacity: 0.5,
  },
  btnActive: {
    opacity: 1,
    paddingVertical: 15,
  },
  quantityInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_000_012,
    paddingHorizontal: 18.74,
    paddingVertical: 6,
    marginLeft: 8,
  },
  cartArea: {
    flexDirection: "column",
    alignItems: "center",
    height: 147,
    width: "100%",
  },
  cartImage: {
    backgroundColor: colors.c_blue,
    borderRadius: 100,
    marginTop: 31,
    width: 52,
    height: 52,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  contentCart: {
    marginTop: 20,
    fontSize: 18,
  },
  bottom: {
    paddingTop: 15,
  },
  btnRemove: {
    marginTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  txtBtnRemove: {
    lineHeight: 22,
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
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
