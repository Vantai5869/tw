import { use } from "i18next";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatNumber } from "../../common/utils";
import DatePicker from "../../componets/DatePicker";
import MultiSelect from "../../componets/MultiSelect";
import { colors } from "../../constants/colors";
import i18n, { translate } from "../../locale";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getCustomerOrderRp,
  resetReport,
  selectReport,
} from "../../redux/slice/Report/report";
import { getCustomerOrderRpReq } from "../../redux/type/Report/report";
import DropdowInput from "./components/dropdowInput";
import Select from "./grow-up/components/select";

interface IProductCode {
  id: string;
  orderNumber: string;
  buyerName: string;
  creationTime: string;
  shippingName: string;
  shippingPhoneNumber: string;
  shippingSpecificAddress: string;
  status: number;
  totalPay: number;
}

interface Props {
  item: IProductCode;
  index: number;
}

const statusList = [
  {
    id: "0",
    name: i18n.t("all_status"),
    number: -1,
  },
  {
    id: "1",
    name: i18n.t("order_waiting_payment"),
    number: 1,
  },
  {
    id: "2",
    name: i18n.t("order_waiting"),
    number: 2,
  },
  {
    id: "3",
    name: i18n.t("order_prepares"),
    number: 3,
  },
  {
    id: "4",
    name: i18n.t("delivery_in_progress"),
    number: 4,
  },
  {
    id: "5",
    name: i18n.t("shipped"),
    number: 5,
  },
  {
    id: "6",
    name: i18n.t("cancelled"),
    number: 0,
  },
];

const renderStatus = (status: number) => {
  const Obj = statusList.find((i) => i.number === status);
  return Obj?.name;
};

