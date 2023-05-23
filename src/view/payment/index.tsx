import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  NativeEventEmitter,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import VnpayMerchant, {
//   VnpayMerchantModule,
// } from "../../../react-native-vnpay-merchant";
import { validateEmail } from "../../common/utils";
import Alerts from "../../componets/Alerts";
import Button from "../../componets/Button";
import { CheckBox } from "../../componets/CheckBox";
import ProductCart from "../../componets/ProductCart";
import { colors } from "../../constants/colors";
import {
  IconAngleRight,
  IconBarcodeQR,
  IconCreditCard,
  IconPaymentCOD,
  icons,
  IconShop,
  IconTemple,
  IconWallet43,
  IconMapMarker,
} from "../../constants/icons";
import { ACTION_TYPE } from "../../constants/type.interface";
import { translate } from "../../locale";
import { ScreenNames } from "../../navigation/screen";
import {
  resetCartState,
  selectDistributorCart,
} from "../../redux/slice/Cart/distributor-cart";
import { getDistributorInfo, selectHome } from "../../redux/slice/Home/home";
import {
  GetDetailSupplier,
  selectSupplier,
} from "../../redux/slice/Partnership/supplier";
import {
  onOrderImportErrors,
  onOrderImportSuccess,
  OrderImport,
  OrderImportWithVPN,
  resetOrderImportState,
  selectOrderImport,
} from "../../redux/slice/Sales/order-import";
import { GetAddress, selectAddress } from "../../redux/slice/Shipping/address";
import { resetDistributorStockInventory } from "../../redux/slice/warehouses/distributor-stock-inventory";
import { CartType } from "../../redux/type/Cart/cart";
import {
  OrderImportDetailsType,
  OrderImportReq,
} from "../../redux/type/Sales/order-import";

import {
  typeRadioAddress,
  selectProfile,
  resetRadioAddress,
  GetAddressList,
  selectedAddress,
} from "../../redux/slice/Profile/profile";
import {
  getCheckedCart,
  getSumPrice,
  getSumQuantity,
  getTotalPrice,
} from "../cart/components/utils";
import Input from "../importProduct/purchase/filter-product/components/Input";
import { useAppDispatch } from "../../redux/hooks";

type BillProps = {
  companyName?: string;
  email?: string;
  taxCode?: string;
};
// const eventEmitter = new NativeEventEmitter(VnpayMerchantModule);
export const methods = [
  {
    id: 1,
    desc: "",
    icon: <IconPaymentCOD width={20} height={20} />,
  },
  {
    id: 2,
    desc: "Bạn phải có ví Tin Tin",
    icon: <IconWallet43 width={20} height={20} stroke={colors.primary} />,
  },
  {
    id: 3,
    desc: "Thanh toán qua cổng Napas",
    icon: <IconTemple width={20} height={20} stroke={colors.primary} />,
  },
  {
    id: 4,
    desc: "Bạn phải có ví Tin Tin",
    icon: <IconCreditCard width={20} height={20} stroke={colors.primary} />,
  },
  {
    id: 5,
    desc: "Bạn phải có ví VNPAY",
    icon: (
      <IconBarcodeQR
        width={20}
        height={20}
        fill={colors.primary}
        stroke={colors.primary}
      />
    ),
  },
  // {
  //   id: 6,
  //   desc: "Bạn phải có ví Vietel Pay",
  //   icon: <IconMomo width={20} height={20} />,
  // },
];

export const gateways = [
  {
    id: 5,
    desc: "Bạn phải có ví VNPAY",
    icon: (
      <IconBarcodeQR
        width={20}
        height={20}
        fill={colors.primary}
        stroke={colors.primary}
      />
    ),
  },
];

export default function Payment({ ...props }) {
  const dispatch = useAppDispatch();
  const { supplier } = useSelector(selectSupplier);
  const { carts } = useSelector(selectDistributorCart);

  const { loading, orderSuccess, paymentUrl, errors } =
    useSelector(selectOrderImport);
  const { shippingAddress } = useSelector(selectAddress);
  const { retailerInfo } = useSelector(selectHome);
  const { addressList, selectedShippingAddress } = useSelector(selectProfile);

  const Base: BillProps = {
    companyName: "",
    email: "",
    taxCode: "",
  };

  const [infos, setInfos] = useState<BillProps>(Base);
  const [paymentType, setPaymentType] = useState<1 | 2 | number>(1);
  const [exportBill, setExportBill] = useState(false);
  const [address, setAddress] = useState<any>();
  const [products, setProducts] = useState<CartType[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState<number | undefined>();

  const type = props?.route?.params?.type || [];
  const payment = props?.route.params?.payment;
  const [errorText, setErrorText] = useState<BillProps>(Base);
  const [defaultShippingAddress, setShippingAddress] = useState(null);
  const [isEnoughQuantity, setIsEnoughQuantity] = useState<boolean>(false);

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

  useEffect(() => {
    dispatch(GetAddress());
    dispatch(getDistributorInfo(""));
    dispatch(resetRadioAddress(null));
  }, []);

  useEffect(() => {
    setAddress(shippingAddress);
  }, [shippingAddress]);

  useEffect(() => {
    setInfos({
      ...infos,
      email: retailerInfo?.email || "",
      companyName:
        retailerInfo?.name || retailerInfo?.email || retailerInfo?.phone || "",
      taxCode: retailerInfo?.taxCode || "",
    });
  }, [retailerInfo]);

  useEffect(() => {
    if (type !== ACTION_TYPE.BUYNOW) {
      const newCarts = getCheckedCart(carts || [], props?.route?.params?.ids);
      if (newCarts.length > 0) {
        setProducts(newCarts);
      } else {
        props.navigation.popToTop();
      }
    }
  }, [props?.route?.params?.ids, carts]);

  useEffect(() => {
    if (type === ACTION_TYPE.BUYNOW) {
      dispatch(
        GetDetailSupplier(props?.route?.params?.products?.[0]?.supplierId || "")
      );
      setProducts(props?.route?.params?.products);
    }
  }, []);

  const onPassQuantity = (quantity: number) => {
    const newProducts = products?.map((el) => {
      const newItems = el?.items?.map((e) => {
        return {
          ...e,
          quantity,
        };
      });
      return {
        ...el,
        items: newItems,
      };
    });
    setProducts(newProducts);
  };

  const handleClickPayment = async (confirmGateway = false) => {
    // props.navigation.navigate(ScreenNames.PaymentSuccess);
    if (paymentType !== 1 && !confirmGateway) {
      setModalVisible(!modalVisible);
      return;
    }
    if (paymentGateway === 5) {
      onValidateOrder(true);
    } else {
      onValidateOrder();
    }
  };

  const onValidateOrder = (withVnpay = false) => {
    dispatch(resetDistributorStockInventory(""));

    let checkInvalid = false;
    const orderDetails: OrderImportDetailsType[] = products?.map((el) => {
      const products1 = el?.items?.map((p) => {
        if (p.quantity < p.minQuantityForDistributor) {
          checkInvalid = true;
        }
        return {
          cartItemId: p?.distributorCartItemId,
          productId: p?.productId,
          quantity: p?.quantity,
          price: p?.price,
        };
      });

      return {
        supplierId: el?.supplierId,
        orderDetails: products1,
        shippingFee: 0,
      };
    });
    if (checkInvalid) {
      setIsEnoughQuantity(true);
    } else {
      const request: OrderImportReq = {
        isPrintOrder: exportBill,
        orderDetails,
        paymentType,
        shippingAddressId: address?.id || "",
        type,
        ...infos,
      };
      if (exportBill) {
        if (
          !!errorText?.companyName ||
          !!errorText?.email ||
          !!errorText?.taxCode
        ) {
          return false;
        }
        if (!infos?.companyName || !infos?.email || !infos?.taxCode) {
          setErrorText({
            ...errorText,
            companyName: !!infos?.companyName ? "" : translate("required"),
            email: !!infos?.email ? "" : translate("required"),
            taxCode: !!infos?.taxCode ? "" : translate("required"),
          });
          return false;
        }
        if (!!infos?.email && !validateEmail(infos?.email)) {
          setErrorText({
            ...errorText,
            email: translate("wrong_email_format"),
          });
          return false;
        }
      }
      if (!!address?.id) {
        if (withVnpay) {
          dispatch(OrderImportWithVPN(request));
        } else {
          dispatch(OrderImport(request));
        }
      } else {
        dispatch(
          onOrderImportErrors(translate("please_select_address_delieverd"))
        );
      }
    }
  };

  const onChangeText = (name: string, text: string) => {
    setErrorText({ ...errorText, [name]: "" });
    setInfos({ ...infos, [name]: text });
  };

  const onSetPaymentType = (id: number) => {
    if ([2].includes(id)) {
      dispatch(
        onOrderImportErrors(translate("you_havent_linked_your_account_yet"))
      );
    } else {
      setPaymentType(id);
    }
  };

  const handleSelectPaymentGateway = (gatewayId: number) => {
    setPaymentGateway(gatewayId);
  };

  const onConfirmGateway = () => {
    if (paymentGateway === 5) {
      handleClickPayment(true);
    }
  };

  const onConfirmAlert = () => {
    dispatch(resetDistributorStockInventory(""));
    dispatch(resetCartState(""));
    dispatch(resetOrderImportState(""));
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
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
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {products.map((el, index) => {
            return (
              <View style={styles.item} key={el.supplierId}>
                <View style={styles.itemHead}>
                  <View style={styles.leftHead}>
                    <IconShop
                      width={20.62}
                      height={20.62}
                      stroke={colors.c_48484A}
                      fill={colors.c_48484A}
                    />
                    <View>
                      <Text style={styles.storeName}>
                        {type === ACTION_TYPE.BUYNOW
                          ? supplier?.nameCompany
                          : el?.supplierName}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(ScreenNames.SupplierScreen)
                    }
                  >
                    <IconAngleRight
                      width={16}
                      height={16}
                      fill={colors.c_636366}
                    />
                  </TouchableOpacity>
                </View>
                {el?.items?.map((e, i) => {
                  return (
                    <View key={e?.productId} style={styles.productInfo}>
                      <ProductCart
                        payment={payment}
                        data={e as any}
                        type={type}
                        onPassQuantity={onPassQuantity}
                        {...props}
                      />
                    </View>
                  );
                })}
                <View style={styles.wapperSum}>
                  <View style={[styles.rowFlex, styles.borderRow]}>
                    <Text style={styles.txtSumNumber}>
                      {translate("total_quantity")}
                    </Text>
                    <Text style={styles.txtSumNumber}>
                      {getSumQuantity(el?.items || [])}
                    </Text>
                  </View>
                  <View style={[styles.rowFlex, styles.borderRow]}>
                    <Text style={styles.txtSumNumber}>
                      {translate("total_price")}
                    </Text>
                    <Text style={styles.txtSumNumber}>
                      {getSumPrice(el?.items || [], true)}đ
                    </Text>
                  </View>
                  <View style={[styles.rowFlex, styles.borderRow]}>
                    <Text style={styles.txtSumNumber}>
                      {translate("shippingFee")}
                    </Text>
                    <Text style={styles.txtSumNumber}> 0đ </Text>
                  </View>
                  <View style={[styles.rowFlex, styles.marginBottom]}>
                    <Text style={styles.txtCost}>{translate("total")}</Text>
                    <Text style={styles.txtCost}>
                      {getSumPrice(el?.items || [], true)}đ
                    </Text>
                  </View>
                </View>
                {index < products?.length - 1 && (
                  <Text style={styles.lineBigSpace}> </Text>
                )}
              </View>
            );
          })}
          <Text style={styles.paymentHead}>{translate("payment")}</Text>
          <View style={styles.paymentOption}>
            <View style={styles.viewMethods}>
              {methods?.map((el, index) => (
                <TouchableOpacity
                  key={el.id}
                  style={[
                    styles.boxMethod,
                    index === methods?.length - 1 && styles.noBorder,
                  ]}
                  onPress={() => onSetPaymentType(el.id)}
                  activeOpacity={0.9}
                >
                  <View style={styles.flexAlignItems}>
                    <CheckBox
                      typeRadio={true}
                      checked={paymentType === el.id}
                      onPress={() => onSetPaymentType(el.id)}
                      style={{ marginRight: 20 }}
                    />
                    {el?.icon ? el?.icon : null}
                    <View style={{ marginLeft: 13 }}>
                      <Text style={styles.txtMtLabel}>
                        {translate("payment_method_type_" + (el?.id || "1"))}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Text style={styles.lineBigSpace}> </Text>
          <View style={styles.paddingHori}>
            <Text style={styles.txtExportBill}>{translate("export_bill")}</Text>
            <View style={styles.exportBill}>
              <CheckBox
                typeRadio={false}
                checked={exportBill}
                onPress={() => setExportBill(!exportBill)}
                node={<Text>{translate("yes")}</Text>}
              />
              <Text style={{ marginRight: 31 }}> </Text>
              <CheckBox
                typeRadio={false}
                checked={!exportBill}
                onPress={() => setExportBill(!exportBill)}
                node={<Text>{translate("no")}</Text>}
              />
            </View>
            {exportBill && (
              <View style={styles.exportBillArea}>
                <View style={styles.namCompanyLable}>
                  <Text style={styles.txtlable}>
                    {translate("nameCompany")}
                  </Text>
                  <Text style={styles.require}> * </Text>
                </View>
                <Input
                  value={infos?.companyName}
                  placeholder={translate("enter_nameCompany")}
                  onChangeText={(text: string) => {
                    onChangeText("companyName", text);
                  }}
                  errorText={errorText?.companyName}
                />
                <View style={styles.namCompanyLable}>
                  <Text style={styles.txtlable}>{translate("taxCode")}</Text>
                  <Text style={styles.require}> * </Text>
                </View>
                <Input
                  value={infos?.taxCode}
                  placeholder={translate("enter_taxCode")}
                  onChangeText={(text: string) => {
                    onChangeText("taxCode", text);
                  }}
                  errorText={errorText?.taxCode}
                />
                <View style={styles.namCompanyLable}>
                  <Text style={styles.txtlable}>{translate("email")}</Text>
                  <Text style={styles.require}> * </Text>
                </View>
                <Input
                  value={infos?.email}
                  placeholder={translate("enter_email")}
                  onChangeText={(text: string) => {
                    onChangeText("email", text);
                  }}
                  errorText={errorText?.email}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <Text style={styles.lineBigSpace}> </Text>
        <View style={styles.paddingHori}>
          <View style={styles.rowFlex}>
            <Text style={styles.txtCost}>{translate("total_price")}</Text>
            <Text style={styles.txtCost}> {getTotalPrice(products)}đ </Text>
          </View>
          <Button
            textButton={translate("payment")}
            styleBackground={styles.btnPaymentBg}
            styleText={styles.btnPayment}
            onPress={() => handleClickPayment()}
            loading={loading}
          />
        </View>

        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalMain}>
            <View style={styles.modalView}>
              <View style={styles.modalTitleView}>
                <View style={styles.headerModal}>
                  <Text style={styles.modalTitle}>Chọn cổng thanh toán</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.headerClose}
                >
                  <Image
                    source={icons.ICON_CLOSE}
                    style={styles.iconTurnOff}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.selectOptionView}>
                <View style={styles.viewMethods}>
                  {gateways?.map((el, index) => (
                    <TouchableOpacity
                      key={el.id}
                      style={[
                        styles.boxMethod,
                        index === methods?.length - 1 && styles.noBorder,
                      ]}
                      onPress={() => handleSelectPaymentGateway(el.id)}
                      activeOpacity={0.9}
                    >
                      <View style={styles.flexAlignItems}>
                        <CheckBox
                          typeRadio={true}
                          checked={paymentGateway === el.id}
                          onPress={() => handleSelectPaymentGateway(el.id)}
                          style={{ marginRight: 20 }}
                        />
                        {el?.icon ? el?.icon : null}
                        <View style={{ marginLeft: 13 }}>
                          <Text style={styles.txtMtLabel}>
                            {translate(
                              "paymentGateway_type_" + (el?.id || "1")
                            )}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                  <Button
                    loading={loading}
                    styleText={{}}
                    style={{}}
                    onPress={onConfirmGateway}
                    textButton={translate("confirm")}
                    styleBackground={styles.btnPaymentBg}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <Alerts
        modalVisible={!!errors}
        content={errors || ""}
        confirm={() => onConfirmAlert()}
        statusNoti="false"
      />
      <Alerts
        modalVisible={isEnoughQuantity}
        content={translate("quantity_invalid")}
        confirm={() => {
          setIsEnoughQuantity(false);
        }}
        statusNoti="false"
      />
      <Alerts
        modalVisible={orderSuccess || false}
        content={translate("payment_success")}
        confirm={() => {
          onConfirmAlert();
          props.navigation.navigate(ScreenNames.PaymentSuccess);
        }}
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
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
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
  paymentHead: {
    backgroundColor: colors.c_0000000d,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 25,
    color: colors.c_3A3A3C,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    marginTop: 30,
    marginBottom: 19,
  },
  productInfo: {
    paddingVertical: 10,
  },
  boxImage: {
    marginTop: 7,
    width: 75,
    height: 75,
    marginBottom: 10,
    // padding:7
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
    borderColor: "rgba(0, 0, 0, 0.12)",
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
  productNumber: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    marginTop: 4,
    color: colors.c_667403,
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
    marginTop: 22,
    backgroundColor: colors.primary,
    marginBottom: 25,
  },
  paymentOption: {
    // paddingHorizontal: 25,
  },
  paymentLine: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentLineChild: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentLineChild1: {
    paddingBottom: 4,
    borderBottomColor: colors.c_F3F4F6,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  txtPayment: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    color: colors.c_3A3A3C,
  },
  txtExportBill: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_3A3A3C,
  },
  exportBillArea: {
    marginTop: 13,
    marginBottom: 10,
  },
  exportBill: {
    marginTop: 13,
    flexDirection: "row",
  },
  namCompanyLable: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 10,
  },
  require: {
    color: "red",
  },
  txtlable: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  viewMethods: {
    paddingHorizontal: 26,
    paddingVertical: 10,
  },
  boxMethod: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    borderColor: colors.c_E5E5E5,
  },
  noBorder: { borderBottomColor: "transparent" },
  flexAlignItems: { flexDirection: "row", alignItems: "center" },
  txtMtLabel: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.c_3A3A3C,
  },

  modalMain: {
    backgroundColor: colors.c_000_012,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: colors.c_ffffff,
    height: "auto",
    // maxHeight: "50%",
    borderRadius: 10,
  },
  modalTitleView: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors.c_efefef,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 16,
    color: colors.c_48484A,
  },
  headerModal: {
    flex: 1,
    paddingVertical: 10,
  },
  headerClose: {
    paddingVertical: 10,
  },
  iconTurnOff: {
    width: 20,
    height: 20,
  },
  selectOptionView: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  txtPopover: {
    lineHeight: 29,
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_48484A,
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
