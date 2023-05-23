import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardItem from "./CardItem/CardItem";
import InputSearch from "../../../componets/InputSearch";
import { DIMENSIONS } from "../../../common/utils";
import { icons } from "../../../constants/icons";
import { colors } from "../../../constants/colors";
import { ScreenNames } from "../../../navigation/screen";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  GetCategoryWareHouse,
  selectProductWarehouse,
} from "../../../redux/slice/warehouses/products-warehouse";

export default function WareHouseIndustryProduct({ ...props }) {
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(selectProductWarehouse);
  useEffect(() => {
    dispatch(GetCategoryWareHouse({ take: 20 }));
  }, []);

  const list = [
    {
      id: "1",
      name: "Điện máy",
      totalProduct: 8,
    },
    {
      id: "2",
      name: "Phụ kiện gia dụng",
      totalProduct: 8,
    },
    {
      id: "3",
      name: "Đồ chơi ô tô",
      totalProduct: 13,
    },
    {
      id: "4",
      name: "Đồ trang trí",
      totalProduct: 26,
    },
    // {
    //   id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   avatar: "string",
    //   parentId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //   level: 0,
    //   totalProduct: 0,
    //   languageTranslation: [
    //     {
    //       code: "string",
    //       name: "string",
    //       tree: "string"
    //     }
    //   ]
    // }
  ];
  const gotoScreen = (screen: string, title?: string, id?: string) => {
    props.navigation.navigate(screen, { title: title, id: id });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewSearch}>
        <InputSearch viewInput={styles.viewInput} onChangeText={() => {}} />
        <TouchableOpacity style={styles.buttonSort}>
          <Image source={icons.ICON_SORT} style={styles.imageSort}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        {category?.items?.length != 0
          ? category?.items?.map((item) => (
              <TouchableOpacity
                onPress={() =>
                  gotoScreen(ScreenNames.AllProduct, item?.name, item?.id)
                }
                key={item.id}
              >
                <CardItem
                  key={item.id}
                  title={item.name}
                  detail={item.totalProduct}
                  props={props}
                />
              </TouchableOpacity>
            ))
          : list?.map((item) => (
              <TouchableOpacity
                onPress={() =>
                  gotoScreen(ScreenNames.AllProduct, item?.name, item?.id)
                }
                key={item.id}
              >
                <CardItem
                  key={item.id}
                  title={item.name}
                  detail={item.totalProduct}
                  props={props}
                />
              </TouchableOpacity>
            ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: colors.c_ffffff,
  },
  viewSearch: {
    flexDirection: "row",
    width: "100%",
  },
  viewInput: {
    width: DIMENSIONS.width - 97,
  },
  buttonSort: {
    marginLeft: 6,
    padding: 14,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderStyle: "solid",
    borderWidth: 1,
  },
  imageSort: {
    width: 16,
    height: 16,
  },
  list: {
    marginTop: 16,
    paddingBottom: 60,
  },
});
