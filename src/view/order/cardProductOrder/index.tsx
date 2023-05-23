import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../constants/colors";
import {
  IconShoppingCartPlus,
  IconPersion,
  IconWatch,
} from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import i18n, { translate } from "../../../locale";
import { ProductCart } from "../../payment/components/product-item";
import { ProductCartOrder } from "./productItemOrder";
import { useAppDispatch } from "./../../../redux/hooks";
import {
  selectOrderByRetailer,
  GetOrder,
  GetMoreOrder,
  resetOrder,
} from "./../../../redux/slice/Order/retailer-order";
import { useAppSelector } from "./../../../redux/hooks";
import { ScreenNames } from "../../../navigation/screen";
// import { Props } from 'react-native-tab-view/lib/typescript/TabBarItem';
import moment from "moment";
import NumberFormat from "react-number-format";
import Banner from "./banner";
import { useIsFocused } from "@react-navigation/native";
import { OrderType } from "./../../../redux/type/Orders/order";
interface Props {
  status?: string;
  props?: any;
  code?: string;
  loadmore: boolean;
  setLoadmore: (e: boolean) => void;
}
const FAKE_DATA = {
  items: [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      orderNumber: "string",
      isPaid: true,
      status: 2,
      shippingAddressId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      paymentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      distibutorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      retailerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      supplierId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      totalPrice: 0,
      orderDetails: [
        {
          orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          orderDetailId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          quantity: 0,
          price: 0,
          unit: "string",
          productName: "string",
          image: ["string"],
          code: "string",
        },
      ],
      paymentType: 1,
      shippingUnit: "string",
      companyName: "string",
      email: "string",
      taxCode: "string",
      shippingFee: 0,
      reason: "string",
      totalPay: 0,
      isPrintOrder: true,
      creationTime: "2022-05-19T01:48:05.518Z",
      supplierName: "string",
      supplierLogo: "string",
      shippingAddress: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "string",
        phoneNumber: "string",
        districtCode: "string",
        districtName: "string",
        provinceCode: "string",
        provinceName: "string",
        wardCode: "string",
        wardName: "string",
        specificAddress: "string",
      },
      rejectTime: 0,
      paymentTime: "2022-05-19T01:48:05.518Z",
      shippingTime: "2022-05-19T01:48:05.518Z",
    },
  ],
  totalCount: 0,
};
const CardProductOrder: React.FC<Props> = ({
  status,
  code,
  props,
  loadmore,
  setLoadmore,
}) => {
  const isfocus = useIsFocused();
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector(selectOrderByRetailer);
  const [skip, setSkip] = useState(0);

  useLayoutEffect(() => {
    if (loadmore) {
      const next = skip;
      setSkip(next + 10);
    }
  }, [loadmore]);
  useEffect(() => {
    if (isfocus) {
      setSkip(0);
    }
  }, [status, isfocus]);

  useLayoutEffect(() => {
    if (isfocus) {
      dispatch(resetOrder());
      dispatch(
        GetOrder({
          skip: 0,
          status: status,
          take: 10,
          TextSearch: code,
        })
      );
    }
  }, [status, code, isfocus]);
  useLayoutEffect(() => {
    if (isfocus && skip != 0) {
      dispatch(
        GetMoreOrder({
          skip: skip,
          status: status,
          take: 10,
          TextSearch: code,
        })
      );
    }
  }, [skip]);
  useEffect(() => {
    if (!loading) {
      setLoadmore(false);
    }
  }, [loading]);
  const gotoDetail = (id: string, name: string, status: string | undefined) => {
    props.navigation.navigate(ScreenNames.OrderDetailOD, {
      id: id,
      supplierName: name,
      status: status,
    });
  };
  return (
    <View style={styles.container}>
      {
        orders ? (
          <>
            {orders?.items.map((item: OrderType, index: number) => (
              <View style={styles.containerItem} key={item.id}>
                <View style={styles.viewTime}>
                  <Text style={styles.timeLeft}>
                    {moment(item?.creationTime).format("DD-MM-YYYY HH:mm")}
                  </Text>
                  {status == "2" ? (
                    <TouchableOpacity
                      onPress={() =>
                        gotoDetail(item?.id, item?.supplierName, status)
                      }
                    >
                      <Text style={styles.textCt}>Cập nhật trạng thái</Text>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </View>
                <View style={styles.viewTTOrder}>
                  <View style={styles.OrderLeft}>
                    <IconPersion
                      width={15}
                      height={15}
                      fill={colors.c_000000}
                    />
                    <Text style={styles.textName}>{item?.supplierName}</Text>
                  </View>
                  <Text style={styles.textMD}>MÃ ĐƠN: {item.orderNumber}</Text>
                </View>
                <View style={{ height: 60 }}>
                  <Banner status={status} item={item}></Banner>
                </View>
                <View style={styles.viewAmount}>
                  <View style={styles.itemAmount}>
                    <Text style={styles.titleAmount}>
                      {i18n.t("totalAmountProduct")}
                    </Text>
                    <Text style={styles.textAmount}>
                      <NumberFormat
                        value={item.totalPrice}
                        displayType="text"
                        thousandSeparator
                        renderText={(value) => <Text>{value}đ</Text>}
                      />
                    </Text>
                  </View>
                  <View style={styles.itemAmount}>
                    <Text style={styles.titleAmount}>
                      {i18n.t("transportFee")}
                    </Text>
                    <Text style={styles.textAmount}>
                      <NumberFormat
                        value={item.shippingFee}
                        displayType="text"
                        thousandSeparator
                        renderText={(value) => <Text>{value}đ</Text>}
                      />
                    </Text>
                  </View>
                  <View style={styles.itemAmount}>
                    <Text style={styles.titleAmount}>
                      {i18n.t("totalAmount")}
                    </Text>
                    <Text style={styles.textAmountTotal}>
                      <NumberFormat
                        value={item.totalPay}
                        displayType="text"
                        thousandSeparator
                        renderText={(value) => <Text>{value}đ</Text>}
                      />
                    </Text>
                  </View>
                </View>
                {item?.orderDetails?.map((it: any, i: number) => {
                  if (i < 3) return <ProductCartOrder e={it} i={i} />;
                })}
                {item?.orderDetails?.length > 3 ? (
                  <Text style={styles.numberProductHide}>
                    {item?.orderDetails?.length - 2} {i18n.t("productHide")}
                  </Text>
                ) : (
                  <></>
                )}

                {/* <TouchableOpacity > */}
                <TouchableOpacity
                  style={styles.buttonCT}
                  onPress={() => gotoDetail(item.id, item.supplierName, status)}
                >
                  <Text style={styles.textCt}>{i18n.t("viewDetails")}</Text>
                </TouchableOpacity>
                {/* </TouchableOpacity> */}
              </View>
            ))}
            {loading ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={{ marginVertical: 25 }}
              />
            ) : (
              <></>
            )}
          </>
        ) : loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginVertical: 25 }}
          />
        ) : (
          <View style={styles.cartArea}>
            <View style={styles.cartImage}>
              <IconShoppingCartPlus
                width={40}
                height={40}
                fill={colors.primary}
              />
            </View>
            <Text style={styles.contentCart}>{translate("no_orders")}</Text>
          </View>
        )
        // FAKE_DATA.items.map((item: any, index: number) => (
        //   <View style={styles.containerItem}>
        //     <View style={styles.viewTime}>
        //       <Text style={styles.timeLeft}>
        //         {moment(item.creationTime).format("DD-MM-YYYY HH:mm")}
        //       </Text>
        //     </View>
        //     <View style={styles.viewTTOrder}>
        //       <View style={styles.OrderLeft}>
        //         <IconPersion width={15} height={15} fill={colors.c_000000} />
        //         <Text style={styles.textName}>{item.supplierName}</Text>
        //       </View>
        //       <Text style={styles.textMD}>MÃ ĐƠN: {item.orderNumber}</Text>
        //     </View>
        //     <View style={{ height: 60 }}>
        //       <Banner status={status} item={item}></Banner>
        //     </View>

        //     <View style={styles.viewAmount}>
        //       <View style={styles.itemAmount}>
        //         <Text style={styles.titleAmount}>
        //           {i18n.t("totalAmountProduct")}
        //         </Text>
        //         <Text style={styles.textAmount}>
        //           <NumberFormat
        //             value={item.totalPrice}
        //             displayType="text"
        //             thousandSeparator
        //             renderText={(value) => <Text>{value}đ</Text>}
        //           />
        //         </Text>
        //       </View>
        //       <View style={styles.itemAmount}>
        //         <Text style={styles.titleAmount}>
        //           {i18n.t("transportFee")}
        //         </Text>
        //         <Text style={styles.textAmount}>
        //           <NumberFormat
        //             value={item.shippingFee}
        //             displayType="text"
        //             thousandSeparator
        //             renderText={(value) => <Text>{value}đ</Text>}
        //           />
        //         </Text>
        //       </View>
        //       <View style={styles.itemAmount}>
        //         <Text style={styles.titleAmount}>
        //           {i18n.t("totalAmount")}
        //         </Text>
        //         <Text style={styles.textAmountTotal}>
        //           <NumberFormat
        //             value={item.totalPay}
        //             displayType="text"
        //             thousandSeparator
        //             renderText={(value) => <Text>{value}đ</Text>}
        //           />
        //         </Text>
        //       </View>
        //     </View>
        //     {item.orderDetails.map((it: any, i: number) => {
        //       if (i < 3) return <ProductCartOrder e={it} i={i} />;
        //     })}
        //     {item.orderDetails.length > 3 ? (
        //       <Text style={styles.numberProductHide}>
        //         {item.orderDetails.length - 2} {i18n.t("productHide")}
        //       </Text>
        //     ) : (
        //       <></>
        //     )}

        //     {/* <TouchableOpacity > */}
        //     <TouchableOpacity
        //       style={styles.buttonCT}
        //       onPress={() => gotoDetail(item.id, item.supplierName, status)}
        //     >
        //       <Text style={styles.textCt}>{i18n.t("viewDetails")}</Text>
        //     </TouchableOpacity>
        //     {/* </TouchableOpacity> */}
        //   </View>
        // ))}
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerItem: {
    paddingBottom: 6,
    backgroundColor: colors.c_ffffff,
    paddingHorizontal: 24,
  },
  viewTime: {
    flexDirection: "row",
    marginBottom: 13,
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeLeft: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.c_48484A,
    marginRight: 8,
  },
  viewTTOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  OrderLeft: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_1f1f1f,
    marginLeft: 11,
  },
  textMD: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.c_48484A,
  },

  viewAmount: {
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 6,
  },
  itemAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  titleAmount: {
    color: colors.c_3A3A3C,
    fontSize: 16,
    fontWeight: "400",
  },
  textAmount: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.c_48484A,
  },
  textAmountTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.c_48484A,
  },
  numberProductHide: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.c_000000,
    paddingTop: 8,
    textAlign: "center",
  },
  buttonCT: {
    justifyContent: "center",
    marginVertical: 16,
    alignItems: "center",
  },
  textCt: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.primary,
    textDecorationLine: "underline",
    textDecorationColor: colors.primary,
  },
  cartArea: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  cartImage: {
    backgroundColor: colors.c_blue,
    width: 58,
    height: 58,
    borderRadius: 58,
    marginTop: 31,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  contentCart: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default CardProductOrder;
