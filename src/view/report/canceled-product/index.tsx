import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import { IconAngleDown, IconStarYellow } from "../../../constants/icons";
import { MEDIA } from "../../../constants/media";
import { DIMENSIONS, formatDate, formatNumber } from "../../../common/utils";
import MultiSelect from "../../../componets/MultiSelect";
import PieChartcancel from "./piechart";
import Select from "../grow-up/components/select";
import SelectYear from "../grow-up/components/selectYear";
import { getYears } from "../grow-up/filter";
import { translate } from "../../../locale";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  GetCustomerReason,
  GetReason,
  selectOrderByRetailer,
} from "../../../redux/slice/Order/retailer-order";
import {
  getCancelRP,
  getCancelSumaryRP,
  getMoreCancelRP,
  selectReport,
} from "../../../redux/slice/Report/report";
import { itemsCancel } from "../../../redux/type/Report/report";
import DropdowInput from "../components/dropdowInput";

interface Props {
  p: itemsCancel;
}

const initData2 = {
  id: "",
  reasonName: "Lý do hủy",
  resonCode: "",
};

const chooseCancelType = (cancelType: number) => {
  switch (cancelType) {
    case 1:
      return translate("system_cancel");
    case 2:
      return translate("customer_cancel");
    case 4:
      return translate("supplier_cancel");
    case 3:
      return translate("retailer_cancel");
  }
};

