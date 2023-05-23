import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CardImageDetail from "../../../componets/CardImageNew";
import { ListOrder } from "../../importProduct/components/ListOrder";
import { ProductCart } from "../../payment/components/product-item";
import { DIMENSIONS } from "../../../common/utils";
import { MEDIA } from "../../../constants/media";
import { colors } from "../../../constants/colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  AcceptOrder,
  CancelOrder,
  DeliveriedOrder,
  GetDetailOrder,
  GetReason,
  RejectOrder,
  resetOrderDetail,
  resetStatusCall,
  selectOrderByRetailer,
  ShippingOrder,
} from "../../../redux/slice/Order/retailer-order";
import { GetOrder } from "./../../../redux/slice/Order/retailer-order";
import i18n, { translate } from "../../../locale";
import { IconPersion, IconWatch } from "../../../constants/icons";
import Button from "../../../componets/Button";
import { ScreenNames } from "../../../navigation/screen";
import { NavigatorName } from "./../../../navigation/screen";
import ButtonCT from "../../../componets/ButtonCT";
import NumberFormat from "react-number-format";
import Banner from "../cardProductOrder/banner";
import moment from "moment";
import ShippingType from "../popUp/shippingType";
import ReasonCancel from "../popUp/reasonCancel";
import { ProductCard } from "./components/item";

