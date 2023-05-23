import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatNumber } from "../../../common/utils";
import { colors } from "../../../constants/colors";
import { IconAngleDown, IconStarYellow } from "../../../constants/icons";
import { translate } from "../../../locale";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getRateRP, selectReport } from "../../../redux/slice/Report/report";
import {
  resetFilter,
  searchCatgory,
  selectProductWarehouse,
} from "../../../redux/slice/warehouses/products-warehouse";
import { CategoryWareHouse } from "../../../redux/type/warehouses/distributor-stock-inventory";
import DropdowInput from "../components/dropdowInput";
import Select from "../grow-up/components/select";
import SelectYear from "../grow-up/components/selectYear";
import { getYears } from "../grow-up/filter";

interface ProductInfo {
  productId: string;
  code: string;
  name: string;
  image: string[];
  categoryId: string;
  categoryName: string;
  avgPoint: number;
  totalRateTime: number;
}
interface Props {
  p: ProductInfo;
}
interface DataType {
  id: string | undefined;
  name: string | undefined;
}
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
          <Text style={styles.productMSP}>MSP: {p.code}</Text>
        </View>
        <Text style={styles.sales}>{formatNumber(p.avgPoint)}</Text>
        <IconStarYellow width={13} height={12} />
      </View>
      <View
        style={[styles.dropdown, { display: itemSelected ? "flex" : "none" }]}
      >
        <View style={[styles.line, { marginTop: 8 }]}>
          <Text style={styles.leftLine}>Ngành</Text>
          <Text style={styles.rightLine}>{p.categoryName}</Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.leftLine}>Số lượng đánh giá</Text>
          <Text style={styles.rightLine}>{p.totalRateTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const allCate = {
  id: "",
  avatar: "",
  parentId: "",
  level: 0,
  totalProduct: 0,
  name: "Tất cả ngành hàng",
};
export default function RateedProduct() {
  const isfocus = useIsFocused();
  const dispatch = useAppDispatch();
  const { RateRP } = useAppSelector(selectReport);
  const { category, filterCategory } = useAppSelector(selectProductWarehouse);
  const [listCategory, setListgory] = useState<CategoryWareHouse[]>([]);
  const [value, setValue] = useState<CategoryWareHouse | undefined>(allCate);
  const currentyear = new Date().getFullYear();
  const [valueDate, setValueDate] = useState<number>(currentyear);
  const [isDate, setIsDate] = useState(false);
  const [show, setShow] = useState(false);
  const [YearsData, setYearsData] = useState<Array<number>>([]);

  useLayoutEffect(() => {
    setYearsData(getYears);
  }, []);
  useEffect(() => {
    if (!isfocus) {
      dispatch(resetFilter());
    }
  }, [isfocus]);
  useEffect(() => {
    setListgory(filterCategory?.concat(allCate).reverse() || []);
  }, [filterCategory]);
  useEffect(() => {
    // if (valueDate !== undefined) {
    dispatch(
      getRateRP({
        CategoryId: value?.id,
        FromDate: `${valueDate?.toString()}-01-01`,
        ToDate: `${valueDate?.toString()}-12-31`,
      })
    );
    // }
  }, [value, valueDate]);

  const onSelectDate = (val: number[]) => {
    setValueDate(YearsData.find((item) => item === val[0]) || YearsData[0]);
  };
  const onSelectValue = (val: string) => {
    setValue(listCategory?.find((item) => item.id === val[0]) || value);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"transparent"} />

      <View style={styles.head}>
        <View style={styles.row1Head}>
          <DropdowInput
            textColor={colors.c_48484A}
            style={{ flex: 1 }}
            lable={`${translate("year")} ${valueDate}`}
            onPress={() => setIsDate(true)}
          ></DropdowInput>
        </View>

        <DropdowInput
          textColor={colors.c_48484A}
          style={styles.row2Head}
          lable={value?.name}
          onPress={() => setShow(true)}
        ></DropdowInput>
      </View>
      <ScrollView>
        <View style={styles.overview}>
          <Text style={styles.title}>{/* Top 5 sản phẩm bán chạy nhất */}</Text>
        </View>
        {RateRP?.totalCount > 0 ? (
          <View style={styles.productList}>
            {RateRP?.items.map((p) => (
              <ProductRow key={p.productId} p={p} />
            ))}
          </View>
        ) : (
          <></>
        )}
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
        search={(e: string) => dispatch(searchCatgory(e))}
        data={listCategory || []}
        isShow={show}
        onSelect={(e) => onSelectValue(e)}
        setShow={() => setShow(false)}
        title={"Chọn ngành hàng"}
        value={value}
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
    borderWidth: 1,
    borderColor: colors.c_D7D7D7,
    backgroundColor: colors.c_ffffff,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 13,
    flexDirection: "row",
    marginRight: 9,
    alignItems: "center",
    justifyContent: "space-between",
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
  overview: {},
  title: {},
  productList: {
    paddingHorizontal: 24,
    marginTop: 8,
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
    marginRight: 2,
  },
  productMSP: {
    color: colors.c_8E8E93,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 4,
    fontWeight: "400",
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
});
