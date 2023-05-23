import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { DIMENSIONS, formatNumber } from "../../common/utils";
import MultiSelect from "../../componets/MultiSelect";
import Select from "./grow-up/components/select";
import DropdowInput from "./components/dropdowInput";
import { IData } from "./orderRp";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getProductTopSellingRp,
  selectReport,
} from "../../redux/slice/Report/report";
import moment from "moment";
import DatePicker from "../../componets/DatePicker";
import {
  searchCatgory,
  selectProductWarehouse,
} from "../../redux/slice/warehouses/products-warehouse";
import { GetProuctTopSellingRpReq } from "../../redux/type/Report/report";
import i18n, { translate } from "../../locale";

interface ProductInfo {
  productId: string;
  image: string[];
  name: string;
  code: number;
  totalOrder: number;
  totalQuantity: number;
  revenue: number;
  categoryName: string;
  categoryId: string;
}
interface Props {
  p: ProductInfo;
}
interface Itop {
  name: string;
  value: number;
}

const numberTopList = [
  { id: "1", name: "Top 5", take: 5 },
  { id: "2", name: "Top 10", take: 10 },
  { id: "3", name: "Top 50", take: 50 },
  { id: "4", name: "Top 100", take: 100 },
];
const cateorySelectedTmp = { id: "", name: i18n.t("all_category") };