const color = [
  colors.c_a6ba1a,
  colors.c_ff3b30,
  colors.c_FEB336,
  colors.c_007AFF,
  colors.c_11be52,
  colors.c_34C759,
];
const ObjectName = [
  {
    id: "",
    name: translate("all_object"),
  },
  {
    id: "1",
    name: translate("cancel_type_1"),
  },
  {
    id: "3",
    name: translate("cancel_type_3"),
  },
  {
    id: "2",
    name: translate("cancel_type_2"),
  },
];
const ReasonDataAll = [
  {
    id: "",
    reasonName: translate("all_reason"),
    resonCode: "",
  },
];
const ProductRow: React.FC<Props> = ({ p }) => {
  const [itemSelected, setItemSelected] = useState<boolean>(false);

  return (
    <TouchableOpacity style={styles.productRow}>
      <View style={styles.flexRow}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.productWTxt}>
            <Text style={styles.productName}>{`${translate("order_acr")}: ${
              p.orderNumber
            }`}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.productMSP]}>{`${translate(
                "cancel_date"
              )}: `}</Text>
              <Text style={[styles.productMSP, { color: colors.c_48484A }]}>
                {formatDate(p.creationTime)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ maxWidth: "40%" }}>
          <Text style={styles.reason}>
            {/* {p.cancelReason.length > 10
              ? p.cancelReason.substring(0, 15) + "..."
              : p.cancelReason} */}
            {p.cancelReason}
          </Text>
          <Text style={styles.cancelType}>
            {chooseCancelType(p.cancelType)}
          </Text>
        </View>
      </View>
      <View
        style={[styles.dropdown, { display: itemSelected ? "flex" : "none" }]}
      ></View>
    </TouchableOpacity>
  );
};
export default function CanceledProduct() {
  const currentyear = new Date().getFullYear();
  const [value, setValue] = useState(ObjectName[0]);
  const [value2, setValue2] = useState(initData2);
  const [valueDate, setValueDate] = useState<number>(currentyear);
  const [isDate, setIsDate] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [YearsData, setYearsData] = useState([]);
  const [ReasonData, setReasonData] = useState([]);
  const dispacth = useAppDispatch();
  const { cancelReason, CustomerCancelReason } = useAppSelector(
    selectOrderByRetailer
  );
  const { cancelSumaryRp, cancelRp } = useAppSelector(selectReport);
  const [description, setDescription] = useState([]);
  const [listHeight, setListHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [loadmore, setLoadmore] = useState(false);
  const [skip, setSkip] = useState(0);
  useLayoutEffect(() => {
    setYearsData(getYears);
  }, []);
  const onSelectDate = (val: number[]) => {
    setValueDate(YearsData.find((item) => item === val[0]) || YearsData[0]);
  };
  const onSelectValue = (val: string) => {
    setValue(ObjectName?.find((item) => item.id === val[0]) || ObjectName[0]);
    setValue2(ReasonDataAll[0]);
    // setValue(val)
  };
  const onSelectValue2 = (val: string) => {
    setValue2(ReasonData?.find((item) => item.id === val[0]) || ReasonData[0]);
    // setValue(val)
  };
  useEffect(() => {
    switch (value.id) {
      case "3":
        dispacth(GetReason({}));
        return;
      case "2":
        dispacth(GetCustomerReason({}));
        return;
    }
  }, [value]);
  useEffect(() => {
    if (cancelReason !== undefined) {
      setReasonData(ReasonDataAll.concat(cancelReason));
    }
  }, [cancelReason]);
  useEffect(() => {
    if (CustomerCancelReason != undefined) {
      setReasonData(ReasonDataAll.concat(CustomerCancelReason));
    }
  }, [CustomerCancelReason]);
  useLayoutEffect(() => {
    if (value.id !== "" && value.id !== "1") {
      const arr = cancelSumaryRp?.items.map((items, index) => {
        const des = {
          text: "",
          num: 0,
          color: "",
        };
        des.num = items.totalOrder;
        des.text = items.cancelReason;
        des.color = color[index];
        return des;
      });
      setDescription(arr);
    }
  }, [cancelSumaryRp]);

  useEffect(() => {
    dispacth(
      getCancelSumaryRP({
        cancelType: value.id !== "" ? Number(value.id) : undefined,
        FromDate: `${valueDate?.toString()}-01-01`,
        ToDate: `${valueDate?.toString()}-12-31`,
      })
    );
  }, [value, valueDate]);
  useEffect(() => {
    setSkip(0);
    dispacth(
      getCancelRP({
        CancelReasonId: value2.id,
        CancelType: value.id !== "" ? Number(value.id) : undefined,
        FromDate: `${valueDate?.toString()}-01-01`,
        ToDate: `${valueDate?.toString()}-12-31`,
        skip: 0,
        take: 10,
      })
    );
  }, [value, value2, valueDate]);
  useEffect(() => {
    if (skip > 0) {
      dispacth(
        getMoreCancelRP({
          CancelReasonId: value2.id,
          CancelType: value.id !== "" ? Number(value.id) : undefined,
          FromDate: `${valueDate?.toString()}-01-01`,
          ToDate: `${valueDate?.toString()}-12-31`,
          skip: skip,
          take: 10,
        })
      );
    }
  }, [skip]);
  const isCloseToBottom = (e: any) => {
    if (
      e.nativeEvent.contentOffset.y.toFixed(0) ===
      (listHeight - scrollViewHeight).toFixed(0)
    ) {
      // const next = skip + 10;
      setSkip(skip + 10);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"transparent"} />

      <View style={styles.head}>
        <View style={styles.row1Head}>
          <DropdowInput
            textColor={colors.c_48484A}
            style={{ flex: 1 }}
            lable={value?.name}
            onPress={() => setShow(true)}
          ></DropdowInput>
        </View>
        {value.id !== "" && value.id !== "1" ? (
          <DropdowInput
            textColor={colors.c_48484A}
            style={styles.row2Head}
            lable={value2.reasonName ? value2.reasonName : "Lý do hủy"}
            onPress={() => setShow2(true)}
          ></DropdowInput>
        ) : (
          <></>
        )}

        {/* <TouchableOpacity
          style={[styles.inputDropdown, styles.row2Head]}
          onPress={() => setIsDate(true)}
        >
          <Text style={styles.select}>{`${translate(
            "year"
          )} ${valueDate}`}</Text>
          <IconAngleDown width={17} fill={colors.c_7B7B80} />
        </TouchableOpacity> */}
        <DropdowInput
          textColor={colors.c_48484A}
          style={styles.row2Head}
          lable={`${translate("year")} ${valueDate}`}
          onPress={() => setIsDate(true)}
        ></DropdowInput>
      </View>

      <ScrollView
        onScroll={(e) => {
          isCloseToBottom(e);
        }}
        onContentSizeChange={(contentWidth, contentHeight) => {
          if (!loadmore) {
            setListHeight(contentHeight);
          }
        }}
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout;
          if (!loadmore) {
            setScrollViewHeight(height);
          }
        }}
      >
        <View style={styles.productList}>
          <View style={styles.banner}>
            <Text style={[styles.title, { marginBottom: 8 }]}>
              Tổng số đơn hàng hủy
            </Text>
            <Text style={styles.content}>{cancelSumaryRp?.totalCount}</Text>
          </View>

          {value.id !== "" && value.id !== "1" && description?.length != 0 ? (
            <View style={styles.piechartWrapper}>
              <View style={styles.piechart}>
                <PieChartcancel amount={description} />
              </View>
              {description?.map((item, index) => (
                <View style={styles.description} key={index}>
                  <Text style={[styles.reason1, { color: item.color }]}>
                    {item.text}
                  </Text>
                  <Text style={styles.number}>{item.num}</Text>
                </View>
              ))}
            </View>
          ) : (
            // <></>
            <></>
          )}

          <Text style={styles.title}>Danh sách đơn hàng huỷ</Text>
          {cancelRp?.items.map((p) => (
            <ProductRow key={p.id} p={p} />
          ))}
        </View>
      </ScrollView>
      <SelectYear
        data={YearsData}
        isShow={isDate}
        onSelect={(e) => onSelectDate(e)}
        setShow={() => setIsDate(false)}
        title={"Chọn năm"}
        value={valueDate}
      />
      <Select
        noSearch={true}
        data={ObjectName}
        isShow={show}
        onSelect={(e) => onSelectValue(e)}
        setShow={() => setShow(false)}
        title={"Chọn đối tượng"}
        value={value}
      />
      {ReasonData.length > 0 ? (
        <Select
          id="id"
          name="reasonName"
          noSearch={true}
          data={ReasonData}
          isShow={show2}
          onSelect={(e) => onSelectValue2(e)}
          setShow={() => setShow2(false)}
          title={"Chọn lý do"}
          value={value2}
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.c_ffffff,
  },
  head: {
    backgroundColor: colors.c_EAF4FF,
    paddingHorizontal: 24,
    paddingTop: 21,
    paddingBottom: 24,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  row1Head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputDropdown: {
    backgroundColor: colors.c_ffffff,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.c_d0D5dd,
  },
  select: {
    color: colors.c_48484A,
  },
  col1Row1Head: {
    flex: 1,
  },

  icon: {
    marginLeft: 14,
  },
  row2Head: {
    marginTop: 12,
  },
  banner: {
    backgroundColor: colors.c_eaf4ff,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    padding: 16,
    marginBottom: 32,
  },
  content: {
    fontWeight: "600",
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
    color: "black",
  },
  piechartWrapper: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    justifyContent: "flex-start",
    marginBottom: 32,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: colors.c_ffffff,
    borderRadius: 10,
    borderColor: colors.c_F3F3F3,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 10,
  },
  piechart: {
    marginLeft: 20,
    marginBottom: 30,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.c_d8dae5,
    // height: 30,
    paddingTop: 7,
    paddingBottom: 6,
  },
  reason1: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 14,
  },
  number: {
    color: colors.c_12131a,
    fontSize: 12,
  },
  overview: {},
  title: {
    color: colors.c_2c2c2e,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 16,
  },
  productList: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  productRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.c_f9f9f9,
    marginBottom: 16,
    borderRadius: 10,
  },
  boxImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  productWTxt: {
    flexDirection: "column",
    marginLeft: 4,
  },
  productName: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.c_8E8E93,
  },
  reason: {
    // flex: 1,
    textAlign: "right",
    color: colors.c_3A3A3C,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
    // marginRight: 2,
    marginBottom: 4,
  },
  cancelType: {
    textAlign: "right",
    fontWeight: "600",
    color: colors.c_8E8E93,
    fontSize: 10,
    lineHeight: 12,
  },
  productMSP: {
    color: colors.c_8E8E93,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 4,
    fontWeight: "400",
  },
  date: {},
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdown: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.12)",
  },
  line: {
    marginTop: 12,
    flexDirection: "row",
  },
  leftLine: {
    color: colors.c_8E8E93,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
  },
  rightLine: {
    flex: 1,
    color: colors.c_48484A,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
    marginLeft: 40,
    textAlign: "right",
    paddingRight: 16,
  },
});