const ProductCodeItem: React.FC<Props> = ({ item, index }) => {
  const [itemSelected, setItemSelected] = useState<boolean>(false);

  const handleClickItem = () => {
    setItemSelected(!itemSelected);
  };
  return (
    <TouchableOpacity style={styles.productCodeItem} onPress={handleClickItem}>
      <View style={styles.flexRow}>
        <Text style={styles.index}>{index + 1} </Text>
        <View style={styles.codeBox}>
          <Text style={styles.code}>{item.orderNumber} </Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{formatNumber(item.totalPay)} VNĐ</Text>
          <Text style={styles.status}>{renderStatus(item.status)}</Text>
        </View>
      </View>

      <View
        style={[styles.dropdown, { display: itemSelected ? "flex" : "none" }]}
      >
        <View style={[styles.deliveryInfoBox, { marginTop: 8 }]}>
          <Text style={styles.deliveryText}>
            {translate("shipment_details")}
          </Text>
          <View style={styles.boxInfo}>
            <Text style={styles.name}>{item?.shippingName}</Text>
            <Text style={styles.phone}>{item?.shippingPhoneNumber}</Text>
          </View>
        </View>

        <View style={styles.deliveryInfoBox}>
          <Text style={styles.deliveryText}>{translate("address")}</Text>
          <View style={styles.boxInfo}>
            <Text style={styles.name}>{item?.shippingSpecificAddress}</Text>
          </View>
        </View>

        <View style={styles.deliveryInfoBox}>
          <Text style={styles.deliveryText}>{translate("orderer")}</Text>
          <View style={styles.boxInfo}>
            <Text style={styles.name}>{item?.buyerName}</Text>
          </View>
        </View>

        <View style={styles.deliveryInfoBox}>
          <Text style={styles.deliveryText}>{translate("booking_date")}</Text>
          <View style={styles.boxInfo}>
            <Text style={styles.name}>
              {moment(item?.creationTime).format("DD/MM/YYYY")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export interface IData {
  id: string;
  name: string;
  take?: number;
  number?: number;
}
export default function OrderRp() {
  const dispatch = useAppDispatch();
  const [isShowStatusModal, setIsShowStatusModal] = useState<boolean>(false);
  const [isShowPhaseModal, setIsShowPhaseModal] = useState<boolean>(false);
  const [statusSelected, setStatusSelected] = useState<IData>(statusList[0]);
  const [startDay, setStartDay] = useState<Date | undefined>();
  const [endDay, setEndDay] = useState<Date | undefined>();
  const [orderTotal, setOrderTotal] = useState<undefined | number>();
  const reportData = useAppSelector(selectReport);
  const first = useRef(false);

  const handleSelectStatus = (e: string) => {
    setStatusSelected(statusList.find((i) => i.id === e[0]) || statusList[0]);
  };

  const onChangeValuePharse = (data: Date | undefined) => {
    if (startDay && endDay) {
      setStartDay(data);
      setEndDay(undefined);
    }
    if (!startDay) setStartDay(data);
    else if (!endDay) {
      setEndDay(data);
    }
    setIsShowPhaseModal(!isShowPhaseModal);
  };

  useEffect(() => {
    if (startDay && !endDay) {
      setIsShowPhaseModal(true);
    }
  }, [startDay]);

  if (!startDay && statusSelected.id === "0") {
  }
  useEffect(() => {
    if (
      !startDay &&
      statusSelected.id === "0" &&
      reportData.customerOrderRp.totalCount &&
      !first.current
    ) {
      setOrderTotal(reportData.customerOrderRp.totalCount);
      first.current = true;
    }
  }, [reportData]);

  useEffect(() => {
    dispatch(resetReport(""));
    let dataRq: getCustomerOrderRpReq = {
      skip: 0,
      take: 20,
    };
    if (statusSelected?.id != "0")
      dataRq = { ...dataRq, OrderStatus: statusSelected?.number };
    if (startDay && endDay)
      dataRq = {
        ...dataRq,
        FromDate: moment(startDay).format("YYYY-MM-DD"),
        ToDate: moment(endDay).format("YYYY-MM-DD"),
      };
    dispatch(getCustomerOrderRp(dataRq));
  }, [statusSelected, endDay]);

  const handleOnEndReached = () => {
    if (!reportData.loading && reportData.customerOrderRp.hasMore) {
      const take = 20;
      const skip = reportData.customerOrderRp.currentPage * take;
      let dataRq: getCustomerOrderRpReq = {
        skip,
        take,
      };
      if (statusSelected?.id != "0")
        dataRq = { ...dataRq, OrderStatus: statusSelected?.number };
      if (startDay && endDay)
        dataRq = {
          ...dataRq,
          FromDate: moment(startDay).format("YYYY-MM-DD"),
          ToDate: moment(endDay).format("YYYY-MM-DD"),
        };
      dispatch(getCustomerOrderRp(dataRq));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overview}>
        <Text style={styles.ttOverview}>
          {translate("customer_order_total")}
        </Text>
        <Text style={styles.number}>{orderTotal}</Text>
      </View>
      <View style={styles.select}>
        <DropdowInput
          lable={statusSelected.name}
          onPress={() => {
            setIsShowStatusModal(true);
          }}
        />
      </View>
      <View style={styles.select2}>
        <DropdowInput
          // style={{ flex: 1 }}
          lable={
            !startDay
              ? translate("period")
              : moment(startDay).format("DD/MM/YYYY") +
                " - " +
                moment(endDay).format("DD/MM/YYYY")
          }
          onPress={() => {
            setIsShowPhaseModal(!isShowPhaseModal);
          }}
        />
      </View>
      <View style={styles.productCodeList}>
        <FlatList
          style={{
            paddingVertical: 10,
          }}
          data={reportData.customerOrderRp.items || []}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }: any) => (
            <ProductCodeItem item={item} index={index} key={item.id} />
          )}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={5}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* <Select
        data={statusList}
        isShow={isShowStatusModal}
        onSelect={handleSelectStatus}
        setShow={() => setIsShowStatusModal(false)}
        title={"Status"}
        value={statusSelected}
        search={()=>{}}
      /> */}
      <MultiSelect
        data={statusList.slice(-5)}
        isVisible={isShowStatusModal}
        onChange={handleSelectStatus}
        onClose={() => setIsShowStatusModal(!isShowStatusModal)}
        title={translate("choose_status")}
        value="id"
        label="name"
        checkeds={[statusSelected.id]}
        multi={false}
      />

      <DatePicker
        value={startDay}
        mode="date"
        display="default"
        maximumDate={new Date()}
        minimumDate={!endDay ? startDay : undefined}
        visible={isShowPhaseModal}
        onChange={(data: Date | undefined) => onChangeValuePharse(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.c_ffffff,
  },
  overview: {
    width: "100%",
    borderRadius: 10,
    padding: 16,
    backgroundColor: colors.c_EAF4FF,
  },
  ttOverview: {
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
    color: colors.c_2c2c2e,
  },
  number: {
    marginTop: 8,
    textAlign: "center",
    color: colors.c_A6BA1A,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
  },
  select: {
    marginTop: 24,
    marginRight: 0,
  },
  select2: {
    marginTop: 18,
  },
  productCodeList: {
    flex: 1,
    marginTop: 26,
  },
  productCodeItem: {
    padding: 16,
    backgroundColor: colors.c_f9f9f9,
    marginBottom: 16,
    borderRadius: 10,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  index: {
    fontWeight: "500",
    color: colors.c_3A3A3C,
  },
  codeBox: {
    flex: 1,
  },
  code: {
    marginLeft: 16,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_3A3A3C,
  },
  priceBox: {},
  price: {
    marginLeft: 16,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    color: colors.c_3A3A3C,
  },
  status: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    alignSelf: "flex-end",
    color: colors.c_34C759,
  },
  dropdown: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.12)",
  },
  deliveryInfoBox: {
    flexDirection: "row",
    marginTop: 12,
  },
  deliveryText: {
    color: colors.c_8E8E93,
  },
  name: {
    color: colors.c_48484A,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    textAlign: "right",
  },
  phone: {
    color: colors.c_48484A,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    alignSelf: "flex-end",
  },
  boxInfo: {
    flex: 1,
    alignSelf: "flex-end",
    marginLeft: 82,
  },
  inputDropdown: {
    backgroundColor: colors.c_ffffff,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 13,
    flexDirection: "row",
    marginRight: 9,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    width: "100%",
    borderColor: colors.c_d0D5dd,
  },
});
