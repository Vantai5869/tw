import { omit } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { DIMENSIONS } from "../../../common/utils";
import DatePicker from "../../../componets/DatePicker";
import { colors } from "../../../constants/colors";
import { icons, IconTimes } from "../../../constants/icons";
import { isAndroid } from "../../../constants/untils";
import { translate } from "../../../locale";
import {
  FilterOrderImport,
  resetOrderImportState,
  selectOrderImport,
} from "../../../redux/slice/Sales/order-import";
import {
  GetOrderImportReq,
  OrderImportProductType,
  OrderImportType,
} from "../../../redux/type/Sales/order-import";
import OrderItem from "./OrderItem";

type Props = {
  visible: boolean;
  setIsModal: () => void;
};

export const RePurchaseComponent = ({
  visible,
  setIsModal,
  ...props
}: Props) => {
  const dispatch = useDispatch();
  const { dataFlterOrders, loadingFilterOrderImport } =
    useSelector(selectOrderImport);

  const [isDate, setIsDate] = useState<boolean>(false);
  const [datas, setDatas] = useState<{
    code?: string;
    date?: Date | undefined;
  }>();
  const [date, setDate] = useState<Date | undefined>(undefined);

  const getOrderImport = (filter?: any) => {
    let params: GetOrderImportReq = {
      skip: 0,
      take: 50,
    };
    if (!!filter?.code) {
      Object.assign(params, {
        Code: filter?.code || "",
      });
    } else {
      params = omit(params, ["Code"]);
    }
    if (!!filter?.date) {
      Object.assign(params, {
        CreatedDate: moment(filter?.date).format("YYYY-MM-DD"),
      });
    } else {
      params = omit(params, ["CreatedDate"]);
    }
    dispatch(FilterOrderImport(params));
  };

  useEffect(() => {
    if (visible) {
      getOrderImport();
    }
  }, [visible]);

  const onClose = () => {
    setIsModal();
    setDatas({ code: "", date: undefined });
  };

  const onChangeSearch = (code: string) => {
    setDatas({
      ...datas,
      code,
    });
    getOrderImport({ ...datas, code });
  };

  const onChangeBirthday = () => {
    setIsDate((prev) => !prev);
    setDatas({
      ...datas,
      date,
    });
    getOrderImport({ ...datas, date });
  };

  const onChangeValueBirthday = (day?: Date) => {
    if (isAndroid) {
      setDatas({
        ...datas,
        date: day,
      });
      getOrderImport({ ...datas, date: day });
    } else {
      setDate(day);
    }
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
          <View style={[styles.headingModal]}>
            <View style={[styles.between, styles.viewTitle]}>
              <Text style={styles.titleModal}>
                {translate("repurchase_order_import")}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                }}
              >
                <IconTimes
                  width={20}
                  height={20}
                  fill={"#000000"}
                  stroke={"#000"}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.between, styles.viewActions]}>
              <View style={styles.viewInput}>
                <TextInput
                  value={datas?.code || ""}
                  placeholder={translate("search")}
                  onChangeText={onChangeSearch}
                  style={styles.input}
                />
                <Image
                  style={styles.iconText}
                  source={icons.ICON_SEARCH}
                  resizeMode="contain"
                />
              </View>
              <View style={[styles.viewInput, styles.viewInputRight]}>
                <TouchableOpacity
                  onPress={() => setIsDate(true)}
                  style={styles.input}
                >
                  <Text style={styles.txtDate}>
                    {datas?.date
                      ? moment(datas?.date).format("DD/MM/YYYY")
                      : translate("select_date")}
                  </Text>
                  <Image
                    style={styles.iconDate}
                    source={icons.ICON_CALENDAR}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView style={styles.flatItems}>
            {!!datas?.code || !!datas?.date ? null : (
              <Text style={[styles.titleModal, styles.labelList]}>
                {translate("recent_order_import")}
              </Text>
            )}
            {loadingFilterOrderImport ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={{ marginVertical: 25 }}
              />
            ) : dataFlterOrders?.items && dataFlterOrders?.items?.length > 0 ? (
              dataFlterOrders?.items?.map(
                (el: OrderImportType, index: number) => {
                  return (
                    <View key={el?.id} style={{ paddingVertical: 8 }}>
                      <OrderItem
                        order={el}
                        status={"REPURCHASE"}
                        onClose={onClose}
                        style={
                          dataFlterOrders?.items?.length - 1 === index && {
                            borderBottomColor: "transparent",
                          }
                        }
                      />
                    </View>
                  );
                }
              )
            ) : (
              <Text style={styles.txtNoData}>
                {translate("filter_no_order")}
              </Text>
            )}
          </ScrollView>
        </View>
      </View>
      <DatePicker
        value={date}
        mode="date"
        display="default"
        maximumDate={new Date()}
        visible={isDate}
        onToggle={() => {
          onChangeBirthday();
        }}
        onChange={(data: Date | undefined) => onChangeValueBirthday(data)}
      />
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
    paddingTop: 80,
  },
  innerModal: {
    backgroundColor: "white",
    // paddingHorizontal: 24,
    paddingVertical: 26,
    width: "100%",
    flex: 1,
    flexDirection: "column",
  },
  headingModal: {
    paddingHorizontal: 24,
    borderBottomWidth: 5,
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
    paddingBottom: 24,
    width: "100%",
  },
  viewTitle: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  titleModal: {
    fontWeight: "700",
    fontSize: 16,
    color: colors.c_1F1F1F,
  },
  viewActions: { paddingTop: 23 },
  viewInput: {
    flex: 1,
    paddingRight: 4,
    position: "relative",
  },
  viewInputRight: { paddingLeft: 4, paddingRight: 0 },
  input: {
    backgroundColor: colors.c_EEEEEE,
    borderColor: colors.c_EEEEEE,
    height: 43,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingRight: 35,
    position: "relative",
  },
  txtDate: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.c_A3A3A3,
  },
  txtDateActive: {
    color: colors.c_3A3A3C,
  },
  flatItems: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 24,
  },
  labelList: { marginTop: 20 },
  txtNoData: {
    fontSize: 16,
    color: colors.c_48484A,
    marginTop: 20,
  },
  iconText: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 12,
    right: 14,
  },
  iconDate: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 10,
    right: 10,
  },
});
