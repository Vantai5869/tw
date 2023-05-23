import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../constants/colors";
import { IconAngleDown } from "../../../../constants/icons";
import { translate } from "../../../../locale";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  getGrowthByCategory,
  getGrowthByProduct,
  getGrowthRevenue,
  selectReport,
} from "../../../../redux/slice/Report/report";
import {
  GetCategoryWareHouse,
  GetListProductWareHouse,
  searchCatgory,
  selectProductWarehouse,
} from "../../../../redux/slice/warehouses/products-warehouse";
import Select from "../components/select";
import SelectYear from "../components/selectYear";
// import Select from "../components/dropdown";

interface Props {
  tab?: string;
}
interface DataType {
  id: string | undefined;
  name: string | undefined;
}
export const getYears = () => {
  let years = [2020];
  const currentyear = new Date().getFullYear();
  for (let i = 2020; i <= currentyear; i++) {
    if (i > 2020) {
      years.push(i);
    }
  }
  return years;
};
const Filter: React.FC<Props> = ({ tab }) => {
  const dispatch = useAppDispatch();
  const { category, filterCategory } = useAppSelector(selectProductWarehouse);
  const { products } = useAppSelector(selectProductWarehouse);
  const { GrowReport } = useAppSelector(selectReport);
  const currentyear = new Date().getFullYear();
  const [YearsData, setYearsData] = useState<Array<number>>([]);
  const [value, setValue] = useState<DataType>();
  const [value2, setValue2] = useState<DataType>();
  const [valueDate, setValueDate] = useState<number>(currentyear);
  const [isDate, setIsDate] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  // const initDate: DataType = {
  //   id: `${currentyear.toString()}-01-01 ${currentyear.toString()}-12-31`,
  //   name: currentyear.toString(),
  // };
  useEffect(() => {
    // if(tab === '1'){
    setValue(filterCategory ? filterCategory[0] : undefined);
    setValue2(products?.items!![0]);
    // setValueDate(currentyear);
    // }
  }, []);
  useLayoutEffect(() => {
    setYearsData(getYears);
  }, []);
  useEffect(() => {
    if (tab === "1" && value != undefined) {
      dispatch(
        getGrowthByCategory({
          CategoryId: value.id,
          FromDate: `${valueDate?.toString()}-01-01`,
          ToDate: `${valueDate?.toString()}-12-31`,
          GroupType: 2,
        })
      );
    }
    if (tab === "2" && value2 != undefined) {
      dispatch(
        getGrowthByProduct({
          ProductId: value2?.id,
          FromDate: `${valueDate?.toString()}-01-01`,
          ToDate: `${valueDate?.toString()}-12-31`,
          GroupType: 2,
        })
      );
    }
    if (tab === "3") {
      dispatch(
        getGrowthRevenue({
          FromDate: `${valueDate?.toString()}-01-01`,
          ToDate: `${valueDate?.toString()}-12-31`,
          GroupType: 2,
        })
      );
    }
  }, [value, value2, valueDate, tab]);
  const setTitle = () => {
    switch (tab) {
      case "1":
        return {
          title: "Số lượng bán theo ngành hàng",
          cateGory: "Ngành hàng",
        };
      case "2":
        return { title: "Số lượng bán theo sản phẩm", cateGory: "Sản phẩm" };
      case "3":
        return { title: "Doanh thu", cateGory: "" };
    }
  };
  const onSelectDate = (val: number[]) => {
    setValueDate(YearsData.find((item) => item === val[0]) || YearsData[0]);
  };
  const onSelectValue = (val: string) => {
    setValue(category?.items?.find((item) => item.id === val[0]) || value);
    // setValue(val)
  };
  const onSelectValue2 = (val: string) => {
    setValue2(products?.items?.find((item) => item.id === val[0]) || value2);
  };
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{setTitle()?.title}</Text>
      <View style={styles.category}>
        {setTitle()?.cateGory !== "" ? (
          <Text style={styles.txtCategory}>{setTitle()?.cateGory}</Text>
        ) : (
          <></>
        )}

        <View style={{ width: "60%" }}>
          {tab === "1" ? (
            // <Select data={DATA} setValue={(e) => setValue(e)} />
            <TouchableOpacity
              style={[styles.inputDropdown, styles.col1Row1Head]}
              onPress={() => setShow(true)}
            >
              <Text style={styles.select}>{value?.name}</Text>
              <IconAngleDown width={17} fill={colors.c_7B7B80} />
            </TouchableOpacity>
          ) : tab === "2" ? (
            <TouchableOpacity
              style={[styles.inputDropdown, styles.col1Row1Head]}
              onPress={() => setShow2(true)}
            >
              <Text style={styles.select}>{value2?.name}</Text>
              <IconAngleDown width={17} fill={colors.c_7B7B80} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.inputDropdown, styles.col1Row1Head]}
          onPress={() => setIsDate(true)}
        >
          <Text style={styles.select}>{`${translate(
            "year"
          )} ${valueDate}`}</Text>
          <IconAngleDown width={17} fill={colors.c_7B7B80} />
        </TouchableOpacity>
      </View>
      {}
      {YearsData?.length!! > 0 ? (
        <SelectYear
          data={YearsData}
          isShow={isDate}
          onSelect={(e) => onSelectDate(e)}
          setShow={() => setIsDate(false)}
          title={"Chọn năm"}
          value={valueDate}
        />
      ) : (
        <></>
      )}

      <Select
        search={(e: string) => dispatch(searchCatgory(e))}
        data={filterCategory || []}
        isShow={show}
        onSelect={(e) => onSelectValue(e)}
        setShow={() => setShow(false)}
        title={setTitle()?.cateGory!!}
        value={value}
      />
      {/* {products?.totalCount!! > 0 ? ( */}
      <Select
        search={(e: string) =>
          dispatch(
            GetListProductWareHouse({
              TextSearch: e,
            })
          )
        }
        data={products?.items || []}
        isShow={show2}
        onSelect={(e) => onSelectValue2(e)}
        setShow={() => setShow2(false)}
        title={setTitle()?.cateGory!!}
        value={value2}
      />
      {/* ) : (
        <></>
      )} */}
    </View>
  );
};
export default Filter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.c_ffffff,
    borderWidth: 1,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    borderColor: "#F6F3F3",
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  category: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 15,
  },
  txtCategory: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.002,
    color: colors.c_48484A,
    textAlign: "center",
    textAlignVertical: "center",
    // backgroundColor: "red",
  },
  title: {
    marginBottom: 15,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 22,
    color: colors.c_48484A,
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
  col1Row1Head: {
    flex: 1,
  },
  select: {
    color: colors.c_48484A,
  },
});