const FAKE_DATA = {
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
};
const OrderDetail = ({ ...props }) => {
  const { id, supplierName, status } = props.route.params;
  const [isModal, setIsModal] = useState(false);
  const [isModalCancel, setIsModalCancel] = useState(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [button, setButton] = useState<any>({});
  const dispatch = useAppDispatch();
  const getData = (id: string) => {
    dispatch(resetOrderDetail());
    dispatch(GetDetailOrder(id));
  };
  useEffect(() => {
    getData(id!!);
  }, [id]);
  useEffect(() => {
    chooseFunction(status);
  }, [status]);
  const { order, loading, rejectedOrder, statusCall, cancelReason } =
    useAppSelector(selectOrderByRetailer);
  useEffect(() => {
    dispatch(GetReason({}));
  }, []);
  useEffect(() => {
    if (statusCall == true) {
      setIsModal(false);
      setIsModalCancel(false);
      props.navigation.navigate(NavigatorName.Order);
      dispatch(resetStatusCall());
    }
  }, [statusCall]);

  const chooseFunction = (status: string) => {
    switch (status) {
      case "2":
        setButton({
          text: translate("acceptOrder"),
          func: () => {
            setIsModal(true);
          },
        });
        return;
      case "3":
        setButton({
          text: translate("shipOrder"),
          func: () => dispatch(ShippingOrder(id)),
          // funcReject: () =>
          //   dispatch(
          //     CancelOrder({
          //       id,
          //       reason: { reason: "reatailer canceled" },
          //     })
          //   ),
        });
        return;
      case "4":
        setButton({
          text: translate("deliveriedOrder"),
          func: () => dispatch(DeliveriedOrder(id)),
        });
        return;
      case "5":
        setButton("none");
        return;
      case "0":
        setButton("none");
        return;
    }
  };
  return (
    <>
      {order ? (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.detailContainer}>
                <View style={styles.time}>
                  <Text style={styles.textStyles}>
                    {moment(order?.creationTime).format("DD-MM-YYYY HH:mm")}
                  </Text>
                </View>
                <View style={styles.title}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <IconPersion
                      width={15}
                      height={15}
                      fill={colors.c_000000}
                    />
                    <Text style={styles.supplierName}>{supplierName}</Text>
                  </View>
                  <Text style={styles.orderCode}>
                    Mã ĐƠN: {order?.orderNumber}
                  </Text>
                </View>
              </View>
              <View style={styles.statusWaiting}>
                <Banner status={status} item={order} />
              </View>

              <View>
                <View style={styles.cost}>
                  <Text style={styles.costTitle}>Tổng tiền hàng:</Text>
                  <Text style={styles.costTitle}>
                    <NumberFormat
                      value={order?.totalPrice}
                      displayType="text"
                      thousandSeparator
                      renderText={(value) => <Text>{value}đ</Text>}
                    />
                  </Text>
                </View>
                <View style={styles.cost}>
                  <Text style={styles.costTitle}>Phí vận chuyển:</Text>
                  <Text style={styles.costTitle}>
                    <NumberFormat
                      value={order?.shippingFee}
                      displayType="text"
                      thousandSeparator
                      renderText={(value) => <Text>{value}đ</Text>}
                    />
                  </Text>
                </View>
                <View style={styles.cost}>
                  <Text style={styles.costTitle}>Tổng số tiền:</Text>
                  <Text style={styles.costTotal}>
                    <NumberFormat
                      value={order?.totalPay}
                      displayType="text"
                      thousandSeparator
                      renderText={(value) => <Text>{value}đ</Text>}
                    />
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.data}>
              {order?.orderDetails?.map((e, i) => {
                return (
                  <ProductCard
                    key={e?.productId}
                    i={10}
                    e={e}
                    isView={true}
                    style={styles.bodyy}
                  />
                );
              })}
            </View>
          </ScrollView>

          <View>
            {button != "none" ? (
              <>
                <ButtonCT
                  textButton={button.text}
                  styleBackground={styles.background_btn}
                  styleText={styles.txtAccept}
                  onPress={button.func}
                  style={{ paddingVertical: 14 }}
                />
                <Button
                  textButton={translate("cancelOrder")}
                  onPress={() => setIsModalCancel(!isModalCancel)}
                  styleBackground={styles.btnOutline}
                  styleText={styles.txtBtnOutline}
                ></Button>
              </>
            ) : (
              <></>
            )}
          </View>
        </View>
      ) : (
        <></>
      )}
      <ShippingType modalVisible={isModal} setModal={setIsModal} id={id} />
      <ReasonCancel
        listReason={cancelReason}
        modalVisible={isModalCancel}
        setModal={setIsModalCancel}
        id={id}
        status={status}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: colors.c_ffffff,
    flex: 1,
    justifyContent: "space-between",
  },
  header: {},
  data: {},
  detailContainer: {},
  bodyy: {
    // paddingLeft: 21.5,
  },
  btnAccept: {
    backgroundColor: colors.c_ff3b30,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 15,
  },

  background_btn: {
    backgroundColor: colors.c_667403,
    // marginBottom: 30,
  },
  txtAccept: {
    color: colors.c_ffffff,
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
  },
  txtBtnOutline: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: colors.primary,
  },

  textNumberXn: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.c_ff3b30,
  },
  time: {
    paddingVertical: 8,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  supplierName: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 14,
    color: colors.c_3A3A3C,
  },
  orderCode: {
    color: colors.c_48484A,
    fontSize: 12,
    fontWeight: "400",
  },
  textStyles: {
    fontSize: 12,
    fontWeight: "400",
  },
  statusWaiting: {
    // paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_D7D7D7,
    marginBottom: 16,
  },
  viewLeftXn: {
    flexDirection: "row",
    width: "40%",
    // justifyContent: 'space-between',
    alignItems: "center",
  },
  textXn: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: colors.c_1f1f1f,
  },
  statusTranspoting: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_D7D7D7,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.c_FFF4E5,
    marginBottom: 16,
  },
  statusPresenting: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_D7D7D7,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.c_EAF4FF,
    marginBottom: 16,
  },
  statusCanceling: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_D7D7D7,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.c_FFF2F1,
    marginBottom: 16,
  },
  statusDone: {
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.c_D7D7D7,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.c_E9F8FF,
    marginBottom: 16,
  },
  cost: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  costTitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 10,
    color: colors.c_3A3A3C,
  },
  costTotal: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    color: colors.c_48484A,
  },
});
export default OrderDetail;