const ProductRow: React.FC<Props> = ({ p }) => {
  const [itemSelected, setItemSelected] = useState<boolean>(false);
  const handleClickItem = () => {
    setItemSelected(!itemSelected);
  };

  return (
    <TouchableOpacity style={styles.productRow} onPress={handleClickItem}>
      <View style={styles.flexRow}>
        <View style={styles.boxImage}>
          <Image
            source={{ uri: p.image[0] }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.productWTxt}>
          <Text style={styles.productName}>
            {p.name.length > 10 ? p.name.substring(0, 15) + "..." : p.name}
          </Text>
          <Text style={styles.productMSP}>
            {translate("code")}: {p?.code}
          </Text>
        </View>
        <Text style={styles.sales}>
          {formatNumber(p.totalOrder)} {translate("sales")}
        </Text>
      </View>
      <View
        style={[styles.dropdown, { display: itemSelected ? "flex" : "none" }]}
      >
        <View style={[styles.line, { marginTop: 8 }]}>
          <Text style={styles.leftLine}>{translate("category")}</Text>
          <Text style={styles.rightLine}>{p?.categoryName}</Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.leftLine}>{translate("quantity_sold")}</Text>
          <Text style={styles.rightLine}>{p.totalOrder}</Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.leftLine}>{translate("total_income")} (VNĐ)</Text>
          <Text style={styles.rightLine}>{p?.revenue}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default function BestSellerProductsRp() {
  const dispatch = useAppDispatch();
  const { category, filterCategory } = useAppSelector(selectProductWarehouse);
  const [isShowDayModal, setIsShowDayModal] = useState<boolean>(false);
  const [isShowNumberTopModal, setIsShowNumberTopModal] =
    useState<boolean>(false);
  const [isShowCategoryModal, setIsShowCategoryModal] =
    useState<boolean>(false);
  const [numberTopSelected, setNumberTopSelected] = useState<IData>(
    numberTopList[0]
  );
  const [categorySelected, setCategorySelected] =
    useState<IData>(cateorySelectedTmp);
  const [stepPrice, setStepPrice] = useState<number>(0);
  const [startDay, setStartDay] = useState<Date | undefined>();
  const [endDay, setEndDay] = useState<Date | undefined>();
  const reportData = useAppSelector(selectReport);
  const [top, setTop] = useState<Itop[]>([]);
  const [firtTime, setFirtTime] = useState(true);

  const [unit, setUnit] = useState<number>(1);
  const handleSelectNumberTop = (e: string) => {
    setNumberTopSelected(
      numberTopList.find((i) => i.id === e[0]) || numberTopList[0]
    );
  };
  const handleSelectCategory = (e: string) => {
    setCategorySelected(
      filterCategory?.find((i) => i.id === e[0]) || cateorySelectedTmp
    );
  };

  useEffect(() => {
    if (reportData?.propductTopSelling?.items?.length && firtTime) {
      setFirtTime(false);
      const dataTmp = reportData.propductTopSelling.items.slice(0, 4);
      const data = dataTmp?.map((i) => ({ name: i.name, value: i.totalOrder }));
      setTop(data);
    }
  }, [reportData.propductTopSelling.items]);

  useEffect(() => {
    if (top.length > 0) {
      const max = Math.max(...top.map((o) => o.value));
      if (max < 10) {
        setUnit(1);
      } else if (max < 100) {
        setUnit(1);
      } else if (max < 1000) {
        setUnit(100);
      } else if (max < 1000000) {
        setUnit(1000);
      } else if (max < 1000000000) {
        setUnit(1000000);
      } else if (max < 1000000000000) {
        setUnit(1000000000);
      }
      const step = Math.ceil(max / 4);
      const num = Math.ceil(step / unit) * unit;
      setStepPrice(num);
    }
  }, [top]);

  useEffect(() => {
    if (!reportData.propductTopSelling.items)
      dispatch(
        getProductTopSellingRp({
          skip: 0,
          take: 20,
        })
      );
  }, []);

  useEffect(() => {
    let dataRq: GetProuctTopSellingRpReq = {
      skip: 0,
      take: numberTopSelected.take,
    };
    if (categorySelected?.id != "")
      dataRq = { ...dataRq, CategoryId: categorySelected?.id };
    if (startDay && endDay)
      dataRq = {
        ...dataRq,
        FromDate: moment(startDay).format("YYYY-MM-DD"),
        ToDate: moment(endDay).format("YYYY-MM-DD"),
      };
    dispatch(getProductTopSellingRp(dataRq));
  }, [numberTopSelected, categorySelected, endDay]);

  const handleOnEndReached = () => {
    if (!reportData.loading && reportData.propductTopSelling.hasMore) {
      const take = 20;
      const skip = reportData.propductTopSelling.currentPage * take;
      let dataRq: GetProuctTopSellingRpReq = {
        skip: skip,
        take: numberTopSelected.take,
      };
      if (categorySelected?.id != "")
        dataRq = { ...dataRq, CategoryId: categorySelected?.id };
      if (startDay && endDay)
        dataRq = {
          ...dataRq,
          FromDate: moment(startDay).format("YYYY-MM-DD"),
          ToDate: moment(endDay).format("YYYY-MM-DD"),
        };
      dispatch(getProductTopSellingRp(dataRq));
    }
  };

  const handleSelectDay = () => {};

  const handleSelectDayValue = (data: Date | undefined) => {
    if (!data) {
      return;
    }
    if (startDay && endDay) {
      setStartDay(data);
      setEndDay(undefined);
    }
    if (!startDay) setStartDay(data);
    else if (!endDay) {
      setEndDay(data);
    }
    setIsShowDayModal(!isShowDayModal);
  };

  useEffect(() => {
    if (startDay && !endDay) {
      setIsShowDayModal(true);
    }
  }, [startDay]);

  const unitTxt = (unit: number) => {
    if (unit === 100) {
      return "L";
    } else if (unit === 1000) {
      return "K";
    } else if (unit === 1000000) {
      return "M";
    } else if (unit === 1000000000) {
      return "B";
    } else if (unit === 1000000000000) {
      return "T";
    }
    return "";
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"transparent"} />

      <View style={styles.head}>
        <View style={styles.row1Head}>
          <DropdowInput
            style={{ flex: 1, marginRight: 9 }}
            lable={
              !startDay
                ? "Khoảng thời gian"
                : moment(startDay).format("DD/MM/YYYY") +
                  " - " +
                  moment(endDay).format("DD/MM/YYYY")
            }
            onPress={() => setIsShowDayModal(true)}
          />
          <DropdowInput
            lable={numberTopSelected?.name}
            onPress={() => setIsShowNumberTopModal(!isShowNumberTopModal)}
          />
        </View>

        <DropdowInput
          style={{ marginTop: 12 }}
          lable={categorySelected?.name}
          onPress={() => setIsShowCategoryModal(!isShowCategoryModal)}
        />
      </View>
      <ScrollView>
        <View style={styles.overview}>
          <Text style={styles.title}>
            {translate("top_best_selling_products")}
          </Text>
          <View style={styles.viewChart}>
            <View style={styles.itemChartLeft}></View>
            {[1, 2, 3, 4].map((e, i) => (
              <View style={styles.itemChart} key={i}></View>
            ))}
          </View>
          <View style={styles.viewChart}>
            <View style={styles.itemVal}>
              <Text style={styles.textChartLeft}>0</Text>
            </View>
            {[1, 2, 3, 4].map((e, i) => (
              <View style={styles.itemVal} key={i}>
                <Text style={styles.textChart}>{`${
                  (e * stepPrice) / unit
                } ${unitTxt(unit)}`}</Text>
              </View>
            ))}
          </View>
          <View style={styles.position}>
            {top.map((e: Itop, i) => (
              <View style={styles.view} key={i}>
                <View
                  style={{
                    ...styles.item,
                    width: `${(e.value * 100) / (stepPrice * 4)}%`,
                  }}
                >
                  <Text numberOfLines={1}>{e.name}</Text>
                </View>
                <View
                  style={{
                    ...styles.chart,
                    width: `${(e.value * 100) / (stepPrice * 4)}%`,
                  }}
                >
                  <Text style={styles.value}>{e.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.productList}>
          {/* {
            productList.map(p =>
              <ProductRow key={p.id} p={p} />
            )

          } */}
          <FlatList
            // style={{ paddingHorizontal: 26,
            // paddingVertical: 10,}}
            data={reportData?.propductTopSelling?.items}
            keyExtractor={(item) => `${item.productId}`}
            renderItem={({ item, index }: any) => (
              <ProductRow key={item.productId} p={item} />
            )}
            // onEndReached={handleOnEndReached}
            onEndReachedThreshold={5}
          />
        </View>
      </ScrollView>
      {/* <MultiSelect
        data={dayList}
        isVisible={isShowDayModal}
        onChange={handleSelectDay}
        onClose={() => setIsShowDayModal(!isShowDayModal)}
        title={"date"}
        value="id"
        label="name"
        checkeds={[daySelected.id]}
        multi={false}
      /> */}
      <MultiSelect
        data={numberTopList}
        isVisible={isShowNumberTopModal}
        onChange={handleSelectNumberTop}
        onClose={() => setIsShowNumberTopModal(!isShowNumberTopModal)}
        title={"Top"}
        value="id"
        label="name"
        checkeds={[numberTopSelected.id]}
        multi={false}
      />
      {/* <Select
        data={cateoryList}
        isShow={isShowCategoryModal}
        onSelect={handleSelectCategory}
        setShow={() => setIsShowCategoryModal(!isShowCategoryModal)}
        title={"category"}
        value={categorySelected}
        search={()=>{}}
      /> */}

      <Select
        search={(e: string) => dispatch(searchCatgory(e))}
        data={filterCategory || []}
        isShow={isShowCategoryModal}
        onSelect={handleSelectCategory}
        setShow={() => setIsShowCategoryModal(!isShowCategoryModal)}
        title={translate("choose_category")}
        value={categorySelected}
      />

      <DatePicker
        value={startDay}
        mode="date"
        display="default"
        maximumDate={new Date()}
        minimumDate={!endDay ? startDay : undefined}
        visible={isShowDayModal}
        onToggle={() => {
          handleSelectDay();
        }}
        onChange={(data: Date | undefined) => handleSelectDayValue(data)}
        onTouchCancel={() => {}}
      />
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
    paddingHorizontal: 12,
    paddingVertical: 13,
    flexDirection: "row",
    marginRight: 9,
    alignItems: "center",
    justifyContent: "space-between",
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
  overview: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.c_F3F3F3,
    shadowColor: colors.c_F3F3F3,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.8,
    elevation: 3,
    marginHorizontal: 24,
    marginTop: 24,
    position: "relative",
  },
  title: {
    marginBottom: 12,
  },
  productList: {
    paddingHorizontal: 24,
    marginTop: 24.5,
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
    lineHeight: 18,
    color: colors.c_3A3A3C,
  },
  sales: {
    flex: 1,
    textAlign: "right",
    color: colors.c_3A3A3C,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
  },
  productMSP: {
    color: colors.c_48484A,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 4,
    fontWeight: "400",
    flexWrap: "wrap",
    maxWidth: "69%",
    flexShrink: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
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
  viewChart: {
    flex: 1,
    flexDirection: "row",
  },
  itemChart: {
    height: 250,
    width: (DIMENSIONS.width - 96) / 4,
    borderRightColor: colors.c_d8dae5,
    borderRightWidth: 0.5,
  },
  itemChartLeft: {
    height: 250,
    width: 1,
    borderRightColor: colors.c_d8dae5,
    borderRightWidth: 0.5,
  },
  textChart: {
    fontWeight: "400",
    fontSize: 10,
    marginLeft: -7,
    marginTop: 12,
  },
  itemVal: {
    width: (DIMENSIONS.width - 96) / 4,
  },
  textChartLeft: {
    fontWeight: "400",
    fontSize: 10,
    marginTop: 12,
    marginLeft: -3,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chart: {
    padding: 2,
    backgroundColor: colors.c_667403,
    alignItems: "flex-end",
    marginTop: 6,
  },
  value: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.c_ffffff,
  },
  view: {
    marginTop: 10,
  },
  position: {
    position: "absolute",
    bottom: 36,
    left: 24,
    width: "100%",
  },
});
